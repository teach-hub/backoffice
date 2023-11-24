import {
  BooleanField,
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
import CustomEditToolbar from "../fields/CustomEditToolbar";

/*
 * XXX: Lista de permisos disponibles, tiene que coincidir
 * con lo que tenemos en el core service (esquema de roles).
 */

const ALL_PERMISSIONS = [
  { id: 'inviteUser', name: 'Invitar Usuarios' },
  { id: 'createAssignment', name: 'Crear Trabajo Práctico' },
  { id: 'editAssignment', name: 'Editar Trabajo Práctico' },
  { id: 'setOrganization', name: 'Configurar Organización de GitHub' },
  { id: 'setDescription', name: 'Configurar Descripción' },
  { id: 'viewCourseCharts', name: 'Ver Estadísticas' },
  { id: 'createRepository', name: 'Crear Repositorios' },
  { id: 'setReview', name: 'Realizar Correcciones' },
  { id: 'manageGroups', name: 'Gestionar Grupos' },
  { id: 'viewAllSubmissions', name: 'Ver todas las Entregas' },
  { id: 'assignReviewer', name: 'Asignar Correctores' },
  { id: 'sendNotifications', name: 'Enviar Notificaciones' },
  { id: 'submitAssignment', name: 'Realizar Entrega' },
  { id: 'manageOwnGroups', name: 'Gestionar propios Grupos' },
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
       <Datagrid bulkActionButtons={false}>  {/* Disable delete button through bulk actions */}
        <TextField label="ID" source="id" />
        <TextField label="Nombre" source="name" />
        <PermissionsField label="Permisos" />
        <BooleanField label="Rol de profesor" source="isTeacher" />
        <BooleanField label="Activo" source="active" />
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
        <CheckboxGroupInput source="permissions" choices={ALL_PERMISSIONS} label={"Permisos"}/>
        <BooleanInput label="Rol de profesor" source="isTeacher"/>
      </SimpleForm>
    </Create>
  )
};

export const EditRole = () => {
  const [parentRoleId, setParentRoleId] = useState(null);

  return (
    <Edit>
      <SimpleForm toolbar={<CustomEditToolbar />}>
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
        <CheckboxGroupInput source="permissions" choices={ALL_PERMISSIONS} label={"Permisos"}/>
        <BooleanInput label="Activo" source="active"/>
        <BooleanInput label="Rol de profesor" source="isTeacher"/>
      </SimpleForm>
    </Edit>
  );
}
