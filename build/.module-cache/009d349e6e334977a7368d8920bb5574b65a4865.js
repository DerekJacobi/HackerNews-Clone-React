/** @jsx React.DOM */

var Story = React.createClass({displayName: "Story",
  getInitialState: function() {
    return {
      content: []
    };
  },

  componentDidMount: function() {
    $.get(this.props.top, function(result) {
      var stories = result;
      if (this.isMounted()) {
        this.setState({
          content: stories.slice(0,30)
        });
      }
    }.bind(this));
  },

  render: function() {
    var num = "url"
    var storyNodes = this.state.content.map(function(item) {
    this.url ="https://hacker-news.firebaseio.com/v0/item/" + item + "/.json?print=pretty"
        return (
            React.createElement("tr", {key: item}, 
                React.createElement("td", null, 
                    React.createElement("p", {className: "score"}, " Hello this is  \"", url, "\"")
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
  React.createElement(Story, {top: "https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty", title: "Hello"}),
  newstories
);

// var Story = React.createClass({
//   getInitialState: function() {
//     return {
//       by: '',
//       title: '',
//       score: '',
//       url: ''
//     };
//   },
//
//   componentDidMount: function() {
//     $.get(this.props.source, function(result) {
//       var story = result;
//
//       if (this.isMounted()) {
//         this.setState({
//           by: story.by,
//           score: story.score,
//           url: story.url,
//           title: story.title
//         });
//       }
//     }.bind(this));
//   },
//
//   render: function() {
//     var divclass = 'indivstory';
//     var topPClass = 'storytop';
//     var bottomPClass= 'storybottom';
//     return (
//       <div className={divclass}>
//         <p className={topPClass}> <span>1.</span><img src="./images/uparrow.gif"></img> <span><a href={this.state.url}>{this.state.title} ({this.state.url.replace(/^https?:\/./,'').replace(/\/.*$/,'')}</a>).</span> </p>
//         <p className={bottomPClass}> {this.state.score} points by {this.state.by} | discuss </p>
//       </div>
//     );
//   }
// });
//
//
// React.render(
//   <Story source="https://hacker-news.firebaseio.com/v0/item/10132935.json?print=pretty" />,
//   onestory
// );
