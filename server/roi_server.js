
Companies = new Mongo.Collection("companies")


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
    var company = Companies.findOne(companyId);

    Companies.remove(companyId);
  }

});


