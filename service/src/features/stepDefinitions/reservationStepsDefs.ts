import { binding, given, then, when } from 'cucumber-tsflow';
import { assert } from 'chai';
import { ReservationModel } from '../../models/Reservation';
import { ReservationStatusEnum } from '../../datastore/types/Reservation';

@binding()
export class ReservationSteps {
    private reservationModel: ReservationModel = new ReservationModel();
    private response: any;
    private reservationId: string = '';
    private userId: string = 'testGuest';
    private tableSize: number = 4;
    private arrivalDate: string = '24/08/12';
    private arrivalSlot: string = '18:00';

    @given('a user wants to make a reservation')
    public prepareForReservation(): void {
        this.reservationId = ''; 
    }
    
    @when('they request to make a reservation with valid details')
    public async makeReservation() {
        this.response = await this.reservationModel.makeReservation(
            this.userId,
            this.tableSize,
            this.arrivalDate,
            this.arrivalSlot,
            this.reservationId
        );
        this.reservationId = this.response.reservationId; // Store the generated reservation ID
    }

    @then('the reservation should be confirmed')
    public async verifyReservationConfirmed() {
        assert.strictEqual(this.response.success, true);
        assert.strictEqual(this.response.message, "Reservation confirmed!");
        const reservation = await this.reservationModel.getReservation(this.reservationId);
        assert.strictEqual(reservation.status, ReservationStatusEnum.CONFIRMED);
    }

    @given('a reservation exists')
    public async createReservation() {
        this.response = await this.reservationModel.makeReservation(
            this.userId,
            this.tableSize,
            this.arrivalDate,
            this.arrivalSlot
        );
        this.reservationId = this.response.reservationId; // Store the reservation ID for later steps
    }

    @when('the user cancels the reservation')
    public async cancelReservation() {
        this.response = await this.reservationModel.cancelReservation(this.reservationId);
    }

    @then('the reservation should be canceled')
    public async verifyReservationCanceled() {
        assert.strictEqual(this.response.success, true);
        assert.strictEqual(this.response.message, "Reservation cancelled!");
        const reservation = await this.reservationModel.getReservation(this.reservationId);
        assert.strictEqual(reservation.status, ReservationStatusEnum.CANCELLED);
    }

    @when('the user updates the reservation with new details')
    public async updateReservation() {
        const updateInfo = {
            tableSize: 6, // Updated table size
            arrivalDate: '24/08/13', // Updated date
            arrivalSlot: '19:00' // Updated slot
        };
        this.response = await this.reservationModel.updateReservation(this.reservationId, this.userId, updateInfo);
    }

    @then('the reservation should be updated')
    public async verifyReservationUpdated() {
        assert.strictEqual(this.response.success, true);
        assert.strictEqual(this.response.message, "Reservation updated!");
        const reservation = await this.reservationModel.getReservation(this.reservationId);
        assert.strictEqual(reservation.tableSize, 6);
        assert.strictEqual(reservation.arrivalDate, '2');
        assert.strictEqual(reservation.arrivalSlot, '19:00');
    }

    @when('the user completes the reservation')
    public async completeReservation() {
        this.response = await this.reservationModel.completeReservation(this.reservationId);
    }

    @then('the reservation should be marked as completed')
    public async verifyReservationCompleted() {
        assert.strictEqual(this.response.success, true);
        assert.strictEqual(this.response.message, "Reservation completed!");
        const reservation = await this.reservationModel.getReservation(this.reservationId);
        assert.strictEqual(reservation.status, ReservationStatusEnum.COMPLETED);
    }
}
