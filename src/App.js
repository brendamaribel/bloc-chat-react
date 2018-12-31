import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './components/RoomList';
import MessageList from './components/MessageList';

var config = {
  apiKey: "AIzaSyDCDtnIu7Kq0xrX5PywOuzw9ndI7qECn9U",
  authDomain: "bloc-chat-react-6af02.firebaseapp.com",
  databaseURL: "https://bloc-chat-react-6af02.firebaseio.com",
  projectId: "bloc-chat-react-6af02",
  storageBucket: "bloc-chat-react-6af02.appspot.com",
  messagingSenderId: "437627547858"
};
firebase.initializeApp(config);


class App extends Component {
    constructor(props) {
      super(props);

      this.state={
        activeRoom: ''
      }

      this.changeActiveRoom = this.changeActiveRoom.bind(this);
    }

    changeActiveRoom(room) {
      this.setState({ activeRoom: room })
      console.log(this.state.activeRoom)
    }


    render () {
      return (
        <div className='App'>
          <header>
            <h1> Welcome to Bloc Chat </h1>
          </header>
          <main>
            <section id="sidebar">
              <RoomList
                firebase={firebase}
                activeRoom={this.state.activeRoom}
                changeActiveRoom={this.changeActiveRoom}
              />
            </section>
            <section id="main">
              <MessageList
                firebase={firebase}
                activeRoom={this.state.activeRoom}
              />
            </section>
          </main>
        </div>
      )
    }
  }

  export default App;
