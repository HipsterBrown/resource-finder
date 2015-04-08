import React from 'react';
import fetch from 'whatwg-fetch';
import FormClass from './form';
import ResultsListClass from './results-list';

let D = React.DOM;
let Form = React.createFactory(FormClass);
let ResultsList = React.createFactory(ResultsListClass);
let urls = {
  npm: "http://npm-registry-cors-proxy.herokuapp.com/",
  bower: "http://bower.herokuapp.com/packages/search/",
  github: "http://github-raw-cors-proxy.herokuapp.com/"
};

let App = React.createClass({
  displayName: "App",

  getInitialState() {
    return {
      results: [],
      error: false,
      listTitle: "Most Recent Results: "
    };
  },

  componentDidMount() {
    let self = this;
    let cache = self.fetchCache();

    if( cache ) {
      cache.forEach(self.parseBower);
    }
  },

  parseBower(json) {
    let self = this;
    let name = json.name;
    let url = json.url;
    let author = url.split('/')[3];
    let ghURL = `${urls.github}${author}/${name}/blob/master/bower.json`;
    let links = [];
    let result = {
      name: name,
      author: author,
      url: url
    };

    window.fetch(ghURL).then(function(response){
      return response.json();
    }).then(function(json){
      if( json === "Not Found" || !json.main ) { 
        return false; 
      }  else if( Array.isArray(json.main) ) {
        json.main.forEach(function(path){
          links.push(`https://rawgit.com/${author}/${name}/master/${path}`);
        });
      } else {
        links.push(`https://rawgit.com/${author}/${name}/master/${json.main}`);
      }

      result.links = links;
      result.version = json.version || "N/A";

      self.setState({
        results: self.state.results.concat(result)
      });
    });
  },

  storeResults(data) {
    let dataString = JSON.stringify(data);

    window.localStorage.setItem('results', dataString);
  },

  fetchCache() {
    let dataString = window.localStorage.getItem('results');

    return dataString ? JSON.parse(dataString) : false;
  },

  saveQuery(string) {
    let queries = window.localStorage.getItem('queries') || "[]";
	let query = string.toLowerCase();

    queries = JSON.parse(queries);

	if(queries.indexOf(query) !== -1) {
	  return false;
	}

    queries.push(query);
    queries = JSON.stringify(queries);

    window.localStorage.setItem('queries', queries);
  },
    
  fetchQueries() {
    let queries = window.localStorage.getItem('queries');

    return queries ? JSON.parse(queries) : false;
  },

  handleSubmit(e) {
    e.preventDefault();

    let self = this;
    let query = self.refs.searchForm.getDOMNode().elements['search-input'].value;

    if(query) {
      self.saveQuery(query);
    } else {
      self.setState({
        error: D.h3({ className: "error-message" }, "I Think You Forgot Something...")
      });
      return false;
    }

    if (self.state.error) {
      self.setState({ error: false });
    }

    //let npmFetch = window.fetch( urls.npm + query );
    let bowerFetch = window.fetch( urls.bower + query );

    Promise.all([bowerFetch]).then(function(results){
      Promise.all(results.map(function(result){ return result.json(); }))
      .then(function(json){ 
        let finalArr = json[0];

        if (!finalArr.length) {
          self.setState({
            error: D.h2({ className: "error-message" }, "No Results Found")
          });
          return false;
        }

        self.setState({ 
          results: [],
          listTitle: `Results for "${query}": `
        });
        finalArr.forEach(self.parseBower);
        self.storeResults(finalArr);
      }); 
    });
  },

  render() {
    let self = this;

    return D.div({}, [
      Form({
        submitHandler: self.handleSubmit,
        ref: "searchForm"
      }),
      self.state.error ? self.state.error : self.state.results.length ? ResultsList({
        results: self.state.results,
        title: self.state.listTitle
      }) : void 0
    ]);
  }
});

React.render(React.createElement(App), document.getElementById('app'));
