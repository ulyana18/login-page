(this["webpackJsonpauthorize-app"]=this["webpackJsonpauthorize-app"]||[]).push([[0],{129:function(e,t,a){e.exports=a(175)},134:function(e,t,a){},136:function(e,t,a){},142:function(e,t,a){},171:function(e,t){},175:function(e,t,a){"use strict";a.r(t);var s=a(0),n=a.n(s),i=a(10),r=a.n(i),o=(a(134),a(14)),l=a.n(o),c=a(18),u=a(25),m=a(26),d=a(29),h=a(27),p=(a(136),a(109)),g=a(11),f=a(215),E=a(224),S=a(212),w=a(79),v=a(228),b=a(217),C=a(216),k=a(40),N=a(231),I=a(226),y=a(227),M=a(229),A=a(213);function T(e,t,a){return O.apply(this,arguments)}function O(){return(O=Object(c.a)(l.a.mark((function e(t,a,s){var n,i,r,o,c=arguments;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=c.length>3&&void 0!==c[3]?c[3]:"",i="login"===t,e.prev=2,e.next=5,fetch("/api/user/".concat(t),{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({user:{name:n,email:a,password:s}})});case 5:return r=e.sent,e.next=8,r.json();case 8:if(o=e.sent,401!==r.status){e.next=15;break}return window.localStorage.removeItem("userName"),window.localStorage.removeItem("userEmail"),window.localStorage.removeItem("token"),window.localStorage.removeItem("refreshToken"),e.abrupt("return",!1);case 15:return window.localStorage.setItem("userName",o.user),window.localStorage.setItem("userEmail",o.email),window.localStorage.setItem("token",o.token),window.localStorage.setItem("refreshToken",o.refreshToken),e.abrupt("return",!0);case 22:e.prev=22,e.t0=e.catch(2),i?alert("Incorrect login or password"):alert("This email is already in use!");case 25:case"end":return e.stop()}}),e,null,[[2,22]])})))).apply(this,arguments)}function x(){return(x=Object(c.a)(l.a.mark((function e(){var t,a;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,fetch("/api/user/check",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({user:{accessToken:window.localStorage.getItem("token"),name:window.localStorage.getItem("userName"),email:window.localStorage.getItem("userEmail"),refreshToken:window.localStorage.getItem("refreshToken")}})});case 3:return t=e.sent,e.next=6,t.json();case 6:a=e.sent,401!==t.status&&window.localStorage.setItem("token",a.accessToken),e.next=13;break;case 10:e.prev=10,e.t0=e.catch(0),console.log("acces token died");case 13:case"end":return e.stop()}}),e,null,[[0,10]])})))).apply(this,arguments)}var D=function(e){Object(d.a)(a,e);var t=Object(h.a)(a);function a(e){var s;return Object(u.a)(this,a),(s=t.call(this,e)).detectAutofill=function(){try{var e=JSON.parse(s.emailRef.current.labels[0].dataset.shrink),t=JSON.parse(s.passwordRef.current.labels[0].dataset.shrink);e&&t&&s.setState({isDisabled:!1,isEmailEmpty:!1,isPasswordEmpty:!1})}catch(a){}},s.passwordCheck=function(e){s.passwordInput=e.target.value;var t=!/^(?!\s*$).+/.test(e.target.value);s.setState({isPasswordEmpty:t},(function(){this.checkSubmitDisable()}))},s.emailCheck=function(e){s.emailInput=e.target.value;var t=!/^(?!\s*$).+/.test(e.target.value);s.setState({isEmailEmpty:t},(function(){this.checkSubmitDisable()}))},s.checkSubmitDisable=function(){var e=!1===s.state.isPasswordEmpty&&!1===s.state.isEmailEmpty;s.setState({isDisabled:!e})},s.passwordInput="",s.emailInput="",s.state={isPasswordEmpty:null,isEmailEmpty:null,isDisabled:!0,isLoggedIn:null,isSpinning:!1},s.logIn=s.logIn.bind(Object(k.a)(s)),s.emailRef=n.a.createRef(),s.passwordRef=n.a.createRef(),s}return Object(m.a)(a,[{key:"logIn",value:function(){var e=Object(c.a)(l.a.mark((function e(){var t,a=this;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return this.setState({isSpinning:!0}),e.next=3,T("login",this.emailInput,this.passwordInput);case 3:t=e.sent,setTimeout((function(){a.setState({isLoggedIn:t,isSpinning:!1})}),500),setTimeout((function(){a.props.updateState({isAuth:t})}),2500);case 6:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"componentDidMount",value:function(){this.emailRef.current.value&&this.passwordRef.current.value&&(this.setState({isEmailEmpty:!1,isPasswordEmpty:!1}),this.checkSubmitDisable()),window.addEventListener("load",this.detectAutofill)}},{key:"render",value:function(){var e=this;return n.a.createElement("form",{className:"login-form",noValidate:!0,autoComplete:"on"},n.a.createElement(N.a,{open:this.state.isLoggedIn,autoHideDuration:3e3,onClose:function(){return e.setState({isLoggedIn:null})},anchorOrigin:{vertical:"top",horizontal:"center"}},n.a.createElement(M.a,{severity:"success"},"You are logged in!")),n.a.createElement(N.a,{open:!1===this.state.isLoggedIn,autoHideDuration:3e3,onClose:function(){return e.setState({isLoggedIn:null})},anchorOrigin:{vertical:"top",horizontal:"center"}},n.a.createElement(M.a,{severity:"error"},"Incorrect login or password!")),n.a.createElement(I.a,{required:!0,id:"email",label:"Email",type:"email",inputRef:this.emailRef,onChange:this.emailCheck}),n.a.createElement(I.a,{required:!0,id:"password",label:"Password",type:"password",autoComplete:"current-password",inputRef:this.passwordRef,onChange:this.passwordCheck}),n.a.createElement(y.a,{m:2},n.a.createElement(S.a,{disabled:this.state.isDisabled,onClick:this.logIn,className:"logInBtn",variant:"outlined"},this.state.isSpinning&&n.a.createElement(A.a,{size:17}),!this.state.isSpinning&&n.a.createElement("span",null,"Log In"))))}}]),a}(s.Component),j=a(214),P=a(232),B=a(76),R=a.n(B),F=function(e){Object(d.a)(a,e);var t=Object(h.a)(a);function a(e){var s;return Object(u.a)(this,a),(s=t.call(this,e)).nameCheck=function(e){if(s.nameInput=e.target.value,s.state.isFirstTime){var t=!s.regexpFirst.test(e.target.value);s.setState({isNotCorrectName:t},(function(){this.checkSubmitDisable()}))}else s.nameValidate()},s.emailCheck=function(e){if(s.emailInput=e.target.value,s.state.isFirstTime){var t=!s.regexpFirst.test(e.target.value);s.setState({isNotCorrectEmail:t},(function(){this.checkSubmitDisable()}))}else s.emailValidate()},s.passwordCheck=function(e){if(s.passwordInput=e.target.value,s.state.isFirstTime){var t=!s.regexpFirst.test(e.target.value);s.setState({isNotCorrectPassword:t},(function(){this.checkSubmitDisable()}))}else s.passwordValidate()},s.confirmPasswordCheck=function(e){if(s.confirmPasswordInput=e.target.value,s.state.isFirstTime){var t=!s.regexpFirst.test(e.target.value);s.setState({isNotCorrectConfirmPassword:t},(function(){this.checkSubmitDisable()}))}else s.confirmPasswordValidate()},s.nameValidate=function(){var e=/^[a-zA-Z]+$/.test(s.nameInput);s.setState({isNotCorrectName:!e},(function(){this.checkSubmitDisable()}))},s.emailValidate=function(){var e=/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(s.emailInput);s.setState({isNotCorrectEmail:!e},(function(){this.checkSubmitDisable()}))},s.passwordValidate=function(){var e=/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(s.passwordInput);s.setState({isNotCorrectPassword:!e},(function(){this.checkSubmitDisable()}))},s.confirmPasswordValidate=function(e){var t=s.confirmPasswordInput===s.passwordInput;s.setState({isNotCorrectConfirmPassword:!t},(function(){this.checkSubmitDisable()}))},s.checkSubmitDisable=function(){var e=!1===s.state.isNotCorrectName&&!1===s.state.isNotCorrectEmail&&!1===s.state.isNotCorrectPassword&&!1===s.state.isNotCorrectConfirmPassword;return s.setState({isDisabled:!e}),e},s.regexpFirst=/^(?!\s*$).+/,s.nameInput="",s.passwordInput="",s.emailInput="",s.confirmPasswordInput="",s.state={isNotCorrectName:null,isNotCorrectEmail:null,isNotCorrectPassword:null,isNotCorrectConfirmPassword:null,isDisabled:!0,isSignedUp:null,isSpinning:!1,isFirstTime:!0},s.signUp=s.signUp.bind(Object(k.a)(s)),s}return Object(m.a)(a,[{key:"signUp",value:function(){var e=Object(c.a)(l.a.mark((function e(){var t,a=this;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(this.nameValidate(),this.emailValidate(),this.passwordValidate(),this.confirmPasswordValidate(),!this.checkSubmitDisable()){e.next=14;break}return this.setState({isSpinning:!0,isFirstTime:!0}),e.next=9,T("signup",this.emailInput,this.passwordInput,this.nameInput);case 9:t=e.sent,setTimeout((function(){a.setState({isSignedUp:t,isSpinning:!1})}),500),setTimeout((function(){a.props.updateState({isAuth:t})}),2500),e.next=15;break;case 14:this.setState({isFirstTime:!1});case 15:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"render",value:function(){var e=this;return n.a.createElement("form",{className:"signup-form",noValidate:!0,autoComplete:"on"},n.a.createElement(N.a,{open:this.state.isSignedUp,autoHideDuration:3e3,onClose:function(){return e.setState({isSignedUp:null})},anchorOrigin:{vertical:"top",horizontal:"center"}},n.a.createElement(M.a,{severity:"success"},"You are signed up!")),n.a.createElement(N.a,{open:!1===this.state.isSignedUp,autoHideDuration:3e3,onClose:function(){return e.setState({isSignedUp:null})},anchorOrigin:{vertical:"top",horizontal:"center"}},n.a.createElement(M.a,{severity:"error"},"This email is already in use!")),n.a.createElement(I.a,{required:!0,error:this.state.isNotCorrectName&&!this.state.isFirstTime,id:"name",label:"Name",onChange:this.nameCheck,helperText:!(!this.state.isNotCorrectName||this.state.isFirstTime)&&"Use only alphabet characters"}),n.a.createElement(I.a,{required:!0,error:this.state.isNotCorrectEmail&&!this.state.isFirstTime,id:"email",label:"Email",type:"email",onChange:this.emailCheck,helperText:!(!this.state.isNotCorrectEmail||this.state.isFirstTime)&&"Incorrect email"}),n.a.createElement(I.a,{required:!0,error:this.state.isNotCorrectPassword&&!this.state.isFirstTime,id:"password",label:"Password",type:"password",autoComplete:"current-password",InputProps:{endAdornment:n.a.createElement(j.a,{position:"end"},n.a.createElement(P.a,{title:"Password must contain minimum 8 characters, at least 1 letter and 1 number"},n.a.createElement(R.a,null)))},onChange:this.passwordCheck,helperText:!(!this.state.isNotCorrectPassword||this.state.isFirstTime)&&"Password must contain minimum 8 characters, at least 1 letter and 1 number"}),n.a.createElement(I.a,{required:!0,error:this.state.isNotCorrectConfirmPassword&&!this.state.isFirstTime,id:"standard-password",label:"Confirm password",type:"password",InputProps:{endAdornment:n.a.createElement(j.a,{position:"end"},n.a.createElement(P.a,{title:"Password and confirm password must match"},n.a.createElement(R.a,null)))},onChange:this.confirmPasswordCheck,helperText:!(!this.state.isNotCorrectConfirmPassword||this.state.isFirstTime)&&"Password and confirm password don't match!"}),n.a.createElement(y.a,{m:2},n.a.createElement(S.a,{disabled:this.state.isDisabled,onClick:this.signUp,className:"signUpBtn",variant:"outlined",id:"signUpButton"},this.state.isSpinning&&n.a.createElement(A.a,{size:17}),!this.state.isSpinning&&n.a.createElement("span",null,"Sign Up"))))}}]),a}(s.Component),U=function(e){Object(d.a)(a,e);var t=Object(h.a)(a);function a(e){var s;return Object(u.a)(this,a),(s=t.call(this,e)).setAppState=function(){var e=Object(c.a)(l.a.mark((function e(t){var a;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:a=t.isAuth,s.setState({isAuthenticated:a}),s.props.updateState({isAuth:a});case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),s.state={value:"2"===localStorage.getItem("page")?localStorage.getItem("page"):"1",isAuthenticated:!1},s}return Object(m.a)(a,[{key:"handleChange",value:function(e,t){this.setState({value:t}),window.localStorage.setItem("page",t)}},{key:"render",value:function(){return n.a.createElement("div",{className:"tabWrapper"},n.a.createElement(w.a,{style:"backgroundColor: #cbecec",value:this.state.value},n.a.createElement(f.a,{position:"static"},n.a.createElement(v.a,{onChange:this.handleChange.bind(this),"aria-label":"simple tabs example"},n.a.createElement(C.a,{label:"Sign Up",value:"1"}),n.a.createElement(C.a,{label:"Log In",value:"2"}))),n.a.createElement(b.a,{value:"1"},n.a.createElement(F,{updateState:this.setAppState})),n.a.createElement(b.a,{value:"2"},n.a.createElement(D,{updateState:this.setAppState}))))}}]),a}(s.Component),z=a(110),V=(a(142),a(210)),L=a(111),W=a(234),H=a(233),$=a(221),q=a(222),J=a(218),Z=a(219),K=a(220),Y=a(223),_=a(108),G=a.n(_).a.connect("http://localhost:3000"),Q=function(e){Object(d.a)(a,e);var t=Object(h.a)(a);function a(e){var s;return Object(u.a)(this,a),(s=t.call(this,e)).scrollToRef=function(){var e=s.messagesArea.current.getBoundingClientRect().height;s.messagesArea.current.parentElement.scrollTo(0,e),s.chatHeight=e},s.scrollWithButton=function(){var e=s.messagesArea.current.parentElement.scrollTop;s.messagesArea.current.parentElement.clientHeight;if(s.chatHeight-e>=1e3){var t=s.scrollBtn.current.className.split(" ").filter((function(e,t,a){return"scrollBtn-hidden"!==e})).join(" ");s.scrollBtn.current.className=t}else s.scrollBtn.current.className.split(" ").includes("scrollBtn-hidden")||(s.scrollBtn.current.className=s.scrollBtn.current.className+" scrollBtn-hidden")},s.onMessageSubmit=function(){if(s.setState({isSend:!0}),""!==s.chatInput.current.value)if(null!==s.state.editElement){if(s.chatInput.current.value!==s.state.editElement.childNodes[1].innerText){var e=s.state.editElement.parentElement.dataset.id,t=s.chatInput.current.value;G.emit("edit message",t,e)}}else G.emit("chat message",s.chatInput.current.value,window.localStorage.getItem("userName"),window.localStorage.getItem("userEmail"));s.setState({message:"",editElement:null}),s.chatInput.current.value=""},s.checkUser=function(){s.props.updateState({isAuth:!1})},s.showContextMenu=function(e){e.preventDefault(),e.stopPropagation(),e.target.className.split(" ").includes("message")&&s.setState({anchorEl:e.target},(function(){this.state.anchorEl.className.split(" ").includes("myMessage")?this.setState({isMyMessage:!0}):this.setState({isMyMessage:!1})})),e.target.parentElement.className.split(" ").includes("message")&&s.setState({anchorEl:e.target.parentElement},(function(){this.state.anchorEl.className.split(" ").includes("myMessage")?this.setState({isMyMessage:!0}):this.setState({isMyMessage:!1})}))},s.preventShowContextMenu=function(e){return e.preventDefault(),!1},s.handleContextMenuClose=function(){s.setState({anchorEl:null})},s.handleDialogClose=function(){s.setState({isDialogOpen:!1,editElement:null})},s.handleKeyDown=function(e){"Enter"===e.key&&s.onMessageSubmit()},s.changeInput=function(e){s.setState({message:e.target.value})},s.editMessage=function(){var e=s.state.anchorEl;s.handleContextMenuClose();var t=e.innerText;setTimeout((function(){s.chatInput.current.focus()}),0),s.chatInput.current.value=t,s.setState({editElement:e,message:t})},s.showDeleteMessageDialog=function(){var e=s.state.anchorEl.parentElement;s.handleContextMenuClose(),s.setState({isDialogOpen:!0,editElement:e})},s.deleteMessage=function(){s.handleDialogClose(),G.emit("delete message",s.state.editElement.dataset.id)},s.copyText=function(){var e;e=""===window.getSelection().toString()?s.state.anchorEl.childNodes[1].innerText:window.getSelection().toString(),navigator.clipboard.writeText(e),s.handleContextMenuClose()},s.selectMessage=function(){var e=Object(c.a)(l.a.mark((function e(t){var a,n;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:s.state.isSelectionState?(t.target.className.split(" ").includes("message")&&(a=t.target,s.isSelectedMessage(a)),t.target.parentElement.className.split(" ").includes("message")&&(n=t.target.parentElement,s.isSelectedMessage(n)),0===s.selectedElements.length?s.setState({isSelectionState:!1}):s.setState({isSelectionState:!0})):(s.setState({isSelectionState:!0}),s.state.anchorEl.className=s.state.anchorEl.className+" selectedMessage",s.selectedElements.push(s.state.anchorEl.parentElement),s.handleContextMenuClose());case 1:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),s.isSelectedMessage=function(e){if(e.className.split(" ").includes("selectedMessage")){e.className=e.className.split(" ").filter((function(e,t,a){return"selectedMessage"!==e})).join(" ");var t=s.selectedElements.filter((function(t,a,s){return t.dataset.id!==e.parentElement.dataset.id}));s.selectedElements=t}else e.className=e.className+" selectedMessage",s.selectedElements.push(e.parentElement)},s.deleteSelectedMessages=function(){s.selectedElements.map((function(e,t,a){e.childNodes[0].className=e.childNodes[0].className.split(" ").filter((function(e,t,a){return"selectedMessage"!==e})).join(" ")}));s.selectedElements=[],s.setState({isSelectionState:!1})},s.state={message:"",chat:[],isSend:null,anchorEl:null,editElement:null,isDialogOpen:!1,isScrolledToTop:!1,isSelectionState:!1},s.isMyMessage=null,s.selectedElements=[],s.chatInput=n.a.createRef(),s.messagesArea=n.a.createRef(),s.scrollBtn=n.a.createRef(),s.userEmail="",s.chatHeight=0,s}return Object(m.a)(a,[{key:"componentDidMount",value:function(){var e=this;G.on("chat message",(function(t){var a=t.message,s=t.name,n=t.email,i=+e.state.chat[e.state.chat.length-1].messageid+1+"";e.setState({chat:[].concat(Object(z.a)(e.state.chat),[{message:a,name:s,email:n,messageid:i}])})})),G.on("get database",(function(t){var a=t.sort((function(e,t){return+e.messageid>+t.messageid?1:+e.messageid<+t.messageid?-1:0}));e.setState({chat:a})})),G.on("edit message",(function(t){for(var a=t.message,s=t.messageid,n=(t.is_edited,e.messagesArea.current.childNodes),i=0;n[i].dataset.id!==s;)i++;n[i].dataset.id===s&&(n[i].childNodes[0].childNodes[1].innerText=a,n[i].childNodes[0].childNodes[2].className="userEdited noselect")})),G.on("delete message",(function(t){var a=e.state.chat.filter((function(e,a,s){return e.messageid!==t}));e.setState({chat:a,editElement:null})})),G.emit("get database"),this.userEmail=localStorage.getItem("userEmail"),window.addEventListener("storage",this.checkUser)}},{key:"componentDidUpdate",value:function(){this.scrollToRef()}},{key:"renderChat",value:function(){var e=this;return this.state.chat.map((function(t,a){var s=t.message,i=t.name,r=t.email,o=t.messageid,l=t.is_edited;return n.a.createElement("div",{"data-id":o,className:r===window.localStorage.getItem("userEmail")?"messageWrapper messageWrapper-myMessage":"messageWrapper messageWrapper-otherMessage"},n.a.createElement("div",{className:r===window.localStorage.getItem("userEmail")?"myMessage message":"otherMessage message"},n.a.createElement("span",{className:"userName noselect"},i),n.a.createElement("span",{className:"userEmail",onContextMenu:e.preventShowContextMenu},s),n.a.createElement("span",{className:l?"userEdited noselect":"userNotEdited noselect"},"Edited")),n.a.createElement("div",{className:"messageAvatar"},n.a.createElement(J.a,null)))}))}},{key:"render",value:function(){return n.a.createElement("div",{className:"chatWrapper"},n.a.createElement("div",{className:"chat"},n.a.createElement("div",{className:"chatHeader"},!this.state.isSelectionState&&n.a.createElement("span",null,"Group Chat"),this.state.isSelectionState&&n.a.createElement("div",{className:"selectionArea"},n.a.createElement("span",{className:"selectedElemsCount"},"Selected items: ",this.selectedElements.length," "),n.a.createElement(V.a,{"aria-label":"delete",onClick:this.deleteSelectedMessages},n.a.createElement(Z.a,null)))),n.a.createElement("div",{className:"messagesAreaWrapper",onScroll:this.scrollWithButton},n.a.createElement("div",{className:"messagesArea",ref:this.messagesArea,onContextMenu:this.showContextMenu,onClick:!!this.state.isSelectionState&&this.selectMessage,onLoad:this.scrollToRef},this.renderChat()),n.a.createElement(V.a,{buttonRef:this.scrollBtn,className:"scrollButton scrollBtn-hidden",onClick:this.scrollToRef},n.a.createElement(K.a,null)),n.a.createElement(L.a,{id:"simple-menu",anchorEl:this.state.anchorEl,keepMounted:!0,open:this.state.anchorEl&&!this.state.isSelectionState,onClose:this.handleContextMenuClose,anchorOrigin:{vertical:"bottom",horizontal:"right"}},n.a.createElement(W.a,{onClick:this.copyText},"Copy Text"),!!this.state.isMyMessage&&n.a.createElement(W.a,{onClick:this.editMessage},"Edit Message"),!!this.state.isMyMessage&&n.a.createElement(W.a,{onClick:this.showDeleteMessageDialog},"Delete Message"),n.a.createElement(W.a,{onClick:this.selectMessage},"Select Message")),n.a.createElement(H.a,{open:this.state.isDialogOpen,onClose:this.handleDialogClose,"aria-labelledby":"alert-dialog-title","aria-describedby":"alert-dialog-description"},n.a.createElement($.a,{id:"alert-dialog-title"},"Are you sure you want to delete message?"),n.a.createElement(q.a,null,n.a.createElement(S.a,{onClick:this.deleteMessage,color:"primary"},"Yes, delete"),n.a.createElement(S.a,{onClick:this.handleDialogClose,color:"primary",autoFocus:!0},"No")))),n.a.createElement("div",{className:"inputArea"},n.a.createElement(I.a,{id:"standard-full-width",placeholder:"Write a message...",margin:"normal",variant:"outlined",InputLabelProps:{shrink:!0},inputRef:this.chatInput,onKeyDown:this.handleKeyDown,onChange:this.changeInput}),""!==this.state.message&&n.a.createElement(V.a,{"aria-label":"send",className:"sendBtn",onClick:this.onMessageSubmit},n.a.createElement(Y.a,null)))))}}]),a}(s.Component),X=function(e){Object(d.a)(a,e);var t=Object(h.a)(a);function a(e){var s;return Object(u.a)(this,a),(s=t.call(this,e)).checkToken=function(){return function(){return x.apply(this,arguments)}()},s.setAppState=function(){var e=Object(c.a)(l.a.mark((function e(t){var a;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:(a=t.isAuth)?(s.setState({isAuth:a}),window.localStorage.setItem("isAuth",a)):s.logOut();case 2:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),s.logOut=function(){window.localStorage.removeItem("userName"),window.localStorage.removeItem("userEmail"),window.localStorage.removeItem("token"),window.localStorage.removeItem("refreshToken"),window.localStorage.setItem("isAuth",!1),s.setState({isAuth:!1})},s.componentDidMount=function(){s.setState({isAuth:window.localStorage.getItem("isAuth")||!1})},s.state={isAuth:!1},s}return Object(m.a)(a,[{key:"render",value:function(){var e=this;return n.a.createElement("div",{className:"App"},n.a.createElement(f.a,{position:"static"},n.a.createElement(E.a,null,("true"===this.state.isAuth||!0===this.state.isAuth)&&n.a.createElement(S.a,{className:"checkTokenBtn",variant:"contained",onClick:this.checkToken},"Refresh Access Token"),("true"===this.state.isAuth||!0===this.state.isAuth)&&n.a.createElement(S.a,{className:"logOutBtn",color:"inherit",onClick:this.logOut},"Log out"))),n.a.createElement(p.a,null,"true"===this.state.isAuth||!0===this.state.isAuth?n.a.createElement(g.a,{to:"/chat"}):n.a.createElement(g.a,{to:"/signup"}),n.a.createElement(g.d,null,n.a.createElement(g.b,{path:"/signup",component:function(){return n.a.createElement(U,{updateState:e.setAppState})}}),n.a.createElement(g.b,{path:"/chat",component:function(){return"true"===e.state.isAuth||!0===e.state.isAuth?n.a.createElement(Q,{updateState:e.setAppState}):n.a.createElement(U,{updateState:e.setAppState})}}),n.a.createElement(g.b,{component:function(){return"true"===e.state.isAuth||!0===e.state.isAuth?n.a.createElement(Q,{updateState:e.setAppState}):n.a.createElement(U,{updateState:e.setAppState})}}))))}}]),a}(s.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));r.a.render(n.a.createElement(n.a.StrictMode,null,n.a.createElement(X,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[129,1,2]]]);
//# sourceMappingURL=main.2951098a.chunk.js.map