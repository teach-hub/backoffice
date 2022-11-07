import * as React from 'react';

import {
  Create,
  Datagrid,
  List,
  SimpleForm,
  TextField,
  TextInput,
  EditButton,
  BooleanInput,
  ReferenceInput,
  ReferenceField,
  SelectInput,
  Edit,
  required,
  useUpdate
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
  <Create title="Nueva catedra">
    <SimpleForm>
      <TextInput label="Nombre" multiline source="name" />
      <ReferenceInput label="Materia" reference="Subject" source="subjectId" validate={[required()]} >
        <SelectInput optionText="name" validate={[required()]} />
      </ReferenceInput>
      <TextInput label="Organizacion de GitHub" source="organization" />
      <TextInput label="Cuatrimestre" source="period" />
      <TextInput label="Año" source="year" />
    </SimpleForm>
  </Create>
);

export const EditCourse = () => {
  return (
    <Edit>
      <SimpleForm>
        <TextInput disabled source="id" />
        <TextInput label="Nombre" source="name" />
        <TextInput label="Organizacion (GitHub)" source="githubOrganization" />
        <TextInput label="Año" source="year" />
        <TextInput label="Cuatrimestre" source="period" />
        <ReferenceInput label="Materia" reference="Subject" source="subjectId" validate={[required()]} >
          <SelectInput optionText="name" validate={[required()]} />
        </ReferenceInput>
        <BooleanInput label="Activa" source="active" />
      </SimpleForm>
    </Edit>
  );
};
