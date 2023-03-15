import React, { useState } from "react";
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  from,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { createUploadLink } from "apollo-upload-client";
import { setContext } from "@apollo/client/link/context";
import { useAuth0 } from "@auth0/auth0-react";
import CircleSpinner from "../components/CircleSpinner/CircleSpinner";

const AuthorizedApolloProvider = ({ children }) => {
  const { getAccessTokenSilently, isLoading } = useAuth0();

  const [token, setToken] = useState(sessionStorage.getItem("token"));
  const [expiryDate, setExpiryDate] = useState(
    sessionStorage.getItem("expiryDate")
  );

  const isTokenExpired = () => {
    const now = new Date();
    const expiry = new Date(expiryDate);
    return now > expiry;
  };

  const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
      console.log(graphQLErrors)
    }
    if (networkError) {
      console.log(networkError)
    }
  });

  const authLink = setContext(async (_, { headers }) => {
    if (token && !isTokenExpired()) {
      // If token exists and not expired, set the Authorization header with token
      return {
        headers: {
          ...headers,
          Authorization: `Bearer ${token}`,
        },
      };
    } else {
      // Fetch token from token endpoint
      const fetchedToken = await getAccessTokenSilently({ ignoreCache: true });
      const fetchedExpiryDate = new Date(new Date().getTime() + 3600 * 1000); // 1 hour expiry

      // Store token and its expiry date in sessionStorage
      sessionStorage.setItem("token", fetchedToken);
      sessionStorage.setItem("expiryDate", fetchedExpiryDate);

      // Update the state with the new token and expiry date
      setToken(fetchedToken);
      setExpiryDate(fetchedExpiryDate);

      // Set the Authorization header with the new token
      return {
        headers: {
          ...headers,
          Authorization: `Bearer ${fetchedToken}`,
        },
      };
    }
  });

  const httpLink = createUploadLink({
    uri: process.env.REACT_APP_GRAPHQL_URI || "/graphql",
  });
  const cache = new InMemoryCache();

  const apolloClient = new ApolloClient({
    link: from([authLink, errorLink, httpLink]),
    connectToDevTools: true,
    cache,
  });

  if (isLoading) return <CircleSpinner />;

  return <ApolloProvider client={apolloClient}>{children}</ApolloProvider>;
};

export default AuthorizedApolloProvider;
