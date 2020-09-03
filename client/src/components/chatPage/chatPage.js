import React, { Component } from 'react';
import './chatPage.css';
import { TextField, Button, IconButton, Menu, MenuItem, Dialog, DialogTitle, DialogActions } from '@material-ui/core';
import { Send, Person } from '@material-ui/icons';
import io from 'socket.io-client';

// const socket = io.connect('https://login-page-ulyana18.herokuapp.com/');
const socket = io.connect('http://localhost:3000');



class ChatPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: '',
            chat: [],
            isSend: null,
            anchorEl: null,
            editElement: null,
            isDialogOpen: false,
        }
        this.coordX = 0;
        this.coordY = 0;
        this.chatInput = React.createRef();
        this.messagesArea = React.createRef();
        this.isMyMessage = null;
    }

    componentDidMount() {
        
        socket.on('chat message', ({ message, name, email, messageid }) => {
          this.setState({
            chat: [...this.state.chat, { message, name, email, messageid }]
          });
        });
        socket.on('get database', (database) => {
            let sortedResult = database.sort(function(a, b) { 
                if (+a.messageid > +b.messageid) { 
                  return 1; } 
                if (+a.messageid < +b.messageid) { 
                  return -1; } 
                return 0; 
            });
            this.setState({
                chat: sortedResult
            });
        });
        socket.on('edit message', ({ message, messageid }) => {
            // this.setState({
            //     chat: database
            // });
            this.messagesArea.current.childNodes[messageid - 1].childNodes[0].childNodes[1].innerText = message;
        });
        socket.emit('get database');
    }

    onMessageSubmit = () => {
        this.setState({ isSend: true });
        if(this.chatInput.current.value !== '') {
            if(this.state.editElement !== null) {
                if(this.chatInput.current.value !== this.state.message) {
                    const id = this.state.editElement.parentElement.dataset.id;
                    const editedMessage = this.chatInput.current.value;

                    socket.emit('edit message', editedMessage, id);
                }

            } else socket.emit('chat message', this.chatInput.current.value, window.localStorage.getItem('userName'), window.localStorage.getItem('userEmail'));
        }
        this.setState({ message: '', editElement: null });
        this.chatInput.current.value = '';
    };

    showContextMenu = (event) => {
        event.preventDefault();
        event.stopPropagation();


        if(event.target.className.split(' ').includes('message')) {
            this.setState({ anchorEl: event.target }, function() {
                if(this.state.anchorEl.className.split(' ').includes('myMessage')) {
                    this.setState({ isMyMessage: true });
                } else this.setState({ isMyMessage: false });
    
            });
            // event.target.className = event.target.className + ' selectedMessage';
        }
        if(event.target.parentElement.className.split(' ').includes('message')) {
            this.setState({ anchorEl: event.target.parentElement }, function() {
                if(this.state.anchorEl.className.split(' ').includes('myMessage')) {
                    this.setState({ isMyMessage: true });
                } else this.setState({ isMyMessage: false });
    
            });
        }
        
    }
    preventShowContextMenu = (event) => {
        event.preventDefault();
        return false;
    }

    handleContextMenuClose = () => {
        this.setState({ anchorEl: null });
    }

    handleDialogClose = () => {
        this.setState({ isDialogOpen: false });
    }


    renderChat() {
        const { chat } = this.state;
        return chat.map(({ message, name, email, messageid }, idx) => (
            <div data-id={messageid} className={ email === window.localStorage.getItem('userEmail') ? 'messageWrapper messageWrapper-myMessage' : 'messageWrapper messageWrapper-otherMessage' }>
                <div className= { email === window.localStorage.getItem('userEmail') ? 'myMessage message' : 'otherMessage message' }>
                    <span className='userName' >{name}</span>
                    <span className='userEmail' onContextMenu={ this.preventShowContextMenu } >{message}</span>
                    {/* <span className='sendTime'>{sendDate}</span> */}
                </div>
                <div className='messageAvatar'>
                    <Person />
                </div>
            </div>
      
        ));
    };


    handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            this.onMessageSubmit();
        }
    }

    changeInput = (event) => {
        this.setState({ message: event.target.value });
    }

    editMessage = () => {
        const elem = this.state.anchorEl;
        this.handleContextMenuClose();
        const previousData = elem.innerText;

        setTimeout(() => {
            this.chatInput.current.focus();
        }, 0);
        this.chatInput.current.value = previousData;
        this.setState({ editElement: elem, message: previousData });

    }

    deleteMessage = () => {
        const elem = this.state.anchorEl;
        this.handleContextMenuClose();
        const previousData = elem.innerText;

        this.setState({ isDialogOpen: true });
    }

    // checkMessageOwner = () => {
    //     console.log(this.state.anchorEl);
    //     if(this.state.anchorEl !== null) return this.state.anchorEl.className.split(' ').includes('myMessage');
    // }

    render() {
        return (
            <div className='chatWrapper'>
                <div className='chat'>
                    <div className='chatHeader'>
                        <span>Group Chat</span>
                    </div>
                    <div className='messagesAreaWrapper'>
                        <div className='messagesArea' ref={ this.messagesArea } onContextMenu={ this.showContextMenu } >
                            {this.renderChat()}
                        </div>

                        <Menu
                            id="simple-menu"
                            anchorEl={ this.state.anchorEl }
                            keepMounted
                            open={ this.state.anchorEl }
                            onClose={ this.handleContextMenuClose }
                            anchorOrigin={ { vertical: 'bottom', horizontal: 'right' } }
                            // anchorPosition={ {top: 200, left: 200} }
                        >
                            <MenuItem >Copy Text</MenuItem>
                            { this.state.isMyMessage ? <MenuItem onClick={ this.editMessage } >Edit Message</MenuItem> : false }
                            { this.state.isMyMessage ? <MenuItem onClick={ this.deleteMessage } >Delete Message</MenuItem> : false }
                            <MenuItem >Select Message</MenuItem>
                        </Menu>

                        <Dialog
                            open={ this.state.isDialogOpen }
                            onClose={ this.handleDialogClose }
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                        >
                            <DialogTitle id="alert-dialog-title">Are you sure you want to delete message?</DialogTitle>
                            <DialogActions>
                            <Button onClick={ this.handleDialogClose } color="primary">
                                Yes, delete
                            </Button>
                            <Button onClick={ this.handleDialogClose } color="primary" autoFocus>
                                No
                            </Button>
                            </DialogActions>
                        </Dialog>
                    </div>
                    <div className='inputArea'>
                        <TextField
                            id='standard-full-width'
                            placeholder='Write a message...'
                            margin='normal'
                            variant='outlined'
                            InputLabelProps={{
                                shrink: true,
                            }}
                            inputRef={this.chatInput}
                            onKeyDown={ this.handleKeyDown }
                            onChange={this.changeInput}
                        />
                        { this.state.message !== '' ? <IconButton aria-label='send' 
                            onClick={this.onMessageSubmit}
                        >
                            <Send />
                        </IconButton> : false }
                    </div>
                </div>
            </div>
        );
    }
}

export default ChatPage;
