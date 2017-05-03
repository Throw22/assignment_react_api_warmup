import React, { Component } from 'react';
import App from '../components/App';
import serialize from 'form-serialize';

class AppContainer extends Component {
  constructor() {
    super();

    // Initialize users in state as an empty array and
    // set isFetching to false.
    this.state = {
      users: [],
      isFetching: false,
      error: null,
      isEditing: null
    };
  }

  componentDidMount() {
    // Before performing the fetch, set isFetching to true
    this.setState({ isFetching: true });

    // After component mounts, call the API to get the
    // users, then update state which triggers re-render.
    // Add a delay to the URL and reset isFetching upon
    // completion of the request.
    fetch('https://reqres.in/api/users?delay=1')
      .then(response => response.json())
      .then(json => {
        this.setState({
          users: json.data,
          isFetching: false
        });
      });
  }

  onAddUser = e => {
    e.preventDefault();

    const form = e.target;
    const body = serialize(form, { hash: true });

    // Create headers to set the content type to json
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    // Set options, and stringify the body to JSON
    const options = {
      headers,
      method: 'POST',
      body: JSON.stringify(body)
    };

    // Before performing the fetch, set isFetching to true
    this.setState({ isFetching: true });

    fetch('https://reqres.in/api/users', options)
      .then(response => {
        // If response not okay, throw an error
        if (!response.ok) {
          throw new Error(`${response.status} ${response.statusText}`);
        }

        // Otherwise, extract the response into json
        return response.json();
      })
      .then(json => {
        // Update the user list and isFetching.
        // Reset the form in a callback after state is set.
        this.setState(
          {
            isFetching: false,
            users: [...this.state.users, json]
          },
          () => {
            form.reset();
          }
        );
      })
      .catch(error => {
        // Set error in state & log to console
        console.log(error);
        this.setState({
          isFetching: false,
          error
        });
      });
  };

  onDeleteUser = e => {
    e.preventDefault();
    const userId = e.target.name;

    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    const options = {
      headers,
      method: 'DELETE'
    };

    this.setState({ isFetching: true });

    fetch(`https://reqres.in/api/users/${userId}`, options)
      .then(response => {
        if (!response.ok) {
          throw new Error(`${response.status} ${response.statusText}`);
        }

        let newUsers = this.state.users.filter(function(el) {
          return el.id != userId;
        });

        this.setState({
          isFetching: false,
          users: newUsers
        });
      })
      .catch(error => {
        console.log(error);
        this.setState({
          isFetching: false,
          error
        });
      });
  };

  onShowEdit = e => {
    if (this.state.isEditing == e.target.name) {
      this.setState({ isEditing: null });
    } else {
      const userId = e.target.name;
      this.setState({ isEditing: userId });
    }
  };

  onEditUser = e => {
    e.preventDefault();

    const form = e.target;
    const body = serialize(form, { hash: true });
    const userId = body.id;

    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    const options = {
      headers,
      method: 'PUT',
      body: JSON.stringify(body)
    };

    this.setState({ isFetching: true });

    fetch(`https://reqres.in/api/users/${userId}`, options)
      .then(response => {
        if (!response.ok) {
          throw new Error(`${response.status} ${response.statusText}`);
        }

        return response.json();
      })
      .then(json => {
        let newUsers = [];
        this.state.users.forEach(user => {
          if (user.id == userId) {
            newUsers.push(json);
          } else {
            newUsers.push(user);
          }
        });
        this.setState(
          {
            isFetching: false,
            users: newUsers,
            isEditing: null
          },
          () => {
            form.reset();
          }
        );
      })
      .catch(error => {
        console.log(error);
        this.setState({
          isFetching: false,
          error
        });
      });
  };

  render() {
    return (
      <App
        onAddUser={this.onAddUser}
        onDeleteUser={this.onDeleteUser}
        onShowEdit={this.onShowEdit}
        onEditUser={this.onEditUser}
        {...this.state}
      />
    );
  }
}

export default AppContainer;
