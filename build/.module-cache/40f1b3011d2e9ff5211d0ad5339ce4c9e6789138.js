/** @jsx React.DOM */


var TopStories = React.createClass({displayName: "TopStories",
  getInitialState: function() {
    return {
      stories: []
    };
  },

  componentDidMount: function() {
    $.get(this.props.source, function(result) {
      var listStories = result;
      if (this.isMounted()) {
        this.setState({
          stories: listStories
        });
      }
    }.bind(this));
  },

  render: function() {
    return (
      React.createElement("div", null, 
        "Hello"
      )
    );
  }

});


var Story = React.createClass({displayName: "Story",
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
    var divclass = 'indivstory';
    var topPClass = 'storytop';
    var bottomPClass= 'storybottom';
    return (
      React.createElement("div", {className: divclass}, 
        React.createElement("p", {className: topPClass}, " ", React.createElement("span", null, "1."), React.createElement("img", {src: "./images/uparrow.gif"}), " ", React.createElement("span", null, React.createElement("a", {href: this.state.url}, this.state.title, " (", this.state.url.replace(/^https?:\/./,'').replace(/\/.*$/,'')), ")."), " "), 
        React.createElement("p", {className: bottomPClass}, " ", this.state.score, " points by ", this.state.by, " | discuss ")
      )
    );
  }
});

React.render(
  React.createElement(Story, {source: "https://hacker-news.firebaseio.com/v0/item/10132933.json?print=pretty"}),
  newstories
);

React.render(
React.createElement(TopStories, {source: "https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty"}),
  also
);
