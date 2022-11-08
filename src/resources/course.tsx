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
  BooleanField,
  Edit,
  required,
} from 'react-admin';

export const ListCourses = () => (
  <List>
    <Datagrid>
      <TextField label="ID" source="id" />
      <TextField label="Nombre de catedra" source="name" />
      <TextField label="Año" source="year" />
      <TextField label="Cuatrimetre" source="period" />
      <TextField label="Organizacion (GitHub)" source="organization" />
      <ReferenceField label="Materia" source="subjectId" reference="Subject">
        <TextField source="name" />
      </ReferenceField>
      <BooleanField label="Activa" source="active" />
      <EditButton />
    </Datagrid>
  </List>
);

export const CreateCourse = () => (
  <Create title="Nueva catedra">
    <SimpleForm>
      <TextInput required label="Nombre" source="name" />
      <ReferenceInput reference="Subject" source="subjectId">
        <SelectInput required label="Materia" optionText="name" />
      </ReferenceInput>
      <TextInput label="Organizacion de GitHub" source="organization" />
      <SelectInput
        choices={[{ id: '1', name: '1'} , {id: '2', name: '2'}]}
        label="Cuatrimestre"
        source="period"
        required
      />
      <TextInput label="Año" source="year" required />
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
        <ReferenceInput reference="Subject" source="subjectId">
          <SelectInput label="Materia" optionText="name" validate={[required()]} />
        </ReferenceInput>
        <BooleanInput label="Activa" source="active" />
      </SimpleForm>
    </Edit>
  );
};
