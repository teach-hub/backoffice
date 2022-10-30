import {
  Create,
  Datagrid,
  List,
  SimpleForm,
  TextField,
  TextInput,
} from 'react-admin';

export const ListSubjects = () => (
  <List>
    <Datagrid>
      <TextField label="Codigo" source="code" />
      <TextField label="Nombre" source="name" />
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
