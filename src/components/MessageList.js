import React, { Component } from 'react';


class MessageList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      content: "",
      sentAt: "",
      roomId: "",
      messages: []
    }

    this.messagesRef = this.props.firebase.database().ref("messages");
  }

  componentDidMount() {
    this.messagesRef.on('child_added', snapshot => {
      const messages = snapshot.val();
      this.setState({ messages: this.state.messages.concat( messages ) });
    });
  }


  render() {
    return (
      <div className="message-list">

        <section className="message-group">

          <div>
         {this.state.messages.filter(message => message.roomId === this.props.activeRoom.roomId).map((message, index) =>
                   <div key={index}>
                   <h3>Current Messages</h3>
                       <p><b>{message.username} :</b> {message.content}  <b>{message.sentAt}</b></p>
                   </div>
          )}
          </div>

        </section>
      </div>
    )
  }
}

export default MessageList
