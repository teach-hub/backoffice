import { NormalizedCacheObject, ApolloClient, gql } from '@apollo/client';

import type { AuthProvider } from 'react-admin';

function buildAuthProvider(client: ApolloClient<NormalizedCacheObject>): AuthProvider {

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
        console.log('Login failed.')
        return Promise.reject();
      }

      console.log('Login succeeded, setting creds.')

      localStorage.setItem('username', username);
      localStorage.setItem('password', password);

      return Promise.resolve();
    },
    async logout() {
      console.log('Performing logout...')

      localStorage.clear();

      return Promise.resolve();
    },
    async checkError(errors: unknown | unknown[]) {
      console.log('Checking error...');

      const isUnauthorizedError = (error: Error) =>
        error.message.includes('UNAUTHORIZED_ERROR');

      if (errors instanceof Error && isUnauthorizedError(errors)) {
        return Promise.reject();
      }

      if (Array.isArray(errors) && errors.find(isUnauthorizedError)) {
        return Promise.reject();
      }

      return Promise.resolve();
    },
    async checkAuth() {
      const username = localStorage.getItem('username');
      const password = localStorage.getItem('password');

      console.log('Checking auth...')
      console.log('Auth found: ', username, password)

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
