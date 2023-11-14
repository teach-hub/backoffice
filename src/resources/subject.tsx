import {
  Create,
  Datagrid,
  List,
  Edit,
  SimpleForm,
  TextField,
  TextInput,
  EditButton,
} from 'react-admin';

export const ListSubjects = () => (
  <List>
     <Datagrid bulkActionButtons={false}>  {/* Disable delete button through bulk actions */}
      <TextField label="ID" source="id" />
      <TextField label="Codigo" source="code" />
      <TextField label="Nombre" source="name" />
      <EditButton />
    </Datagrid>
  </List>
);

export const CreateSubject = () => (
  <Create title="Nueva materia">
    <SimpleForm>
      <TextInput required label="Codigo" source="code" />
      <TextInput required label="Nombre" source="name" />
    </SimpleForm>
  </Create>
);

export const EditSubject = () => (
  <Edit>
    <SimpleForm>
      <TextInput disabled source="id" />
      <TextInput required source="code" />
      <TextInput required source="name" />
    </SimpleForm>
  </Edit>
);
