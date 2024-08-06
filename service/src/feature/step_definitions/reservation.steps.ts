// features/step_definitions/reservation.steps.ts
import { Given, When, Then } from '@cucumber/cucumber';
import { ReservationModel } from '../../models/'; // Adjust the import path
import { expect } from 'chai';

let reservationModel: ReservationModel;
let result: any;

Given('a user wants to make a reservation', function () {
  reservationModel = new ReservationModel();
});

When('they request to make a reservation with valid details', async function () {
  result = await reservationModel.makeReservation('user123', 4, '2024-08-07', '18:00');
});

Then('the reservation should be confirmed', function () {
  expect(result.success).to.be.true;
  expect(result.message).to.equal('Reservation confirmed!');
});
