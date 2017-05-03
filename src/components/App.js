import React from 'react';
import JumbotronFluid from './elements/JumbotronFluid';
import UserList from './UserList';
import UserForm from './UserForm';

const App = (
  {
    users,
    isFetching,
    error,
    onAddUser,
    onDeleteUser,
    onEditUser,
    onShowEdit,
    isEditing
  }
) => (
  <div className="App">
    <JumbotronFluid
      heading="User CRUD"
      lead="Using an API for User CRUD operations in React Applications"
    />

    <UserList
      users={users}
      isFetching={isFetching}
      onDeleteUser={onDeleteUser}
      onShowEdit={onShowEdit}
    />
    <br />

    {isEditing
      ? <UserForm
          users={users}
          isEditing={isEditing}
          header="Edit"
          onSubmit={onEditUser}
          error={error}
        />
      : null}

    <UserForm header="Create new" onSubmit={onAddUser} error={error} />

  </div>
);

export default App;
