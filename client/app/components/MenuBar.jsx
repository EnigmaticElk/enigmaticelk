import React, {Component} from 'react';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import About from './About.jsx';
import Guide from './Guide.jsx';

const Options = (props) => (
  <IconMenu
    iconButtonElement={
      <IconButton><MoreVertIcon /></IconButton>
    }
    targetOrigin={{horizontal: 'right', vertical: 'top'}}
    anchorOrigin={{horizontal: 'right', vertical: 'top'}}
    iconStyle={{
      color: 'white'
    }}
  >
    <MenuItem
      primaryText="How to use"
      onTouchTap={props.toggleguide}
    />
    <MenuItem
      primaryText="About"
      onTouchTap={props.toggleabout}
    />
  </IconMenu>
);

class MenuBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      aboutOpen: false,
      guideOpen: false
    };
    this.toggleAbout = this.toggleAbout.bind(this);
    this.toggleGuide = this.toggleGuide.bind(this);
  }

  toggleAbout() {
    this.setState({
      aboutOpen: !this.state.aboutOpen
    })
  }

  toggleGuide() {
    this.setState({
      guideOpen: !this.state.guideOpen
    })
  }

  render() {
    return (
      <div>
        <AppBar
          title="SF SafeWalk"
          iconElementLeft={<Options
              toggleabout={this.toggleAbout}
              toggleguide={this.toggleGuide}
            />}
          style={{
            backgroundColor: '#689F38'
          }}
        />
        <About
          open={this.state.aboutOpen}
          toggle={this.toggleAbout}
        />
        <Guide
          open={this.state.guideOpen}
          toggle={this.toggleGuide}
        />
      </div>
    );
  }
}

export default MenuBar;