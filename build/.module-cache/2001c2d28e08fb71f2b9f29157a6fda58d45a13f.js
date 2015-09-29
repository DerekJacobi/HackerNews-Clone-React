/** @jsx React.DOM */

var Story = React.createClass({displayName: "Story",
  getInitialState: function() {
    return {
      content: []
    };
  },

  componentDidMount: function() {
    $.get(this.props.source, function(result) {
      var stories = result;
      if (this.isMounted()) {
        this.setState({
          content: stories
        });
      }
    }.bind(this));
  },

  render: function() {
    var divclass = 'indivstory';
    return (
      React.createElement("div", {className: divclass}, 
      "content"
      )
    );
  }
});

React.render(
  React.createElement(Story, {source: "https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty"}),
  newstories
);
