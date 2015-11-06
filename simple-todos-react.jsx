// Define a collection to hold our tasks
Tasks = new Mongo.Collection('tasks');

if (Meteor.isClient) {
  // This code is executed on the client only

  Accounts.ui.config({ // Configure the accounts UI to use usernames instead of email addresses
    passwordSignupFields: 'USERNAME_ONLY'
  });

  Meteor.subscribe('tasks'); // Retrieve the data that’s published from the server

  Meteor.startup( () => { // Use Meteor.startup to render the component after the page is ready

    // React.render takes two arguments
    // The first argument is the UI object
    // The second argument is the DOM object
    React.render(<App />, document.getElementById('render-target'));
  });
}

if (Meteor.isServer) {
  // This code is executed on the server only
  Meteor.publish('tasks', function () { // Define what data should be available to users
    return Tasks.find();
  });
}

Meteor.methods({
  addTask(text) {
    // Make sure the user is logged in before inserting a task
    if (! Meteor.userId()) {
      throw new Meteor.error("not-authorized"); // Launch an exception
    }

    Tasks.insert({
      text: text,
      createdAt: new Date(),            // current time
      owner: Meteor.userId(),           // _id of logged in user 
      username: Meteor.user().username  // username of logged in user
    });
  },

  removeTask(taskId) {
    Tasks.remove(taskId);
  },

  setChecked(taskId, setChecked) {
    Tasks.update(taskId, { $set: { checked: setChecked } });
  },

  setPrivate(taskId, setToPrivate) {
    const task = Tasks.findOne(taskId); // Returns the data from a single document inside the collection


    // Make sure only the task owner can make a task private
    if (task.owner != Meteor.userId()) {
      throw new Meteor.error("not-authorized"); // Launch an exception
    }

    Task.update(taskId, { $set: { private: setToPrivate } });
  }
});
