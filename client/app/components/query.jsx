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

  render () {
    return (
      <div>
        Origin: <input type="text" onChange={this.updateOriginState}/>
        Destination: <input type="text" onChange={this.updateDestinationState}/>
        Time of day: <select>
          <option>Day</option>
          <option>Night</option>
        </select>
        <button onClick={() => {this.props.setOrigAndDest(this.state.origin, this.state.destination);}}>Search</button>
      </div>
    );
  }
}

export default Query;