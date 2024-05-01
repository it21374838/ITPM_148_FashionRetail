import React, { Component } from 'react';
import { login } from './UserFunction';
import { withRouter } from './withRouter';

class Login extends Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            errors: {}
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    validateForm() {
        let errors = {};
        let formIsValid = true;

        // Email validation
        if (!this.state.email) {
            formIsValid = false;
            errors["email"] = "*Please enter your email.";
        }

        if (typeof this.state.email !== "undefined") {
            var pattern = new RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
            if (!pattern.test(this.state.email)) {
                formIsValid = false;
                errors["email"] = "*Please enter valid email.";
            }
        }

        // Password validation
        if (!this.state.password) {
            formIsValid = false;
            errors["password"] = "*Please enter your password.";
        }

        if (typeof this.state.password !== "undefined") {
            if (this.state.password.length < 6) {
                formIsValid = false;
                errors["password"] = "*Please enter at least 6 characters.";
            }
        }

        this.setState({
            errors: errors
        });

        return formIsValid;
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit(e) {
        e.preventDefault();

        if (this.validateForm()) {
            const user = {
                email: this.state.email,
                password: this.state.password
            };

            login(user)
            .then(res => {
              if (res.success) {
                localStorage.setItem('usertoken', res.token);
                console.log('Token stored in local storage:', localStorage.usertoken);
                this.props.navigate('/profile');
              } else {
                alert(res.error);            
              }
            }) 
            .catch(err => {
              console.log(err);
            });
        }
    }

    render() {
        const { errors } = this.state;
        return (
            <div className='container'>
                <div className='row'>
                    <div className='col-md-6 mt-5 mx-auto'>
                        <form noValidate onSubmit={this.onSubmit}>
                            <h3 className='mb-3 font-weight-normal' align="center">Login</h3>
                            <div className='form-group'>
                                <label htmlFor='email'>Email</label>
                                <input
                                    type="email"
                                    className='form-control'
                                    name='email'
                                    placeholder='Enter email'
                                    value={this.state.email}
                                    onChange={this.onChange}
                                />
                                <div className="text-danger">{errors.email}</div>
                            </div>

                            <div className='form-group'>
                                <label htmlFor='password'>Password</label>
                                <input
                                    type="password"
                                    className='form-control'
                                    name='password'
                                    placeholder='Enter password'
                                    value={this.state.password}
                                    onChange={this.onChange}
                                />
                                <div className="text-danger">{errors.password}</div>
                            </div>

                            <button type='submit' className='btn btn-lg btn-primary btn-block'>Sign In</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(Login);
