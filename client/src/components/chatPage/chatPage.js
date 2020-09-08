import React, { Component } from 'react';
import 'components/chatPage/chatPage.css';
import { TextField, Button, IconButton, Menu, MenuItem, Dialog, DialogTitle, DialogActions } from '@material-ui/core';
import { Send, Close, Person, ArrowDownward } from '@material-ui/icons';
import io from 'socket.io-client';
const socket = io.connect(process.env.IO_CONNECT_LINK_FRONT);


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
            isScrolledToTop: false,
            isSelectionState: false,
        }
        this.isMyMessage = null;
        this.selectedElements = [];
        this.chatInput = React.createRef();
        this.messagesArea = React.createRef();
        this.scrollBtn = React.createRef();
        this.userEmail = '';
        this.chatHeight = 0;
    }

    componentDidMount() {
        socket.on('chat message', ({ message, name, email }) => {
            const messageid = (+this.state.chat[this.state.chat.length - 1].messageid + 1) + '';
            this.setState({
                chat: [...this.state.chat, { message, name, email, messageid }]
            }, () => { this.scrollToRef(); });

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
            }, () => { this.scrollToRef(); });

        });
        socket.on('edit message', ({ message, messageid, is_edited }) => {
            const arr = this.messagesArea.current.childNodes;
            let i = 0;
            while (arr[i].dataset.id !== messageid) i++;

            if (arr[i].dataset.id === messageid) {
                arr[i].childNodes[0].childNodes[1].innerText = message;
                arr[i].childNodes[0].childNodes[2].className = 'userEdited noselect';
            }
        });
        socket.on('delete message', (messageid) => {
            const filteredArray = this.state.chat.filter(function(item, index, arr) {
                if (item.messageid !== messageid) return true;
                return false;
            });
            this.setState({ chat: filteredArray, editElement: null });
        });

        socket.emit('get database');

        this.userEmail = localStorage.getItem('userEmail');
        window.addEventListener('storage', this.checkUser);
    }


    scrollToRef = () => {
        const height = this.messagesArea.current.getBoundingClientRect().height;
        this.messagesArea.current.parentElement.scrollTo(0, height);
        this.chatHeight = height;
    }

    scrollWithButton = () => {
        const scrollHeight = this.messagesArea.current.parentElement.scrollTop;

        if (this.chatHeight - scrollHeight >= 1000) {
            const newClassNames = this.scrollBtn.current.className.split(' ').filter((item, index, arr) => item !== 'scrollBtn-hidden').join(' ');
            this.scrollBtn.current.className = newClassNames;
        } else {

            if(!this.scrollBtn.current.className.split(' ').includes('scrollBtn-hidden')) {
                this.scrollBtn.current.className = this.scrollBtn.current.className + ' scrollBtn-hidden';
            }
        }
    }

    onMessageSubmit = () => {
        this.setState({ isSend: true });
        if (this.chatInput.current.value !== '') {
            if (this.state.editElement !== null) {
                if (this.chatInput.current.value !== this.state.editElement.childNodes[1].innerText) {
                    const id = this.state.editElement.parentElement.dataset.id;
                    const editedMessage = this.chatInput.current.value;
                    socket.emit('edit message', editedMessage, id);
                }

            } else socket.emit('chat message', this.chatInput.current.value, localStorage.getItem('userName'), localStorage.getItem('userEmail'));
        }
        this.setState({ message: '', editElement: null });
        this.chatInput.current.value = '';
    };

    checkUser = () => {
        this.props.updateState({ isAuth: false });
    }

    showContextMenu = (event) => {
        event.preventDefault();
        event.stopPropagation();

        if (event.target.className.split(' ').includes('message')) {
            this.setState({ anchorEl: event.target }, function() {
                if (this.state.anchorEl.className.split(' ').includes('myMessage')) {
                    this.setState({ isMyMessage: true });
                } else this.setState({ isMyMessage: false });
    
            });

        }
        if (event.target.parentElement.className.split(' ').includes('message')) {
            this.setState({ anchorEl: event.target.parentElement }, function() {
                if (this.state.anchorEl.className.split(' ').includes('myMessage')) {
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
        this.setState({ isDialogOpen: false, editElement: null });
    }

    handleKeyDown = (event) => {
        if (event.key === 'Enter') this.onMessageSubmit();
    }

    changeInput = (event) => {
        this.setState({ message: event.target.value });
    }

    renderChat() {
        const { chat } = this.state;
        return chat.map(({ message, name, email, messageid, is_edited }, idx) => (
            <div data-id={ messageid } className={ email === localStorage.getItem('userEmail') ?
                'messageWrapper messageWrapper-myMessage' 
                : 'messageWrapper messageWrapper-otherMessage' }
            >
                <div className= { email === localStorage.getItem('userEmail') ?
                    'myMessage message' 
                    : 'otherMessage message' }
                >
                    <span className='userName noselect' >{ name }</span>
                    <span className='userEmail' onContextMenu={ this.preventShowContextMenu } >{ message }</span>

                    <span className= { is_edited ? 'userEdited noselect' : 'userNotEdited noselect' }>Edited</span>
                    {/* <span className='sendTime'>{sendDate}</span> */}
                </div>
                <div className='messageAvatar'>
                    <Person />
                </div>
            </div>
        ));
    };


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

    showDeleteMessageDialog = () => {
        const elem = this.state.anchorEl.parentElement;
        this.handleContextMenuClose();

        this.setState({ isDialogOpen: true, editElement: elem });
    }

    deleteMessage = () => {
        this.handleDialogClose();
        socket.emit('delete message', this.state.editElement.dataset.id);
    }

    copyText = () => {
        let text;
        if (window.getSelection().toString() === '') text = this.state.anchorEl.childNodes[1].innerText;
        else text = window.getSelection().toString();
        navigator.clipboard.writeText(text);
        this.handleContextMenuClose();
    }

    selectMessage = async (event) => {

        if (!this.state.isSelectionState) {
            this.setState({ isSelectionState: true });
            this.state.anchorEl.className = this.state.anchorEl.className + ' selectedMessage';

            this.selectedElements.push(this.state.anchorEl.parentElement);
            this.handleContextMenuClose();

        } else {
            if (event.target.className.split(' ').includes('message')) {

                const elem = event.target;

                this.isSelectedMessage(elem);
            }
            if (event.target.parentElement.className.split(' ').includes('message')) {

                const elem = event.target.parentElement;

                this.isSelectedMessage(elem);
            }
            if (this.selectedElements.length === 0) this.setState({ isSelectionState: false });
            else this.setState({ isSelectionState: true });

        }
    }

    isSelectedMessage = (elem) => {
        if (elem.className.split(' ').includes('selectedMessage')) {
            elem.className = elem.className.split(' ').filter(function(item, index, arr) {
                return item !== 'selectedMessage';
            }).join(' ');

            const filteredArray = this.selectedElements.filter(function(item, index, arr) {
                return item.dataset.id !== elem.parentElement.dataset.id;
            });

            this.selectedElements = filteredArray;

        } else {
            elem.className = elem.className + ' selectedMessage';

            this.selectedElements.push(elem.parentElement);
        }
    }

    deleteSelectedMessages = () => {
        this.selectedElements.map(function(item, index, arr) {
            item.childNodes[0].className = item.childNodes[0].className.split(' ').filter(function(name, i, array) {
                return name !== 'selectedMessage';
            }).join(' ');
        });
        this.selectedElements = [];
        this.setState({ isSelectionState: false });
    }

    render() {
        return (
            <div className='chatWrapper'>
                <div className='chat'>
                    <div className='chatHeader'>
                        { !this.state.isSelectionState && <span>Group Chat</span> }
                        { this.state.isSelectionState && <div className='selectionArea'>
                            <span className='selectedElemsCount'>Selected items: { this.selectedElements.length } </span>
                            <IconButton aria-label='delete' 
                                onClick={this.deleteSelectedMessages}
                            >
                                <Close />
                            </IconButton>
                        </div> }
                    </div>
                    <div className='messagesAreaWrapper' onScroll={ this.scrollWithButton } >
                        <div className='messagesArea' ref={ this.messagesArea } 
                            onContextMenu={ this.showContextMenu }
                            onClick={ this.state.isSelectionState ? this.selectMessage : false }
                            onLoad={ this.scrollToRef }
                        >
                            {this.renderChat()}
                        </div>
                        <IconButton buttonRef={ this.scrollBtn }
                            className='scrollButton scrollBtn-hidden'
                            onClick={ this.scrollToRef }
                        >
                            <ArrowDownward />
                        </IconButton>

                        <Menu
                            id="simple-menu"
                            anchorEl={ this.state.anchorEl }
                            keepMounted
                            open={ this.state.anchorEl && !this.state.isSelectionState }
                            onClose={ this.handleContextMenuClose }
                            anchorOrigin={ { vertical: 'bottom', horizontal: 'right' } }
                        >
                            <MenuItem onClick={ this.copyText } >Copy Text</MenuItem>
                            { this.state.isMyMessage ? <MenuItem onClick={ this.editMessage } >Edit Message</MenuItem> : false }
                            { this.state.isMyMessage ? <MenuItem onClick={ this.showDeleteMessageDialog } >Delete Message</MenuItem> : false }
                            <MenuItem onClick={ this.selectMessage } >Select Message</MenuItem>
                        </Menu>

                        <Dialog
                            open={ this.state.isDialogOpen }
                            onClose={ this.handleDialogClose }
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                        >
                            <DialogTitle id="alert-dialog-title">Are you sure you want to delete message?</DialogTitle>
                            <DialogActions>
                            <Button onClick={ this.deleteMessage } color="primary">
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
                            inputRef={ this.chatInput }
                            onKeyDown={ this.handleKeyDown }
                            onChange={ this.changeInput }
                        />
                        { this.state.message !== '' ? <IconButton aria-label='send'
                            className='sendBtn'
                            onClick={ this.onMessageSubmit }
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
