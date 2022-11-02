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
    <Datagrid>
      <TextField label="id" source="id" />
      <TextField label="Codigo" source="code" />
      <TextField label="Nombre" source="name" />
      <EditButton />
    </Datagrid>
  </List>
);

export const CreateSubject = () => (
  <Create title="Nueva materia">
    <SimpleForm>
      <TextInput label="Codigo" source="code" />
      <TextInput label="Nombre" multiline source="name" />
    </SimpleForm>
  </Create>
);

export const EditSubject = () => (
  <Edit>
    <SimpleForm>
      <TextInput disabled source="id" />
      <TextInput source="code" />
      <TextInput source="name" />
    </SimpleForm>
  </Edit>
);
