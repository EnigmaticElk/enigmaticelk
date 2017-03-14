import React from 'react';
import {render} from 'react-dom';
import Query from './query.jsx';

class App extends React.Component {
  render () {
    return (
      <div>
      	<h1> SF SafeWalk</h1>
        <Query/>
      </div>
    )
  }
}

render(<App/>, document.getElementById('app'));