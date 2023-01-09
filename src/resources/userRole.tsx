import {
  BooleanInput,
  Create,
  Datagrid,
  Edit,
  EditButton,
  List,
  ReferenceField,
  ReferenceInput,
  SelectInput,
  SimpleForm,
  TextField,
  TextInput,
  FunctionField, BooleanField
} from 'react-admin';

export const ListUserRoles = () => {
  return (
    <List>
      <Datagrid>
        <TextField label="ID" source="id" />
        <ReferenceField label="Usuario" source="userId" reference="User">
          <FunctionField render={ (user: Record<any, any>) =>
              `${user.lastName}, ${user.name} (${user.file})`
          } />
        </ReferenceField>
        <ReferenceField label="Catedra" source="courseId" reference="Course">
          <TextField source="name" />
        </ReferenceField>
        <ReferenceField label="Rol" source="roleId" reference="Role">
          <TextField source="name" />
        </ReferenceField>
        <BooleanField label="Activa" source="active" />
        <EditButton />
      </Datagrid>
    </List>
  );
};

const userOptionRenderer = (user: Record<any, any>) => `${user.lastName}, ${user.name} (${user.file})`;


export const CreateUserRole = () => {
  return (
    <Create title="Nuevo rol de usuario">
      <SimpleForm>
        <ReferenceInput reference="User" source="userId">
          <SelectInput label="Usuario" optionText={userOptionRenderer} />
        </ReferenceInput>
        <ReferenceInput reference="Course" source="courseId">
          <SelectInput label="Catedra" optionText="name" />
        </ReferenceInput>
        <ReferenceInput reference="Role" source="roleId">
          <SelectInput label="Rol" optionText="name" />
        </ReferenceInput>
      </SimpleForm>
    </Create>
  )
};

export const EditUserRole = () => (
  <Edit>
    <SimpleForm>
      <TextInput disabled source="id" />
      <ReferenceInput reference="User" source="userId">
        <SelectInput label="Usuario" optionText={userOptionRenderer} />
      </ReferenceInput>
      <ReferenceInput reference="Course" source="courseId">
        <SelectInput label="Catedra" optionText="name" />
      </ReferenceInput>
      <ReferenceInput reference="Role" source="roleId">
        <SelectInput label="Rol" optionText="name" />
      </ReferenceInput>
      <BooleanInput label="Activo" source="active" />
    </SimpleForm>
  </Edit>
);
