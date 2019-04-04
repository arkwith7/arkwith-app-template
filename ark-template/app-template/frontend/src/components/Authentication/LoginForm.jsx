import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';
import InputAdornment from '@material-ui/core/InputAdornment';
import Icon from '@material-ui/core/Icon';
import Typography from '@material-ui/core/Typography';

// @material-ui/icons
import Email from '@material-ui/icons/Email';
import People from '@material-ui/icons/People';

// core components
import GridContainer from '../../components/Grid/GridContainer.jsx';
import GridItem from '../../components/Grid/GridItem.jsx';
import Button from '../../components/CustomButtons/Button.jsx';
import Card from '../../components/Card/Card.jsx';
import CardBody from '../../components/Card/CardBody.jsx';
import CardHeader from '../../components/Card/CardHeader.jsx';
import CardFooter from '../../components/Card/CardFooter.jsx';
import CustomInput from '../../components/CustomInput/CustomInput.jsx';

import loginPageStyle from '../../assets/jss/material-dashboard-react/views/loginPage.jsx';

function LoginForm({ ...props }) {
	const { classes, onSubmit, onChange, errors, user, ...rest } = props;
	return (
		<div {...rest}>
			<GridContainer justify="center">
				<GridItem xs={12} sm={12} md={4}>
					<Card>
						<form onSubmit={onSubmit} className={classes.form}>
							<CardHeader color="primary" className={classes.cardHeader}>
								<h4>Login</h4>
								<div className={classes.socialLine}>
									<Button
										justIcon
										href="#pablo"
										target="_blank"
										color="transparent"
										onClick={e => e.preventDefault()}
									>
										<i className={'fab fa-twitter'} />
									</Button>
									<Button
										justIcon
										href="#pablo"
										target="_blank"
										color="transparent"
										onClick={e => e.preventDefault()}
									>
										<i className={'fab fa-facebook'} />
									</Button>
									<Button
										justIcon
										href="#pablo"
										target="_blank"
										color="transparent"
										onClick={e => e.preventDefault()}
									>
										<i className={'fab fa-google-plus-g'} />
									</Button>
								</div>
							</CardHeader>
							<br />
							<Typography component="p" align="center">
								Don't have an account?
								<Link to="/singup">&nbsp;&nbsp;Create one</Link>
							</Typography>
							<Typography component="p" align="center">
								If you want to try login,
								<br />
								Please enter the following username and password.
								<br />
								username : user0, password : user0
							</Typography>
							<CardBody>
								{errors.length > 0 && (
									<ul>
										{errors.map(error => (
											<li key={error.field}>{error.message}</li>
										))}
									</ul>
								)}
								<CustomInput
									labelText="User Name..."
									id="username"
									formControlProps={{ fullWidth: true }}
									inputProps={{
										type: 'text',
										name: 'username',
										onChange: onChange,
										value: user.username,
										endAdornment: (
											<InputAdornment position="end">
												<People className={classes.inputIconsColor} />
											</InputAdornment>
										),
									}}
								/>
								<CustomInput
									labelText="Password"
									id="password"
									formControlProps={{ fullWidth: true }}
									inputProps={{
										type: 'password',
										name: 'password',
										onChange: onChange,
										value: user.password,
										endAdornment: (
											<InputAdornment position="end">
												<Icon className={classes.inputIconsColor}>lock_outline</Icon>
											</InputAdornment>
										),
									}}
								/>
								<CustomInput
									labelText="Email..."
									id="email"
									formControlProps={{ fullWidth: true }}
									inputProps={{
										type: 'email',
										name: 'email',
										onChange: onChange,
										value: user.email,
										endAdornment: (
											<InputAdornment position="end">
												<Email className={classes.inputIconsColor} />
											</InputAdornment>
										),
									}}
								/>
							</CardBody>
							<CardFooter className={classes.cardFooter}>
								<Button type="submit" color="primary" round>
									Log in
								</Button>
							</CardFooter>
						</form>
					</Card>
				</GridItem>
			</GridContainer>
		</div>
	);
}
LoginForm.propTypes = {
	onSubmit: PropTypes.func.isRequired,
	onChange: PropTypes.func.isRequired,
	errors: PropTypes.array.isRequired,
	user: PropTypes.object.isRequired,
};

export default withStyles(loginPageStyle)(LoginForm);
