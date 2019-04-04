import React from "react";
import {connect} from 'react-redux';
import { Link } from "react-router-dom";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import Hidden from "@material-ui/core/Hidden";
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

// @material-ui/icons
import AccountCircle from "@material-ui/icons/AccountCircle";

// core components
import Button from "../CustomButtons/Button.jsx";

import {auth} from "../../actions";

import headerLinksStyle from "../../assets/jss/material-dashboard-react/components/headerLinksStyle.jsx";

class ArkwithHeaderLinks extends React.Component {
  state = {
    anchorEl: null
  };
  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  handleLogout = () => {
    this.setState({ anchorEl: null });
    this.props.logout();
  };
  
  handleLoginPage = () => {
    this.setState({ anchorEl: null });
    //return <Redirect to="/login" />;
  };

  render() {
    // eslint-disable-next-line react/prop-types
    const { classes } = this.props;
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);
    const linkStyle = { color: 'inherit' };

    //let user = JSON.parse(localStorage.getItem('username'));
    return (
          <div>
            <Button
              className={classes.buttonLink}
              color={window.innerWidth > 959 ? "transparent" : "white"}
              justIcon={window.innerWidth > 959}
              simple={!(window.innerWidth > 959)}
              aria-label="Person"
              aria-owns={open ? "menu-appbar" : undefined}
              aria-haspopup="true"
              onClick={this.handleMenu}
            >
              <AccountCircle className={classes.icons} />
              <Hidden mdUp implementation="css">
                <p className={classes.linkText}>Profile</p>
              </Hidden>
            </Button>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right"
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "right"
              }}
              open={open}
              onClose={this.handleClose}
            >
            {this.props.auth.isAuthenticated ? 
              <div>
              <MenuItem onClick={this.handleClose}>
               <ListItemIcon>
               <i className={"fas fa-user"} />
               </ListItemIcon>
               <Link style={ linkStyle } to="/user">&nbsp;&nbsp;&nbsp;&nbsp;Profile</Link>
              </MenuItem>
              <MenuItem onClick={this.handleLogout}>
               <ListItemIcon>
               <i className={"fas fa-sign-out-alt"} />
               </ListItemIcon>
               <ListItemText inset primary="Logout" />            
              </MenuItem>
              </div>
              :
              <MenuItem onClick={this.handleLoginPage}>
               <ListItemIcon>
               <i className={"fas fa-sign-in-alt"} />
               </ListItemIcon>
               <Link style={ linkStyle } to="/login">Login</Link>
              </MenuItem>
            }
            </Menu>
          </div>
    );
  }
}
const mapStateToProps = state => {
  return {
      auth: state.auth,
      user: state.auth.user,
  }
}

const mapDispatchToProps = dispatch => {
  return {
      logout: () => dispatch(auth.logout()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(headerLinksStyle)(ArkwithHeaderLinks));
