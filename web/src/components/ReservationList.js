import React from 'react';
import { gql, useQuery } from '@apollo/client';

const GET_RESERVATIONS = gql`
  query Reservations {
    Reservations(queryParams: {}) {
      reservationId
      userId
      status
      tableSize
      arrivalDate
      arrivalSlot
      createdAt
      updatedAt
      cancelledAt
      cancelledBy
      completedAt
      completedBy
    }
  }
`;

const ReservationList = () => {
  const { loading, error, data } = useQuery(GET_RESERVATIONS);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <ul>
      {data.Reservations.map((reservation) => (
        <li key={reservation.reservationId}>
          <p>Reservation ID: {reservation.reservationId}</p>
          <p>User ID: {reservation.userId}</p>
          <p>Status: {reservation.status}</p>
          <p>Table Size: {reservation.tableSize}</p>
          <p>Arrival Date: {reservation.arrivalDate}</p>
          <p>Arrival Slot: {reservation.arrivalSlot}</p>
        </li>
      ))}
    </ul>
  );
};

export default ReservationList;
