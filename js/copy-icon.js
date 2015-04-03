import React from 'react';

let D = React.DOM;
let Type = React.PropTypes;

export default React.createClass({
  displayName: "CopyIcon",

  propTypes: {
    handleClick: Type.func
  },

  render() {
    let self = this;

    return D.svg({
      className: "icon copy",
      x: "0px",
      y: "0px",
      viewBox: "0 0 35 35",
      onClick: self.props.handleClick,
      alt: "Copy to Clipboard",
      title: "Copy to Clipboard"
    }, D.path({
      className: "copy-path",
      d: "M25,1H12c-1.657,0-3,1.343-3,3v3H7c-1.657,0-3,1.343-3,3v18c0,1.657,1.343,3,3,3h13c1.657,0,3-1.343,3-3v-3h2c1.657,0,3-1.343,3-3V4C28,2.343,26.657,1,25,1z M20,28H7V10h2v12c0,0.221,0.027,0.435,0.072,0.642C9.029,22.754,9,22.873,9,23c0,0.458,0.314,0.828,0.734,0.946C10.284,24.586,11.09,25,12,25h8V28z M25,22H12V4h13V22z M15,12h7c0.553,0,1-0.447,1-1c0-0.552-0.447-1-1-1h-7c-0.553,0-1,0.448-1,1C14,11.553,14.447,12,15,12z M15,9h3c0.553,0,1-0.447,1-1c0-0.552-0.447-1-1-1h-3c-0.553,0-1,0.448-1,1C14,8.553,14.447,9,15,9z M15,15h4c0.553,0,1-0.447,1-1c0-0.552-0.447-1-1-1h-4c-0.553,0-1,0.448-1,1C14,14.553,14.447,15,15,15z M15,18h7c0.553,0,1-0.447,1-1c0-0.552-0.447-1-1-1h-7c-0.553,0-1,0.448-1,1C14,17.553,14.447,18,15,18z"
    }));
  }
});
