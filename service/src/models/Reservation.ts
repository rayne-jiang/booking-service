import { ReservationMutationResponse, } from "../__generated__/resolvers-types";
import { ReservationDatastore } from "../datastore/ReservationDatastore.js";
import { ReservationStatusEnum,ReservationQueryParams } from "../datastore/types/Reservation.js";
import { checkTableAvailability, updateTableAvailability } from "./helper.js";

export class ReservationModel {
    private reservationDB: ReservationDatastore;
    constructor() {
        this.reservationDB = new ReservationDatastore();
    }

    async makeReservation(userId: string, tableSize: number, arrivalDate: string, arrivalSlot: string, reservationId?: string): Promise<ReservationMutationResponse> {
        try {
            const reservation = {
                userId,
                tableSize,
                arrivalDate,
                arrivalSlot,
                status: ReservationStatusEnum.QUEUED,
                reservationId,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
            };
            const tableIsAvailable = await checkTableAvailability(tableSize, arrivalDate, arrivalSlot);
            if (tableIsAvailable) {
                reservation.status = ReservationStatusEnum.CONFIRMED;
                await updateTableAvailability(tableSize, arrivalDate, arrivalSlot, true);
            }
            await this.reservationDB.createAndUpdateReservation(reservation);
            return {
                success: true,
                message: tableIsAvailable ? "Reservation confirmed!" : "Table is Full, Reservation queued!",
            };
        } catch (error) {
            console.error(error);
            return {
                success: false,
                message: `Failed to make reservation: ${error}`,
            };
        }
    }

    async cancelReservation(reservationId: string): Promise<ReservationMutationResponse> {
        try {
            const reservation = await this.reservationDB.getReservation(reservationId);
            if (reservation.status === ReservationStatusEnum.COMPLETED) {
                return {
                    success: false,
                    message: "The reservation is already completed, cannot cancel!",
                };
            }
            // For the one that is already confirmed we need to update the table availability, and make the next queued reservation confirmed
            if (reservation.status === ReservationStatusEnum.CONFIRMED){
                await updateTableAvailability(reservation.tableSize, reservation.arrivalDate, reservation.arrivalSlot, false);

                const nextQueuedReservation = await this.reservationDB.getNextQueuedReservation(reservation.arrivalDate, reservation.arrivalSlot);
                // If there is a queued reservation, make it confirmed
                if (nextQueuedReservation) {
                    await this.makeReservation(nextQueuedReservation.userId, nextQueuedReservation.tableSize, nextQueuedReservation.arrivalDate, nextQueuedReservation.arrivalSlot, nextQueuedReservation.reservationId);
                }
            }
            reservation.status = ReservationStatusEnum.CANCELLED;
            reservation.cancelledAt = new Date().toISOString();
            await this.reservationDB.createAndUpdateReservation(reservation);
            return {
                success: true,
                message: "Reservation cancelled!",
            };
        } catch (error) {
            console.error(error);
            return {
                success: false,
                message: `Failed to cancel reservation: ${error}`,
            };
        }
    }

    async updateReservation(reservationId: string, userId:string, updateReservationInfo: any): Promise<ReservationMutationResponse> {
        try {
            const reservation = await this.reservationDB.getReservation(reservationId);
            const updatedReservation = {
                reservationId,
                userId,
                tableSize: updateReservationInfo.tableSize || reservation.tableSize,
                arrivalDate: updateReservationInfo.arrivalDate || reservation.arrivalDate,
                arrivalSlot: updateReservationInfo.arrivalSlot || reservation.arrivalSlot,
                updatedAt: new Date().toISOString(),
            };
            const newTableAvailable = await checkTableAvailability(updatedReservation.tableSize, updatedReservation.arrivalDate, updatedReservation.arrivalSlot);
            if(!newTableAvailable) {
                return {
                    success: false,
                    message: "Table is Full, Cannot update reservation, temp workaround is to cancel first and queued in new time if needed!",
                };
            }
            // Cancel the old reservation first
            await this.cancelReservation(reservationId);

            // Make a new reservation
            await this.makeReservation(userId, updatedReservation.tableSize, updatedReservation.arrivalDate, updatedReservation.arrivalSlot, reservationId);
            return {
                success: true,
                message: "Reservation updated!",
            };
        } catch (error) {
            console.error(error);
            return {
                success: false,
                message: `Failed to update reservation: ${error}`,
            };
        }
    }

    async completeReservation(reservationId: string): Promise<ReservationMutationResponse> {
        try {
            const reservation = {
                reservationId,
                status: ReservationStatusEnum.COMPLETED,
                completedAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
            };
            await this.reservationDB.createAndUpdateReservation(reservation);
            return {
                success: true,
                message: "Reservation completed!",
            };
        } catch (error) {
            console.error(error);
            return {
                success: false,
                message: `Failed to complete reservation: ${error}`,
            };
        }
    }

    async queryReservations(queryParams: any) {
        if(!queryParams.sortBy){
            queryParams.sortBy = {field: 'arrivalDate', order: 'desc'}; // default sort by createdAt in descending order
        }
        return await this.reservationDB.queryReservations(queryParams);
    }

    async getReservation(reservationId: string) {
        return await this.reservationDB.getReservation(reservationId);
    }
}