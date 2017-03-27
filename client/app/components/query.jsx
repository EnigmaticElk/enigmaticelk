import React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

class Query extends React.Component {
  constructor (props) {
    super(props);
    this.state = {};
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
            width: '400px',
            marginLeft: 5,
          }}
        />
        <TextField
          id="dest-input"
          type="text"
          size="50"
          floatingLabelText="Destination"
          placeholder=""
          style={{
            width: '400px',
            marginLeft: 15
          }}
          />
        <br />
        <RaisedButton
          onClick={() => {this.props.setOrigAndDest(this.state.origin.getPlace(), this.state.destination.getPlace());}}
          style={{
            marginTop: 5,
            marginLeft: 5
          }}
          >
          Search
        </RaisedButton>
      </div>
    );
  }
}

export default Query;