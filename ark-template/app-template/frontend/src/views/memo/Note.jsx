import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Container, Row, Col, Card, CardHeader, CardBody, Button, InputGroup, Input } from 'reactstrap';

import {notes, auth} from "../actions";
import Pagination from '../lib/Pagination.js'
import Login from "./Login";



class Note extends Component {

    state = {
        text: "",
        updateNoteId: null,
        pageSize: 5,
        currentPage: 1,
    }
    // 서버로 부터 데이터 읽어옴
    componentDidUpdate(prevProps) {
        //사용자가 로그인후 한번만 서버로 부터 사용자 아이디로 작성한 note 내용을 가지고 옴
        // Typical usage (don't forget to compare props):
        // this.props.auth.isAuthenticated : true(after login)
        // prevProps.auth.isAuthenticated : false(before login)
        if (this.props.auth.isAuthenticated !== prevProps.auth.isAuthenticated) {
            if(this.props.auth.isAuthenticated) {
                this.props.fetchNotes();
                console.log("PonyNote.componentDidUpdate(prevProps)..... fetchNotes()..")
            }
        }
    }
    //화면에서 reset버튼 누를때 데이터 초기화
    resetForm = () => {
        this.setState({text: "", updateNoteId: null});
    }
    //화면에서 Edit버튼 누를때 화면 표시 처리
    selectForEdit = (noteId) => {
        //주어진 id값으로 notes array에서 index값을 찾아 반환 
        let index = this.noteIdToArrayIndex(noteId);
        let note = this.props.notes[index];
        //index를 이용 수정되는 note내용이 표시되고 있는 페이지 값을 얻음
        let currentPage = Math.ceil( (index + 1) / this.state.pageSize );
        console.log("selectForEdit index : ",index)
        console.log("selectForEdit currentPage : ",currentPage)
        this.setState({text: note.text, updateNoteId: index, currentPage: currentPage});
    }
    //화면에서 Delete 버튼 누를때 화면 처리
    executeDeleteNote = (noteId) => {
        //주어진 id값으로 notes array에서 index값을 찾아 반환 
        let index = this.noteIdToArrayIndex(noteId);
        //index를 이용 삭제되는 note내용이 표시되고 있는 페이지 값을 얻음
        let currentPage = Math.ceil( (index + 1) / this.state.pageSize );
        this.props.deleteNote(this.noteIdToArrayIndex(noteId));
        //삭제된 내용이 있던 페이지가 표시되도록 페이지 값 설정
        this.setState({currentPage: currentPage});
    }
    //화면 표시를 위한 note data array에서 database의 note id로 부터 data array의 index를 찾는 함수
    noteIdToArrayIndex = (noteId) => {
        let index = this.props.notes.findIndex(note => note.id === noteId);
        return index;
    }
    //화면에서 Save버튼 클릭시 note내용 신규입력 또는 기존 내용 수정
    submitNote = (e) => {
        e.preventDefault();
        let lastPage =  Math.ceil( (this.props.notes.length + 2) / this.state.pageSize );
        if (this.state.updateNoteId === null) {
            this.props.addNote(this.state.text).then(this.resetForm)
            this.setState({currentPage: lastPage});
        } else {
            this.props.updateNote(this.state.updateNoteId, this.state.text).then(this.resetForm);
        }
    }

    render() {
        //console.log("PonyNote.render().isAuthenticated : ",this.props.auth.isAuthenticated)
        if (!this.props.auth.isAuthenticated) {
            return <Login />;
        }
        return (
          <Container>
            <Card className="panel panel-default">

            <div className="panel panel-default" >
              <CardHeader className="panel-heading" >
               <Row>
                <Col xs="6">
                 <div style={{textAlign: "left"}}>
                  <h5>Welcome to Note App!</h5>
                 </div>
                </Col>
                <Col xs="6">
                 <div style={{textAlign: "right"}}>
                  [{this.props.user.username}]&nbsp;
                  <Button className="btn btn-primary btn-circle" data-toggle="tooltip" data-placement="bottom" title="Logout"
                  onClick={this.props.logout}><i className="fa fa-sign-out fa-fw"></i>
                  </Button>
                 </div>
                </Col>
               </Row>
              
              </CardHeader>

              <CardBody className="panel-body">
                <br/>
                <h5>Add new note</h5>
                <form onSubmit={this.submitNote}>
                 <InputGroup>
                    <Input className="form-control input-sm" type="text"
                        value={this.state.text}
                        placeholder="Enter note here..."
                        onChange={(e) => this.setState({text: e.target.value})}
                        required />
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
                {/*note 목록 페이지 네비게이션 표시 initialPage:표시할 페이지 번호, 처음은 1, pageSize:한페이지에 표시실 note 목록 숫자, 5로 설정됨.
                onChangePage: Pagination컴포넌트에서 전체 note 목록중 페이지 네비게이션이 진행 됨에 따라 pageOfItems로 화면에 표시될 note 목록을 array 형태로 교환.
                */}
                <Pagination items={this.props.notes} initialPage={this.state.currentPage} pageSize={this.state.pageSize} onChangePage={this.props.onChangePage} />
                <table className="table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Note</th>
                            <th style={{textAlign: "right"}}>Edit</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* 
                        {this.props.notes.map((note, id) => (
                        */}
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
                    </tbody>
                </table>
            </div>
            </Card>
          </Container>
        )
    }
}


const mapStateToProps = state => {
    return {
        notes: state.notes.noteList,
        pageOfItems: state.notes.pageOfItems,
        auth: state.auth,
        user: state.auth.user,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchNotes: () => {
            dispatch(notes.fetchNotes());
        },
        addNote: (text) => {
            return dispatch(notes.addNote(text));
        },
        updateNote: (id, text) => {
            return dispatch(notes.updateNote(id, text));
        },
        deleteNote: (id) => {
            dispatch(notes.deleteNote(id));
        },
        onChangePage: (pageOfItems) => {
            return dispatch(notes.onChangePage(pageOfItems));
        },
        logout: () => dispatch(auth.logout()),
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Note);
