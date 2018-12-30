import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './components/RoomList';


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
  render() {
    return (
      <div className="App">
      <h1>Welcome to Bloc Chat</h1>
      <aside className="room-list">
          <RoomList firebase = {firebase} />
       </aside>
     </div>
    );
  }
}

export default App;
