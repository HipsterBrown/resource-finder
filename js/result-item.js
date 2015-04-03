import React from 'react';
import CopyIconClass from './copy-icon';

let D = React.DOM;
let Type = React.PropTypes;
let CopyIcon = React.createFactory(CopyIconClass);

export default React.createClass({
  displayName: "Result",

  propTypes: {
    result: Type.shape({
      name: Type.string.isRequired,
      author: Type.string.isRequired,
      url: Type.string.isRequired,
      links: Type.array.isRequired,
      version: Type.string.isRequired
    }).isRequired
  },

  createLink(link) {
    let self = this;
    let linkSplit = link.split('/');
    let fileName = linkSplit[linkSplit.length - 1];

    return D.li({
      className: "link-item"
    }, [
      D.a({
        className: "link",
        href: link
      }, fileName ),
      CopyIcon({
        handleClick: self.copyToClipboard
      })
    ]);
  },

  copyToClipboard(e) {
    document.oncopy = function(event) {
      event.clipboardData.setData("Text", event.target.href);
      event.preventDefault();
    };
    document.execCommand("Copy", false, null);
  },

  render() {
    let self = this;
    let data = self.props.result;

    return D.li({
      className: "result"
    }, [
      D.h3({
        className: "result-name"
      }, data.name ),
      D.p({
        className: "result-info"
      }, `Author: ${data.author} | Version: ${data.version}`),
      D.ul({
        className: "result-links"
      }, data.links.map(self.createLink))
    ]);
  }
});
