import React, { Component } from 'react'
import { connect } from 'react-redux'
import Select from 'react-select';
import * as actions from '../../store/actions/index'

import './TaskFilter.css'

class TaskFilter extends Component {
    state = {
        search: '',
        filters: {
            user: null,
            team: null,
            state: null
        },
        applyButton: true,
        viewSelected: { value: 1, label: 'Lista' },
        view: [
            { value: 1, label: 'Lista' },
            { value: 2, label: 'Tablero' }
        ],
        states: [
            { value: 1, label: 'Abierta' },
            { value: 2, label: 'En proceso' },
            { value: 3, label: 'Hecha' },
            { value: 4, label: 'Cancelada' }
        ],
        teams: [],
        users: []
    }

    searchChangedHandler = search => {
        this.setState({
            search: search.target.value
        })

        this.props.onApplySearchFilter(search.target.value, this.state.filters)
    }

    selectViewChangedHandler = selectedOption => {
        this.setState({
            viewSelected: selectedOption
        })
    }
    
    selectUserChangedHandler = selectedOption => {
        const { team, state } = this.state.filters
        
        this.setState({
            filters: {
                user: selectedOption,
                team: team,
                state: state
            },
            applyButton: false
        })
    }
    
    selectTeamChangedHandler = selectedOption => {
        const { user, state } = this.state.filters

        this.setState({
            filters: {
                user: user,
                team: selectedOption,
                state: state
            },
            applyButton: false
        })
    }
    
    selectStateChangedHandler = selectedOption => {
        const { user, team } = this.state.filters

        this.setState({
            filters: {
                user: user,
                team: team,
                state: selectedOption
            },
            applyButton: false
        })
    }

    cleanFiltersHandler = () => {
        this.setState({
            filters: {
                user: null,
                team: null,
                state: null
            },
            applyButton: true,
            search: ''
        })

        this.props.onApplyFilters({
            user: null,
            team: null,
            state: null
        })
    }

    componentDidMount() {
        let users = []
        this.props.users.forEach(user => {
            users.push({ value: user.id, label: user.display_name })
        });

        this.setState({
            teams: this.props.teams,
            users: users
        })
    }

    render() {
        
        return (
            <div className="task-filter-container">
                <Select
                    id="view-select"
                    isSearchable={false}
                    onChange={this.selectViewChangedHandler}
                    options={this.state.view}
                    value={this.state.viewSelected}
                />
                <div id="task-search" className="task-search-wrapper">
                    <div className="icon">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z" /></svg>
                    </div>
                    <input className="input-search" placeholder="Buscar tarea..." onChange={this.searchChangedHandler} value={this.state.search} />
                </div>
                <Select
                    id="user-select"
                    placeholder="Usuario"
                    isSearchable={false}
                    onChange={this.selectUserChangedHandler}
                    options={this.state.users}
                    value={this.state.filters.user}
                />
                <Select
                    id="state-select"
                    placeholder="Estado"
                    isSearchable={false}
                    onChange={this.selectStateChangedHandler}
                    options={this.state.states}
                    value={this.state.filters.state}
                />
                <Select
                    id="team-select"
                    placeholder="Equipo"
                    isSearchable={false}
                    onChange={this.selectTeamChangedHandler}
                    options={this.state.teams}
                    value={this.state.filters.team}
                />
                <div className="filter-buttons-wrapper">
                    <div id="clean-button" className="icon" onClick={this.cleanFiltersHandler}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 352 512"><path d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z" /></svg>
                    </div>
                    <div id="apply-button" className="apply-button-wrapper">
                        <button onClick={() => this.props.onApplyFilters(this.state.filters)} disabled={this.state.applyButton}>Aplicar</button>
                    </div>
                    <div id="reload-button" className="icon" onClick={() => this.props.onGetTasks(this.props.idProject)}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M256.455 8c66.269.119 126.437 26.233 170.859 68.685l35.715-35.715C478.149 25.851 504 36.559 504 57.941V192c0 13.255-10.745 24-24 24H345.941c-21.382 0-32.09-25.851-16.971-40.971l41.75-41.75c-30.864-28.899-70.801-44.907-113.23-45.273-92.398-.798-170.283 73.977-169.484 169.442C88.764 348.009 162.184 424 256 424c41.127 0 79.997-14.678 110.629-41.556 4.743-4.161 11.906-3.908 16.368.553l39.662 39.662c4.872 4.872 4.631 12.815-.482 17.433C378.202 479.813 319.926 504 256 504 119.034 504 8.001 392.967 8 256.002 7.999 119.193 119.646 7.755 256.455 8z" /></svg>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        teams: state.team.projectTeams,
        users: state.project.usersByProject
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onGetTasks: (idProject) => dispatch(actions.getTasksByProject(idProject)),
        onApplyFilters: (filters) => dispatch(actions.applyFilters(filters)),
        onApplySearchFilter: (search, filters) => dispatch(actions.applySeacrhFilter(search, filters))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskFilter)