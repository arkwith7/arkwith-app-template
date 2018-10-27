import React, {Component} from "react";
import { connect } from "react-redux"
import { tabs } from "../actions";

import { TabContent, TabPane, Nav, NavItem, NavLink, Row, Col } from 'reactstrap';
import classnames from 'classnames';

import {auth} from "../actions";
import Home from "./Home"
import ChatTranslator from "./ChatTranslator";
import PonyNote from "./PonyNote";

class MainMenuTab extends Component {

    componentDidMount() {
        //alert(this.props.activeTab);
        this.props.loadUser();
    }
        
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
              <NavItem>
                <NavLink
                  className={classnames({ active: this.props.activeTab === '3' })}
                  onClick={() => { this.props.changeSelectedTab('3'); }}
                >
                  <i className="fa fa-tasks fa-fw"></i> CRUD Sample App.
                </NavLink>
              </NavItem>
            </Nav>
            <TabContent activeTab={this.props.activeTab}>
              <TabPane tabId="1">
                <Row>
                  <Col sm="12">
                    <Home/>
                  </Col>
                </Row>
              </TabPane>
              <TabPane tabId="2">
                <Row>
                 <Col sm="12">
                  <ChatTranslator/>
                 </Col>
                </Row>
              </TabPane>
              <TabPane tabId="3">
                <Row>
                 <Col sm="12">
                  <PonyNote />
                 </Col>
                </Row>
              </TabPane>
            </TabContent>
          </div>
        );
    }
}
//The state value to be used in the view(Presentation Component) returned by the reducer.
//The name of reducer is auth
const mapStateToProps = state => {
    return {
        activeTab: state.tabs.activeTab,
        auth: state.auth,
    };
}
  
//Change the state of the view(Presentation Component)
// by dispatching an action to the reducer in the store.
const mapDispatchToProps = dispatch => {
    return {
        changeSelectedTab: (selectedTab) => {
            return dispatch(tabs.changeSelectedTab(selectedTab));
        },
        loadUser: () => {
          return dispatch(auth.loadUser());
      },
  };
}
  
export default connect(mapStateToProps, mapDispatchToProps)(MainMenuTab);
