var React = require("react");
var App = module.exports =  React.createClass({
	render: function(){
		return (<div>Hello Yo</div>);
	}
})

React.render(
  <App />,
  document.getElementById('app')
);