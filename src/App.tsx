import { Admin, Resource, } from 'react-admin';
import { UserList } from "./resources/users";
import { PostCreate, PostEdit, PostList } from "./resources/posts";
import PostIcon from '@mui/icons-material/Book';
import UserIcon from '@mui/icons-material/Group';
import Dashboard from './Dashboard';
import authProvider from './auth/authProvider';


const App = () => (
    <Admin dashboard={Dashboard} authProvider={authProvider} dataProvider={dataProvider}>
      <Resource name="posts" icon={PostIcon} list={PostList} edit={PostEdit} create={PostCreate} />
      <Resource name="users" icon={UserIcon} list={UserList} recordRepresentation="name" />
    </Admin>
);

export default App;
