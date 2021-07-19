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
    EuiPageTemplate,
    EuiEmptyPrompt,
    EuiFlexItem,
    EuiButton,
    EuiForm,
    EuiFormRow,
    EuiFieldText,
    EuiCallOut,
    EuiLoadingSpinner,
} from '@elastic/eui';
import axios from 'axios';
import { Link } from 'react-router-dom'

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loader: false,
            AlertText: "",
            AlertType: "error",
        }
    }

    login = () => {
        this.setState({
            loader: true,
            AlertText: "",
        });
        var data = {
            username: this.state.username,
            password: this.state.password
        };
        if (!data.username || !data.password) {
            this.setState({
                AlertText: "Enter all details!",
                errorLocation: "LOGIN",
                AlertType: "danger",
                IconType: "alert",
                loader: false
            });
        } else {
            axios.post('/api/userRoute/login', data).then(response => {
                if (response.data) {
                    console.log(response.data.user);
                    if (response.data.user) {
                        for (const i in response.data) {
                            localStorage.setItem(i, JSON.stringify(response.data[i]));
                        }
                        this.setState({
                            AlertText: response.data.message ? response.data.message : "Unexpected error occured!",
                            errorLocation: "LOGIN",
                            AlertType: "success",
                            IconType: "check",
                            loader: false
                        });
                        window.location.replace('/landing');
                    }
                }
            }
            ).catch(error => {
                this.setState({
                    AlertText: error.response ? error.response.data ? error.response.data.message || "Unexpected error occured!" : "Unexpected error occured!" : "Unexpected error occured!",
                    errorLocation: "LOGIN",
                    AlertType: "danger",
                    IconType: "alert",
                    loader: false
                });
            });
        }
    }

    handleChanges = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render() {
        return (
            <EuiPage>
                <EuiPageBody component="div">
                    <EuiPageContent verticalPosition="center" horizontalPosition="center">
                        <EuiPageContentHeader>
                            <EuiPageContentHeaderSection>
                                <EuiTitle>
                                    <h2>Login</h2>
                                </EuiTitle>
                            </EuiPageContentHeaderSection>
                        </EuiPageContentHeader>
                        <EuiPageContentBody>
                            <EuiForm>
                                <EuiFormRow label="username" helpText="">
                                    <EuiFieldText name="username" placeholder="Enter your username" onChange={this.handleChanges} />
                                </EuiFormRow>
                                <EuiFormRow label="Password" helpText="">
                                    <EuiFieldPassword name="password" placeholder="Enter your password" onChange={this.handleChanges} />
                                </EuiFormRow>
                                <EuiFormRow>
                                    <div style={{
                                        visibility: this.state.AlertText && this.state.errorLocation === "LOGIN" ? "visible" : "hidden",
                                        display: this.state.AlertText && this.state.errorLocation === "LOGIN" ? "block" : "none"
                                    }}>
                                        {this.state.AlertType === 'danger' && <EuiCallOut title={this.state.AlertText} color={this.state.AlertType} iconType={this.state.IconType} />}
                                        {this.state.AlertType === 'success' && <EuiCallOut color={this.state.AlertType}>
                                            <EuiLoadingSpinner size="l" /></EuiCallOut>}
                                    </div>
                                </EuiFormRow>
                                <EuiFormRow>
                                    <EuiFlexItem grow={false}>
                                        <EuiButton onClick={() => this.login()}>Log-In</EuiButton>
                                    </EuiFlexItem>
                                </EuiFormRow>
                                <EuiFormRow>
                                    <EuiFlexItem grow={false}>
                                        <EuiButton onClick={() => this.props.history.push('/signup')}>Signup</EuiButton>
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

export default Login;