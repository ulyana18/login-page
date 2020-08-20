async function callApi(route, email, password, name = '') {
  let isLogin = (route === 'login');
  let user;
  try {
    const response = await fetch(`/api/user/${route}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
          user: {
            name,
            email,
            password,
          }
      }),});
    const resultObj = await response.json();
    
    window.localStorage.setItem('userName', resultObj.user);
    window.localStorage.setItem('token', resultObj.token);
    window.localStorage.setItem('refreshToken', resultObj.refreshToken);
    ({ user } = resultObj);
    console.log(user);
  } catch(err) {
    isLogin ? alert('Incorrect login or password') : alert('This email is already in use!');
  }
    // .then(res => res.json())
    // .then(res => {
    //   window.localStorage.setItem('userName', res.user);
    //   window.localStorage.setItem('token', res.token);
    //   window.localStorage.setItem('refreshToken', res.refreshToken);
    //   console.log(res);
    //   ({ user } = res);
    //   console.log(user);
    // })
    // .catch(err => {
    //   isLogin ? alert('Incorrect login or password') : alert('This email is already in use!');
    // });
  console.log(user);
  return user;
}

export default callApi;
