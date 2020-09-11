import React, { Component } from 'react';
import '../../components/chatPage/chatPage.css';
import { TextField, Button, IconButton, Menu, MenuItem, Dialog, DialogTitle, DialogActions } from '@material-ui/core';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';
import { Send, Close, Person, ArrowDownward, ArrowUpward, Search } from '@material-ui/icons';
import io from 'socket.io-client';
const socket = io.connect('http://localhost:3000');


const styles = theme => ({
    arrowSearchButton: {
        padding: '3px',
    },
    arrowSearchIcon: {
        height: '0.9em',
        width: '0.9em',
    },
    dialog: {
        width: '25vw',
        margin: '0 auto',
        fontSize: '1rem',

        ['@media (max-width:1100px)']: {
            width: '70vw',
            fontSize: '0.6rem',
        }
    },
    scrollButton: {
        position: 'fixed',
        right: '24vw',
        bottom: '20vh',
        zIndex: '1000',
    
        backgroundColor: '#fff',
        transition: 'all 150ms',
    
        '&.scrollBtn-hidden': {
            visibility: 'hidden',
        },
        '&:hover': {
            backgroundColor: 'rgb(230, 230, 230)',
        },
        ['@media (max-width:780px)']: {
            right: '13vw',
        },
        ['@media(max-width: 470px)']: {
            right: '8vw',
            bottom: '18vh',
        }
    },
    messageInput: {
        backgroundColor: '#d9e3eb',
        color: '#000',
        width: '75%',
        margin: '15px 0',
        marginRight: '3%',

    },
    sendButton: {
        position: 'absolute',
        right: '2%',
    }
});
  

class ChatPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            chat: [],
            message: '',
            isSend: null,
            anchorEl: null,
            editElement: null,
            isDialogOpen: false,
            isSearchState: false,
            isScrolledToTop: false,
            isSelectionState: false,
            currentFoundMessage: null,
            currentFoundMessageIndex: 0,
        }

        this.userEmail = '';
        this.chatHeight = 0;
        this.isMyMessage = null;
        this.foundMessages = [];
        this.selectedElements = [];
        this.chatInput = React.createRef();
        this.scrollBtn = React.createRef();
        this.messagesArea = React.createRef();
    }

    componentDidMount = () => {

        socket.on('chat message', ({ message, name, email }) => {
            try {
                const messageChat = this.state.chat;
                const messageid = (+messageChat[messageChat.length - 1].messageid + 1) + '';
                this.setState({
                    chat: [...messageChat, { message, name, email, messageid }]
                }, this.scrollToRef);

            } catch(err) {}

        });

        socket.on('get database', (database) => {
            let sortedResult = database.sort((a, b) => { 
                if (+a.messageid > +b.messageid) { 
                  return 1;
                } 
                if (+a.messageid < +b.messageid) { 
                  return -1;
                } 
                return 0; 
            });
            this.setState({
                chat: sortedResult
            }, this.scrollToRef);

        });

        socket.on('edit message', ({ message, messageid }) => {
            try {
                const arr = Object.entries(this.messagesArea.current.childNodes);

                const elem = arr.find((item) => item[1].dataset.id === messageid);

                if (elem !== undefined) {
                    const messageData = elem[1].childNodes[0].childNodes;
                    messageData[1].innerText = message;
                    messageData[2].className = 'userEdited noselect';
                }

            } catch(err) {}
        });

        socket.on('delete message', (messageid) => {
            const filteredArray = this.state.chat.filter((item) => {
                return item.messageid !== messageid;
            });
            this.setState({ chat: filteredArray, editElement: null });
        });

        socket.emit('get database');

        this.userEmail = localStorage.getItem('userEmail');
    }


    scrollToRef = () => {
        const height = this.messagesArea.current.getBoundingClientRect().height;
        this.messagesArea.current.parentElement.scrollTo(0, height);
        this.chatHeight = height;
    }

    scrollWithButton = () => {
        const scrollHeight = this.messagesArea.current.parentElement.scrollTop;
        let buttonClassName = this.scrollBtn.current.className;

        if (this.chatHeight - scrollHeight >= 1000) {

            const newClassNames = buttonClassName.replace(' scrollBtn-hidden', '');

            this.scrollBtn.current.className = newClassNames;

        } else {
            const isButtonHidden = buttonClassName.split(' ').includes('scrollBtn-hidden');
            if (!isButtonHidden) {
                this.scrollBtn.current.className = buttonClassName + ' scrollBtn-hidden';
            }
        }
    }

    onSearchButton = () => {
        this.setState({ isSearchState: true });
    }

    searchMessage = (event) => {
        const searchValue = event.target.value;

        this.clearFoundMessages();

        if (!searchValue) {
            return;
        }

        const messagesArray = Object.entries(this.messagesArea.current.childNodes);

        messagesArray.map((item) => {
            const message = item[1].childNodes[0].childNodes[1].innerText;

            if (message.includes(searchValue)) {
                this.foundMessages.push(item[1]);

                item[1].className += ' foundMessage';
            }

        });

        if (this.foundMessages.length) {
            const messageYCoord = this.foundMessages[0].offsetTop;
            this.messagesArea.current.parentElement.scrollTo(0, messageYCoord);
            this.setState({ currentFoundMessage: this.foundMessages[0], currentFoundMessageIndex: 0 });
            this.foundMessages[0].className += ' currentFoundMessage';
        }

    }

    changeCurrentFoundMessage = (direction) => {
        
        if (!this.state.currentFoundMessage) {
            return;
        }

        let currentMessage = this.state.currentFoundMessage;
        currentMessage.className = currentMessage.className.replace('currentFoundMessage', '');
        let i = this.state.currentFoundMessageIndex;

        switch (direction) {
            case 'top': i--; break;
            case 'bottom': i++; break;
        }

        if (i < 0 || i >= this.foundMessages.length) {
            i = (i < 0) ? this.foundMessages.length - 1 : 0;
        }

        currentMessage = this.foundMessages[i];
        this.setState({ currentFoundMessage: currentMessage, currentFoundMessageIndex: i });
        currentMessage.className += ' currentFoundMessage';

        const messageYCoord = currentMessage.offsetTop;
        this.messagesArea.current.parentElement.scrollTo(0, messageYCoord);
    }

    onCloseSearchButton = () => {
        this.setState({ isSearchState: false });
        this.clearFoundMessages();
    }

    clearFoundMessages = () => {

        if (this.state.currentFoundMessage) {
            const currentMessage = this.state.currentFoundMessage;
            currentMessage.className = currentMessage.className.replace('currentFoundMessage', '');
        }

        this.foundMessages.map((item) => {
            item.className = item.className.replace(' foundMessage', '');
        });

        this.foundMessages = [];
        this.setState({ currentFoundMessage: null, currentFoundMessageIndex: 0 });
    }

    onMessageSubmit = () => {
        this.setState({ isSend: true });
        const inputValue = this.chatInput.current.value;
        const { editElement } = this.state;

        if (this.state.editElement !== null) {
            if (inputValue !== editElement.childNodes[1].innerText) {
                const id = editElement.parentElement.dataset.id;
                const editedMessage = inputValue;
                socket.emit('edit message', editedMessage, id);
            }

        } else socket.emit('chat message', inputValue, localStorage.getItem('userName'), localStorage.getItem('userEmail'));

        this.setState({ message: '', editElement: null });
        this.chatInput.current.value = '';
    };

    showContextMenu = (event) => {
        event.preventDefault();
        event.stopPropagation();

        if (this.state.isSelectionState) {
            return;
        }

        if (event.target.className.split(' ').includes('message')) {
            this.setState({ anchorEl: event.target }, () => {

                const isMyMessage = this.state.anchorEl.className.includes('myMessage');
                this.setState({ isMyMessage: isMyMessage });    
            });
        }

        if (event.target.parentElement.className.split(' ').includes('message')) {
            this.setState({ anchorEl: event.target.parentElement }, () => {

                const isMyMessage = this.state.anchorEl.className.includes('myMessage');
                this.setState({ isMyMessage: isMyMessage });    
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
        if (event.key === 'Enter' && this.state.message !== '') {
            this.onMessageSubmit();
        }
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
        const previousData = elem.childNodes[1].innerText;

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
        if (window.getSelection().toString() === '') {
            text = this.state.anchorEl.childNodes[1].innerText;
        }
        else {
            text = window.getSelection().toString();
        }
        navigator.clipboard.writeText(text);
        this.handleContextMenuClose();
    }

    selectMessage = (event) => {
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

            const noSelectedElems = this.selectedElements.length === 0;
            this.setState({ isSelectionState: !noSelectedElems });
        }
    }

    isSelectedMessage = (elem) => {

        if (elem.className.split(' ').includes('selectedMessage')) {
            elem.className = elem.className.replace(' selectedMessage', '');

            const filteredArray = this.selectedElements.filter((item) => {
                return item.dataset.id !== elem.parentElement.dataset.id;
            });

            this.selectedElements = filteredArray;

        } else {
            elem.className = elem.className + ' selectedMessage';

            this.selectedElements.push(elem.parentElement);
        }
    }

    deleteSelectedMessages = () => {
        this.selectedElements.map((item) => {
            const childNode = item.childNodes[0];

            childNode.className = childNode.className.replace(' selectedMessage', '');
        });

        this.selectedElements = [];
        this.setState({ isSelectionState: false });
    }

    render() {
        const { classes } = this.props;

        return (
            <div className='chatWrapper'>
                <div className='chat'>
                    <div className='chatHeader'>
                        { !this.state.isSelectionState && <span>Group Chat</span> }
                        { !this.state.isSelectionState && !this.state.isSearchState &&
                            <IconButton
                                className='searchButton'
                                aria-label='search'
                                onClick={ this.onSearchButton }
                            >
                                <Search />
                            </IconButton> 
                        }
                        { this.state.isSearchState && 
                            <div className='searchArea'>
                                <span className='resultsCount'>
                                    { !this.foundMessages.length ? 
                                        'No results' 
                                        : this.state.currentFoundMessageIndex + 1 + ' / ' + this.foundMessages.length
                                    }
                                </span>
                                <IconButton className={ classes.arrowSearchButton } 
                                    onClick={ () => this.changeCurrentFoundMessage('top') }
                                >
                                    <ArrowUpward className={ classes.arrowSearchIcon } /> 
                                </IconButton>
                                <IconButton className={ classes.arrowSearchButton }
                                    onClick={ () => this.changeCurrentFoundMessage('bottom') }
                                >
                                    <ArrowDownward className={ classes.arrowSearchIcon } />
                                </IconButton>

                                <TextField
                                    id='outlined-basic'
                                    label='Search...'
                                    onChange={ this.searchMessage }
                                    autoFocus
                                />
                                <IconButton
                                    className='closeSearchButton'
                                    aria-label='close'
                                    onClick={ this.onCloseSearchButton }
                                >
                                    <Close />
                                </IconButton> 
                            </div> 
                        }
                        { this.state.isSelectionState && <div className='selectionArea'>
                            <span className='selectedElemsCount'>Selected items: { this.selectedElements.length } </span>
                            <IconButton aria-label='delete' 
                                onClick={ this.deleteSelectedMessages }
                            >
                                <Close />
                            </IconButton>
                        </div> }
                    </div>
                    <div className='messagesAreaWrapper' onScroll={ this.scrollWithButton } >
                        <div 
                            className='messagesArea'
                            ref={ this.messagesArea } 
                            onContextMenu={ this.showContextMenu }
                            onClick={ this.state.isSelectionState ? this.selectMessage : false }
                            onLoad={ this.scrollToRef }
                        >
                            { this.renderChat() }
                        </div>
                        <IconButton 
                            buttonRef={ this.scrollBtn }
                            className={ classes.scrollButton }
                            onClick={ this.scrollToRef }
                        >
                            <ArrowDownward />
                        </IconButton>

                        <Menu
                            id='simple-menu'
                            anchorEl={ this.state.anchorEl }
                            keepMounted
                            open={ this.state.anchorEl && !this.state.isSelectionState }
                            onClose={ this.handleContextMenuClose }
                            anchorOrigin={ { vertical: 'bottom', horizontal: 'right' } }
                        >
                            <MenuItem onClick={ this.copyText } >Copy Text</MenuItem>
                            { this.state.isMyMessage && <MenuItem onClick={ this.editMessage } >Edit Message</MenuItem> }
                            { this.state.isMyMessage && <MenuItem onClick={ this.showDeleteMessageDialog } >Delete Message</MenuItem> }
                            <MenuItem onClick={ this.selectMessage } >Select Message</MenuItem>
                        </Menu>

                        <Dialog
                            className={ classes.dialog }
                            open={ this.state.isDialogOpen }
                            onClose={ this.handleDialogClose }
                            aria-labelledby='alert-dialog-title'
                            aria-describedby='alert-dialog-description'
                        >
                            <DialogTitle id='alert-dialog-title'>Are you sure you want to delete message?</DialogTitle>
                            <DialogActions>
                            <Button onClick={ this.deleteMessage } color='primary'>
                                Yes, delete
                            </Button>
                            <Button onClick={ this.handleDialogClose } color='primary' autoFocus>
                                No
                            </Button>
                            </DialogActions>
                        </Dialog>
                    </div>
                    <div className='inputArea'>
                        <TextField
                            id='standard-full-width'
                            className={ classes.messageInput }
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
                        { this.state.message !== '' && <IconButton aria-label='send'
                            className={ classes.sendButton }
                            onClick={ this.onMessageSubmit }
                        >
                            <Send />
                        </IconButton> }

                    </div>
                </div>
            </div>
        );
    }
}

ChatPage.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ChatPage);
