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
  //
  // story = '<div class=indivstory>' + '<p class=storytop>' + '<span>' + number + '</span>' + ". " + '<img src="./images/uparrow.gif"></img>' + " " + data.title + '<span>' + " (" + '<a href=' + data.url + '>' + data.url.replace(/^https?:\/./,'').replace(/\/.*$/,'') + '</a>' + ")" + '</span>' + '</p>';
  //         story += '<p class=storybottom>' + data.score + " points by " + data.by + " | " + " discuss "  +'</p>' + '</div>';
  //         $(story).prependTo(".newstories");

  render: function() {
    return (
      React.createElement("div", null, 
        this.state.title, "'s last gist is (", React.createElement("a", {href: this.state.url}, "here"), ")."
      )
    );
  }
});

React.render(
  React.createElement(UserGist, {source: "https://hacker-news.firebaseio.com/v0/item/10132935.json?print=pretty"}),
  example
);
