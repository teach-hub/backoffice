import * as React from 'react';
import { Admin, Resource } from 'react-admin';
import buildGraphQLProvider from 'ra-data-graphql-simple';

import Dashboard from './Dashboard';
import authProvider from './auth/authProvider';

import { ListSubjects, CreateSubject, EditSubject } from './resources/subject';
import { ListCourses, CreateCourse, EditCourse } from './resources/course';
import { ListUsers, CreateUser, EditUser } from './resources/user';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:4000/admin/graphql';

const App = () => {

    const [dataProvider, setDataProvider] = React.useState<any>(null);

    React.useEffect(() => {
        buildGraphQLProvider({ clientOptions: { uri: BACKEND_URL } })
            .then(graphQlDataProvider => {
              console.log('Setting data provider');
              setDataProvider(() => graphQlDataProvider)
            });
    }, []);

    if (!dataProvider) return (<h1> Loading </h1>);

    return (
      <Admin dataProvider={dataProvider} dashboard={Dashboard} authProvider={authProvider}>
        <Resource options={{ label: "Usuarios" }} name="User" list={ListUsers} create={CreateUser} edit={EditUser} />
        <Resource options={{ label: "Materias" }} name="Subject" list={ListSubjects} create={CreateSubject} edit={EditSubject} />
        <Resource options={{ label: "Catedras" }} name="Course" list={ListCourses} create={CreateCourse} edit={EditCourse} />
      </Admin>
    );
};

export default App;
