import React, {Fragment, Component} from 'react';
import SearchBox from '../components/SearchBox';
import CardList from '../components/CardList';
import Scroll from '../components/Scroll';
import './App.css';

class App extends Component {
	constructor() {
		super();
		this.state = {
			robots      : [],
			searchfield : ''
		};
	}

	componentDidMount() {
		fetch('https://jsonplaceholder.typicode.com/users')
			.then((response) => response.json())
			.then((users) => this.setState({robots: users}));
	}

	onSearchChange = (event) => {
		this.setState({searchfield: event.target.value});
	};

	render() {
		const {robots, searchfield} = this.state;
		const filtertedRobots = robots.filter((robot) => {
			return robot.name.toLowerCase().includes(searchfield.toLowerCase());
		});
		return !robots.length ? (
			<h1>Loading</h1>
		) : (
			<Fragment>
				<div className="tc">
					<h1 className="f-headline">RoboFriends</h1>
					<SearchBox searchChange={this.onSearchChange} />
					<Scroll>
						<CardList robots={filtertedRobots} />
					</Scroll>
				</div>
			</Fragment>
		);
	}
}

export default App;
