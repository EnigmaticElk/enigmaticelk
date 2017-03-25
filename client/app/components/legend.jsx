import React from 'react';

let Legend = (props) => {
  let high = {
    desc:'High',
    style: {
      display: 'block',
      width: '75px',
      color: 'red',
      paddingTop: '7px',
      borderBottom: '5px solid red',
    }
  };

  let mod = {
    desc: 'Moderate',
    style: {
      display: 'block',
      width: '75px',
      color: 'yellow',
      paddingTop: '7px',
      borderBottom: '5px solid yellow',
    }
  };

  let safe = {
    desc: 'Safe',
    style: {
      display: 'block',
      width: '75px',
      color: 'green',
      paddingTop: '7px',
      borderBottom: '5px solid green',
    }
  };


  return (
    <table>
      <tbody>
        <tr>
          <td>{high.desc}</td><td style={high.style}></td>
        </tr>
        <tr>
          <td>{mod.desc}</td><td style={mod.style}></td>
        </tr>
        <tr>
          <td>{safe.desc}</td><td style={safe.style}></td>
        </tr>
      </tbody>
    </table>
  )
}

export default Legend;