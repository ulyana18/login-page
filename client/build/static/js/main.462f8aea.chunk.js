(this["webpackJsonpauthorize-app"]=this["webpackJsonpauthorize-app"]||[]).push([[0],{129:function(e,t,a){e.exports=a(175)},134:function(e,t,a){},136:function(e,t,a){},142:function(e,t,a){},171:function(e,t){},175:function(e,t,a){"use strict";a.r(t);var s=a(0),n=a.n(s),i=a(10),r=a.n(i),o=(a(134),a(16)),l=a.n(o),c=a(22),u=a(25),m=a(26),h=a(29),d=a(27),p=(a(136),a(109)),g=a(11),f=a(215),E=a(222),v=a(212),w=a(79),S=a(226),b=a(217),C=a(216),k=a(39),I=a(229),N=a(224),y=a(225),M=a(227),T=a(213);function x(e,t,a){return A.apply(this,arguments)}function A(){return(A=Object(c.a)(l.a.mark((function e(t,a,s){var n,i,r,o,c=arguments;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=c.length>3&&void 0!==c[3]?c[3]:"",i="login"===t,e.prev=2,e.next=5,fetch("/api/user/".concat(t),{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({user:{name:n,email:a,password:s}})});case 5:return r=e.sent,e.next=8,r.json();case 8:if(o=e.sent,401!==r.status){e.next=15;break}return window.localStorage.removeItem("userName"),window.localStorage.removeItem("userEmail"),window.localStorage.removeItem("token"),window.localStorage.removeItem("refreshToken"),e.abrupt("return",!1);case 15:return window.localStorage.setItem("userName",o.user),window.localStorage.setItem("userEmail",o.email),window.localStorage.setItem("token",o.token),window.localStorage.setItem("refreshToken",o.refreshToken),e.abrupt("return",!0);case 22:e.prev=22,e.t0=e.catch(2),i?alert("Incorrect login or password"):alert("This email is already in use!");case 25:case"end":return e.stop()}}),e,null,[[2,22]])})))).apply(this,arguments)}function O(){return(O=Object(c.a)(l.a.mark((function e(){var t,a;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,fetch("/api/user/check",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({user:{accessToken:window.localStorage.getItem("token"),name:window.localStorage.getItem("userName"),email:window.localStorage.getItem("userEmail"),refreshToken:window.localStorage.getItem("refreshToken")}})});case 3:return t=e.sent,e.next=6,t.json();case 6:a=e.sent,401!==t.status&&window.localStorage.setItem("token",a.accessToken),e.next=13;break;case 10:e.prev=10,e.t0=e.catch(0),console.log("acces token died");case 13:case"end":return e.stop()}}),e,null,[[0,10]])})))).apply(this,arguments)}var D=function(e){Object(h.a)(a,e);var t=Object(d.a)(a);function a(e){var s;return Object(u.a)(this,a),(s=t.call(this,e)).passwordCheck=function(e){s.passwordInput=e.target.value;var t=!/^(?!\s*$).+/.test(e.target.value);s.setState({isPasswordEmpty:t},(function(){this.checkSubmitDisable()}))},s.emailCheck=function(e){s.emailInput=e.target.value;var t=!/^(?!\s*$).+/.test(e.target.value);s.setState({isEmailEmpty:t},(function(){this.checkSubmitDisable()}))},s.checkSubmitDisable=function(){var e=!1===s.state.isPasswordEmpty&&!1===s.state.isEmailEmpty;s.setState({isDisabled:!e})},s.passwordInput="",s.emailInput="",s.state={isPasswordEmpty:null,isEmailEmpty:null,isDisabled:!0,isLoggedIn:null,isSpinning:!1},s.logIn=s.logIn.bind(Object(k.a)(s)),s}return Object(m.a)(a,[{key:"logIn",value:function(){var e=Object(c.a)(l.a.mark((function e(){var t,a=this;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return this.setState({isSpinning:!0}),e.next=3,x("login",this.emailInput,this.passwordInput);case 3:t=e.sent,console.log(t),setTimeout((function(){a.setState({isLoggedIn:t,isSpinning:!1})}),500),setTimeout((function(){a.props.updateState({isAuth:t})}),1200);case 7:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"render",value:function(){var e=this;return n.a.createElement("form",{className:"login-form",noValidate:!0,autoComplete:"on"},n.a.createElement(I.a,{open:this.state.isLoggedIn,autoHideDuration:3e3,onClose:function(){return e.setState({isLoggedIn:null})},anchorOrigin:{vertical:"top",horizontal:"center"}},n.a.createElement(M.a,{severity:"success"},"You are logged in!")),n.a.createElement(I.a,{open:!1===this.state.isLoggedIn,autoHideDuration:3e3,onClose:function(){return e.setState({isLoggedIn:null})},anchorOrigin:{vertical:"top",horizontal:"center"}},n.a.createElement(M.a,{severity:"error"},"Incorrect login or password!")),n.a.createElement(N.a,{required:!0,id:"email",label:"Email",type:"email",onChange:this.emailCheck}),n.a.createElement(N.a,{required:!0,id:"password",label:"Password",type:"password",autoComplete:"current-password",onChange:this.passwordCheck}),n.a.createElement(y.a,{m:2},n.a.createElement(v.a,{disabled:this.state.isDisabled,onClick:this.logIn,className:"logInBtn",variant:"outlined"},this.state.isSpinning&&n.a.createElement(T.a,{size:20}),!this.state.isSpinning&&n.a.createElement("span",null,"Log In"))))}}]),a}(s.Component),P=a(214),j=a(230),F=a(76),U=a.n(F),z=function(e){Object(h.a)(a,e);var t=Object(d.a)(a);function a(e){var s;return Object(u.a)(this,a),(s=t.call(this,e)).nameCheck=function(e){if(s.nameInput=e.target.value,s.state.isFirstTime){var t=!s.regexpFirst.test(e.target.value);s.setState({isNotCorrectName:t},(function(){this.checkSubmitDisable()}))}else s.nameValidate()},s.emailCheck=function(e){if(s.emailInput=e.target.value,s.state.isFirstTime){var t=!s.regexpFirst.test(e.target.value);s.setState({isNotCorrectEmail:t},(function(){this.checkSubmitDisable()}))}else s.emailValidate()},s.passwordCheck=function(e){if(s.passwordInput=e.target.value,s.state.isFirstTime){var t=!s.regexpFirst.test(e.target.value);s.setState({isNotCorrectPassword:t},(function(){this.checkSubmitDisable()}))}else s.passwordValidate()},s.confirmPasswordCheck=function(e){if(s.confirmPasswordInput=e.target.value,s.state.isFirstTime){var t=!s.regexpFirst.test(e.target.value);s.setState({isNotCorrectConfirmPassword:t},(function(){this.checkSubmitDisable()}))}else s.confirmPasswordValidate()},s.nameValidate=function(){var e=/^[a-zA-Z]+$/.test(s.nameInput);s.setState({isNotCorrectName:!e},(function(){this.checkSubmitDisable()}))},s.emailValidate=function(){var e=/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(s.emailInput);s.setState({isNotCorrectEmail:!e},(function(){this.checkSubmitDisable()}))},s.passwordValidate=function(){var e=/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(s.passwordInput);s.setState({isNotCorrectPassword:!e},(function(){this.checkSubmitDisable()}))},s.confirmPasswordValidate=function(e){var t=s.confirmPasswordInput===s.passwordInput;s.setState({isNotCorrectConfirmPassword:!t},(function(){this.checkSubmitDisable()}))},s.checkSubmitDisable=function(){var e=!1===s.state.isNotCorrectName&&!1===s.state.isNotCorrectEmail&&!1===s.state.isNotCorrectPassword&&!1===s.state.isNotCorrectConfirmPassword;return s.setState({isDisabled:!e}),e},s.regexpFirst=/^(?!\s*$).+/,s.nameInput="",s.passwordInput="",s.emailInput="",s.confirmPasswordInput="",s.state={isNotCorrectName:null,isNotCorrectEmail:null,isNotCorrectPassword:null,isNotCorrectConfirmPassword:null,isDisabled:!0,isSignedUp:null,isSpinning:!1,isFirstTime:!0},s.signUp=s.signUp.bind(Object(k.a)(s)),s}return Object(m.a)(a,[{key:"signUp",value:function(){var e=Object(c.a)(l.a.mark((function e(){var t,a=this;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(this.nameValidate(),this.emailValidate(),this.passwordValidate(),this.confirmPasswordValidate(),!this.checkSubmitDisable()){e.next=14;break}return this.setState({isSpinning:!0,isFirstTime:!0}),e.next=9,x("signup",this.emailInput,this.passwordInput,this.nameInput);case 9:t=e.sent,setTimeout((function(){a.setState({isSignedUp:t,isSpinning:!1})}),500),setTimeout((function(){a.props.updateState({isAuth:t})}),1200),e.next=15;break;case 14:this.setState({isFirstTime:!1});case 15:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"render",value:function(){var e=this;return n.a.createElement("form",{className:"signup-form",noValidate:!0,autoComplete:"on"},n.a.createElement(I.a,{open:this.state.isSignedUp,autoHideDuration:3e3,onClose:function(){return e.setState({isSignedUp:null})},anchorOrigin:{vertical:"top",horizontal:"center"}},n.a.createElement(M.a,{severity:"success"},"You are signed up!")),n.a.createElement(I.a,{open:!1===this.state.isSignedUp,autoHideDuration:3e3,onClose:function(){return e.setState({isSignedUp:null})},anchorOrigin:{vertical:"top",horizontal:"center"}},n.a.createElement(M.a,{severity:"error"},"This email is already in use!")),n.a.createElement(N.a,{required:!0,error:this.state.isNotCorrectName&&!this.state.isFirstTime,id:"name",label:"Name",onChange:this.nameCheck,helperText:!(!this.state.isNotCorrectName||this.state.isFirstTime)&&"Use only alphabet characters"}),n.a.createElement(N.a,{required:!0,error:this.state.isNotCorrectEmail&&!this.state.isFirstTime,id:"email",label:"Email",type:"email",onChange:this.emailCheck,helperText:!(!this.state.isNotCorrectEmail||this.state.isFirstTime)&&"Incorrect email"}),n.a.createElement(N.a,{required:!0,error:this.state.isNotCorrectPassword&&!this.state.isFirstTime,id:"password",label:"Password",type:"password",autoComplete:"current-password",InputProps:{endAdornment:n.a.createElement(P.a,{position:"end"},n.a.createElement(j.a,{title:"Password must contain minimum 8 characters, at least 1 letter and 1 number"},n.a.createElement(U.a,null)))},onChange:this.passwordCheck,helperText:!(!this.state.isNotCorrectPassword||this.state.isFirstTime)&&"Password must contain minimum 8 characters, at least 1 letter and 1 number"}),n.a.createElement(N.a,{required:!0,error:this.state.isNotCorrectConfirmPassword&&!this.state.isFirstTime,id:"standard-password",label:"Confirm password",type:"password",InputProps:{endAdornment:n.a.createElement(P.a,{position:"end"},n.a.createElement(j.a,{title:"Password and confirm password must match"},n.a.createElement(U.a,null)))},onChange:this.confirmPasswordCheck,helperText:!(!this.state.isNotCorrectConfirmPassword||this.state.isFirstTime)&&"Password and confirm password don't match!"}),n.a.createElement(y.a,{m:2},n.a.createElement(v.a,{disabled:this.state.isDisabled,onClick:this.signUp,className:"signUpBtn",variant:"outlined",id:"signUpButton"},this.state.isSpinning&&n.a.createElement(T.a,{size:20}),!this.state.isSpinning&&n.a.createElement("span",null,"Sign Up"))))}}]),a}(s.Component),V=function(e){Object(h.a)(a,e);var t=Object(d.a)(a);function a(e){var s;return Object(u.a)(this,a),(s=t.call(this,e)).setAppState=function(){var e=Object(c.a)(l.a.mark((function e(t){var a;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:console.log(t),a=t.isAuth,s.setState({isAuthenticated:a}),s.props.updateState({isAuth:a});case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),s.state={value:localStorage.getItem("page")?localStorage.getItem("page"):"1",isAuthenticated:!1},s}return Object(m.a)(a,[{key:"handleChange",value:function(e,t){this.setState({value:t}),window.localStorage.setItem("page",t)}},{key:"render",value:function(){return n.a.createElement("div",{className:"tabWrapper"},n.a.createElement(w.a,{style:"backgroundColor: #cbecec",value:this.state.value},n.a.createElement(f.a,{position:"static"},n.a.createElement(S.a,{onChange:this.handleChange.bind(this),"aria-label":"simple tabs example"},n.a.createElement(C.a,{label:"Sign Up",value:"1"}),n.a.createElement(C.a,{label:"Log In",value:"2"}))),n.a.createElement(b.a,{value:"1"},n.a.createElement(z,{updateState:this.setAppState})),n.a.createElement(b.a,{value:"2"},n.a.createElement(D,{updateState:this.setAppState}))))}}]),a}(s.Component),L=a(110),W=(a(142),a(111)),$=a(232),q=a(231),B=a(219),H=a(220),Z=a(210),J=a(218),R=a(221),Y=a(108),K=a.n(Y).a.connect("https://login-page-ulyana18.herokuapp.com/"),G=function(e){Object(h.a)(a,e);var t=Object(d.a)(a);function a(e){var s;return Object(u.a)(this,a),(s=t.call(this,e)).onMessageSubmit=function(){if(s.setState({isSend:!0}),""!==s.chatInput.current.value)if(null!==s.state.editElement){if(s.chatInput.current.value!==s.state.editElement.childNodes[1].innerText){var e=s.state.editElement.parentElement.dataset.id,t=s.chatInput.current.value;K.emit("edit message",t,e)}}else K.emit("chat message",s.chatInput.current.value,window.localStorage.getItem("userName"),window.localStorage.getItem("userEmail"));s.setState({message:"",editElement:null}),s.chatInput.current.value=""},s.showContextMenu=function(e){e.preventDefault(),e.stopPropagation(),e.target.className.split(" ").includes("message")&&s.setState({anchorEl:e.target},(function(){this.state.anchorEl.className.split(" ").includes("myMessage")?this.setState({isMyMessage:!0}):this.setState({isMyMessage:!1})})),e.target.parentElement.className.split(" ").includes("message")&&s.setState({anchorEl:e.target.parentElement},(function(){this.state.anchorEl.className.split(" ").includes("myMessage")?this.setState({isMyMessage:!0}):this.setState({isMyMessage:!1})}))},s.preventShowContextMenu=function(e){return e.preventDefault(),!1},s.handleContextMenuClose=function(){s.setState({anchorEl:null})},s.handleDialogClose=function(){s.setState({isDialogOpen:!1})},s.handleKeyDown=function(e){"Enter"===e.key&&s.onMessageSubmit()},s.changeInput=function(e){s.setState({message:e.target.value})},s.editMessage=function(){var e=s.state.anchorEl;s.handleContextMenuClose();var t=e.innerText;setTimeout((function(){s.chatInput.current.focus()}),0),s.chatInput.current.value=t,s.setState({editElement:e,message:t})},s.showDeleteMessage=function(){var e=s.state.anchorEl.parentElement;s.handleContextMenuClose(),s.setState({isDialogOpen:!0,editElement:e})},s.deleteMessage=function(){s.handleDialogClose(),K.emit("delete message",s.state.editElement.dataset.id)},s.copyText=function(){var e=s.state.anchorEl.childNodes[1].innerText;navigator.clipboard.writeText(e),s.handleContextMenuClose()},s.selectMessage=function(e){if(s.state.isSelectionState){if(e.target.className.split(" ").includes("message")){var t=e.target;t.className=t.className+" selectedMessage",s.selectedElements.push(t.parentElement)}if(e.target.parentElement.className.split(" ").includes("message")){var a=e.target.parentElement;a.className=a.className+" selectedMessage",s.selectedElements.push(a.parentElement)}}else s.setState({isSelectionState:!0}),s.state.anchorEl.className=s.state.anchorEl.className+" selectedMessage",s.selectedElements.push(s.state.anchorEl.parentElement),s.handleContextMenuClose();console.log(s.selectedElements)},s.state={message:"",chat:[],isSend:null,anchorEl:null,editElement:null,isDialogOpen:!1,isSelectionState:!1},s.coordX=0,s.coordY=0,s.chatInput=n.a.createRef(),s.messagesArea=n.a.createRef(),s.isMyMessage=null,s.selectedElements=[],s}return Object(m.a)(a,[{key:"componentDidMount",value:function(){var e=this;K.on("chat message",(function(t){var a=t.message,s=t.name,n=t.email,i=+e.state.chat[e.state.chat.length-1].messageid+1;e.setState({chat:[].concat(Object(L.a)(e.state.chat),[{message:a,name:s,email:n,messageid:i}])})})),K.on("get database",(function(t){var a=t.sort((function(e,t){return+e.messageid>+t.messageid?1:+e.messageid<+t.messageid?-1:0}));e.setState({chat:a})})),K.on("edit message",(function(t){var a=t.message,s=t.messageid;e.messagesArea.current.childNodes[s-1].childNodes[0].childNodes[1].innerText=a})),K.on("delete message",(function(t){var a=e.state.chat.filter((function(e,a,s){return e.messageid!==t||(a,!1)}));e.setState({chat:a})})),K.emit("get database")}},{key:"renderChat",value:function(){var e=this;return this.state.chat.map((function(t,a){var s=t.message,i=t.name,r=t.email,o=t.messageid;return n.a.createElement("div",{"data-id":o,className:r===window.localStorage.getItem("userEmail")?"messageWrapper messageWrapper-myMessage":"messageWrapper messageWrapper-otherMessage"},n.a.createElement("div",{className:r===window.localStorage.getItem("userEmail")?"myMessage message":"otherMessage message"},n.a.createElement("span",{className:"userName noselect"},i),n.a.createElement("span",{className:"userEmail noselect",onContextMenu:e.preventShowContextMenu},s)),n.a.createElement("div",{className:"messageAvatar"},n.a.createElement(J.a,null)))}))}},{key:"render",value:function(){return n.a.createElement("div",{className:"chatWrapper"},n.a.createElement("div",{className:"chat"},n.a.createElement("div",{className:"chatHeader"},n.a.createElement("span",null,"Group Chat")),n.a.createElement("div",{className:"messagesAreaWrapper"},n.a.createElement("div",{className:"messagesArea",ref:this.messagesArea,onContextMenu:this.showContextMenu,onClick:!!this.state.isSelectionState&&this.selectMessage},this.renderChat()),n.a.createElement(W.a,{id:"simple-menu",anchorEl:this.state.anchorEl,keepMounted:!0,open:this.state.anchorEl,onClose:this.handleContextMenuClose,anchorOrigin:{vertical:"bottom",horizontal:"right"}},n.a.createElement($.a,{onClick:this.copyText},"Copy Text"),!!this.state.isMyMessage&&n.a.createElement($.a,{onClick:this.editMessage},"Edit Message"),!!this.state.isMyMessage&&n.a.createElement($.a,{onClick:this.showDeleteMessage},"Delete Message"),n.a.createElement($.a,null,"Select Message")),n.a.createElement(q.a,{open:this.state.isDialogOpen,onClose:this.handleDialogClose,"aria-labelledby":"alert-dialog-title","aria-describedby":"alert-dialog-description"},n.a.createElement(B.a,{id:"alert-dialog-title"},"Are you sure you want to delete message?"),n.a.createElement(H.a,null,n.a.createElement(v.a,{onClick:this.deleteMessage,color:"primary"},"Yes, delete"),n.a.createElement(v.a,{onClick:this.handleDialogClose,color:"primary",autoFocus:!0},"No")))),n.a.createElement("div",{className:"inputArea"},n.a.createElement(N.a,{id:"standard-full-width",placeholder:"Write a message...",margin:"normal",variant:"outlined",InputLabelProps:{shrink:!0},inputRef:this.chatInput,onKeyDown:this.handleKeyDown,onChange:this.changeInput}),""!==this.state.message&&n.a.createElement(Z.a,{"aria-label":"send",onClick:this.onMessageSubmit},n.a.createElement(R.a,null)))))}}]),a}(s.Component),X=function(e){Object(h.a)(a,e);var t=Object(d.a)(a);function a(e){var s;return Object(u.a)(this,a),(s=t.call(this,e)).checkToken=function(){return function(){return O.apply(this,arguments)}()},s.setAppState=function(){var e=Object(c.a)(l.a.mark((function e(t){var a;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:a=t.isAuth,s.setState({isAuth:a}),window.localStorage.setItem("isAuth",a);case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),s.logOut=function(){window.localStorage.removeItem("userName"),window.localStorage.removeItem("userEmail"),window.localStorage.removeItem("token"),window.localStorage.removeItem("refreshToken"),window.localStorage.setItem("isAuth",!1),s.setState({isAuth:!1})},s.componentDidMount=function(){s.setState({isAuth:window.localStorage.getItem("isAuth")||!1})},s.state={isAuth:!1},s}return Object(m.a)(a,[{key:"render",value:function(){var e=this;return n.a.createElement("div",{className:"App"},n.a.createElement(f.a,{position:"static"},n.a.createElement(E.a,null,n.a.createElement(v.a,{className:"checkTokenBtn",variant:"contained",onClick:this.checkToken},"Refresh Access Token"),("true"===this.state.isAuth||!0===this.state.isAuth)&&n.a.createElement(v.a,{color:"inherit",onClick:this.logOut},"Log out"))),n.a.createElement(p.a,null,"true"===this.state.isAuth||!0===this.state.isAuth?n.a.createElement(g.a,{to:"/chat"}):n.a.createElement(g.a,{to:"/signup"}),n.a.createElement(g.d,null,n.a.createElement(g.b,{path:"/signup",component:function(){return n.a.createElement(V,{updateState:e.setAppState})}}),n.a.createElement(g.b,{path:"/chat",component:function(){return"true"===e.state.isAuth||!0===e.state.isAuth?n.a.createElement(G,null):n.a.createElement(V,{updateState:e.setAppState})}}),n.a.createElement(g.b,{component:function(){return"true"===e.state.isAuth||!0===e.state.isAuth?n.a.createElement(G,null):n.a.createElement(V,{updateState:e.setAppState})}}))))}}]),a}(s.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));r.a.render(n.a.createElement(n.a.StrictMode,null,n.a.createElement(X,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[129,1,2]]]);
//# sourceMappingURL=main.462f8aea.chunk.js.map