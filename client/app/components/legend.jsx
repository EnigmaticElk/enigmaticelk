import React from 'react';
import Row from './Row.jsx';

let Legend = (props) => {

  let makeRows = (infos) => {
    let results = [];
    for (var key in infos) {
      results.push(infos[key]);
    }
    return results;
  }

  let rows = makeRows(props.ratingInfo);

  return (
    <div>
      <p>Legend</p>
      <table>
        <tbody>
          {rows.map((row) => {
            return <Row key={row.desc} desc={row.desc} color={row.color} info={row.info} />
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Legend;