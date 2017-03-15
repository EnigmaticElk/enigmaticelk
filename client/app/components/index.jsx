import React from 'react';
import {render} from 'react-dom';
import Query from './query.jsx';
import Gmap from './gmap.jsx';

class App extends React.Component {
  render () {
    return (
      <div>
        <h1>SF SafeWalk</h1>
        <Query/>
        <br />
        <Gmap/>
      </div>
    )
  }
}

render(<App/>, document.getElementById('app'));