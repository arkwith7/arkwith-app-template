import React from "react";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import Hidden from "@material-ui/core/Hidden";

// @material-ui/icons
import AccountCircle from "@material-ui/icons/AccountCircle";

// core components
import Button from "../CustomButtons/Button.jsx";

import headerLinksStyle from "../../assets/jss/material-dashboard-react/components/headerLinksStyle.jsx";

class ArkwithHeaderLinks extends React.Component {
  state = {
    auth: true,
    anchorEl: null
  };
  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    // eslint-disable-next-line react/prop-types
    const { classes } = this.props;
    const { auth, anchorEl } = this.state;
    const open = Boolean(anchorEl);
    return (
      <div>
        {auth && (
          // eslint-disable-next-line react/jsx-no-comment-textnodes
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
              <MenuItem onClick={this.handleClose}>Profile</MenuItem>
              <MenuItem onClick={this.handleClose}>My account</MenuItem>
            </Menu>
          </div>
        )}
      </div>
    );
  }
}

export default withStyles(headerLinksStyle)(ArkwithHeaderLinks);
