import React, {Component} from "react";
import { connect } from "react-redux"
import { tabs } from "../actions";

import { TabContent, TabPane, Nav, NavItem, NavLink, Row, Col } from 'reactstrap';
import classnames from 'classnames';

import ChatTranslator from "./ChatTranslator";

class MainMenuTab extends Component {

    // constructor(props) {
    //     super(props);
    
    //     this.toggle = this.toggle.bind(this);
    //     this.state = {
    //       activeTab: '1'
    //     };
    // }

    componentDidMount() {
        //alert(this.props.activeTab);
    }
        
    onSubmit = e => {
        e.preventDefault();
        alert(e.target.value);
        console.error("Not implemented!!1");
    }
    

    // toggle(tab) {
    //     if (this.state.activeTab !== tab) {
    //       this.setState({
    //         activeTab: tab
    //       });
    //     }
    // }

    render() {
        return (
          <div>
            <Nav tabs>
              <NavItem>
                <NavLink
                  className={classnames({ active: this.props.activeTab === '1' })}
                  onClick={() => { this.props.changeSelectedTab('1'); }}
                >
                  <i className="fa fa-home fa-fw"></i> Home
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({ active: this.props.activeTab === '2' })}
                  onClick={() => { this.props.changeSelectedTab('2'); }}
                >
                  <i className="fa fa-comments fa-fw"></i> Chat Translator
                </NavLink>
              </NavItem>
            </Nav>
            <TabContent activeTab={this.props.activeTab}>
              <TabPane tabId="1">
                <Row>
                  <Col sm="12">
                    <h4>Tab 1 Contents</h4>
                  </Col>
                </Row>
              </TabPane>
              <TabPane tabId="2">
                <Row>
                  <ChatTranslator/>
                </Row>
              </TabPane>
            </TabContent>
          </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        activeTab: state.tabs.activeTab,
    };
}
  
const mapDispatchToProps = dispatch => {
    return {
        changeSelectedTab: (selectedTab) => {
            return dispatch(tabs.changeSelectedTab(selectedTab));
        },

    };
}
  
export default connect(mapStateToProps, mapDispatchToProps)(MainMenuTab);
