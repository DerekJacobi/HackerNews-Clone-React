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

  render: function(content) {
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
  React.createElement(Story, null),
  onestory
);

/**
 * Using React 0.13.2
 * Updated 2015-04-28
 */

var NavigationItem = React.createClass({displayName: "NavigationItem",
    onClick: function() {
        this.props.itemSelected(this.props.item);
    },
    render: function() {
        return (
            React.createElement("li", {onClick: this.onClick, className: this.props.selected ? "selected" : ""}, 
                this.props.item.data.display_name
            )
        );
    }
});


var Navigation = React.createClass({displayName: "Navigation",
    setSelectedItem: function(item) {
        this.props.itemSelected(item);
    },
    render: function() {
        var _this = this;

        var items = this.props.items.map(function(item) {
            return (
                React.createElement(NavigationItem, {key: item.data.id, 
                    item: item, itemSelected: _this.setSelectedItem, 
                    selected: item.data.url === _this.props.activeUrl})
            );
        });

        return (
            React.createElement("div", {className: "navigation"}, 
                React.createElement("div", {className: "header"}, "Navigation"), 
                React.createElement("ul", null, 
                    items
                )
            )
        );
    }
});

var StoryList = React.createClass({displayName: "StoryList",
    render: function() {
        var storyNodes = this.props.items.map(function(item) {
            return (
                React.createElement("tr", {key: item.data.url}, 
                    React.createElement("td", null, 
                        React.createElement("p", {className: "score"}, item.data.score)
                    ), 
                    React.createElement("td", null, 
                        React.createElement("p", {className: "title"}, 
                            React.createElement("a", {href: item.data.url}, 
                                item.data.title
                            )
                        ), 
                        React.createElement("p", {className: "author"}, 
                            "Posted by ", React.createElement("b", null, item.data.author)
                        )
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

var App = React.createClass({displayName: "App",
    componentDidMount: function() {
        var _this = this;
        var cbname = "fn" + Date.now();
        var script = document.createElement("script");
        script.src = "https://www.reddit.com/reddits.json?jsonp=" + cbname;

        window[cbname] = function(jsonData) {
            _this.setState({
                navigationItems: jsonData.data.children
            });
            delete window[cbname];
        };

        document.head.appendChild(script);
    },
    getInitialState: function() {
        return ({
            activeNavigationUrl: "",
            navigationItems: [],
            storyItems: [],
            title: "Please select a sub"
        });
    },
    render: function() {
        return (
            React.createElement("div", null, 
                React.createElement("h1", null, this.state.title), 
                React.createElement(Navigation, {activeUrl: this.state.activeNavigationUrl, 
                    items: this.state.navigationItems, 
                    itemSelected: this.setSelectedItem}), 
                React.createElement(StoryList, {items: this.state.storyItems})
            )
        );
    },
    setSelectedItem: function(item) {
        var _this = this;
        var cbname = "fn" + Date.now();
        var script = document.createElement("script");
        script.src = "https://www.reddit.com/" + item.data.url + ".json?sort=top&t=month&jsonp=" + cbname;

        window[cbname] = function(jsonData) {
            _this.setState({storyItems: jsonData.data.children});
            delete window[cbname];
        };

        document.head.appendChild(script);

        this.setState({
            activeNavigationUrl: item.data.url,
            title: item.data.display_name
        });
    }
});

React.render(
    React.createElement(App, null),
    document.body
);
