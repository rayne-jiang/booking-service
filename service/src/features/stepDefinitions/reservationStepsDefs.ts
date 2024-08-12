import CucumberTsFlow from 'cucumber-tsflow';
import { assert } from 'chai';
import sinon from 'sinon';
import { ReservationModel } from '../../models/Reservation.js';
import { ReservationStatusEnum } from '../../datastore/types/Reservation.js';
import { ReservationDatastore } from '../../datastore/ReservationDatastore.js';
// Extract Cucumber bindings
const { before, after, binding, given, when, then } = CucumberTsFlow;

@binding()
export class ReservationSteps {
    private reservationModel: ReservationModel = new ReservationModel();
    private reservationDatastore: ReservationDatastore = new ReservationDatastore();
    private sandbox: sinon.SinonSandbox = sinon.createSandbox(); // Create a sandbox for mocks
    private response: any;
    private reservationId: string = '';
    private userId: string = 'testGuest';
    private tableSize: number = 4;
    private arrivalDate: string = '24/08/12'; // Corrected date format
    private arrivalSlot: string = '18:00';

    // Set up mocks before the test suite
    @before()
    public async setupMocks() {
        // Stub methods as needed
        this.sandbox.stub(this.reservationDatastore, 'createAndUpdateReservation').resolves([1]);
        this.sandbox.stub(this.reservationDatastore, 'getNextQueuedReservation').resolves({
            reservationId: 'mockedReservationId',
            userId: 'mockedUserId',
            tableSize: 4,
            arrivalDate: this.arrivalDate,
            arrivalSlot: this.arrivalSlot,
            status: 'queued' as ReservationStatusEnum,
            cancelledAt: '',
            cancelledBy: '',
            confirmedAt: '',
            completedAt :'',
            completedBy:''
        });
        this.sandbox.stub(this.reservationDatastore, 'getReservation').resolves({
            reservationId: this.reservationId,
            userId: 'mockedUserId',
            tableSize: 4,
            arrivalDate: this.arrivalDate,
            arrivalSlot: this.arrivalSlot,
            status: ReservationStatusEnum.CONFIRMED,
            cancelledAt: '',
            cancelledBy: '',
            confirmedAt: '',
            completedAt :'',
            completedBy:''
        });
        this.sandbox.stub(this.reservationDatastore, 'queryReservations').resolves([
            {
                reservationId: 'mockedReservationId',
                userId: 'mockedUserId',
                tableSize: 4,
                arrivalDate: this.arrivalDate,
                arrivalSlot: this.arrivalSlot,
                status: ReservationStatusEnum.CONFIRMED,
                cancelledAt: '',
                cancelledBy: '',
                confirmedAt: '',
                completedAt :'',
                completedBy:''
            }
        ]);

        this.reservationModel = new ReservationModel(this.reservationDatastore);
    }
    
    @after()
    public async teardownMocks() {
        this.sandbox.restore();
    }

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
        this.reservationId = this.response.reservationId;
    }

    @then('the reservation should be confirmed')
    public async verifyReservationConfirmed() {
        assert.strictEqual(this.response.success, true);
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
}
