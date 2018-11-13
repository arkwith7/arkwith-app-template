
import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import Card from "../../components/Card/Card.jsx";
import CardHeader from "../../components/Card/CardHeader.jsx";
import CardBody from "../../components/Card/CardBody.jsx";
import MarkdownViewer from "../../components/MarkdownViewer/ArkwithMarkdownViewer.jsx"
//Reading Markdown file...
import AboutArkwith from "./introArkwith.md";

const style = {
    typo: {
      marginBottom: "40px",
      position: "relative"
    },
    cardTitleWhite: {
      color: "#FFFFFF",
      marginTop: "0px",
      minHeight: "auto",
      fontWeight: "300",
      fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
      marginBottom: "3px",
      textDecoration: "none"
    }
  };

class ArkwithIntroduction extends React.Component {
    constructor(props) {
      super(props);
      this.state = { text: null };
    }
  
    render() {
        const { classes } = this.props;

        return (
        <Card>
          <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Arkwith technology and services.</h4>
          </CardHeader>
          <CardBody>
            <div className={classes.typo}>
            {/*
              <MarkdownViewer markdown={"## Introduction to the arkwith"} />
            */}
              <MarkdownViewer fileName={AboutArkwith} />
            </div>
          </CardBody>
        </Card>
        );
    }
}
  
export default withStyles(style)(ArkwithIntroduction);
  