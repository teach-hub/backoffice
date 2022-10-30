import * as React from 'react';
import { Admin, Resource } from 'react-admin';
import buildGraphQLProvider from 'ra-data-graphql-simple';

import Dashboard from './Dashboard';
import authProvider from './auth/authProvider';
import { ListSubjects, CreateSubject } from './resources/subject';

const CORE_SERVICE_ADMIN_ENDPOINT = 'http://localhost:4000/admin/graphql';

const App = () => {

    const [dataProvider, setDataProvider] = React.useState<any>(null);

    React.useEffect(() => {
        buildGraphQLProvider({ clientOptions: { uri: CORE_SERVICE_ADMIN_ENDPOINT } })
            .then(graphQlDataProvider => {
              console.log('Setting data provider');
              setDataProvider(() => graphQlDataProvider)
            });
    }, []);

    if (!dataProvider) return (<h1> Loading </h1>);

    return (
      <Admin dataProvider={dataProvider} dashboard={Dashboard} authProvider={authProvider}>
        <Resource options={{ label: "Materias" }} name="Subject" list={ListSubjects} create={CreateSubject} />
      </Admin>
    );
};

export default App;
