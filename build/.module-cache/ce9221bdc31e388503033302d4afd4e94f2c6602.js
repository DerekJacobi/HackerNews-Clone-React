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
    $.get(src, function(result) {
      var data = result
    }.bind(this))
        return (
            React.createElement("tr", {key: item}, 
                React.createElement("td", null, 
                    React.createElement("p", {className: "score"}, " Story URL  \"", src, "\"")
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

  loadCommentsFromServer: function() {
    $.ajax({
        url: this.props.url,
        dataType: 'json',
        success: function(data) {
            this.setState({data: data});
        }.bind(this)
    });
},

getInitialState: function() {
    return {data: []};
},
componentWillMount: function() {
    this.loadCommentsFromServer();
},

render: function() {
    var ideas = this.state.data.map(function(i){
        return React.createElement("ideabox", {data: i});
    });
    return (
        React.createElement("div", {className: "idealist"}, 
            ideas
        )
        );
}

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
  //
  // render: function() {
  //   var divclass = 'indivstory';
  //   var topPClass = 'storytop';
  //   var bottomPClass= 'storybottom';
  //   return (
  //     <div className={divclass}>
  //       <p className={topPClass}> <span>1.</span><img src="./images/uparrow.gif"></img> <span><a href={this.state.url}>{this.state.title} ({this.state.url.replace(/^https?:\/./,'').replace(/\/.*$/,'')}</a>).</span> </p>
  //       <p className={bottomPClass}> {this.state.score} points by {this.state.by} | discuss </p>
  //     </div>
  //   );
  // }
});



React.render(
  React.createElement(Story, {src: "../json/story.js"}),
  onestory
);
