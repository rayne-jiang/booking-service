import React, { useState } from 'react';
import ApolloAppProvider from './ApolloProvider';
import Login from './components/Login.js';
import ReservationList from './components/ReservationList.js';
import ReservationDetail from './components/ReservationDetail.js';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

const App = () => {
  const [token, setToken] = useState(null);

  const handleLoginSuccess = (token) => {
    setToken(token);
  };

  return (
    <Router>
      <ApolloAppProvider  token={token}>
        <Routes>
          <Route path="/login" element={<Login onLoginSuccess={handleLoginSuccess} />} />
          <Route path="/reservations" element={token ? <ReservationList /> : <Navigate to="/login" />} />
          <Route path="/reservations/:reservationId" element={token ? <ReservationDetail /> : <Navigate to="/login" />} />
          <Route path="/" element={<Navigate to={token ? "/reservations" : "/login"} />} />
        </Routes>
      </ApolloAppProvider>
    </Router>
  );
};

export default App;
