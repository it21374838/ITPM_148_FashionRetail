import React, { Component } from 'react';
import { register } from './UserFunction';
import { withRouter } from './withRouter';

class Register extends Component {
    constructor() {
        super();
        this.state = {
            first_name: '',
            last_name: '',
            email: '',
            password: '',
            errors: {}
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(e) {
        const { name, value } = e.target;
        let errors = { ...this.state.errors };

        if (name === 'first_name' || name === 'last_name') {
            if (!/^[a-zA-Z]+$/.test(value)) {
                errors[name] = 'Only alphabets are allowed';
            } else {
                delete errors[name];
            }
        } else if (name === 'email') {
            if (!/\S+@\S+\.\S+/.test(value)) {
                errors[name] = 'Invalid email address';
            } else {
                delete errors[name];
            }
        } else if (name === 'password') {
            if (value.length < 6) {
                errors[name] = 'Password must be at least 6 characters long';
            } else {
                delete errors[name];
            }
        }

        this.setState({ [name]: value, errors });
    }

    onSubmit(e) {
        e.preventDefault();

        const { first_name, last_name, email, password, errors } = this.state;
        if (!first_name || !last_name || !email || !password || Object.keys(errors).length > 0) {
            alert('Please fill in all fields correctly.');
            return;
        }

        const user = { first_name, last_name, email, password };

        register(user).then(res => {
            if (res.registered) {
                this.props.navigate('/login');
                window.alert("Registered successfully");
            } else {
                window.alert("Registration failed");
            }
        });
    }

    render() {
        const { first_name, last_name, email, password, errors } = this.state;

        return (
            <div className='container'>
                <div className='row'>
                    <div className='col-md-6 mt-5 mx-auto'>
                        <form noValidate onSubmit={this.onSubmit}>
                            <h1 className='h3 mb-3 font-weight-normal' align="center">Register Form</h1>

                            <div className='form-group'>
                                <label htmlFor='first_name'>First Name</label>
                                <input
                                    type="text"
                                    className='form-control'
                                    name='first_name'
                                    placeholder='Enter First Name'
                                    value={first_name}
                                    onChange={this.onChange}
                                    required
                                />
                                {errors.first_name && <div className="alert alert-danger">{errors.first_name}</div>}
                            </div>

                            <div className='form-group'>
                                <label htmlFor='last_name'>Last Name</label>
                                <input
                                    type="text"
                                    className='form-control'
                                    name='last_name'
                                    placeholder='Enter Last Name'
                                    value={last_name}
                                    onChange={this.onChange}
                                    required
                                />
                                {errors.last_name && <div className="alert alert-danger">{errors.last_name}</div>}
                            </div>

                            <div className='form-group'>
                                <label htmlFor='email'>Email</label>
                                <input
                                    type="email"
                                    className='form-control'
                                    name='email'
                                    placeholder='Enter Email'
                                    value={email}
                                    onChange={this.onChange}
                                    required
                                />
                                {errors.email && <div className="alert alert-danger">{errors.email}</div>}
                            </div>

                            <div className='form-group'>
                                <label htmlFor='password'>Password</label>
                                <input
                                    type="password"
                                    className='form-control'
                                    name='password'
                                    placeholder='Enter Password'
                                    value={password}
                                    onChange={this.onChange}
                                    required
                                />
                                {errors.password && <div className="alert alert-danger">{errors.password}</div>}
                            </div>

                            <button className='btn btn-lg btn-primary btn-block'>Register</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(Register);
