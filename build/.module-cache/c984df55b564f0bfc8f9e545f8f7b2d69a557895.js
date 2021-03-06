/** @jsx React.DOM */

var Story = React.createClass({displayName: "Story",
  getInitialState: function() {
    return {
      content: [],
    };
  },

  componentDidMount: function() {
    $.get(this.props.top, function(result) {
      var stories = result;
      if (this.isMounted()) {
        this.setState({
          content: stories.slice[0,30],
        });
      }
    }.bind(this));
  },

  render: function() {
    var storyNodes = this.state.content.map(function(item) {
        return (
            React.createElement("tr", {key: item}, 
                React.createElement("td", null, 
                    React.createElement("p", {className: "score"}, item)
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
    var divclass = 'indivstory';
    return (
      React.createElement("div", {className: divclass}, 
        "\"https://hacker-news.firebaseio.com/v0/item/", this.state.content[1], ".json?print=pretty\"" + ' ' +
        "\"", this.props.title, "\""
      )
    );
  }
});

React.render(
  React.createElement(Story, {top: "https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty", title: "Hello"}),
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
  React.createElement(Story, {source: "https://hacker-news.firebaseio.com/v0/item/10132935.json?print=pretty"}),
  onestory
);
