import React from 'react';

let Legend = (props) => {
  let high = 'High Risk';
  let mod = 'Moderate Risk';
  let safe = 'Safe';
  return (
    <div>
      <tr>
        <td>{high}</td>
      </tr>
      <tr>
        <td>{mod}</td>
      </tr>
      <tr>
        <td>{safe}</td>
      </tr>
    </div>
  )
}

export default Legend;