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
    this.createMessage=this.createMessage.bind(this);
    this.handleMessageSubmit = this.handleMessageSubmit.bind(this);
    this.handleChange=this.handleChange.bind(this);
  }


  componentDidMount() {

    this.messagesRef.on('child_added', snapshot => {
      const messages = snapshot.val();
      this.setState({ messages: this.state.messages.concat( messages ) });
    });

  }

  handleChange(e) {

     e.preventDefault();
     const currentUser = this.props.user === null ? "Guest" : this.props.user.displayName;
     this.setState({
       username: currentUser,
       content: e.target.value,
       sentAt: this.props.firebase.database.ServerValue.TIMESTAMP,
       roomId: this.props.activeRoom
     })

   }

  createMessage(e) {

     this.messagesRef.push({
       username: this.state.username,
       content: this.state.content,
       sentAt: this.state.sentAt,
       roomId: this.props.activeRoom.roomId
     })

     this.setState({
       username: "",
       content: "",
       sentAt: "",
       roomId: ""
     })

   }

   handleMessageSubmit(e) {

     e.preventDefault();
     this.createMessage();
     this.setState({
       content: "",
      });
   }



   formatTime(time) {

      const date = new Date(time);
      const year = date.getFullYear();
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      const month = months[date.getMonth()];
      const day = date.getDate();
      const hour = date.getHours();
      const min =  this.addZero(date.getMinutes());
      const sec =  this.addZero(date.getSeconds());
      const sentTime = month + ' ' + day + ' ' + year + ' ' + hour + ':' + min + ':' +  sec;
      return sentTime;

    }

    addZero(timeCount){

      if (timeCount < 10){
        timeCount = "0" + timeCount
      }

      return timeCount
    }


  render() {

    return (

      <div className = "column-2">

        <div className = "message-list">

          <section className = "message-group">

            <div>

              <h3>Current Messages</h3>

                {this.state.messages.filter(message => message.roomId === this.props.activeRoom.roomId)
                  .sort((a, b) => a.sentAt - b.sentAt)
                  .map((message, index) =>

                  <div key = {index}>
                    <p className = "message-align">{message.username}:</p>
                    <p className = "message-content-align">{message.content}</p>
                    <p className = "message-date-align"> sent: {this.formatTime(message.sentAt)}</p>
                  </div>
                 )}

            </div>

          </section>

          <div className = "new-message">

            <form onSubmit={this.handleMessageSubmit}>

              <input id = "message-bar" type = "text" value = {this.state.content} onChange = {this.handleChange} placeholder = "Write your message here..." />
              <input id = "message-button" type = "submit" value = "Send"/>

            </form>
          </div>

      </div>

  </div>

    );
  }
}

export default MessageList
