/** @jsx React.DOM */

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
  //
  // story = '<div class=indivstory>' + '<p class=storytop>' + '<span>' + number + '</span>' + ". " + '<img src="./images/uparrow.gif"></img>' + " " + data.title + '<span>' + " (" + '<a href=' + data.url + '>' + data.url.replace(/^https?:\/./,'').replace(/\/.*$/,'') + '</a>' + ")" + '</span>' + '</p>';
  //         story += '<p class=storybottom>' + data.score + " points by " + data.by + " | " + " discuss "  +'</p>' + '</div>';
  //         $(story).prependTo(".newstories");

  render: function() {
    var divclass = 'indivstory';
    var topPClass = 'storytop';
    var bottomPClass= 'storybottom';
    return (
      React.createElement("div", {className: divclass}, 
        React.createElement("p", {className: topPClass}, " ", React.createElement("span", null, "1."), React.createElement("img", {src: "./images/uparrow.gif"}), " ", this.state.title, " ", React.createElement("span", null, "(", React.createElement("a", {href: this.state.url}, " ", this.state.url.replace(/^https?:\/./,'').replace(/\/.*$/,''), " "), "). "), " "), 
        React.createElement("p", {className: bottomPClass}, " ", this.state.score, " points by ", this.state.by, " | discuss ")
      )
    );
  }
});

React.render(
  React.createElement(Story, {source: "https://hacker-news.firebaseio.com/v0/item/10132935.json?print=pretty"}),
  newstories
);
