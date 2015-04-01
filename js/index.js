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
      results: []
    };
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
          links.push(`https://raw.githubusercontent.com/${author}/${name}/master/${path}`);
        });
      } else {
        links.push(`https://raw.githubusercontent.com/${author}/${name}/master/${json.main}`);
      }

      result.links = links;

      self.setState({
        results: self.state.results.concat(result)
      });
    });
  },

  handleSubmit(e) {
    e.preventDefault();

    let self = this;
    let query = self.refs.searchForm.getDOMNode().elements['search-input'].value;

    //let npmFetch = window.fetch( urls.npm + query );
    let bowerFetch = window.fetch( urls.bower + query );

    Promise.all([bowerFetch]).then(function(results){
      Promise.all(results.map(function(result){ return result.json(); }))
      .then(function(json){ 
        let finalArr = json[0];

        self.setState({ results: [] });
        finalArr.forEach(self.parseBower);
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
      self.state.results.length ? ResultsList({
        results: self.state.results
      }) : void 0
    ]);
  }
});

React.render(React.createElement(App), document.getElementById('app'));
