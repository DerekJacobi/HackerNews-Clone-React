/** @jsx React.DOM */

var StoryTop = React.createClass({displayName: "StoryTop",
  getInitialState: function() {
    return {
      content: []
    };
  },

  componentDidMount: function() {
    var src ="https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty"
    $.get(src, function(result) {
      var stories = result;
      if (this.isMounted()) {
        this.setState({
          content: stories.slice(0,30)
        });
      }
    }.bind(this));
  },

  render: function() {
    var storyNodes = this.state.content.map(function(item) {
    var src ="https://hacker-news.firebaseio.com/v0/item/" + item + "/.json?print=pretty"
        return (
            React.createElement("tr", {key: item}, 
                React.createElement("td", null, 
                    React.createElement(Story, {src: this.state.src})
                )
            )
        );
    });

    return (
        React.createElement("table", null, 
            React.createElement("tbody", null, 
                storyNodes
            )
        )
    );
  }
});

React.render(
  React.createElement(StoryTop, null),
  newstories
);

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
    $.get(src, function(result) {
      var story = result;
      if (this.isMounted()) {
        this.setState({
          by: story.by,
          score: story.score,
          url: story.url,
          title: story.title,
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
        React.createElement("p", {className: topPClass}, " ", React.createElement("span", null), React.createElement("img", {src: "./images/uparrow.gif"}), " ", React.createElement("span", null, React.createElement("a", {href: this.state.url}, this.state.title, " (", this.state.url.replace(/^https?:\/./,'').replace(/\/.*$/,'')), ")."), " "), 
        React.createElement("p", {className: bottomPClass}, " ", this.state.score, " points by ", this.state.by, " | discuss ")
      )
    );
  }
});
