Companies = new Mongo.Collection("Companies");

People = new Mongo.Collection("People");

Schemas = {};


//Template.registerHelper("Schemas", Schemas);

Schemas.Person = new SimpleSchema({
  firstName: {
    type: String,
    index: 1,
    unique: true
  },
  lastName: {
    type: String,
    optional: false
  },
  age: {
    type: Number,
    optional: false
  }
});

Schemas.Company = new SimpleSchema({
	/*company info fields*/
  name: {
    type: String,
    label: "Company Name",
    max: 100
  },
  /*
  employees: {
    type: Number,
    label: "Employee Count"
  },
  industry: {
    type: String,
    label: "Industry",
    max:100,
    optional: false
  },
  */
  /*roi fields */
  num_recruiters: {
    type: Number,
    label: "Number of recruiters on staff",
    optional: false
  },

  num_positions_per_recruiter: {
    type: Number,
    label: "Positions filled by a recruiter in one year",
    optional: false
  },
  cost_recruiter: {
    type: Number,
    label: "Average Full Time Recruiter Salary per Year",
    optional: false
  },/*
  num_engineers_in_hiring: {
    type: Number,
    label: "Number of Engineers involved in Hiring",
    optional: false
  }*/
  /*roi scenario fields*/
  /*scenario 1*/
   hire_improvement_per_recruiter: {
    type: Number,
    label: "Effectiveness Improvement Percentage per Recruiter because of Hackerrank ",
    optional: false
  },
  /*scenario 2*/

  time_to_fill: {
    type: Number,
    label: "Average time to fill technical position (weeks)",
    optional: false
  },
  cost_vacant_position_per_week: {
    type: Number,
    label: "Estimate of Opportunity Cost per Vacant Position at Company (per week) in USD",
    optional: false
  },
  /*Summary*/
  /*
  savings_adjustment: {
    type: Number,
    label: "Adjustment applied to grand total savings",
    optional: false
  },
  */
  cost_hackerrank: {
    type: Number,
    label: "Yearly HackerRank Recruiter Cost for Customer (include discounts)",
    optional: false
  }
  /*
  cost_hackerrank_recruiter: {
    type: Number,
    label: "Cost of HackerRank per Recruiter (include discounts)",
    optional: false
  },
  cost_hackerrank_engineer: {
    type: Number,
    label: "Cost of HackerRank per Engineer (include discounts)",
    optional: false
  },
  cost_hackerrank_codesprints: {
    type: Number,
    label: "Cost of Codesprints (if applicable)",
    optional: false
  },

  roi: {
    type: Number,
    label: "ROI (%)",
    optional: false,
    autoValue: function() {
      return 50;
    }
  }
  */
});


People.attachSchema(Schemas.Person);

Companies.attachSchema(Schemas.Company);

RegExp.escape = function(s) {  
  return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
};
Number.prototype.round = function(places) {
  return +(Math.round(this + "e+" + places)  + "e-" + places);
}