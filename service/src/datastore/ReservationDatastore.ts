import  Knex  from 'knex';
import type { Knex as KnexType } from 'knex';
import knexConfig from '../knexConnection.js';
import { Reservation } from './types/Reservation.js';
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
}