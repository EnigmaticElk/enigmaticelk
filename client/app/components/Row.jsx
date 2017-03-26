import React from 'react';

let Row = (props) => {
  let style = {
    display: 'block',
    width: '75px',
    paddingTop: '7px',
    borderBottom: `5px solid ${props.color}`,
  };

  return (
    <tr>
      <td>{props.desc}</td><td style={style}></td><td> >= {props.num} crimes on this stretch in last 30 days</td>
    </tr>
  )
};

export default Row;