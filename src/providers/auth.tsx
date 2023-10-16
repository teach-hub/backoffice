import { NormalizedCacheObject, ApolloClient, InMemoryCache, gql } from '@apollo/client';

import type { Dispatch } from 'react';
import type { AuthProvider } from 'react-admin';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:4000/admin/graphql';

function buildAuthProvider(updateClientFn: Dispatch<ApolloClient<NormalizedCacheObject>>): AuthProvider {

  const client = new ApolloClient({
    uri: BACKEND_URL, cache: new InMemoryCache(),
    headers: {
      username: localStorage.getItem('username') || '',
      password: localStorage.getItem('password') || '',
    }
  });

  return {
    async login({ username, password }) {

      console.log('Performing login...')

      const response = await client.mutate({
        mutation: gql`
          mutation LoginMutation($username: String!, $password: String!) {
            login(email: $username, password: $password) {
              success
            }
          }
        `,
        variables: {
          username,
          password,
        }
      })

      console.log(response)

      if (!response.data.login.success) {
        return Promise.reject();
      }

      localStorage.setItem('username', username);
      localStorage.setItem('password', password);

      updateClientFn(client);

      return Promise.resolve();
    },
    async logout() {
      console.log('Performing logout...')

      localStorage.clear();

      return Promise.resolve();
    },
    async checkError(_errors) {
      return Promise.resolve();
    },
    async checkAuth() {
      const username = localStorage.getItem('username');
      const password = localStorage.getItem('password');

      if (!username || !password) {
        return Promise.reject();
      }

      return Promise.resolve();
    },
    async getPermissions() {
      return Promise.resolve();
    },
    async getIdentity() {
      return Promise.resolve({
        id: '1',
        fullName: 'Tomas Lopez Hidalgo'
      });
    }
  }
}

export default buildAuthProvider;
