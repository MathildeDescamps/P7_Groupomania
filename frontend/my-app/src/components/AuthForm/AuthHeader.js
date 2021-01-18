export default function authHeader() {
  const user = JSON.parse(sessionStorage.getItem('currentUser'));

  if (user && user.token) {
    // for Node.js Express back-end
    return { Authorization: 'Bearer ' + user.token }
  } else {
    return {};
  }
}