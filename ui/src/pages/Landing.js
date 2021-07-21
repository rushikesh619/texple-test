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
    EuiPanel,
    EuiBasicTable
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
            searchResult: [],
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
                selectedKing: kingArray[0].value,
                battle_type: battleTypeArray,
                selectedBattle: battleTypeArray[0].value,
                location: locationArray,
                selectedLocation: locationArray[0].value,
                region: regionArray,
                selectedRegion: regionArray[0].value
            })
        }).catch(err => {
            alert(err);
        })
    }

    getBattlePlaces() {
        axios.get('/api/battleRoute/list').then((res) => {
            alert(res.data.result);
        }).catch(err => {
            alert(err);
        })
    }

    totalBattle() {
        axios.get('/api/battleRoute/count').then((res) => {
            alert(`total numbers of battles are :- ${res.data.result}`);
        }).catch(err => {
            alert(err);
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
            alert(err);
        })
    }

    onKingChange = (e) => {
        console.log(e.target.value);
        this.setState({ selectedKing: e.target.value });
    };

    onBattleChange = (e) => {
        console.log(e.target.value);
        this.setState({ selectedBattle: e.target.value });
    };

    onLocationChange = (e) => {
        console.log(e.target.value);
        this.setState({ selectedLocation: e.target.value });
    };

    onRegionChange = (e) => {
        console.log(e.target.value);
        this.setState({ selectedRegion: e.target.value });
    };

    handleSubmit = () => {
        axios.get('/api/battleRoute/search', {
            params: {
                king: this.state.selectedKing,
                battle: this.state.selectedBattle,
                location: this.state.selectedLocation,
                region: this.state.selectedRegion
            }
        }).then((res) => {
            this.setState({
                searchResult: res.data.result
            })
        }).catch(err => {
            alert(err);
        })
    }

    getRowProps = (item) => {
        const { id } = item;
        return {
            'data-test-subj': `row-${id}`,
            className: 'customRowClass',
            onClick: () => console.log(`Clicked row ${id}`),
        };
    };

    getCellProps = (item, column) => {
        const { id } = item;
        const { field } = column;
        return {
            className: 'customCellClass',
            'data-test-subj': `cell-${id}-${field}`,
            textOnly: true,
        };
    };

    render() {
        const columns = [
            {
                field: 'name',
                name: 'Name',
            },
            {
                field: 'attacker_king',
                name: 'Attacker king',
            },
            {
                field: 'defender_king',
                name: 'Defender king',
            },
            {
                field: 'battle_type',
                name: 'Battle Type',
            },
            {
                field: 'location',
                name: 'Location',
            },
            {
                field: 'region',
                name: 'Region',
            },
        ];
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

                    <EuiSpacer size="l" />

                    <EuiText size="l">
                        <h5>select king</h5>
                        <EuiFlexItem>

                            <EuiSelect
                                id="selectKing"
                                options={this.state.kings}
                                value={this.state.selectedKing}
                                onChange={e => this.onKingChange(e)}
                                aria-label="Use aria labels when no actual label is in use"
                            />
                        </EuiFlexItem>
                        <h5>select Battle</h5>
                        <EuiFlexItem>
                            <EuiSelect
                                id="selectBattle"
                                options={this.state.battle_type}
                                value={this.state.selectedBattle}
                                onChange={e => this.onBattleChange(e)}
                                aria-label="Use aria labels when no actual label is in use"
                            />
                        </EuiFlexItem>
                        <h5>select Location</h5>
                        <EuiFlexItem>
                            <EuiSelect
                                id="selectLocation"
                                options={this.state.location}
                                value={this.state.selectedLocation}
                                onChange={e => this.onLocationChange(e)}
                                aria-label="Use aria labels when no actual label is in use"
                            />
                        </EuiFlexItem>
                        <h5>select Region</h5>
                        <EuiFlexItem>
                            <EuiSelect
                                id="selectRegion"
                                options={this.state.region}
                                value={this.state.selectedRegion}
                                onChange={e => this.onRegionChange(e)}
                                label="Use aria labels when no actual label is in use"
                            />
                        </EuiFlexItem>

                        <EuiSpacer size="l" />

                        <EuiFlexItem grow={false}>
                            <EuiButton onClick={() => { this.handleSubmit() }}>
                                submit
                            </EuiButton>
                        </EuiFlexItem>
                    </EuiText>

                    <EuiSpacer size="l" />

                    <EuiText size="l">
                        <EuiTextAlign textAlign="center">
                            <h4>
                                To render below table select theparameters and click on submit button
                            </h4>
                        </EuiTextAlign>
                    </EuiText>

                    <EuiSpacer size="l" />

                    <EuiBasicTable
                        items={this.state.searchResult}
                        rowHeader="name"
                        columns={columns}
                        rowProps={this.getRowProps}
                        cellProps={this.getCellProps}
                    />
                </EuiPageTemplate>
            </>
        );
    }
}

export default Landing;