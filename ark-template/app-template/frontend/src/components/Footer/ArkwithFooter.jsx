import React from "react";
import PropTypes from "prop-types";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
//import ListItem from "@material-ui/core/ListItem";
//import List from "@material-ui/core/List";
// core components
import footerStyle from "../../assets/jss/material-dashboard-react/components/footerStyle.jsx";

function ArkwithFooter({ ...props }) {
  const { classes } = props;
  return (
    <footer className={classes.footer}>
      <div className={classes.container}>
        <div className={classes.center}>
            <p>They replied, "Believe in the Lord Jesus, and you will be saved you and your household." (Acts 16:31)</p>
        </div>
        <div className={classes.center}>
            <p>
            <span>
                &copy; {1900 + new Date().getYear()}{" "}
                <a href="https://www.arkwith.com" className={classes.a}>
                Arkwith
                </a>, to make a better world with customers and partners.
            </span>
            </p>
        </div>
      </div>
    </footer>
  );
}

ArkwithFooter.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(footerStyle)(ArkwithFooter);
