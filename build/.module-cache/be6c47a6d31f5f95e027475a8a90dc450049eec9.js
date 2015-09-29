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
    src ="https://hacker-news.firebaseio.com/v0/item/" + item + "/.json?print=pretty"
    $.getJSON(src, function(result) {
      var data = result
      console.log(data);
    })
        return (
            React.createElement("tr", {key: item}, 
                React.createElement("td", null, 
                    React.createElement("p", {className: "score"}, " Story URL  \"", src, "\""), 
                    React.createElement(Story, {by: this.props.by})
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
  React.createElement(StoryTop, {by: "Derek"}),
  newstories
);

var Story = React.createClass({displayName: "Story",

  // getInitialState: function() {
  //   return {
  //     by: '',
  //     title: '',
  //     score: '',
  //     url: ''
  //   };
  // },
  //
  // componentDidMount: function() {
  //   var src = "https://hacker-news.firebaseio.com/v0/item/10132935.json?print=pretty";
  //   $.get(src, function(result) {
  //     var story = result;
  //     if (this.isMounted()) {
  //       this.setState({
  //         by: story.by,
  //         score: story.score,
  //         url: story.url,
  //         title: story.title,
  //       });
  //     }
  //   }.bind(this));
  // },

  render: function() {
    var divclass = 'indivstory';
    var topPClass = 'storytop';
    var bottomPClass= 'storybottom';
    return (
      React.createElement("div", {className: divclass}, 
        React.createElement("p", {className: bottomPClass}, "points by ", this.props.by, " | discuss ")
      )
    );
  }
});



// React.render(
//   <Story />,
//   onestory
// );
