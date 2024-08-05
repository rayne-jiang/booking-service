import  Knex  from 'knex';
import type { Knex as KnexType } from 'knex';
import knexConfig from '../knexConnection.js';
import { Reservation, ReservationQueryParams } from './types/Reservation.js';
import { v4 as uuid } from 'uuid';

export class ReservationDatastore {
    private datastore: KnexType;
    constructor() {
        this.datastore = Knex(knexConfig.development);
    }

    async createAndUpdateReservation(reservation: Partial<Reservation>): Promise<number | number[]> {
        let res = null;
        if (reservation.reservationId) {
            res = await this.datastore('reservation').where({ reservationId: reservation.reservationId }).update({...reservation, updatedAt: new Date()});
        } else {
            res = await this.datastore('reservation').insert({reservationId: uuid(), ...reservation, createdAt: new Date(), updatedAt: new Date()});
        }
        if (!res) {
            throw new Error("Failed to create or update reservation");
        }
        return res;
    }

    async getNextQueuedReservation(arrivalDate: string, arrivalSlot: string): Promise<Reservation> {
        const reservation = await this.datastore('reservation')
        .where({ arrivalDate, arrivalSlot, status: 'queued' })
        .orderBy('createdAt', 'asc')
        .first();
        if (!reservation) {
            throw new Error("No queued reservation found");
        }
        return reservation;
    }

    async getReservation(reservationId: string): Promise<Reservation> {
        const reservation = await this.datastore('reservation').where({ reservationId }).first();
        if (!reservation) {
            throw new Error("Reservation not found");
        }
        return reservation;
    }

    async queryReservations(queryParams: ReservationQueryParams): Promise<Reservation[]> {
        const query = this.datastore('reservation');
        const filters = Object.entries(queryParams)
        .filter(([_, value]) => value !== undefined)
        .reduce((acc, [key, value]) => {
            acc[key] = value;
            return acc;
        }, {} as Record<string, any>);

        let filteredQuery = query.where(filters);

        if (queryParams.sortBy) {
            filteredQuery = filteredQuery.orderBy(queryParams.sortBy.field, queryParams.sortBy.order);
        }
        if (queryParams.offset !== undefined) {
            filteredQuery = filteredQuery.offset(queryParams.offset);
        }

        // Default limit to 100 to prevent large queries
        filteredQuery = filteredQuery.limit(queryParams.limit || 100);

        const reservations = await query.where(filters);
        return reservations;
    }
}