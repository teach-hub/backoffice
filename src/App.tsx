import { Admin } from 'react-admin';

import Dashboard from './Dashboard';
import authProvider from './auth/authProvider';

const App = () => (
    <Admin dashboard={Dashboard} authProvider={authProvider} />
);

export default App;
