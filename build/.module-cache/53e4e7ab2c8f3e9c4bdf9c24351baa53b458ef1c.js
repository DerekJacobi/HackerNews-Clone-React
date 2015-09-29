/** @jsx React.DOM */

//
// React.render(
//   <h1>Hello, world!</h1>,
//   document.getElementById('example')
// );

var UserGist = React.createClass({displayName: "UserGist",
  getInitialState: function() {
    return {
      username: '',
      lastGistUrl: ''
    };
  },

  componentDidMount: function() {
    $.get(this.props.source, function(result) {
      var lastGist = result[0];
      if (this.isMounted()) {
        this.setState({
          username: lastGist.owner.login,
          lastGistUrl: lastGist.html_url
        });
      }
    }.bind(this));
  },

  render: function() {
    return (
      React.createElement("div", null, 
        this.state.username, "'s last gist is", 
        React.createElement("a", {href: this.state.lastGistUrl}, "here"), "."
      )
    );
  }
});

React.render(
  React.createElement(UserGist, {source: "https://api.github.com/users/octocat/gists"}),
  example
);
