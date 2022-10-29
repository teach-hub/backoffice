import {
    Create, Datagrid, Edit, EditButton, List, ReferenceField,
    ReferenceInput, SimpleForm, TextField, TextInput, useRecordContext
} from 'react-admin';

const PostTitle = () => {
    const record = useRecordContext();
    return <span>{record ? `Editar ${record.title}` : ''}</span>;
};

const postFilters = [
    <TextInput source="q" label="Buscar" alwaysOn />,
    <ReferenceInput source="userId" label="Usuario" reference="users" />
];

export const SubjectsList = () => (
    <List>
        <Datagrid>
            {
              // <TextField source="id" />
              // <ReferenceField source="userId" reference="users" />
            }
            <TextField source="code" />
            <TextField source="name" />
        </Datagrid>
    </List>
);

export const PostEdit = () => (
    <Edit title={<PostTitle />}>
        <SimpleForm>
            <TextInput disabled source="id"/>
            <ReferenceInput source="userId" reference="users" />
            <TextInput source="title" />
            <TextInput multiline source="body" />
        </SimpleForm>
    </Edit>
);

export const PostCreate = () => (
    <Create title="Nuevo Post">
        <SimpleForm>
            <ReferenceInput source="userId" reference="users" />
            <TextInput source="title" />
            <TextInput multiline source="body" />
        </SimpleForm>
    </Create>
);
