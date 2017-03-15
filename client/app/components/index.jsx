import React from 'react';
import {render} from 'react-dom';
import Query from './query.jsx';

class App extends React.Component {
  render () {
    return (
      <div>
<<<<<<< HEAD
        <h1>SF SafeWalk</h1>
=======
      	<h1> SF SafeWalk</h1>
>>>>>>> 0e85ba04987c5120620ff3924f3c50b3e712ac49
        <Query/>
      </div>
    )
  }
}

render(<App/>, document.getElementById('app'));