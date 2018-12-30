import React, { Component } from "react";

class RoomList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rooms: []
    };

    this.roomsRef = this.props.firebase.database().ref("rooms");
  }

  componentDidMount() {
    this.roomsRef.on("child_added", snapshot => {
      const room = snapshot.val();
      room.key = snapshot.key;
      this.setState({ rooms: this.state.rooms.concat(room) });
      console.log(room);
    });
  }

  createRoom(event) {
         event.preventDefault()
         const newRoomName = this.state.newRoomName
         this.roomsRef.push({
             name: newRoomName
         });
         this.setState({newRoomName: ""});
     }

   onChangeRoomName(event) {
        this.setState({newRoomName: event.target.value})
    }


  render() {
    return (
      <div>
           <div>{this.state.rooms.map(room =>
               <div className={room.name} key={room.key} onClick={() => this.props.passRoomId(room.name)}>
                   {room.name}
               </div>)}
           </div>

        <form onSubmit={(e) => this.createRoom(e)}>
               <input type="text" value={this.state.newRoomName} onChange={(e) => {this.onChangeRoomName(e)}}/>
               <input type="submit" value="Create New Room"/>
           </form>

      </div>
    );
  }

}
export default RoomList;
