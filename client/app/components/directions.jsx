import React from 'react';

class Directions extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.calcRoute('Hack Reactor', 'Market Street')
  }

  calcRoute(start, end) {
    console.log('calcRoute called');
    var directionsService = new google.maps.DirectionsService();
    var directionsDisplay = new google.maps.DirectionsRenderer();
    directionsDisplay.setPanel(document.getElementById('directionsPanel'));

    var request = {
      origin: start,
      destination: end,
      travelMode: 'WALKING'
    }

    directionsService.route(request, (response, status) => {
      if (status === 'OK') {
        console.log(response);
        directionsDisplay.setDirections(response);
      }
    })
  }

  render() {
    var style = {
      width: '650px',
      height: '650px'
    }

    return (
      <div id='directionsPanel' style={style}></div>
      )
  };
};

export default Directions;