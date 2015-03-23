

Schemas = {};

Meteor.methods({
  addCompany: function (company, employees, roi) {
    Companies.insert({
      name: company,
      createdAt: new Date(),
      employees: employees,
      roi: roi
    });
  },
  deleteCompany: function (companyId) {
    //var company = Companies.findOne(companyId);

    Companies.remove(companyId);
  }

});



//Template.registerHelper("Schemas", Schemas);

Schemas.Person = new SimpleSchema({
  firstName: {
    type: String,
    index: 1,
    unique: true
  },
  lastName: {
    type: String,
    optional: true
  },
  age: {
    type: Number,
    optional: true
  }
});

Schemas.Company = new SimpleSchema({
  name: {
    type: String,
    label: "Company Name",
    max: 100
  },
  employees: {
    type: Number,
    label: "Employee Count"
  },
  industry: {
    type: String,
    label: "Industry",
    max:100,
    optional: true
  },

  num_recruiters: {
    type: Number,
    label: "Number of recruiters on staff",
    optional: true
  },

  num_positions_per_recruiter: {
    type: Number,
    label: "Positions filled by a recruiter in one year",
    optional: true
  },
  cost_recruiter: {
    type: Number,
    label: "Fully burdened annual cost for a recruiter",
    optional: true
  },
  num_engineers: {
    type: Number,
    label: "Number of Engineers",
    optional: true
  },
  roi: {
    type: Number,
    label: "Total ROI (%)",
    optional: true
  }

});

People.attachSchema(Schemas.Person);

Companies.attachSchema(Schemas.Company);


Meteor.publish(null, function () {
  return People.find();
});

People.allow({
  insert: function () {
    return true;
  },
  remove: function () {
    return true;
  }
});


Meteor.publish("Companies", function () {
    return Companies.find({});
  });
