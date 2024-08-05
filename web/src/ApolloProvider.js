import React from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider, HttpLink, ApolloLink, concat } from '@apollo/client';

const ApolloAppProvider = ({ children, token }) => {
  // Create an HttpLink to your GraphQL server
  const httpLink = new HttpLink({ uri: 'http://localhost:4000/graphql' });

  // Create a middleware link to add the JWT token to the headers
  const authLink = new ApolloLink((operation, forward) => {
    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : '',
      }
    });
    return forward(operation);
  });

  // Combine the authLink and httpLink
  const client = new ApolloClient({
    link: concat(authLink, httpLink),
    cache: new InMemoryCache(),
  });

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default ApolloAppProvider;
