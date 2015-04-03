import React from 'react';
import CheckboxGroupClass from './checkbox-group';

let D = React.DOM;
let CheckboxGroup = React.createFactory(CheckboxGroupClass);

export default React.createClass({
  displayName: "SearchForm",

  propTypes: {
    submitHandler: React.PropTypes.func.isRequired
  },

  render()  {
    return D.form({
      className: "search-form",
      ref: "searchForm",
      onSubmit: this.props.submitHandler
    }, [
      D.label({
        className: "search-input-label",
        htmlFor: "search-input"
      }, D.h1({
          className: "title"
        }, "Resource Finder")
      ),
      D.div({
        className: "form-row"
      }, [
        D.input({
          type: "search",
          className: "search-input",
          id: "search-input",
          name: "search-input",
          placeholder: "what are you looking for?"
        }),
        D.input({
          type: "submit",
          className: "search-submit",
          value: "FIND"
        })
      ])]);
  }
});
