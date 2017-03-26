import React from 'react';

class Row extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    
    let style = {
      display: 'block',
      width: '75px',
      paddingTop: '7px',
      borderBottom: `5px solid ${this.props.color}`,
    };

    this.showInfo = this.showInfo.bind(this);
  }

  showInfo() {
    return `${this.props.num} crimes on this stretch in last 30 days`;
  }

  render() {
    return (
      <tr>
      </tr>
    )
  }
};
        // <td>{this.props.desc}</td><td style={this.style}></td><td>{this.showInfo}</td>

export default Row;