import React, { Component } from 'react';
import '../../basic/login/login.css';
import { Form, Icon, Input, Button, Select } from 'antd';
// import queryString from 'query-string';
import apis from '../../../services/Apis';
import { Post } from '../../../services/axiosCall';
import Alert from '../../common/alert';
const { Option } = Select;

class TraineeRegisterForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			// inform: true,
			// testid: null,
			// user: null,
			// link: null,
		};
	}

	// componentDidMount() {
	// let params = queryString.parse(this.props.location.search);
	// this.setState({ testid: params.testid });
	// }

	handleSubmit = (e) => {
		e.preventDefault();

		this.props.form.validateFields((err, values) => {
			if (!err) {
				console.log('All good');
				Post({
					url: apis.CREATE_TRAINEE_ACCOUNT,
					data: {
						name: values.name,
						emailid: values.email,
						contact: `${values.prefix}${values.contact}`,
						// testid: this.state.testid,
						password: values.password,
					},
				})
					.then((data) => {
						if (data.data.success) {
							// this.setState({
							// inform: false,
							// user: data.data.user,
							// link: data.data.testLink,
							// });
							this.props.form.resetFields();
							Alert('success', 'Success !', data.data.message);
						} else {
							Alert('error', 'Error !', data.data.message);
							// this.setState({ inform: false, link: data.data.testLink });
						}
					})
					.catch((error) => {
						console.log(error);
						Alert('error', 'Error!', 'Server Error');
					});
			}
		});
	};

	render() {
		const { getFieldDecorator } = this.props.form;

		const prefixSelector = getFieldDecorator('prefix', {
			initialValue: '+65',
			rules: [{ required: true, message: 'Please enter contact no prefix' }],
		})(
			<Select style={{ width: 70 }}>
				<Option value='+65'>+65</Option>
			</Select>
		);

		return (
			<div
				style={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					height: '100vh',
				}}
			>
				{/* {this.state.inform ? ( */}
				<div className='login-container'>
					<div className='login-inner'>
						<h1>Create Student Account</h1>
						<Form onSubmit={this.handleSubmit} className='login-form'>
							<Form.Item label='Name' hasFeedback>
								{getFieldDecorator('name', {
									rules: [
										{ required: true, message: 'Please enter your name' },
									],
								})(
									<Input
										prefix={
											<Icon type='user' style={{ color: 'rgba(0,0,0,.25)' }} />
										}
										placeholder='Name'
									/>
								)}
							</Form.Item>
							<Form.Item label='Email Id' hasFeedback>
								{getFieldDecorator('email', {
									rules: [
										{
											type: 'email',
											message: 'This is not valid E-mail!',
										},
										{
											required: true,
											message: 'Please enter your E-mail!',
										},
									],
								})(
									<Input
										prefix={
											<Icon type='mail' style={{ color: 'rgba(0,0,0,.25)' }} />
										}
										placeholder='Email Id'
									/>
								)}
							</Form.Item>

							<Form.Item label='Password' hasFeedback>
								{getFieldDecorator('password', {
									rules: [
										{
											required: true,
											message: 'Please enter a password',
										},
									],
								})(
									<Input.Password
										prefix={
											<Icon type='lock' style={{ color: 'rgba(0,0,0,.25)' }} />
										}
										placeholder='Password'
									/>
								)}
							</Form.Item>

							<Form.Item label='Confirm Password' hasFeedback>
								{getFieldDecorator('confirmPassword', {
									rules: [
										{
											required: true,
											message: 'Please confirm your password',
										},
										{
											validator: (rule, value, cb) => {
												if (
													this.props.form.getFieldValue('password') !== value
												) {
													cb(new Error('Passwords do not match'));
												} else {
													cb();
												}
											},
										},
									],
								})(
									<Input.Password
										prefix={
											<Icon type='mail' style={{ color: 'rgba(0,0,0,.25)' }} />
										}
										placeholder='Confirm Password'
									/>
								)}
							</Form.Item>

							<Form.Item label='Phone Number' hasFeedback>
								{getFieldDecorator('contact', {
									rules: [
										{
											required: true,
											message: 'Please enter your phone number!',
										},
										{
											len: 8,
											message: 'Contact number must be 8 digit long',
										},
									],
								})(<Input addonBefore={prefixSelector} min={8} max={8} />)}
							</Form.Item>

							<Form.Item>
								<Button
									type='primary'
									htmlType='submit'
									className='button'
									style={{ width: '100%', marginTop: 10 }}
									onClick={this.handleSubmit}
								>
									Register
								</Button>
							</Form.Item>
						</Form>
					</div>
				</div>
				{/* ) : ( */}
				{/* <Redirect to={this.state.link} /> */}
				{/* )} */}
			</div>
		);
	}
}

const TraineeRegister = Form.create({ name: 'Trainee Registration' })(
	TraineeRegisterForm
);

export default TraineeRegister;
