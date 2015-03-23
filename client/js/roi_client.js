
Meteor.subscribe('Companies');

Template.recent.helpers({
  companies: function() {
    return Companies.find({}, {sort: {createdAt: -1}});
  }

});

Template.insertCompany.helpers({
  companies: function () {
    return Meteor.users;
  },
  companySchema: function () {
    return Schema.Company;
  }
});


Meteor.methods({
  addCompany: function (company_obj) {
    // Make sure the user is logged in before inserting a task

    Companies.insert(company_obj);
  },
  deleteCompany: function (company_id) {
    Companies.remove(company_id);
  }
  
  });

Template.dashboard.events({
    "submit .new-company": function (event) {
      // This function is called when the new task form is submitted
      var company = {name: 'hi',employees: 100,'roi': 100}

      Meteor.call("addCompany", company);

      // Clear form
      //event.target.text.value = "";

      // Prevent default form submit
      return false;
    }
  });

Template.recent.events({
  "click .roi-entry": function() {
    console.log('You clicked: ' + this);
    //route to a page that allows updates to the entry
  }
})


