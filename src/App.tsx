import * as React from 'react';
import { Admin, Resource } from 'react-admin';
import buildGraphQLProvider from 'ra-data-graphql-simple';

import Dashboard from './Dashboard';
import authProvider from './auth/authProvider';
import { SubjectsList } from './resources/subject';

/**
 * Query a data provider and return a promise for a response
 *
 * @param {string} type Request type, e.g GET_LIST
 * @param {string} resource Resource name, e.g. "posts"
 * @param {Object} payload Request parameters. Depends on the action type
 * @returns {Promise} the Promise for a response
 */

const App = () => {

    const [dataProvider, setDataProvider] = React.useState<any>(null);

    React.useEffect(() => {
        buildGraphQLProvider({ clientOptions: { uri: 'http://localhost:4000/admin/graphql' } })
            .then(graphQlDataProvider => setDataProvider(() => graphQlDataProvider));
    }, []);

    if (!dataProvider) {
      return <h1> Cargando </h1>
    }

    return (
      <Admin dataProvider={dataProvider} dashboard={Dashboard} authProvider={authProvider}>
        <Resource name="Subject" list={SubjectsList} />
      </Admin>
    );
};

export default App;
