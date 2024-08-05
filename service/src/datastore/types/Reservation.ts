import { UUID } from "crypto";

export enum ReservationStatusEnum {
    QUEUED = 'queued',
    CONFIRMED = 'confirmed',
    CANCELLED = 'cancelled',
    COMPLETED = 'completed',
    OUTDATED = 'outdated',
}

export type Reservation = {
    reservationId: string;
    userId: string;
    status: ReservationStatusEnum;
    tableSize: number;
    arrivalDate: string;
    arrivalSlot: string;
    cancelledAt: string;
    cancelledBy: string;
    confirmedAt: string;
    completedAt: string;
    completedBy: string;
}