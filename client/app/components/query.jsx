import React from 'react';

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
    })

  }

  render () {
    return (
      <div>
        Origin: <input id="origin-input" type="text" size="50" />
        <br />
        Destination: <input id="dest-input" type="text" size="50" />
        <br />
        <button onClick={() => {this.props.setOrigAndDest(this.state.origin.getPlace().formatted_address, this.state.destination.getPlace().formatted_address);}}>Search</button>
      </div>
    );
  }
}

//Commented out time of day until feature implemented
// Time of day: <select>
//   <option>Day</option>
//   <option>Night</option>
// </select>

export default Query;