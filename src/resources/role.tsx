import {
  BooleanInput,
  CheckboxGroupInput,
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
  useRecordContext,
} from 'react-admin';
import {useState} from "react";

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

const PermissionsField = (_ :{ label: string }) => {
  const record = useRecordContext();

  if (!record) return null;

  const permissionNames = record.permissions.map((p: string) =>
    ALL_PERMISSIONS.find(x => x.id === p)?.name);

  return (permissionNames.sort().join(', '))
}

export const ListRoles = () => {
  return (
    <List>
      <Datagrid>
        <TextField label="ID" source="id" />
        <TextField label="Nombre" source="name" />
        <PermissionsField label="Permisos" />
        <ReferenceField label="Hereda de" source="parentRoleId" reference="Role">
        <TextField source="name" />
        </ReferenceField>
        <EditButton />
      </Datagrid>
    </List>
  );
};

export const CreateRole = () => {
  const [parentRoleId, setParentRoleId] = useState(null);

  return (
    <Create title="Nuevo rol" >
      <SimpleForm>
        <TextInput required label="Nombre" source="name" />
        <ReferenceInput reference="Role" source="parentRoleId" >
          <SelectInput
            label="Hereda de"
            optionText="name"
            defaultValue={parentRoleId}
            onChange={value => setParentRoleId(value)}
          />
        </ReferenceInput>
        <CheckboxGroupInput source="permissions" choices={ALL_PERMISSIONS} />
      </SimpleForm>
    </Create>
  )
};

export const EditRole = () => {
  const [parentRoleId, setParentRoleId] = useState(null);

  return (
    <Edit>
      <SimpleForm>
        <TextInput disabled source="id"/>
        <TextInput required label="Nombre" source="name"/>
        <ReferenceInput reference="Role" source="parentRoleId">
          <SelectInput
            label="Hereda de"
            optionText="name"
            defaultValue={parentRoleId}
            onChange={value => setParentRoleId(value)}
          />
        </ReferenceInput>
        <CheckboxGroupInput source="permissions" choices={ALL_PERMISSIONS}/>
        <BooleanInput label="Activo" source="active"/>
      </SimpleForm>
    </Edit>
  );
}
