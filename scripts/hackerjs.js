/** @jsx React.DOM */

var StoryTop = React.createClass({
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
        return (
            <tr key={item}>
                <td>
                    {src}
                    <Story />
                </td>
            </tr>
        );
    });

    return (
        <table>
            <tbody>
                {storyNodes}
            </tbody>
        </table>
    );
  }
});

React.render(
  <StoryTop />,
  newstories
);

var Story = React.createClass({

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
      <div className={divclass}>
        <p className={topPClass}> <span></span><img src="./images/uparrow.gif"></img> <span><a href={this.state.url}>{this.state.title} ({this.state.url.replace(/^https?:\/./,'').replace(/\/.*$/,'')}</a>).</span> </p>
        <p className={bottomPClass}> {this.state.score} points by {this.state.by} | discuss </p>
      </div>
    );
  }
});
