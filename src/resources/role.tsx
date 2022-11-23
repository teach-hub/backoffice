import {
  Create,
  Datagrid,
  List,
  Edit,
  SimpleForm,
  useRecordContext,
  TextField,
  TextInput,
  EditButton,
  ReferenceField,
  ReferenceInput,
  SelectInput,
  BooleanInput
} from 'react-admin';

/*
 * XXX: Lista de permisos disponibles, tiene que coincidir
 * con lo que tenemos en el core service (esquema de roles).
 */

const ALL_PERMISSIONS = [
  { id: 'view_home', name: 'Ver home' },
  { id: 'view_user', name: 'Ver perfil de usuario' },
  { id: 'edit_user', name: 'Editar usuario' },
  { id: 'edit_subject', name: 'Editar materia' }
]

export const ListRoles = () => (

  <List>
    <Datagrid>
      <TextField label="ID" source="id" />
      <TextField label="Nombre" source="name" />
      <TextField label="Permisos" source="permissions" />
      <ReferenceField label="Hereda de" source="parentRoleId" reference="Role">
        <TextField source="name" />
      </ReferenceField>
      <EditButton />
    </Datagrid>
  </List>
);

export const CreateRole = () => {

  const record = useRecordContext();

  console.log(record);

  return (
    <Create title="Nuevo rol">
      <SimpleForm>
        <TextInput required label="Nombre" source="name" />
        <ReferenceInput reference="Role" source="parentRoleId">
          <SelectInput label="Hereda de" optionText="name" />
        </ReferenceInput>
        <SelectInput
          choices={ALL_PERMISSIONS} label="Permisos" source="permissions" required
        />
      </SimpleForm>
    </Create>
  )
};

export const EditRole = () => (
  <Edit>
    <SimpleForm>
      <TextInput disabled source="id" />
      <TextInput required label="Permisos" source="permissions" />
      <TextInput required label="Nombre" source="name" />
      <ReferenceInput reference="Role" source="parentRoleId">
        <SelectInput label="Hereda de" optionText="name" />
      </ReferenceInput>
      <SelectInput
        choices={ALL_PERMISSIONS} label="Permisos" source="permissions" required
      />
      <BooleanInput label="Activo" source="active" />
    </SimpleForm>
  </Edit>
);
