import {
  Create,
  Datagrid,
  List,
  SimpleForm,
  TextField,
  TextInput,
  EditButton,
  ReferenceInput,
  ReferenceField,
  SelectInput,
  required,
} from 'react-admin';

export const ListCourses = () => (
  <List>
    <Datagrid>
      <TextField label="id" source="id" />
      <TextField label="Nombre" source="name" />
      <TextField label="Materia" source="name" />
      <ReferenceField label="Materia" source="subjectId" reference="Subject">
        <TextField source="name" />
      </ReferenceField>
      <TextField label="Año" source="year" />
      <EditButton />
    </Datagrid>
  </List>
);

export const CreateCourse = () => (
  <Create title="Nueva materia">
    <SimpleForm>
      <TextInput label="Nombre" multiline source="name" />
      <ReferenceInput label="Materia" reference="Subject" source="subjectId" validate={[required()]} >
        <SelectInput optionText="name" />
      </ReferenceInput>
      <TextInput label="Organizacion de GitHub" source="organization" />
      <TextInput label="Cuatrimestre" source="period" />
      <TextInput label="Año" source="year" />
    </SimpleForm>
  </Create>
);
