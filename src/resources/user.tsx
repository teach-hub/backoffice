import {
  Create,
  Datagrid,
  List,
  SimpleForm,
  TextField,
  TextInput,
  EditButton,
  BooleanInput,
  BooleanField,
  Edit,
  email,
} from 'react-admin';

export const ListUsers = () => (
  <List queryOptions={{ optimisticResults: false }}>
    <Datagrid>
      <TextField label="ID" source="id" />
      <TextField label="Github ID" source="githubId" />
      <TextField label="Nombre" source="name" />
      <TextField label="Apellido" source="lastName" />
      <TextField label="Email (notificiaciones)" source="notificationEmail" />
      <TextField label="Padron" source="file" />
      <BooleanField label="Activo" source="active" />
      <EditButton />
    </Datagrid>
  </List>
);

const UserFields = () => {
  const emailValidation = email("Email invalido");

  return (
    <>
      <TextInput required label="Nombre" source="name" />
      <TextInput required label="Apellido" source="lastName" />
      <TextInput label="Padron" source="file" />
      <TextInput required label="Github ID" source="githubId" />
      <TextInput required label="Email (notificaciones)" validate={emailValidation} source="notificationEmail" />
    </>
  );
}

export const CreateUser = () => (
  <Create title="Nuevo usuario">
    <SimpleForm>
      <UserFields />
    </SimpleForm>
  </Create>
);

export const EditUser = () => {
  return (
    <Edit>
      <SimpleForm>
        <TextInput disabled source="id" />
        <UserFields />
        <BooleanInput label="Activo" source="active" />
      </SimpleForm>
    </Edit>
  );
}
