import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import classNames from 'classnames';
// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';
import InputLabel from '@material-ui/core/InputLabel';
import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import Autorenew from '@material-ui/icons/Autorenew';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import Paper from '@material-ui/core/Paper';
// core components
import GridItem from '../../components/Grid/GridItem.jsx';
import GridContainer from '../../components/Grid/GridContainer.jsx';
import Card from '../../components/Card/Card.jsx';
import CardHeader from '../../components/Card/CardHeader.jsx';
import CardBody from '../../components/Card/CardBody.jsx';
import CustomInput from '../../components/CustomInput/CustomInput.jsx';

//import { Container, Row, Col, Card, CardHeader, CardBody, Button, InputGroup, Input } from 'reactstrap';

import { notes, auth } from '../../actions';
import Pagination from '../../lib/Pagination.js';
import Login from '../Authentication/Login';
import TablePaginationActions from '../../lib/TablePaginationActions';

const actionsStyles = theme => ({
	root: {
		flexShrink: 0,
		color: theme.palette.text.secondary,
		marginLeft: theme.spacing.unit * 2.5,
	},
});

const TablePaginationActionsWrapped = withStyles(actionsStyles, { withTheme: true })(TablePaginationActions);
const CustomTableCell = withStyles(theme => ({
	head: {
		backgroundColor: theme.palette.common.black,
		color: theme.palette.common.white,
	},
	body: {
		fontSize: 14,
	},
}))(TableCell);

const styles = theme => ({
	root: {
		width: '100%',
		marginTop: theme.spacing.unit * 3,
		overflowX: 'auto',
	},
	table: {
		minWidth: 700,
	},
	fab: {
		margin: theme.spacing.unit,
	},
	button: {
		margin: theme.spacing.unit,
	},
	leftIcon: {
		marginRight: theme.spacing.unit,
	},
	rightIcon: {
		marginLeft: theme.spacing.unit,
	},
	iconSmall: {
		fontSize: 20,
	},
	cardCategoryWhite: {
		'&,& a,& a:hover,& a:focus': {
			color: 'rgba(255,255,255,.62)',
			margin: '0',
			fontSize: '14px',
			marginTop: '0',
			marginBottom: '0',
		},
		'& a,& a:hover,& a:focus': {
			color: '#FFFFFF',
		},
	},
	cardTitleWhite: {
		color: '#FFFFFF',
		marginTop: '0px',
		minHeight: 'auto',
		fontWeight: '300',
		fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
		marginBottom: '3px',
		textDecoration: 'none',
		'& small': {
			color: '#777',
			fontSize: '65%',
			fontWeight: '400',
			lineHeight: '1',
		},
	},
});

class CRUDExample extends Component {
	state = {
		text: '',
		updateNoteId: null,
		pageSize: 5,
		currentPage: 1,
		//TablePaginationActions
		page: 0,
		rowsPerPage: 5,
	};
	componentDidMount() {
		console.log('CRUDExample.componentDidMount()...');
		if (this.props.auth.isAuthenticated) {
			this.props.fetchNotes();
			console.log('CRUDExample.componentDidMount()..... fetchNotes()..');
		}
	}
	// 서버로 부터 데이터 읽어옴
	componentDidUpdate(prevProps) {
		//사용자가 로그인후 한번만 서버로 부터 사용자 아이디로 작성한 note 내용을 가지고 옴
		// Typical usage (don't forget to compare props):
		// this.props.auth.isAuthenticated : true(after login)
		// prevProps.auth.isAuthenticated : false(before login)
		if (this.props.auth.isAuthenticated !== prevProps.auth.isAuthenticated) {
			if (this.props.auth.isAuthenticated) {
				this.props.fetchNotes();
				console.log('CRUDExample.componentDidUpdate(prevProps)..... fetchNotes()..');
			}
		}
	}
	//화면에서 reset버튼 누를때 데이터 초기화
	resetForm = () => {
		this.setState({ text: '', updateNoteId: null });
	};
	//화면에서 Edit버튼 누를때 화면 표시 처리
	selectForEdit = noteId => {
		//주어진 id값으로 notes array에서 index값을 찾아 반환
		let index = this.noteIdToArrayIndex(noteId);
		let note = this.props.notes[index];
		//index를 이용 수정되는 note내용이 표시되고 있는 페이지 값을 얻음
		let currentPage = Math.ceil((index + 1) / this.state.pageSize);
		console.log('selectForEdit index : ', index);
		console.log('selectForEdit currentPage : ', currentPage);
		this.setState({ text: note.text, updateNoteId: index, currentPage: currentPage });
	};
	//화면에서 Delete 버튼 누를때 화면 처리
	executeDeleteNote = noteId => {
		//주어진 id값으로 notes array에서 index값을 찾아 반환
		let index = this.noteIdToArrayIndex(noteId);
		//index를 이용 삭제되는 note내용이 표시되고 있는 페이지 값을 얻음
		let currentPage = Math.ceil((index + 1) / this.state.pageSize);
		this.props.deleteNote(this.noteIdToArrayIndex(noteId));
		//삭제된 내용이 있던 페이지가 표시되도록 페이지 값 설정
		this.setState({ currentPage: currentPage });
	};
	//화면 표시를 위한 note data array에서 database의 note id로 부터 data array의 index를 찾는 함수
	noteIdToArrayIndex = noteId => {
		let index = this.props.notes.findIndex(note => note.id === noteId);
		return index;
	};
	//화면에서 Save버튼 클릭시 note내용 신규입력 또는 기존 내용 수정
	submitNote = e => {
		e.preventDefault();
		let lastPage = Math.ceil((this.props.notes.length + 2) / this.state.pageSize);
		if (this.state.updateNoteId === null) {
			this.props.addNote(this.state.text).then(this.resetForm);
			this.setState({ currentPage: lastPage });
		} else {
			this.props.updateNote(this.state.updateNoteId, this.state.text).then(this.resetForm);
		}
	};

	// TablePaginationActions
	handleChangePage = (event, page) => {
		this.setState({ page });
	};

	handleChangeRowsPerPage = event => {
		this.setState({ page: 0, rowsPerPage: event.target.value });
	};

	render() {
		//console.log("CRUDExample.render().isAuthenticated : ",this.props.auth.isAuthenticated)
		if (!this.props.auth.isAuthenticated) {
			return <Redirect to="/login" />;
			// return <Login />;
		}
		const { notes, classes } = this.props;
		const { rowsPerPage, page } = this.state;
		const emptyRows = rowsPerPage - Math.min(rowsPerPage, notes.length - page * rowsPerPage);

		return (
			<GridContainer>
				<GridItem xs={12} sm={12} md={12}>
					<Card plain>
						<CardHeader plain color="primary">
							<h4 className={classes.cardTitleWhite}>Welcome to CRUD Example App!</h4>
							<p className={classes.cardCategoryWhite}>Here is a subtitle for this table</p>
						</CardHeader>
						<CardBody>
							<form onSubmit={this.submitNote}>
								<GridContainer>
									<GridItem xs={12} sm={12} md={8}>
										<CustomInput
											labelText="Note..."
											id="note"
											formControlProps={{
												fullWidth: true,
											}}
											inputProps={{
												type: 'text',
												name: 'note',
												onChange: e => this.setState({ text: e.target.value }),
												value: this.state.text,
											}}
										/>
									</GridItem>
									<GridItem xs={12} sm={12} md={2}>
										<Button
											variant="contained"
											color="primary"
											size="small"
											onClick={this.resetForm}
											className={classes.button}
										>
											<Autorenew className={classNames(classes.leftIcon, classes.iconSmall)} />
											Reset
										</Button>
									</GridItem>
									<GridItem xs={12} sm={12} md={2}>
										<Button
											variant="contained"
											color="primary"
											size="small"
											type="submit"
											className={classes.button}
										>
											<SaveIcon className={classNames(classes.leftIcon, classes.iconSmall)} />
											Save
										</Button>
									</GridItem>
								</GridContainer>
							</form>
							<Paper className={classes.root}>
								<Table className={classes.table}>
									<TableHead>
										<TableRow>
											<CustomTableCell>#</CustomTableCell>
											<CustomTableCell align="center">Note</CustomTableCell>
											<CustomTableCell align="right">Edit</CustomTableCell>
										</TableRow>
									</TableHead>
									<TableBody>
										{notes
											.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
											.map((row, id) => (
												<TableRow key={`note_${row.id}`}>
													<CustomTableCell component="th" scope="row">
														{id + 1}
													</CustomTableCell>
													<CustomTableCell align="left">{row.text}</CustomTableCell>
													<CustomTableCell align="right">
														<IconButton
															aria-label="Edit"
															className={classes.margin}
															onClick={() => this.selectForEdit(row.id)}
														>
															<EditIcon fontSize="small" />
														</IconButton>
														<IconButton
															aria-label="Delete"
															className={classes.margin}
															onClick={() => this.executeDeleteNote(row.id)}
														>
															<DeleteIcon fontSize="small" />
														</IconButton>
													</CustomTableCell>
												</TableRow>
											))}
										{emptyRows > 0 && (
											<TableRow style={{ height: 48 * emptyRows }}>
												<CustomTableCell colSpan={6} />
											</TableRow>
										)}
									</TableBody>
									<TableFooter>
										<TableRow>
											<TablePagination
												rowsPerPageOptions={[5, 10, 25]}
												colSpan={3}
												count={notes.length}
												rowsPerPage={rowsPerPage}
												page={page}
												SelectProps={{
													native: false,
												}}
												onChangePage={this.handleChangePage}
												onChangeRowsPerPage={this.handleChangeRowsPerPage}
												ActionsComponent={TablePaginationActionsWrapped}
											/>
										</TableRow>
									</TableFooter>
								</Table>
							</Paper>
						</CardBody>
					</Card>
				</GridItem>
			</GridContainer>
		);
	}
}

const mapStateToProps = state => {
	return {
		notes: state.notes.noteList,
		pageOfItems: state.notes.pageOfItems,
		auth: state.auth,
		user: state.auth.user,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		fetchNotes: () => {
			dispatch(notes.fetchNotes());
		},
		addNote: text => {
			return dispatch(notes.addNote(text));
		},
		updateNote: (id, text) => {
			return dispatch(notes.updateNote(id, text));
		},
		deleteNote: id => {
			dispatch(notes.deleteNote(id));
		},
		onChangePage: pageOfItems => {
			return dispatch(notes.onChangePage(pageOfItems));
		},
		logout: () => dispatch(auth.logout()),
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withStyles(styles)(CRUDExample));
