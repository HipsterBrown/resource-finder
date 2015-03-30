import React from 'react';

let D = React.DOM;
let urls = {
  npm: "http://npm-registry-cors-proxy.herokuapp.com/",
  bower: "http://bower.herokuapp.com/packages/search/"
};

React.render(D.h1({}, 'Package Search 4 Winners'), document.getElementById('app'));
