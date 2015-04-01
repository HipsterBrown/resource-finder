import React from 'react';
import ResultClass from './result-item';

let D = React.DOM;
let Type = React.PropTypes;
let Result = React.createFactory(ResultClass);

export default React.createClass({
  displayName: "ResultsList",

  propTypes: {
    results: Type.array.isRequired
  },

  createResult(val) {
    return Result({ result: val });
  },

  render() {
    let self = this;

    return D.section({
      className: 'results-container'
    }, [
      D.h3({}, "Results List"),
      D.ul({
        className: 'results'
      }, self.props.results.map(self.createResult)) 
    ]);
  }
});
