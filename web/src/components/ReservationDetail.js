import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, useMutation, gql } from '@apollo/client';
import moment from 'moment';
import './ReservationDetail.css'; // Import the CSS file

// Define the GraphQL query
const GET_RESERVATION_DETAILS = gql`
  query GetReservationDetails($reservationId: String!) {
    ReservationDetail(reservationId: $reservationId) {
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
      user {
        firstName
        lastName
        email
        phone
      }
    }
  }
`;

// Define the GraphQL mutation for cancelling reservation
const CANCEL_RESERVATION = gql`
  mutation CancelReservation($reservationId: String!) {
    cancelReservation(reservationId: $reservationId) {
      success
      message
    }
  }
`;

// Define the GraphQL mutation for updating reservation
const UPDATE_RESERVATION = gql`
  mutation UpdateReservation($reservationId: String!, $userId: String!, $updatedReservation: ReservationUpdatedInput!) {
    updateReservation(reservationId: $reservationId, userId: $userId, updatedReservation: $updatedReservation) {
      success
      message
    }
  }
`;

function ReservationDetail() {
  const { reservationId } = useParams();
  
  const { loading, error, data } = useQuery(GET_RESERVATION_DETAILS, {
    variables: { reservationId }
  });

  const [cancelReservation, { loading: cancelLoading, error: cancelError }] = useMutation(CANCEL_RESERVATION, {
    variables: { reservationId },
    refetchQueries: [{ query: GET_RESERVATION_DETAILS, variables: { reservationId } }]
  });

  const [updateReservation] = useMutation(UPDATE_RESERVATION);

  // State for the update form
  const [isUpdateFormVisible, setUpdateFormVisible] = useState(false);
  const [tableSize, setTableSize] = useState('');
  const [arrivalDate, setArrivalDate] = useState('');
  const [arrivalSlot, setArrivalSlot] = useState('');

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const reservation = data.ReservationDetail;

  // Get tomorrow's date for the min attribute
  const minDate = moment().add(1, 'day').format('YYYY-MM-DD');

  // Convert a date from 'DD/MM/YY' to 'YYYY-MM-DD'
  const formatDateForInput = (dateStr) => {
    return moment(dateStr, 'YYYY-MM-DD').format('YY/MM/DD').toString();
  };

  const handleUpdate = async () => {
    try {
      await updateReservation({
        variables: {
          reservationId,
          userId: reservation.userId,
          updatedReservation: {
            tableSize: parseInt(tableSize, 10),
            arrivalDate: formatDateForInput(arrivalDate),
            arrivalSlot
          }
        }
      });
      alert('Reservation updated successfully');
      setUpdateFormVisible(false);
    } catch (err) {
      console.error('Error updating reservation:', err);
      alert('Failed to update reservation');
    }
  };

  return (
    <div className="reservation-detail">
      <h1>Reservation Details</h1>
      <div className="details-container">
        <div className="reservation-info">
          <p>Status: {reservation.status}</p>
          <p>Table Size: {reservation.tableSize}</p>
          <p>Arrival Date: {reservation.arrivalDate}</p>
          <p>Arrival Slot: {reservation.arrivalSlot}</p>
          <p>Created At: {reservation.createdAt}</p>
          <p>Updated At: {reservation.updatedAt}</p>
          <p>Cancelled At: {reservation.cancelledAt}</p>
          <p>Completed At: {reservation.completedAt}</p>
        </div>
        <div className="user-info">
          <h2>User Details</h2>
          <p>Name: {reservation.user.firstName} {reservation.user.lastName}</p>
          <p>Email: {reservation.user.email}</p>
          <p>Phone: {reservation.user.phone}</p>
        </div>
      </div>

      {(reservation.status === 'confirmed' || reservation.status === 'queued') && (
        <>
          {/* Cancel Reservation Button */}
          <button
            className="cancel-button"
            onClick={() => {
              if (window.confirm('Are you sure you want to cancel this reservation?')) {
                cancelReservation().catch(err => {
                  console.error('Error cancelling reservation:', err);
                  alert('Failed to cancel reservation');
                });
              }
            }}
          >
            Cancel Reservation
          </button>
        </>
      )}

      {/* Update Reservation Button */}
      <button
        className="update-button"
        onClick={() => setUpdateFormVisible(true)}
      >
        Update
      </button>

      {/* Display loading or error states for cancellation */}
      {cancelLoading && <p>Canceling...</p>}
      {cancelError && <p>Error: {cancelError.message}</p>}

      {/* Update Form Popup */}
      {isUpdateFormVisible && (
        <div className="update-form-popup">
          <h2>Update Reservation</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleUpdate();
            }}
          >
            <label>
              Table Size:
              <input
                type="number"
                value={tableSize}
                onChange={(e) => setTableSize(e.target.value)}
                min="1"
                max="4"
                required
              />
            </label>
            <label>
              Arrival Date:
              <input
                type="date"
                value={arrivalDate}
                onChange={(e) => setArrivalDate(e.target.value)}
                min={minDate}
                required
              />
            </label>
            <label>
              Arrival Slot:
              <select
                value={arrivalSlot}
                onChange={(e) => setArrivalSlot(e.target.value)}
                required
              >
                <option value="" disabled>Select a time</option>
                <option value="17:00">17:00</option>
                <option value="18:00">18:00</option>
                <option value="19:00">19:00</option>
                <option value="20:00">20:00</option>
                <option value="21:00">21:00</option>
              </select>
            </label>
            <div className="form-buttons">
              <button type="submit">Update</button>
              <button
                type="button"
                onClick={() => setUpdateFormVisible(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default ReservationDetail;
