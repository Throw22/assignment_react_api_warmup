import React from 'react';
import Input from './elements/Input';
import InputGroup from './elements/InputGroup';
import Button from './elements/Button';
import Alert from './elements/Alert';
import Showable from './elements/Showable';
import { findUser } from '../helpers/userHelper';

const UserForm = ({ onSubmit, error, header, isEditing, users }) => {
  //helper function
  //returns object with user info
  let user = findUser(users, isEditing);

  return (
    <form className="container" onSubmit={onSubmit}>
      <h1>{header} User</h1>
      <Showable show={error}>
        <Alert type="danger">
          Oops, there was a problem...
        </Alert>
      </Showable>
      <InputGroup
        name="first_name"
        labelText="First Name"
        value={user.first_name}
      >
        <Input name="first_name" />
      </InputGroup>
      <InputGroup name="last_name" labelText="Last Name" value={user.last_name}>
        <Input name="last_name" />
      </InputGroup>
      <InputGroup name="avatar" labelText="Photo Link" value={user.avatar}>
        <Input name="avatar" />
      </InputGroup>
      <Button type="submit" color="primary">{header} User</Button>
    </form>
  );
};

export default UserForm;
