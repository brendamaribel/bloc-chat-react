import React, { Component } from 'react';


class RoomList extends Component {

  constructor(props) {
    super(props);

    this.state = {
      rooms: [],
      newRoomName: "",
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.roomsRef = this.props.firebase.database().ref('rooms')
  }


  componentDidMount() {

    this.roomsRef.on('child_added', snapshot => {

      const room = snapshot.val();
      room.key = snapshot.key;
      this.setState({ rooms: this.state.rooms.concat( room ) });

    });
  }



  handleChange(e) {
    this.setState({ newRoomName: e.target.value })
  }


  handleSubmit(e) {

    e.preventDefault();
    if (!this.state.newRoomName) return
    this.roomsRef.push({ name: this.state.newRoomName })
    this.setState({ newRoomName: ''})

  }


  render() {

      return (

    <div className = "column-1">

      <div className="room-list">

          <section>

            <p className = "room-name"> {this.props.activeRoom ? this.props.activeRoom.name : 'Join Chat Room' } </p>

              {this.state.rooms.map((room, index) =>

              <li className = "room-list-item" key = {index} onClick = {() => this.props.changeActiveRoom(room)}>

                {room.name}

              </li>

               )}

            </section>


        <div id = "new-room">

            <form onSubmit = { (e) => this.handleSubmit(e) }>

              <label>

                <div id = "create-room"> Create Chat Room </div>

                  <input
                    type = "text"
                    placeholder = "Enter room name..."
                    value = {this.state.newRoomName}
                    onChange = { (e) => this.handleChange(e) }/>

               </label>

              <div>
              <input id = "room-button" type = "submit" value = "Create" />
              </div>

            </form>


        </div>

      </div>

    </div> 

      );

    }

  }

export default RoomList;
