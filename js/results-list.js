import React from 'react';

let D = React.DOM;
let Type = React.PropTypes;

export default React.createClass({
  displayName: "ResultsList",

  propTypes: {
    results: Type.array.isRequired
  },

  createResult(val) {

  },

  render() {
    let self = this;
    
    return D.section({
      className: 'results-container'
    }, [
      D.ul({
        className: 'results'
      }, self.props.results.map(self.createResult))
    ]);
  }
});
