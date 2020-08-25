export async function callApi (route, email, password, name = '') {
  let isLogin = (route === 'login');
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
    window.localStorage.setItem('userEmail', resultObj.email);
    window.localStorage.setItem('token', resultObj.token);
    window.localStorage.setItem('refreshToken', resultObj.refreshToken);

  } catch(err) {
    isLogin ? alert('Incorrect login or password') : alert('This email is already in use!');
  }
}

export async function callApiCheckToken () {
  try {
    const response = await fetch(`/api/user/check`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        user: {
          accessToken: window.localStorage.getItem('token'),
          name: window.localStorage.getItem('userName'),
          email: window.localStorage.getItem('userEmail'),
          refreshToken: window.localStorage.getItem('refreshToken'),
        }
    }),});
    const resultObj = await response.json();
    window.localStorage.setItem('token', resultObj.accessToken);

  } catch(err) {
    alert(err);
  }

}

// const ApiService = {
//   callApi,
//   callApiCheckToken,
// };

// module.exports = ApiService;
// export default {
//   callApi,
//   callApiCheckToken,
// };
// export default callApi;
// module.exports = {
//   callApi,
//   callApiCheckToken,
// };
// export default {
//   callApi,
//   callApiCheckToken,
// };
  
