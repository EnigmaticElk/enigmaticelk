import React from 'react';

class Query extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      origin: '',
      destination: ''
    };
    this.updateOriginState = this.updateOriginState.bind(this);
    this.updateDestinationState = this.updateDestinationState.bind(this);
  }

  updateOriginState (e) {
    this.setState({
      origin: e.target.value
    });
  }

  updateDestinationState (e) {
    this.setState({
      destination: e.target.value
    });
  }

  componentDidMount() {
    var defaultBounds = new google.maps.LatLngBounds(
      new google.maps.LatLng(37.699862,-122.516221),
      new google.maps.LatLng(37.815635, -122.369876));

    var options = {
      bounds: defaultBounds,
      strictBounds: true
    };
    var origin = document.getElementById('origin-input');
    var dest = document.getElementById('dest-input');
    var origAutocomplete = new google.maps.places.Autocomplete(origin, options);
    var destAutocomplete = new google.maps.places.Autocomplete(dest, options);

  }

  render () {
    return (
      <div>
        Origin: <input id="origin-input" type="text" size="50" onChange={this.updateOriginState}/>
        <br />
        Destination: <input id="dest-input" type="text" size="50" onChange={this.updateDestinationState}/>
        <br />
        <button onClick={() => {this.props.setOrigAndDest(this.state.origin, this.state.destination);}}>Search</button>
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