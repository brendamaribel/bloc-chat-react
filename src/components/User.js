import React, { Component } from 'react';

class User extends Component  {

  constructor(props) {
    super(props)

    this.state = {
      user: ''
    };

    this.signIn = this.signIn.bind(this);
    this.signOut = this.signOut.bind(this);
  }

  signIn() {
    const provider = new this.props.firebase.auth.GoogleAuthProvider();
    this.props.firebase.auth().signInWithPopup( provider );
  }


  signOut() {
    this.props.firebase.auth().signOut();
  }


  componentDidMount() {
    this.props.firebase.auth().onAuthStateChanged(user => {
      this.props.setUser(user);
    })
  }


  toggleButton(){

    if(this.props.user === null){

      return <button type="button" className="sign-in" onClick={this.signIn}> Sign-in with Gmail</button>

    } else {
      return  <button type="button" className="sign-off" onClick={this.signOut}> Logout </button>
    }
  }



  render() {

    const activeUser = this.props.user === null ? "Guest" : this.props.user.displayName;

    return (

    <div >

      <div>
        <span id = "username"> Signed-in as: {activeUser}</span>
      </div>

      <div>
        {this.toggleButton()}
      </div>

    </div> 

    );

  }

}

export default User;
