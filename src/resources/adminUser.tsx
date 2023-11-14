import React from 'react';
import {
    Create,
    Datagrid,
    List,
    SimpleForm,
    TextField,
    TextInput,
    EditButton,
    Confirm,
    Edit,
    email,
    useRedirect,
    useRecordContext,
  } from 'react-admin';

  export const ListAdminUsers = () => (
    <List>
       <Datagrid bulkActionButtons={false}>  {/* Disable delete button through bulk actions */}
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

  export const CreateAdminUser = () => {
    const [password, setPassword] = React.useState<string | null>(null);
    const redirect = useRedirect();

    const confirmText = `Acabamos de crear un nuevo usuario admin con la contraseña: ${password}. Recorda que esta contraseña es unica y no se puede recuperar, por lo que te recomendamos que lo copies y guardes en un lugar seguro.`;

    return (
        <Create
          mutationOptions={{
            onSuccess(data: { password: string }) {
              setPassword(data.password);
            }
          }}
          title="Nuevo usuario"
        >
          <>
            <Confirm
              isOpen={!!password}
              title='Nuevo usuario creado'
              content={confirmText}
              confirm="Aceptar"
              cancel="Cancelar"
              onClose={() =>
                setPassword(null)
              }
              onConfirm={() => {
                redirect('list', 'AdminUser')
              }}
            />

            <SimpleForm>
              <AdminUserFields />
            </SimpleForm>
          </>
        </Create>
    )
  };

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
