import  Knex  from 'knex';
import type { Knex as KnexType } from 'knex';
import knexConfig from '../knexConnection.js';
import { Reservation, ReservationQueryParams, ReservationStatusEnum } from './types/Reservation.js';
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
        return reservation;
    }

    async getReservation(reservationId: string): Promise<Reservation> {
        const reservation = await this.datastore('reservation').where({ reservationId }).first();
        if (!reservation) {
            throw new Error("Reservation not found");
        }
        return reservation;
    }

    async queryReservations({
        filter = {},
        sortBy,
        offset,
        limit = 100
      }: ReservationQueryParams): Promise<Reservation[]> {
        try {
          const { userId, status, arrivalDate, arrivalSlot } = filter;
          let query = this.datastore('reservation');
      
          if (userId) {
            query = query.where('userId', userId);
          }
          if (status) {
            const mappedStatus = status.map((s) => s.toLowerCase());
            query = query.whereIn('status', mappedStatus);
          }
          if (arrivalDate) {
            query = query.where('arrivalDate', arrivalDate);
          }
          if (arrivalSlot) {
            query = query.where('arrivalSlot', arrivalSlot);
          }
      
          if (sortBy) {
            query = query.orderBy(sortBy.field, sortBy.order);
          }
          if (offset !== undefined) {
            query = query.offset(offset);
          }
      
          query = query.limit(limit);
      
          const reservations = await query.select();
          return reservations;
        } catch (error) {
          console.error('Error querying reservations:', error);
          throw new Error('Failed to query reservations');
        }
    }
}