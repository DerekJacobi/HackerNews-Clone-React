/** @jsx React.DOM */

var UserGist = React.createClass({displayName: "UserGist",
  getInitialState: function() {
    return {
      by: '',
      title: '',
      score: '',
      url: ''
    };
  },

  componentDidMount: function() {
    $.get(this.props.source, function(result) {
      var story = result;
      if (this.isMounted()) {
        this.setState({
          by: story.by,
          score: story.score,
          url: story.url,
          title: story.title
        });
      }
    }.bind(this));
  },

  render: function() {
    return (
      React.createElement("div", null, 
        this.state.by, "'s last gist is", 
        React.createElement("a", {href: this.state.url}, "here"), "."
      )
    );
  }
});

React.render(
  React.createElement(UserGist, {source: "https://hacker-news.firebaseio.com/v0/item/10132935.json?print=pretty"}),
  example
);
