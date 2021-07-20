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
    EuiSpacer,
    EuiPanel
} from '@elastic/eui';
import axios from 'axios';

class Landing extends Component {
    constructor(props) {
        super(props);
        this.state = {
            location: [],
            selectedKing: " ",
            defender_king: " ",
            attacker_king: " ",
            stats_region: " ",
            attacker_win: " ",
            attacker_Loose: " ",
            defenderAvg: " ",
            defenderMax: " ",
            defenderMin: " ",
            stats_battleType: " ",
            stats: " "
        }
    }

    componentDidMount() {
        this.getInitialData();
        this.getStats();
    }

    getInitialData() {
        axios.get('/api/battleRoute/getInitialData').then((res) => {
            let kingArray = [];
            let battleTypeArray = [];
            let locationArray = [];
            let regionArray = [];
            for (let i = 0; i < res.data.result.kings.length; i++) {
                let temp = {};
                temp['value'] = res.data.result.kings[i];
                temp['text'] = res.data.result.kings[i];
                kingArray.push(temp);
            }

            for (let i = 0; i < res.data.result.battle_type.length; i++) {
                let temp = {};
                temp['value'] = res.data.result.battle_type[i];
                temp['text'] = res.data.result.battle_type[i];
                battleTypeArray.push(temp);
            }

            for (let i = 0; i < res.data.result.location.length; i++) {
                let temp = {};
                temp['value'] = res.data.result.location[i];
                temp['text'] = res.data.result.location[i];
                locationArray.push(temp);
            }

            for (let i = 0; i < res.data.result.region.length; i++) {
                let temp = {};
                temp['value'] = res.data.result.region[i];
                temp['text'] = res.data.result.region[i];
                regionArray.push(temp);
            }

            this.setState({
                kings: kingArray,
                battle_type: battleTypeArray,
                location: locationArray,
                region: regionArray
            })
        }).catch(err => {
            console.log(err);
        })
    }

    getBattlePlaces() {
        axios.get('/api/battleRoute/list').then((res) => {
            alert(res.data.result);
        }).catch(err => {
            console.log(err);
        })
    }

    totalBattle() {
        axios.get('/api/battleRoute/count').then((res) => {
            alert(`total numbers of battles are :- ${res.data.result}`);
        }).catch(err => {
            console.log(err);
        })
    }

    getStats() {
        axios.get('/api/battleRoute/stats').then((res) => {
            console.log(res.data.result.defender_size.maximum)
            this.setState({
                defender_king: res.data.result.most_active.defender_king,
                attacker_king: res.data.result.most_active.attacker_king,
                stats_region: res.data.result.most_active.region,
                attacker_win: res.data.result.attacker_outcome.win,
                attacker_Loose: res.data.result.attacker_outcome.loose,
                defenderAvg: res.data.result.defender_size.average,
                defenderMax: res.data.result.defender_size.maximum,
                defenderMin: res.data.result.defender_size.minimum,
                stats_battleType: res.data.result.battle_type
            });
        }).catch(err => {
            console.log(err);
        })
    }

    onChange = (e) => {
        console.log(e.target.value);
        this.setState({ selectedKing: e.target.value });
    };

    render() {
        return (
            <>
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
                                <h4>
                                    This app is developed using ReactJS library, Elastic UI for frontend and nodeJS, ExpressJS for backend and MongoDB as database. Authentication part is created using passport
                                </h4>
                            </EuiTextAlign>
                        </EuiText>

                        <EuiSpacer size="l" />

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
                        </EuiFlexGroup>
                    </EuiPageContentBody>

                    <EuiSpacer size="l" />

                    <EuiPanel color="subdued" borderRadius="none" hasShadow={false}>
                        <EuiText size="l">
                            <h4>most active</h4>
                            <p>defender_king:-{JSON.stringify(this.state.defender_king)}</p>
                            <p>attacker_king:-{JSON.stringify(this.state.attacker_king)}</p>
                            <p>region:-{JSON.stringify(this.state.stats_region)}</p>
                            <h4>attacker outcome</h4>
                            <p>Win:-{JSON.stringify(this.state.attacker_win)}</p>
                            <p>Loose:-{JSON.stringify(this.state.attacker_Loose)}</p>
                            <h4>battle type</h4>
                            <p>Win:-{JSON.stringify(this.state.stats_battleType)}</p>
                            <h4>defender size</h4>
                            <p>Average:-{this.state.defenderAvg}</p>
                            <p>Maximum:-{this.state.defenderMax}</p>
                            <p>Minimum:-{this.state.defenderMin}</p>
                        </EuiText>
                    </EuiPanel>

                    <EuiText size="l">
                        <h5>select king</h5>
                        <EuiFlexItem>

                            <EuiSelect
                                id="selectKing"
                                options={this.state.kings}
                                value={this.state.selectedKing}
                                onChange={e => this.onChange(e)}
                                aria-label="Use aria labels when no actual label is in use"
                            />
                        </EuiFlexItem>
                        <h5>select Battle</h5>
                        <EuiFlexItem>
                            <EuiSelect
                                id="selectBattle"
                                options={this.state.battle_type}
                                value={this.state.selectedKing}
                                onChange={e => this.onChange(e)}
                                aria-label="Use aria labels when no actual label is in use"
                            />
                        </EuiFlexItem>
                        <h5>select Location</h5>
                        <EuiFlexItem>
                            <EuiSelect
                                id="selectLocation"
                                options={this.state.location}
                                value={this.state.selectedKing}
                                onChange={e => this.onChange(e)}
                                aria-label="Use aria labels when no actual label is in use"
                            />
                        </EuiFlexItem>
                        <h5>select Region</h5>
                        <EuiFlexItem>
                            <EuiSelect
                                id="selectRegion"
                                options={this.state.region}
                                value={this.state.selectedKing}
                                onChange={e => this.onChange(e)}
                                aria-label="Use aria labels when no actual label is in use"
                            />
                        </EuiFlexItem>
                    </EuiText>
                </EuiPageTemplate>
            </>
        );
    }
}

export default Landing;