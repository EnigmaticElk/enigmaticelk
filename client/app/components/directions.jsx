import React from 'react';

class Directions extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    var directionsService = new google.maps.DirectionsService();
    var directionsDisplay = new google.maps.DirectionsRenderer({
      draggable: true
    });
    directionsDisplay.setPanel(document.getElementById('directionsPanel'));
    this.setState({
      directionsService: directionsService,
      directionsDisplay: directionsDisplay
    });
  }

  componentDidUpdate() {
    if (this.props.origDest) {
      this.calcRoute(this.props.origDest[0].formatted_address, this.props.origDest[1].formatted_address);
    };
  }

  calcRoute(start, end) {
    var request = {
      origin: start,
      destination: end,
      travelMode: 'WALKING',
      provideRouteAlternatives: true
    };
    this.state.directionsService.route(request, (response, status) => {
      if (status === 'OK') {
        this.props.setDirections(this.state.directionsDisplay);
        this.state.directionsDisplay.setDirections(response);
        console.log(response);
      }
    })
  }

  render() {
    var style = {
      width: '750px',
      height: '650px'
    }

    return (
      <div id='directionsPanel' style={style}></div>
      )
  };
};

export default Directions;