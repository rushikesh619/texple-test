import React, { Component } from 'react';
import '@elastic/eui/dist/eui_theme_light.css';

import {
    EuiPage,
    EuiPageBody,
    EuiPageContent,
    EuiPageContentBody,
    EuiPageContentHeader,
    EuiPageContentHeaderSection,
    EuiTitle,
    EuiFieldPassword,
    EuiFlexItem,
    EuiButton,
    EuiForm,
    EuiFormRow,
    EuiFieldText,
    EuiCallOut,
    EuiLoadingSpinner,
} from '@elastic/eui';
import axios from 'axios';

class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loader: false,
            AlertText: "",
            AlertType: "danger"
        }
    }

    handleChanges = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onFinish = () => {
        try {
            this.setState({
                loader: true,
                AlertText: "",
            });
            var data = {
                username: this.state.username,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                password: this.state.password
            };
            if (!data.username || !data.firstName || !data.lastName || !data.password) {
                this.setState({
                    AlertText: "Enter all details!",
                    errorLocation: "SIGNUP",
                    AlertType: "danger",
                    IconType: "alert",
                    loader: false
                })
            } else {
                axios.post('/api/userRoute/register', data)
                    .then(response => {
                        if (response.data.message === "OK") {
                            window.location.replace('/login');
                        } else {
                            this.setState({
                                AlertText: response.data.message ? response.data.message : "Unexpected error occured!",
                                errorLocation: "SIGNUP",
                                AlertType: "danger",
                                IconType: "alert",
                                loader: false
                            });
                        }
                    }).catch(error => {
                        this.setState({
                            AlertText: error.response ? error.response.data ? error.response.data.message || "Unexpected error occured!" : "Unexpected error occured!" : "Unexpected error occured!",
                            errorLocation: "SIGNUP",
                            AlertType: "danger",
                            IconType: "alert",
                            loader: false
                        });
                    });
            }
        } catch (ex) {
            console.log(ex)
        }
    }

    render() {
        return (
            <EuiPage>
                <EuiPageBody component="div">
                    <EuiPageContent verticalPosition="center" horizontalPosition="center">
                        <EuiPageContentHeader>
                            <EuiPageContentHeaderSection>
                                <EuiTitle>
                                    <h2>SignUp</h2>
                                </EuiTitle>
                            </EuiPageContentHeaderSection>
                        </EuiPageContentHeader>
                        <EuiPageContentBody>
                            <EuiForm component="form">
                                <EuiFormRow label="username" helpText="">
                                    <EuiFieldText name="username" placeholder="Enter your username address" onChange={this.handleChanges} />
                                </EuiFormRow>
                                <EuiFormRow label="First Name" helpText="">
                                    <EuiFieldText name="firstName" placeholder="Enter your first name" onChange={this.handleChanges} />
                                </EuiFormRow>
                                <EuiFormRow label="Last Name" helpText="">
                                    <EuiFieldText name="lastName" placeholder="Enter your last name" onChange={this.handleChanges} />
                                </EuiFormRow>
                                <EuiFormRow label="Password" helpText="">
                                    <EuiFieldPassword
                                        name="password"
                                        placeholder="Enter your password"
                                        aria-label="" onChange={this.handleChanges}
                                    />
                                </EuiFormRow>
                                <EuiFormRow>
                                    <div style={{
                                        visibility: this.state.AlertText && this.state.errorLocation === "SIGNUP" ? "visible" : "hidden",
                                        display: this.state.AlertText && this.state.errorLocation === "SIGNUP" ? "block" : "none"
                                    }}>
                                        <EuiCallOut title={this.state.AlertText} color={this.state.AlertType} iconType={this.state.IconType} />
                                    </div>
                                </EuiFormRow>
                                <EuiFormRow>
                                    <EuiFlexItem grow={false}>
                                        <EuiButton onClick={() => this.onFinish()}>Sign-Up</EuiButton>
                                    </EuiFlexItem>
                                </EuiFormRow>
                                <EuiFormRow>
                                    <EuiFlexItem grow={false}>
                                        <EuiButton onClick={() => this.props.history.push('/login')}>Login</EuiButton>
                                    </EuiFlexItem>
                                </EuiFormRow>
                            </EuiForm>
                        </EuiPageContentBody>
                    </EuiPageContent>
                </EuiPageBody>
            </EuiPage>
        );
    }
}

export default Signup;