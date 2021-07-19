import React, { Component, Fragment } from 'react';
import '@elastic/eui/dist/eui_theme_light.css';
import {
    EuiPageTemplate,
    EuiFlexGroup,
    EuiFlexItem,
    EuiSelect,
    EuiPageContentBody,
    EuiText,
    EuiLink,
    EuiTextAlign,
    EuiButton,
    EuiFieldText,
} from '@elastic/eui';
import axios from 'axios';

class Landing extends Component {
    constructor(props) {
        super(props);
        this.state = {
            location: [],
            selectedKing: " "
        }
    }

    componentDidMount() {
        this.getInitialData();
    }

    getInitialData() {
        axios.get('/api/battleRoute/getInitialData').then((res) => {
            console.log(res.data.result.kings)
            this.setState({
                kings: res.data.result.kings,
                battle_type: res.data.result.battle_type,
                location: res.data.result.location,
                region: res.data.result.region
            });

        }).catch(err => {
            console.log(err);
        })
    }

    getBattlePlaces() {
        axios.get('/api/battleRoute/list').then((res) => {
            console.log(res.data.result);
            alert(res.data.result);
        }).catch(err => {
            console.log(err);
        })
    }

    totalBattle() {
        axios.get('/api/battleRoute/count').then((res) => {
            console.log(res.data.result);
            alert(res.data.result);
        }).catch(err => {
            console.log(err);
        })
    }

    getStats() {
        axios.get('/api/battleRoute/stats').then((res) => {
            console.log(res.data.result);
            alert(JSON.stringify(res.data.result.most_active),
                JSON.stringify(res.data.result.attacker_outcome));
        }).catch(err => {
            console.log(err);
        })
    }

    onChange = (e) => {
        console.log(this.state.kings);
        console.log(e.target.value);
        this.setState({ selectedKing: e.target.value });
    };

    render() {
        return (
            <EuiPageTemplate
                pageHeader={{
                    pageTitle: 'Test App',
                }}
                pageContentProps={{ paddingSize: 'none' }}>
                <EuiPageContentBody>
                    <EuiText size="l">
                        <EuiTextAlign textAlign="center">
                            <h1>To demonstrate the usage of Elastic UI and rest-api</h1>
                            <h2>Developers Info :-
                                <EuiLink color="subdued" href="http://rushikesh619.github.io/">
                                    http://rushikesh619.github.io/
                                </EuiLink>
                            </h2>
                        </EuiTextAlign>
                    </EuiText>
                    <EuiFlexGroup gutterSize="s" alignItems="center" justifyContent='center'>
                        <EuiFlexItem grow={false}>
                            <EuiButton onClick={() => { this.getBattlePlaces() }}>
                                List of places where battle has taken place.
                            </EuiButton>
                        </EuiFlexItem>

                        <EuiFlexItem grow={false}>
                            <EuiButton onClick={() => { this.totalBattle() }}>
                                total number of battle occurred.
                            </EuiButton>
                        </EuiFlexItem>

                        <EuiFlexItem grow={false}>
                            <EuiButton onClick={() => { this.getStats() }}>
                                statistics of Battles
                            </EuiButton>
                        </EuiFlexItem>
                    </EuiFlexGroup>
                    <EuiSelect
                        id="selectKing"
                        options={this.state.kings}
                        value={this.state.selectedKing}
                        onChange={e => this.onChange(e)}
                        aria-label="Use aria labels when no actual label is in use"
                    />
                </EuiPageContentBody>
            </EuiPageTemplate>
        );
    }
}

export default Landing;