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
          content: stories[1]
        });
      }
    }.bind(this));
  },

  render: function() {
    var divclass = 'indivstory';
    return (
      React.createElement("div", {className: divclass}, 
      "\"https://hacker-news.firebaseio.com/v0/item/", this.state.content, ".json?print=pretty\""

      )
    );
  }
});
React.render(
  React.createElement(Story, {source: "https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty"}),
  newstories
);
