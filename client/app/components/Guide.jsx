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
          title="How to Use"
          modal={false}
          actions={actions}
          open={this.props.open}
          onRequestClose={this.props.toggle}
        >
        To get started, enter an origin and destination address.
        </Dialog>
      </div>
    );
  }
}

export default Guide;