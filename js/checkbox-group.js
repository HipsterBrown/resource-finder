import React from 'react';

let D = React.DOM;
let Type = React.PropTypes;

export default React.createClass({
  displayName: "CheckboxGroup",

  propTypes: {
    id: Type.string.isRequired,
    label: Type.string.isRequired,
    value: Type.string.isRequired,
    defaultChecked: Type.bool
  },

  render() {
    let self = this;
    return D.div({
      className: "form-group checkbox-group"
    }, [
      D.label({
        className: "checkbox-label",
        htmlFor: self.props.id
      }, self.props.label),
      D.input({
        className: "checkbox",
        type: "checkbox",
        name: self.props.id,
        id: self.props.id,
        value: self.props.value,
        checked: self.props.defaultChecked
      })
    ]);
  }
});
