import React from 'react';

class Row extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      style: {
        display: 'block',
        width: '75px',
        paddingTop: '7px',
        borderBottom: `5px solid ${this.props.color}`,
      },
      desc: null
    };
    

    this.toggleInfo = this.toggleInfo.bind(this);
  }

  toggleInfo(e) {
    let info;
    if (this.props.num > 0) {
      info = `${this.props.num} or more crimes on this stretch in last 30 days`;
    } else {
      info = `Less than 10 crimes on this stretch in last 30 days`;
    }
    
    if (!this.state.desc) {
      this.setState({desc: info});
    } else {
      this.setState({desc: null});
    }
  }

  render() {
    return (
      <tr onMouseEnter={this.toggleInfo} onMouseLeave={this.toggleInfo} >
        <td>{this.props.desc}</td><td style={this.state.style}></td><td>{this.state.desc}</td>
      </tr>
    )
  }
};

export default Row;