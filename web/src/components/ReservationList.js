import React, { useState } from 'react';
import { gql, useQuery } from '@apollo/client';
import { DatePicker, Select, Spin, Alert, Button } from 'antd';
import moment from 'moment';
import { useNavigate } from 'react-router-dom'; // Use useNavigate for React Router v6

const { Option } = Select;

const GET_RESERVATIONS = gql`
  query Reservations($queryParams: ReservationParamInput) {
    Reservations(queryParams: $queryParams) {
      reservationId
      userId
      status
      tableSize
      arrivalDate
      arrivalSlot
    }
  }
`;

const ReservationList = () => {
  const [date, setDate] = useState(null);
  const [status, setStatus] = useState([]);
  const { loading, error, data, refetch } = useQuery(GET_RESERVATIONS, {
    variables: { queryParams: {} }
  });
  const navigate = useNavigate();

  const handleSubmit = () => {
    const formattedDate = date ? moment(date.toString()).format('YY/MM/DD') : null;
    refetch({
      queryParams: {
        filter: {
          arrivalDate: formattedDate,
          status
        }
      }
    });
  };

  const handleRowClick = (reservationId) => {
    navigate(`/reservations/${reservationId}`); // Use navigate to handle navigation
  };

  if (loading) return <Spin />;
  if (error) return <Alert message="Error" description={error.message} type="error" />;

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <DatePicker
          style={{ marginRight: 8 }}
          value={date}
          onChange={(date) => setDate(date)}
        />
        <Select
          mode="multiple"
          style={{ width: 200 }}
          value={status}
          onChange={(value) =>  setStatus(value)}
          placeholder="Select status"
        >
          <Option value="QUEUED">Queued</Option>
          <Option value="CONFIRMED">Confirmed</Option>
          <Option value="CANCELLED">Cancelled</Option>
          <Option value="COMPLETED">Completed</Option>
          <Option value="OUTDATED">Outdated</Option>
        </Select>
        <Button
          type="primary"
          style={{ marginLeft: 8 }}
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </div>
      <table style={{ borderCollapse: 'collapse', width: '100%' }}>
        <thead>
          <tr style={{ backgroundColor: '#f4f4f4' }}>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Arrival Date</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Arrival Slot</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Status</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Table Size</th>
          </tr>
        </thead>
        <tbody>
          {data && data.Reservations.map((reservation) => (
            <tr 
              key={reservation.reservationId}
              onClick={() => handleRowClick(reservation.reservationId)}
              style={{ cursor: 'pointer' }}
            >
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{reservation.arrivalDate}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{reservation.arrivalSlot}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{reservation.status}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{reservation.tableSize}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReservationList;
