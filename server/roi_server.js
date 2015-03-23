



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
