import React from 'react';
import ApolloAppProvider from './ApolloProvider';

import ReservationList from './components/ReservationList.js';
const App = () => {
  return (
    <ApolloAppProvider>
      <ReservationList/>
    </ApolloAppProvider>
  );
};
export default App;
