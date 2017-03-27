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
    <div
      id='legend'
      style={{
        backgroundColor: "rgba(255,255,255,0.75)",
        marginTop: "10px",
        marginRight: "10px"
      }}
    >
      <table>
        <tbody>
          {rows.map((row) => {
            return <Row 
                    key={row.desc} 
                    desc={row.desc} 
                    color={row.color}  
                    minNum={row.minNum}
                    maxNum={row.maxNum}
                    />
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Legend;