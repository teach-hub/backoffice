import { gql } from '@apollo/client';
import buildGraphQLProvider, { buildQuery } from 'ra-data-graphql-simple';

const queryBuilder: typeof buildQuery = (introspection) => (fetchType, resource, params) => {
    const builtQuery = buildQuery(introspection)(fetchType, resource, params);

    console.log('Building query with', { fetchType, resource });

    if (resource === 'AdminUser' && fetchType === 'CREATE') {
      return {
        // Use the default query variables and parseResponse
        ...builtQuery,
        // Override the query
        query: gql`
          mutation CreateAdminUser($email: String!, $name: String, $lastName: String) {
            data: createAdminUser(email: $email, name: $name, lastName: $lastName) {
              id
              password
              email
              name
              lastName
            }
          }
        `,
      };
    }
    return builtQuery;
};

const buildDataProvider: typeof buildGraphQLProvider = (args) => buildGraphQLProvider({ ...args, buildQuery: queryBuilder });

export default buildDataProvider;
