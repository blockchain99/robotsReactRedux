import React, { Component } from 'react';
import { connect } from 'react-redux';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import './App.css';

import { setSearchField } from '../actions'

const mapStateToProps = state => {
 return {
   searchField: state.searchRobots.searchField //fm reducer
 }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSearchChange: (e) => dispatch( setSearchField(e.target.value))
}
}
class App extends Component {
  constructor(){
    super();
    this.state = {
      robots: [],
      searchfield: ''
    }
  }
  
   componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/users')
    .then(response => response.json())
    .then(users => this.setState({robots: users}));
  }

  onSearchChange = (e) => { //error function
    this.setState({ searchfield: e.target.value })
  }
  render() {

    const { robots, searchfield } = this.state;
    const filteredRobots = robots.filter(robot => {
      return robot.name.toLowerCase().includes(searchfield.toLowerCase());
    })

    // console.log('render');
    return !robots.length ?
    <h1>Loading</h1> :
      (
        <div className="tc">
          <h1 className="f1">RoboFriends</h1>
          <SearchBox searchChange={this.onSearchChange}/>
          <Scroll>
            <CardList robots={filteredRobots} />
          </Scroll>
        </div>
      );
    }
  }
 //higher order func(func that return other func)
export default connect(mapStateToProps, mapDispatchToProps)(App);

