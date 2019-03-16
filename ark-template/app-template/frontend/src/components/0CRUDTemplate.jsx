// This is a CRUD(Create, Read, Update, Delete) App Components template that 
// queries the list and adds, modifies, and deletes new content.
// To use this one, you can rename the class name, CRUDTemplate
// and add the your logic.
import React, { Component } from 'react';
// Redux
import {connect} from 'react-redux';
// Bootstrap4
import { Container, Row, Col, Card, CardHeader, CardBody, Button, InputGroup, Input } from 'reactstrap';

//Add Action for this application here.
//import {notes, auth} from "../actions";

//Add library for this application here
import Pagination from '../lib/Pagination.js'

//Rename CRUDTemplate into your components class name.
class CRUDTemplate extends Component {

    //Declares a variable that represents the changing state value 
    // of the displayed screen
    state = {
        //text: "",
        //updateNoteId: null,
        pageSize: 5,
        currentPage: 1,
    }
    // Reading data from back-end
    componentDidMount() {

    }

    //Initialize data when pressing reset button on screen
    resetForm = () => {
        //this.setState({text: "", updateNoteId: null});
    }

    //Displayed in Input of Form when Edit button is clicked in list.
    selectForEdit = (id) => {
        //this.setState({text: note.text, updateNoteId: index, currentPage: currentPage});
    }

    //Processing when Delete button is clicked in list.
    executeDelete = (id) => {
        //this.setState({currentPage: currentPage});
    }

    //To register new content or modify existing content when Save button is clicked on the screen .
    submitContents = (e) => {
        e.preventDefault();
    }

    render() {

        return (
          <Container>
            <Card className="panel panel-default">

            <div className="panel panel-default" >
              <CardHeader className="panel-heading" >
               <Row>
               <Col xs="6">
                {/*
                Please write your application title here.
                Like the example code below. 
                 <div style={{textAlign: "left"}}>
                  <h5>Welcome to Note App!</h5>
                 </div>
                */}
                </Col>
                <Col xs="6">
                {/*
                Please write your application title here.
                Like the example code below. 
                 <div style={{textAlign: "right"}}>
                  [{this.props.user.username}]&nbsp;
                  <Button className="btn btn-primary btn-circle" data-toggle="tooltip" data-placement="bottom" title="Logout"
                  onClick={this.props.logout}><i className="fa fa-sign-out fa-fw"></i>
                  </Button>
                 </div>
                */}
                </Col>
               </Row>
              
              </CardHeader>

              <CardBody className="panel-body">
                <br/>
                {/*
                Please write Action title of your application here.
                Like the example code below. 

                <h5>Add new XXX</h5>
                */}
                <form onSubmit={this.submitContents}>
                 <InputGroup>
                {/*
                Please write Input element of your application here.
                Like the example code below. 

                    <Input className="form-control input-sm" type="text"
                        value={""}
                        placeholder="write your field placeholder..."
                        onChange={(e) => this.setState({"write your field name...": e.target.value})}
                        required />
                */}
                    <Button className="btn btn-primary btn-circle" data-toggle="tooltip" data-placement="bottom" title="Reset"
                      onClick={this.resetForm}><i className="fa fa-refresh fa-fw"></i>
                    </Button>&nbsp;&nbsp;
                    <Button className="btn btn-primary btn-circle" data-toggle="tooltip" data-placement="bottom" title="Save"  type="submit">
                      <i className="fa fa-save fa-fw"></i>
                    </Button>
				 </InputGroup> 
                </form>
              </CardBody>
                <br/>
                {/*
                Please write your page navigation code here.
                Like the example code below. 

                <Pagination items={"this.props.notes"} initialPage={this.state.currentPage} pageSize={this.state.pageSize} onChangePage={this.props.onChangePage} />

                items: This is the entire contents of the list. This tells the entire record from the backend.
                initialPage: page number to display, initially 1, 
                pageSize: display on one page note list number, set to 5.
                onChangePage: Swaps the list to be displayed on the screen as an array in pageOfItems as the page navigation progresses through the entire list in the Pagination component.

                */}
                <table className="table">
                    <thead>
                {/*
                Please write the title of the list that appears in table here.
                Like the example code below. 

                        <tr>
                            <th>#</th>
                            <th>write your field lable...</th>
                            <th style={{textAlign: "right"}}>Edit</th>
                        </tr>

                */}
                    </thead>
                    <tbody>
                {/*
                Please write a list here that appears as a table.
                Like the example code below. 

                        {this.props.pageOfItems.map((note, id) => (
                            <tr key={`note_${note.id}`}>
                                <td>{id+1}</td>
                                <td>{note.text}</td>
                                <td style={{textAlign: "right"}}>
                                    <Button className="btn btn-primary btn-circle" data-toggle="tooltip" data-placement="bottom" title="Edit"
                                      onClick={() => this.selectForEdit(note.id)}>
                                      <i className="fa fa-edit fa-fw"></i>
                                    </Button>&nbsp;
                                    <Button className="btn btn-primary btn-circle" data-toggle="tooltip" data-placement="bottom" title="Delete"
                                     onClick={() => this.executeDeleteNote(note.id)}>
                                      <i className="fa fa-trash-o fa-fw"></i>                                     
                                    </Button>
                                </td>
                            </tr>
                        ))}
                */}
                    </tbody>
                </table>
            </div>
            </Card>
          </Container>
        )
    }
}

//The state to be globally referenced between components and components.
//This one is an application state variable that is used by a reducer 
//to set a variable handled by a specific action.
const mapStateToProps = state => {
    return {
    }
}

//Declare a function that sends an action from one component to another.
//This one is action function of actions folder for this application
const mapDispatchToProps = dispatch => {
    return {
    }
}


//Rename CRUDTemplate into your components class name.
export default connect(mapStateToProps, mapDispatchToProps)(CRUDTemplate);
