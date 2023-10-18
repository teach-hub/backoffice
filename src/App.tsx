import * as React from 'react';
import { Admin, Resource, DataProvider } from 'react-admin';
import { concat, ApolloLink, HttpLink, ApolloClient, InMemoryCache } from '@apollo/client';
import buildGraphQLProvider from 'ra-data-graphql-simple';
import { setContext } from '@apollo/client/link/context';

import buildAuthProvider from './providers/auth';

import Dashboard from './Dashboard';

import { ListSubjects, CreateSubject, EditSubject } from './resources/subject';
import { ListCourses, CreateCourse, EditCourse } from './resources/course';
import { ListUsers, CreateUser, EditUser } from './resources/user';
import { ListRoles, CreateRole, EditRole } from './resources/role';
import { CreateAdminUser, EditAdminUser, ListAdminUsers } from './resources/adminUser';
import { CreateUserRole, EditUserRole, ListUserRoles } from './resources/userRole';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:4000/admin/graphql';

const App = () => {

    console.log('Loading app.')

    const httpLink = new HttpLink({ uri: BACKEND_URL });

    const authMiddleware = new ApolloLink((operation, forward) => {
      operation.setContext(({ headers = {} }) => {
        // add the authorization to the headers
        const username = localStorage.getItem('username');
        const password = localStorage.getItem('password');

        if (username && password) {
          console.log('Injecting basic auth headers to request.')
          return {
            headers: {
              ...headers,
              username,
              password,
            }
          }
         } else
           console.log('No auth found. Skipping.')

         return { headers }
      });

      return forward(operation);
    })

    const client = new ApolloClient({
      cache: new InMemoryCache(),
      link: concat(authMiddleware, httpLink)
    })

    const [dataProvider, setDataProvider] = React.useState<DataProvider | null>(null);

    React.useEffect(() => {
        buildGraphQLProvider({ client }).then(graphQlDataProvider => {
          console.log('Setting data provider');

          setDataProvider(graphQlDataProvider)
        });
    }, []);

    if (!dataProvider) {
      return <h1> Loading </h1>;
    }

    const authProvider = buildAuthProvider(client);

    return (
      <Admin authProvider={authProvider} dataProvider={dataProvider} dashboard={Dashboard}>
        <Resource options={{ label: "Usuarios" }} name="User" list={ListUsers} create={CreateUser} edit={EditUser} />
        <Resource options={{ label: "Usuarios (Admin)" }} name="AdminUser" list={ListAdminUsers} create={CreateAdminUser} edit={EditAdminUser} />
        <Resource options={{ label: "Materias" }} name="Subject" list={ListSubjects} create={CreateSubject} edit={EditSubject} />
        <Resource options={{ label: "Cursos" }} name="Course" list={ListCourses} create={CreateCourse} edit={EditCourse} />
        <Resource options={{ label: "Roles" }} name="Role" list={ListRoles} create={CreateRole} edit={EditRole} />
        <Resource options={{ label: "Roles Usuarios" }} name="UserRole" list={ListUserRoles} create={CreateUserRole} edit={EditUserRole} />
      </Admin>
    );
};

export default App;
