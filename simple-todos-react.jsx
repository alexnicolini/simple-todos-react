// Define a collection to hold our tasks
Tasks = new Mongo.Collection('tasks');

if (Meteor.isClient) {
  // This code is executed on the client only

  Accounts.ui.config({ // Configure the accounts UI to use usernames instead of email addresses
    passwordSignupFields: 'USERNAME_ONLY'
  });

  Meteor.startup( () => { // Use Meteor.startup to render the component after the page is ready

    // React.render takes two arguments
    // The first argument is the UI object
    // The second argument is the DOM object
    React.render(<App />, document.getElementById('render-target'));
  });
}
