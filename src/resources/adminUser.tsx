import {
    Create,
    Datagrid,
    List,
    SimpleForm,
    TextField,
    TextInput,
    EditButton,
    Edit,
    email,
  } from 'react-admin';

  export const ListAdminUsers = () => (
    <List>
      <Datagrid>
        <TextField label="ID" source="id" />
        <TextField label="Nombre" source="name" />
        <TextField label="Apellido" source="lastName" />
        <TextField label="Email" source="email" />
        <EditButton />
      </Datagrid>
    </List>
  );

  const AdminUserFields = () => {
    const emailValidation = email("Email invalido");

    return (
      <>
        <TextInput required label="Nombre" source="name" />
        <TextInput required label="Apellido" source="lastName" />
        <TextInput required label="Email" validate={emailValidation} source="email" />
      </>
    );
  }

  export const CreateAdminUser = () => (
    <Create title="Nuevo usuario">
      <SimpleForm>
        <AdminUserFields />
      </SimpleForm>
    </Create>
  );

  export const EditAdminUser = () => {
    return (
      <Edit>
        <SimpleForm>
          <TextInput disabled source="id" />
          <AdminUserFields />
        </SimpleForm>
      </Edit>
    );
  }
