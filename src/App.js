import React, { Component } from 'react';
import './App.css';
import GoogleApp from './google-app/google-app';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      googleApps: [],
      search: '',
      genre: '',
      error: null
    }
  }

  setSearch(search) {
    this.setState({
      search
    });
  }

  setGenre(genre) {
    this.setState({
      genre
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const baseUrl = 'http://localhost:8000/apps';
    const params = [];
    if(this.state.search) {
      params.push(`search=${this.state.search}`);
    }
    if(this.state.genre) {
      params.push(`genre=${this.state.genre}`);
    }
    const query = params.join('&');
    const url = `${baseUrl}?${query}`;

    fetch(url)
      .then(res => {
        if(!res.ok) {
          throw new Error(res.statusText);
        }
        return res.json();
      })
      .then(data => {
        this.setState({
          googleApps: data,
          error: null
        });
      })
      .catch(err => {
        this.setState({
          error: 'Sorry, could not get apps at this time.'
        });
      })

  }

  render() {
    const googleApps = this.state.googleApps.map((googleApp, i) => {
      return <GoogleApp {...googleApp} key={i}/>
    })
    return (
      <main className="App">
        <h1>Google Play Apps</h1>
        <div className="search">
          <form onSubmit={e => this.handleSubmit(e)}>
            <label htmlFor="search">Search: </label>
            <input 
              type="text" 
              id="search" 
              name="search" 
              value={this.state.search}
              onChange={e => this.setSearch(e.target.value)}/> 
              <br/><br/>
              <label htmlFor="genre">Genre:</label>
              <input 
              type="text"
              id="genre"
              name="genre"
              value={this.state.genre}
              onChange={e => this.setGenre(e.target.value)}/>
              <br/><br/>   
            <button type="submit">Search</button>  
          </form>
          <div className="App_error">{ this.state.error }</div>
        </div>
        {googleApps}
      </main>
    );
  }
}

export default App;