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
import CustomEditToolbar from "../fields/CustomEditToolbar";

export const ListUserRoles = () => {
  return (
    <List>
      <Datagrid bulkActionButtons={false}>  {/* Disable delete button through bulk actions */}
        <TextField label="ID" source="id" />
        <ReferenceField label="Usuario" source="userId" reference="User">
          <FunctionField render={ (user: Record<any, any>) =>
              `${user.lastName}, ${user.name} (${user.file})`
          } />
        </ReferenceField>
        <ReferenceField label="Curso" source="courseId" reference="Course">
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
          <SelectInput required label="Usuario" optionText={userOptionRenderer} />
        </ReferenceInput>
        <ReferenceInput reference="Course" source="courseId">
          <SelectInput required label="Curso" optionText="name" />
        </ReferenceInput>
        <ReferenceInput reference="Role" source="roleId">
          <SelectInput required label="Rol" optionText="name" />
        </ReferenceInput>
        <BooleanInput label="Activo" source="active" defaultValue={true}/>
      </SimpleForm>
    </Create>
  )
};

export const EditUserRole = () => (
  <Edit>
    <SimpleForm toolbar={<CustomEditToolbar />}>
      <TextInput disabled source="id" />
      <ReferenceInput reference="User" source="userId">
        <SelectInput required label="Usuario" optionText={userOptionRenderer} />
      </ReferenceInput>
      <ReferenceInput reference="Course" source="courseId">
        <SelectInput required label="Curso" optionText="name" />
      </ReferenceInput>
      <ReferenceInput reference="Role" source="roleId">
        <SelectInput required label="Rol" optionText="name" />
      </ReferenceInput>
      <BooleanInput label="Activo" source="active" />
    </SimpleForm>
  </Edit>
);
