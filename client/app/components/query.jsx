import React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

class Query extends React.Component {
  constructor (props) {
    super(props);
    this.state = {};
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  componentDidMount() {
    var defaultBounds = new google.maps.LatLngBounds(
      new google.maps.LatLng(37.699862,-122.516221),
      new google.maps.LatLng(37.815635, -122.369876)
    );
    var options = {
      bounds: defaultBounds,
      strictBounds: true
    };
    var origin = document.getElementById('origin-input');
    var dest = document.getElementById('dest-input');
    var origAutocomplete = new google.maps.places.Autocomplete(origin, options);
    var destAutocomplete = new google.maps.places.Autocomplete(dest, options);

    this.setState({
      origin: origAutocomplete,
      destination: destAutocomplete
    });
  }

  handleKeyDown(event) {
    switch(event.key) {
      case 'Enter':
        this.checkTextInput();
        break;
      default: break;
    }
  }

  checkTextInput() {
    var start = this.state.origin.getPlace();
    var end = this.state.destination.getPlace();

    if (start && !start.formatted_address) {
      this.setState({
        origErrorText: 'Incorrect Address'
      });
    } else if (!start) {
      this.setState({
        origErrorText: 'Field is required'
      });
    } else {
      this.setState({
        origErrorText: ''
      });
    }

    if (end && !end.formatted_address) {
      this.setState({
        destErrorText: 'Incorrect Address'
      });
    } else if (!end) {
      this.setState({
        destErrorText: 'Field is required'
      });
    } else {
      this.setState({
        destErrorText: ''
      });
    }

    if (start && end && start.formatted_address && end.formatted_address) {
      this.props.setOrigAndDest(start, end);
    }
  }

  render () {
    return (
      <div>
        <TextField
          id="origin-input"
          floatingLabelText="Origin"
          type="text"
          size="50"
          placeholder=""
          style={{
            width: '500px',
            marginLeft: 5,
          }}
          errorText={this.state.origErrorText}
          errorStyle={{
            float: 'left'
          }}
          onKeyDown={this.handleKeyDown}
        />
        <TextField
          id="dest-input"
          type="text"
          size="50"
          floatingLabelText="Destination"
          placeholder=""
          style={{
            width: '500px',
            marginLeft: 5
          }}
          errorText={this.state.destErrorText}
          errorStyle={{
            float: 'left'
          }}
          onKeyDown={this.handleKeyDown}
          />
        <RaisedButton
          onClick={this.checkTextInput.bind(this)}
          style={{
            marginLeft: 10,
          }}
          >
          Search
        </RaisedButton>
      </div>
    );
  }
}

export default Query;