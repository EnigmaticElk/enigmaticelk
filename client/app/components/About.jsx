import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

class About extends React.Component {

  render() {
    const actions = [
      <FlatButton
        label="Got it!"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.props.toggle}
      />,
    ];

    return (
      <div>
        <Dialog
          title="SF SafeStreets"
          modal={false}
          actions={actions}
          open={this.props.open}
          onRequestClose={this.props.toggle}
        >
          SF Safewalk helps people plan safe walking routes to avoid streets high in pedestrian relevant crime.
          <br />
          <br />
          Created by Jon Chou, Dylan Shelters, Benicio Peinado and Tyler Arbus.
          Check out our project on &nbsp;
          <a href= "https://github.com/EnigmaticElk/enigmaticelk">GitHub!</a>
        </Dialog>
      </div>
    );
  }
}

export default About;