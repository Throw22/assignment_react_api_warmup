export function findUser(users, id) {
  if (id == null) return { first_name: '', last_name: '', avatar: '' };

  for (let i = 0; i < users.length; i++) {
    if (users[i].id == id) {
      return users[i];
      break;
    }
  }
}
