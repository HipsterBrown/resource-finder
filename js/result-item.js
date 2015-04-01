import React from 'react';

let D = React.DOM;
let Type = React.PropTypes;

export default React.createClass({
  displayName: "Result",

  propTypes: {
    result: Type.shape({
      name: Type.string.isRequired,
      author: Type.string.isRequired,
      url: Type.string.isRequired,
      links: Type.array.isRequired
    }).isRequired
  },

  createLink(link) {
    let linkSplit = link.split('/');
    let fileName = linkSplit[linkSplit.length - 1];

    return D.li({
      className: "link-item"
    }, D.a({
      className: "link",
      href: link
    }, fileName ));
  },

  render() {
    let self = this;
    let data = self.props.result;

    return D.li({
      className: "result"
    }, [
      D.p({
        className: "result-info"
      }, `Name: ${data.name} | Author: ${data.author}`),
      D.ul({
        className: "result-links"
      }, data.links.map(self.createLink))
    ]);
  }
});
