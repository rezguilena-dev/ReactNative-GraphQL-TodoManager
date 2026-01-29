import API_URL from "./apiUrl.js"

const DELETE_USER = `
mutation DeleteUser($where:UserWhere!) {
  deleteUsers(where: $where) {
    nodesDeleted
  }
}`

export function deleteUser(username, token) {
  return fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'authorization': 'Bearer ' + token
    },
    body: JSON.stringify({
      query: DELETE_USER,
      variables: {
        "where": {
          "username": username
        }
      }
    })
  })
  .then(response => response.json())
  .then(jsonResponse => {
    if (jsonResponse.errors != null) throw jsonResponse.errors[0];
    return  jsonResponse.data.deleteUsers.nodesDeleted > 0;
  })
  .catch(error => {
    console.log('error API', error.message);
    throw error;
  });
}