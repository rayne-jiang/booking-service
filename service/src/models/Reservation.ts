import { ReservationMutationResponse, } from "../__generated__/resolvers-types";
import { ReservationDatastore } from "../datastore/ReservationDatastore.js";
import { ReservationStatusEnum } from "../datastore/types/Reservation.js";

export class ReservationModel {
    private reservationDB: ReservationDatastore;
    constructor() {
        this.reservationDB = new ReservationDatastore();
    }

    async makeReservation(userId: string, tableSize: number, arrivalDate: string, arrivalSlot: string ): Promise<ReservationMutationResponse> {
        try {
            const reservation = {
                userId,
                tableSize,
                arrivalDate,
                arrivalSlot,
                status: ReservationStatusEnum.CONFIRMED
            };
            await this.reservationDB.createAndUpdateReservation(reservation);
            return {
                success: true,
                message: "Reservation model",
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
            const reservation = {
                reservationId,
                status: ReservationStatusEnum.CANCELLED
            };
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
            await this.reservationDB.createAndUpdateReservation({reservationId, userId, ...updateReservationInfo});
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
                status: ReservationStatusEnum.COMPLETED
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
}