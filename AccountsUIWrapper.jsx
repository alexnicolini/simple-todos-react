AccountsUIWrapper = React.createClass({
  componentDidMount() { // Invoked once, immediately after the initial rendering of the component takes place
    // Use Meteor Blaze to render login buttons
    this.view = Blaze.render(Template.loginButtons, React.findDOMNode(this.refs.container));
  },

  componentWillUnmount() { // Invoked immediately before a component is unmounted from the DOM
    // Clean up Blaze view
    Blaze.remove(this.view);
  },

  render() {
    // Just render a placeholder container that will be filled in
    return <span ref="container" />;
  }
});