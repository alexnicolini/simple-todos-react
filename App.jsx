// App component - represents the whole app
App = React.createClass({

  // This mixin makes the getMeteorData method work
  mixins: [ReactMeteorData],

  getInitialSate() {
    return {
      hideCompleted: false
    }
  },

  // Loads items from the Tasks collection and puts them on this.data.tasks
  getMeteorData() {
    return {
      tasks: Tasks.find({}, { sort: { createdAt: -1 } }).fetch()
    }
  },

  renderTasks() {
    // Get tasks from this.data.tasks
    return this.data.tasks.map((task) => {
      return <Task key={task._id} task={task} />;
    });
  },

  handleSubmit(event) {
    event.preventDefault(); // to avoid default form behavior for this event

    // Find the text field via the React ref
    var text = React.findDOMNode(this.refs.textInput).value.trim();

    Tasks.insert({
      text: text,
      createdAt: new Date() // current time
    });

    // Clear form
    React.findDOMNode(this.refs.textInput).value = '';
  },

  render() {
    return (
      <div className="container">
        <header>
          <h1>Todo List</h1>

          {/* This is a comment in JSX code */}

          <label className="hide-completed">
            <input type="checkbox" readOnly={true} checked={this.state.hideCompleted} onClick={this.toogleHideCompleted} />
            Hide Completed Tasks
          </label>
    
          <form className="new-task" onSubmit={this.handleSubmit}>
            <input type="text" ref="textInput" placeholder="Type do add new tasks" />
          </form>
        </header>

        <ul>
          {this.renderTasks()}
        </ul>
      </div>
    );
  }
});