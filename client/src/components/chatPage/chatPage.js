import React, { Component } from 'react';
import 'chatPage.css';
import { TextField, IconButton } from '@material-ui/core';
import { Send, Person } from '@material-ui/icons';
import io from 'socket.io-client';

const socket = io.connect('http://localhost:9000');




class ChatPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            msg: '',
            chat: [],
        }
        this.chatInput = React.createRef();
    }

    componentDidMount() {
        socket.on('chat message', ({ msg, name, email }) => {
          this.setState({
            chat: [...this.state.chat, { msg, name, email }]
          }, function() {
              console.log(this.state);
          });
        });
    }

    onMessageSubmit = () => {
        socket.emit('chat message', this.chatInput.current.value, window.localStorage.getItem('userName'), window.localStorage.getItem('userEmail'));
        this.setState({ msg: '' });
    };

    renderChat() {
        const { chat } = this.state;
        return chat.map(({ msg, name, email }, idx) => (
            <div className={ email === window.localStorage.getItem('userEmail') ? 'messageWrapper messageWrapper-myMessage' : 'messageWrapper messageWrapper-otherMessage' }>
                <div className= { email === window.localStorage.getItem('userEmail') ? 'myMessage message' : 'otherMessage message' }>
                    <span>{msg}</span>
                </div>
                <div className='messageAvatar'>
                    <Person />
                </div>
            </div>
      
        ));
    };

    render() {
  
        return (
            <div className='chatWrapper'>
                <div className='chat'>
                    <div className='chatHeader'>
                        <span>Group Chat</span>
                    </div>
                    <div className='messagesAreaWrapper'>
                        <div className='messagesArea'>
                            {this.renderChat()}
                            {/* <div className='messageWrapper messageWrapper-otherMessage'>
                                <div className='otherMessage message'>
                                    <span>jdwwdq</span>
                                </div>
                                <div className='messageAvatar'>
                                    <Person />
                                </div>
                            </div>
                            <div className='messageWrapper messageWrapper-otherMessage'>
                                <div className='otherMessage message'>
                                    <span>jdwwdq</span>
                                </div>
                                <div className='messageAvatar'>
                                    <Person />
                                </div>
                            </div>
                            <div className='messageWrapper messageWrapper-otherMessage'>
                                <div className='otherMessage message'>
                                    <span>jdwwdq</span>
                                </div>
                                <div className='messageAvatar'>
                                    <Person />
                                </div>
                            </div>
                            <div className='messageWrapper messageWrapper-otherMessage'>
                                <div className='otherMessage message'>
                                    <span>jdwwdq</span>
                                </div>
                                <div className='messageAvatar'>
                                    <Person />
                                </div>
                            </div>

                            <div className='messageWrapper messageWrapper-myMessage'>
                                <div className='myMessage message'>
                                    <span>wdwdfeqdqwdbkdbkwdhbcwhobwhos</span>
                                </div>
                                <div className='messageAvatar'>
                                    <Person />
                                </div>
                            </div> */}
                        </div>
                    </div>
                    <div className='inputArea'>
                        <TextField
                            id="standard-full-width"
                            // style={{ margin: 8 }}
                            placeholder="Placeholder"
                            // fullWidth
                            margin="normal"
                            variant="outlined"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            inputRef={this.chatInput}
                        />
                        {/* <input placeholder='Enter message' /> */}
                        <IconButton aria-label="send" 
                            onClick={this.onMessageSubmit}
                        >
                            <Send />
                        </IconButton>
                    </div>
                </div>
            </div>
        );
    }
}

export default ChatPage;
