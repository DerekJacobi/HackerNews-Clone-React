/** @jsx React.DOM */

var STORIES =
$.ajax({
    url : newurl,
    dataType : 'json'
}).done(function (obj) {
  duration_reco = obj;
  console.log(duration_reco);
});
// $.get("https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty", { },
//  function(result) {
//   content = result.slice(0,30)
// });

// var StoryTop = React.createClass({
//   getInitialState: function() {
//     return {
//       content: []
//     };
//   },
//
//
//   componentDidMount: function() {
//     var src ="https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty"
//     $.get(src, function(result) {
//       var stories = result;
//       if (this.isMounted()) {
//         this.setState({
//           content: stories.slice(0,30)
//         });
//       }
//     }.bind(this));
//   },
//
//   render: function() {
//     var storyNodes = this.state.content.map(function(item) {
//     src ="https://hacker-news.firebaseio.com/v0/item/" + item + "/.json?print=pretty"
//         return (
//             <tr key={item}>
//                 <td>
//                     <p className="score"> Hello this is  "{src}"</p>
//                 </td>
//             </tr>
//         );
//     });
//
//     return (
//         <table>
//             <tbody>
//                 {storyNodes}
//             </tbody>
//         </table>
//     );
//   }
// });
//
// React.render(
//   <StoryTop />,
//   newstories
// );

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
    var src = "https://hacker-news.firebaseio.com/v0/item/10132935.json?print=pretty";
    $.get(src, function(result) {
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
    console.log(this.state);
    console.log(this.props);
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
  React.createElement(Story, {stories: STORIES}),
  onestory
);
