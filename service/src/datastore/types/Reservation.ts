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

export type ReservationQueryParams = {
    filter?: {
        userId?: string;
        status?: [ReservationStatusEnum];
        arrivalDate?: string;
        arrivalSlot?: string
    };    
    limit?: number;
    offset?: number;
    sortBy?: { field: string; order: 'asc' | 'desc' };
}