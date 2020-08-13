module.exports = (route, email, password, name = '') => {
    fetch(`http://localhost:9000/api/user/${route}`, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({
          user: {
            name,
            email,
            password,
          }
      }),})
      .then(res => res.json())
      .then(res => {
        window.localStorage.setItem('userName', res.user);
        window.localStorage.setItem('token', res.token);
      })
      .catch(err => {
        route === 'login' ? alert('Incorrect login or password') : alert('This email is already in use!');
      });
  }
