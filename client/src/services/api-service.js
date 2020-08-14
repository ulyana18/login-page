module.exports = (route, email, password, name = '') => {
  let isLogin = (route === 'login'); 
    fetch(`/api/user/${route}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
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
        isLogin ? alert('Incorrect login or password') : alert('This email is already in use!');
      });
  }
