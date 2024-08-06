import React, { useState } from 'react';
import { gql, useQuery, useMutation } from '@apollo/client';
import { DatePicker, Select, Spin, Alert, Button, Modal, Form, Input, message } from 'antd';
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

const MAKE_RESERVATION = gql`
  mutation MakeReservation($tableSize: Int!, $arrivalDate: String!, $arrivalSlot: String!) {
    makeReservation(tableSize: $tableSize, arrivalDate: $arrivalDate, arrivalSlot: $arrivalSlot) {
      success
      message
    }
  }
`;

const ReservationList = () => {
  const [date, setDate] = useState(null);
  const [status, setStatus] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const { loading, error, data, refetch } = useQuery(GET_RESERVATIONS, {
    variables: { queryParams: {} }
  });
  const [makeReservation] = useMutation(MAKE_RESERVATION);
  const navigate = useNavigate();

  const user = localStorage.getItem('user');

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

  const handleMakeReservation = async (values) => {
    try {
      const { data } = await makeReservation({
        variables: {
          tableSize: parseInt(values.tableSize, 10),
          arrivalDate: values.arrivalDate.format('YY/MM/DD'),
          arrivalSlot: values.arrivalSlot
        }
      });
      if (data.makeReservation.success) {
        message.success(data.makeReservation.message);
        setIsModalVisible(false);
        form.resetFields();
        refetch();
      } else {
        message.error(data.makeReservation.message);
      }
    } catch (e) {
      message.error('Failed to make reservation');
    }
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
          onChange={(value) => setStatus(value)}
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
        <Button
          type="primary"
          style={{ marginLeft: 8 }}
          onClick={() => setIsModalVisible(true)}
        >
          Make Reservation
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
      <Modal
        title="Make Reservation"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <Form
          form={form}
          onFinish={handleMakeReservation}
        >
          <Form.Item
            name="tableSize"
            label="Table Size"
            rules={[{ required: true, message: 'Please input table size' }]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            name="arrivalDate"
            label="Arrival Date"
            rules={[{ required: true, message: 'Please select arrival date' }]}
          >
            <DatePicker />
          </Form.Item>
          <Form.Item
            name="arrivalSlot"
            label="Arrival Slot"
            rules={[{ required: true, message: 'Please select arrival slot' }]}
          >
            <Select placeholder="Select arrival slot">
              <Option value="17:00">17:00</Option>
              <Option value="18:00">18:00</Option>
              <Option value="19:00">19:00</Option>
              <Option value="20:00">20:00</Option>
              <Option value="21:00">21:00</Option>
            </Select>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ReservationList;
