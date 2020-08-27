(this["webpackJsonpauthorize-app"]=this["webpackJsonpauthorize-app"]||[]).push([[0],{82:function(e,t,a){e.exports=a(95)},87:function(e,t,a){},88:function(e,t,a){},95:function(e,t,a){"use strict";a.r(t);var n=a(0),s=a.n(n),r=a(10),i=a.n(r),o=(a(87),a(27)),c=a(28),l=a(34),u=a(33),m=(a(88),a(53)),p=a(136),d=a(132),h=a(128),g=a(130),f=a(131),w=a(16),v=a.n(w),b=a(25),S=a(29),C=a(139),k=a(133),E=a(135),I=a(137),N=a(129);function y(e,t,a){return T.apply(this,arguments)}function T(){return(T=Object(b.a)(v.a.mark((function e(t,a,n){var s,r,i,o,c=arguments;return v.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return s=c.length>3&&void 0!==c[3]?c[3]:"",r="login"===t,e.prev=2,e.next=5,fetch("/api/user/".concat(t),{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({user:{name:s,email:a,password:n}})});case 5:return i=e.sent,e.next=8,i.json();case 8:if(o=e.sent,401!==i.status){e.next=15;break}return window.localStorage.removeItem("userName"),window.localStorage.removeItem("userEmail"),window.localStorage.removeItem("token"),window.localStorage.removeItem("refreshToken"),e.abrupt("return",!1);case 15:return window.localStorage.setItem("userName",o.user),window.localStorage.setItem("userEmail",o.email),window.localStorage.setItem("token",o.token),window.localStorage.setItem("refreshToken",o.refreshToken),e.abrupt("return",!0);case 22:e.prev=22,e.t0=e.catch(2),r?alert("Incorrect login or password"):alert("This email is already in use!");case 25:case"end":return e.stop()}}),e,null,[[2,22]])})))).apply(this,arguments)}function P(){return(P=Object(b.a)(v.a.mark((function e(){var t,a;return v.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,fetch("/api/user/check",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({user:{accessToken:window.localStorage.getItem("token"),name:window.localStorage.getItem("userName"),email:window.localStorage.getItem("userEmail"),refreshToken:window.localStorage.getItem("refreshToken")}})});case 3:return t=e.sent,e.next=6,t.json();case 6:a=e.sent,401!==t.status&&window.localStorage.setItem("token",a.accessToken),e.next=13;break;case 10:e.prev=10,e.t0=e.catch(0),console.log("acces token died");case 13:case"end":return e.stop()}}),e,null,[[0,10]])})))).apply(this,arguments)}var x=function(e){Object(l.a)(a,e);var t=Object(u.a)(a);function a(e){var n;return Object(o.a)(this,a),(n=t.call(this,e)).passwordCheck=function(e){n.passwordInput=e.target.value;var t=!/^(?!\s*$).+/.test(e.target.value);n.setState({isPasswordEmpty:t},(function(){this.checkSubmitDisable()}))},n.emailCheck=function(e){n.emailInput=e.target.value;var t=!/^(?!\s*$).+/.test(e.target.value);n.setState({isEmailEmpty:t},(function(){this.checkSubmitDisable()}))},n.checkSubmitDisable=function(){var e=!1===n.state.isPasswordEmpty&&!1===n.state.isEmailEmpty;n.setState({isDisabled:!e})},n.passwordInput="",n.emailInput="",n.state={isPasswordEmpty:null,isEmailEmpty:null,isDisabled:!0,isLoggedIn:null,isSpinning:!1},n.logIn=n.logIn.bind(Object(S.a)(n)),n}return Object(c.a)(a,[{key:"logIn",value:function(){var e=Object(b.a)(v.a.mark((function e(){var t,a=this;return v.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return this.setState({isSpinning:!0}),e.next=3,y("login",this.emailInput,this.passwordInput);case 3:t=e.sent,setTimeout((function(){a.setState({isLoggedIn:t,isSpinning:!1})}),500);case 5:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"render",value:function(){var e=this;return s.a.createElement("form",{className:"login-form",noValidate:!0,autoComplete:"on"},s.a.createElement(C.a,{open:this.state.isLoggedIn,autoHideDuration:3e3,onClose:function(){return e.setState({isLoggedIn:null})},anchorOrigin:{vertical:"top",horizontal:"center"}},s.a.createElement(I.a,{severity:"success"},"You are logged in!")),s.a.createElement(C.a,{open:!1===this.state.isLoggedIn,autoHideDuration:3e3,onClose:function(){return e.setState({isLoggedIn:null})},anchorOrigin:{vertical:"top",horizontal:"center"}},s.a.createElement(I.a,{severity:"error"},"Incorrect login or password!")),s.a.createElement(k.a,{required:!0,id:"email",label:"Email",type:"email",onChange:this.emailCheck}),s.a.createElement(k.a,{required:!0,id:"password",label:"Password",type:"password",autoComplete:"current-password",onChange:this.passwordCheck}),s.a.createElement(E.a,{m:2},s.a.createElement(h.a,{disabled:this.state.isDisabled,onClick:this.logIn,className:"logInBtn",variant:"outlined"},this.state.isSpinning&&s.a.createElement(N.a,{size:20}),!this.state.isSpinning&&s.a.createElement("span",null,"Log In"))))}}]),a}(n.Component),O=a(141),D=a(140),j=a(52),F=a.n(j),U=function(e){Object(l.a)(a,e);var t=Object(u.a)(a);function a(e){var n;return Object(o.a)(this,a),(n=t.call(this,e)).nameCheck=function(e){if(n.nameInput=e.target.value,n.state.isFirstTime){var t=!n.regexpFirst.test(e.target.value);n.setState({isNotCorrectName:t},(function(){this.checkSubmitDisable()}))}else n.nameValidate()},n.emailCheck=function(e){if(n.emailInput=e.target.value,n.state.isFirstTime){var t=!n.regexpFirst.test(e.target.value);n.setState({isNotCorrectEmail:t},(function(){this.checkSubmitDisable()}))}else n.emailValidate()},n.passwordCheck=function(e){if(n.passwordInput=e.target.value,n.state.isFirstTime){var t=!n.regexpFirst.test(e.target.value);n.setState({isNotCorrectPassword:t},(function(){this.checkSubmitDisable()}))}else n.passwordValidate()},n.confirmPasswordCheck=function(e){if(n.confirmPasswordInput=e.target.value,n.state.isFirstTime){var t=!n.regexpFirst.test(e.target.value);n.setState({isNotCorrectConfirmPassword:t},(function(){this.checkSubmitDisable()}))}else n.confirmPasswordValidate()},n.nameValidate=function(){var e=/^[a-zA-Z]+$/.test(n.nameInput);n.setState({isNotCorrectName:!e},(function(){this.checkSubmitDisable()}))},n.emailValidate=function(){var e=/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(n.emailInput);n.setState({isNotCorrectEmail:!e},(function(){this.checkSubmitDisable()}))},n.passwordValidate=function(){var e=/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(n.passwordInput);n.setState({isNotCorrectPassword:!e},(function(){this.checkSubmitDisable()}))},n.confirmPasswordValidate=function(e){var t=n.confirmPasswordInput===n.passwordInput;n.setState({isNotCorrectConfirmPassword:!t},(function(){this.checkSubmitDisable()}))},n.checkSubmitDisable=function(){var e=!1===n.state.isNotCorrectName&&!1===n.state.isNotCorrectEmail&&!1===n.state.isNotCorrectPassword&&!1===n.state.isNotCorrectConfirmPassword;return n.setState({isDisabled:!e}),e},n.regexpFirst=/^(?!\s*$).+/,n.nameInput="",n.passwordInput="",n.emailInput="",n.confirmPasswordInput="",n.state={isNotCorrectName:null,isNotCorrectEmail:null,isNotCorrectPassword:null,isNotCorrectConfirmPassword:null,isDisabled:!0,isSignedUp:null,isSpinning:!1,isFirstTime:!0},n.signUp=n.signUp.bind(Object(S.a)(n)),n}return Object(c.a)(a,[{key:"signUp",value:function(){var e=Object(b.a)(v.a.mark((function e(){var t,a=this;return v.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.nameValidate();case 2:return e.next=4,this.emailValidate();case 4:return e.next=6,this.passwordValidate();case 6:return e.next=8,this.confirmPasswordValidate();case 8:return e.next=10,this.checkSubmitDisable();case 10:if(!e.sent){e.next=19;break}return this.setState({isSpinning:!0,isFirstTime:!0}),e.next=15,y("signup",this.emailInput,this.passwordInput,this.nameInput);case 15:t=e.sent,setTimeout((function(){a.setState({isSignedUp:t,isSpinning:!1})}),500),e.next=20;break;case 19:this.setState({isFirstTime:!1});case 20:console.log(this.state);case 21:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"render",value:function(){var e=this;return s.a.createElement("form",{className:"signup-form",noValidate:!0,autoComplete:"on"},s.a.createElement(C.a,{open:this.state.isSignedUp,autoHideDuration:3e3,onClose:function(){return e.setState({isSignedUp:null})},anchorOrigin:{vertical:"top",horizontal:"center"}},s.a.createElement(I.a,{severity:"success"},"You are signed up!")),s.a.createElement(C.a,{open:!1===this.state.isSignedUp,autoHideDuration:3e3,onClose:function(){return e.setState({isSignedUp:null})},anchorOrigin:{vertical:"top",horizontal:"center"}},s.a.createElement(I.a,{severity:"error"},"This email is already in use!")),s.a.createElement(k.a,{required:!0,error:this.state.isNotCorrectName&&!this.state.isFirstTime,id:"name",label:"Name",onChange:this.nameCheck,helperText:!(!this.state.isNotCorrectName||this.state.isFirstTime)&&"Use only alphabet characters"}),s.a.createElement(k.a,{required:!0,error:this.state.isNotCorrectEmail&&!this.state.isFirstTime,id:"email",label:"Email",type:"email",onChange:this.emailCheck,helperText:!(!this.state.isNotCorrectEmail||this.state.isFirstTime)&&"Incorrect email"}),s.a.createElement(k.a,{required:!0,error:this.state.isNotCorrectPassword&&!this.state.isFirstTime,id:"password",label:"Password",type:"password",autoComplete:"current-password",InputProps:{endAdornment:s.a.createElement(O.a,{position:"end"},s.a.createElement(D.a,{title:"Password must contain minimum 8 characters, at least 1 letter and 1 number"},s.a.createElement(F.a,null)))},onChange:this.passwordCheck,helperText:!(!this.state.isNotCorrectPassword||this.state.isFirstTime)&&"Password must contain minimum 8 characters, at least 1 letter and 1 number"}),s.a.createElement(k.a,{required:!0,error:this.state.isNotCorrectConfirmPassword&&!this.state.isFirstTime,id:"standard-password",label:"Confirm password",type:"password",InputProps:{endAdornment:s.a.createElement(O.a,{position:"end"},s.a.createElement(D.a,{title:"Password and confirm password must match"},s.a.createElement(F.a,null)))},onChange:this.confirmPasswordCheck,helperText:!(!this.state.isNotCorrectConfirmPassword||this.state.isFirstTime)&&"Password and confirm password don't match!"}),s.a.createElement(E.a,{m:2},s.a.createElement(h.a,{disabled:this.state.isDisabled,onClick:this.signUp,className:"signUpBtn",variant:"outlined"},this.state.isSpinning&&s.a.createElement(N.a,{size:20}),!this.state.isSpinning&&s.a.createElement("span",null,"Sign Up"))))}}]),a}(n.Component),V=function(e){Object(l.a)(a,e);var t=Object(u.a)(a);function a(e){var n;return Object(o.a)(this,a),(n=t.call(this,e)).checkToken=function(){return function(){return P.apply(this,arguments)}()},n.state={value:localStorage.getItem("page")?localStorage.getItem("page"):"1"},n}return Object(c.a)(a,[{key:"handleChange",value:function(e,t){this.setState({value:t}),window.localStorage.setItem("page",t)}},{key:"render",value:function(){return s.a.createElement("div",{className:"App"},s.a.createElement(h.a,{className:"checkTokenBtn",variant:"contained",onClick:this.checkToken},"Refresh Access Token"),s.a.createElement("div",{className:"tabWrapper"},s.a.createElement(m.a,{style:"backgroundColor: #cbecec",value:this.state.value},s.a.createElement(g.a,{position:"static"},s.a.createElement(p.a,{onChange:this.handleChange.bind(this),"aria-label":"simple tabs example"},s.a.createElement(f.a,{label:"Sign Up",value:"1"}),s.a.createElement(f.a,{label:"Log In",value:"2"}))),s.a.createElement(d.a,{value:"1"},s.a.createElement(U,null)),s.a.createElement(d.a,{value:"2"},s.a.createElement(x,null)))))}}]),a}(n.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(s.a.createElement(s.a.StrictMode,null,s.a.createElement(V,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[82,1,2]]]);
//# sourceMappingURL=main.c9cb951a.chunk.js.map