import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

class Guide extends React.Component {

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
          title="How to use"
          modal={false}
          actions={actions}
          open={this.props.open}
          onRequestClose={this.props.toggle}
        >
        To get started, enter an origin and destination address.
        The map will then display your requested route with an overlay of steet 'safeness' based on SF crime data.
        <br />
        <br />
        Adjust your route using the alternative routes provided, or drag the directions line to choose a custom route.
        Street safety ratings will automatically update.
        </Dialog>
      </div>
    );
  }
}

export default Guide;