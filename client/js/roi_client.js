
Meteor.subscribe('Companies');

FlashMessages.configure({
    autoHide: true,
    hideDelay: 5000,
    autoScroll: true
  });




Template.editCompanyForm.helpers({
  selectedCompanyDoc:function () {
    return Companies.findOne(Session.get("selectedCompanyId"));
  }
});

Template.viewCompanyForm.helpers({
  selectedCompanyDoc:function () {
    return Companies.findOne(Session.get("selectedCompanyId"));
  }
});

  
Template.editCompanyForm.helpers({
  companyName: function() {
    var val = AutoForm.getFieldValue('editCompany','name');
    console.log('form val ' + val);
    return val || '';
    }
});




Template.roi_results.helpers({

  company: function(company) {
    return Companies.findOne(Session.get("selectedCompanyId"));
  },


  companyName: function() {
    //console.log('this in companyName: ' + JSON.stringify(this));
    return this['name'];
  },

  improvedEfficiencyPerRecruiter: function () {
    return this.hire_improvement_per_recruiter;
  },

  hiresPerYear: function() {
    hire_improvement_factor = 1+this.hire_improvement_per_recruiter/100;
    var new_hires = this.num_positions_per_recruiter * (hire_improvement_factor);
    return new_hires.round(1);
  },



  costPerHire: function() {
    return Math.round(this.cost_recruiter / this.num_positions_per_recruiter);
  },

  improvedCostPerHire: function() {
    return Math.round(this.cost_recruiter / (this.num_positions_per_recruiter * hire_improvement_factor));
  },

  savingsPerRecruiter: function() {
     var savings_per_hire = this.cost_recruiter / this.num_positions_per_recruiter - this.cost_recruiter / (this.num_positions_per_recruiter * hire_improvement_factor);
     savedRecruiterCost = Math.round(savings_per_hire * (this.num_positions_per_recruiter));
     return savedRecruiterCost;
  },

  totalRecruiterSavings: function() {
      return savedRecruiterCost * this.num_recruiters;
  },
  

  avgDaysBetweenHire: function() {
    var days = 365 / this.num_positions_per_recruiter;
    return days.round(2);
  },

  improvedAvgDaysBetweenHire: function() {
    var days = 365 / (this.num_positions_per_recruiter*hire_improvement_factor);
    return days.round(2);
  },

  savedOpportunityCostPerRecruiter: function() {
    var savedWeeks = (52 / this.num_positions_per_recruiter) - (52 / (this.num_positions_per_recruiter * hire_improvement_factor));
    savedOppCost = savedWeeks * this.cost_vacant_position_per_week;
    return savedOppCost.round(2);
  },
  /*
  totalOpportunityCostSavingsPerRecruiter: function() {
    savedOppCost = savedWeeks * this.cost_vacant_position_per_week * this.num_recruiters);
    return savedOppCost.round(2);
  },
  */

  totalSavingsPerRecruiter: function () {
    return Math.round(savedOppCost + savedRecruiterCost);
  },

  totalSavings: function () {
    return Math.round((savedOppCost + savedRecruiterCost) * this.num_recruiters);
  },

  costHackerRankRecruiter: function() {
    return Math.round(this.cost_hackerrank);
  },

  netReturn: function() {
    var net_return = (savedOppCost + savedRecruiterCost - this.cost_hackerrank) * this.num_recruiters;
    return net_return.round(2);
  },

  calculatedROI: function () {
    return Math.round(( ((savedOppCost + savedRecruiterCost))- this.cost_hackerrank) / (this.cost_hackerrank) * 100);
  }
});

Template.newCompanyButton.events({
  "click .new-co" : function () {
      Router.go('/newroi');
      
    }
});

Template.company.events({
  "click .edit-company" : function () {
      Session.set("selectedCompanyId", this._id);
      console.log('Editing company: ' + this._id);
      Router.go('roiEditDetail', {_id: this._id});
      
    },
    "click .view-company" : function () {
      Session.set("selectedCompanyId", this._id);
      console.log('Viewing company: ' + this._id);
      Router.go('roiViewDetail', {_id: this._id});      
    },/*
    "click .roi-entry" : function () {
      Session.set("selectedCompanyId", this._id);
      console.log('Viewing company: ' + this._id);
      Router.go('roiViewDetail', {_id: this._id});      
    },*/
    "click .delete-company" : function () {
      Session.set("selectedCompanyId", this._id);
      console.log('Deleted company: ' + this._id);
      FlashMessages.sendInfo("Company Deleted");
      Companies.remove(this._id);
    }
});
Session.set('searchquery','');

Template.allroi.helpers({
  companies: function() {
    //return Companies.find();
    return Companies.find({/*name: { $regex: Session.get('searchquery')+"*", $options: 'i' }*/},{sort:{num_recruiters:-1}, reactive:true});
  },
  numCompanies: function() {
    return Companies.find().count();
  }

});


Template.allroi.events({
  "keyup .name-search": function() {
    var searchstring = $('.name-search').val();
    console.log('searchstring: ' + searchstring);
    Session.set('searchquery', searchstring);
  }
});
/*
Average Efficiency Improvement with HackerRank

Average ROI (%) with HackerRank Investment

Average Company Stats

Time to Fill

Opportunity Cost of Position

Employee Count
*/

Template.analytics.helpers({
  avg_efficiency_improvement: function( ) {
    var avg = 0;
    var targets = Companies.find();
    console.log('target count: ' + targets.count());

    return avg;
  },

  avg_roi: function( ) {
    var avg = 0;
    var targets = Companies.find();
    console.log('target count: ' + targets.count());

    return avg;
  },

  avg_time_to_fill: function( ) {
    var avg = 0;
    var targets = Companies.find();
    console.log('target count: ' + targets.count());

    return avg;
  },

  avg_opportunity_cost: function( ) {
    var avg = 0;
    var targets = Companies.find();
    console.log('target count: ' + targets.count());

    return avg;
  },

  avg_employee_count: function( ) {
    var avg = 0;
    var targets = Companies.find();
    console.log('target count: ' + targets.count());

    return avg;
  }

});
/*
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
*/


var hooksObject = {
  before: {
    // Replace `formType` with the form `type` attribute to which this hook applies
    formType: function(doc) {

    }
  },

  // The same as the callbacks you would normally provide when calling
  // collection.insert, collection.update, or Meteor.call
  after: {
    // Replace `formType` with the form `type` attribute to which this hook applies
    formType: function(error, result) {}
  },

  // Called when form does not have a `type` attribute
  onSubmit: function(doc) {
      //Schema.Company.clean(doc);
      console.log("Company doc with auto values", doc);
      this.done();
      return false;
  },

  // Called when any submit operation succeeds
  onSuccess: function(formType, result) {
    console.log('form success: ' + result + ' ' + formType);
    if (formType=='insert') {
      
      Router.go("/");
      FlashMessages.sendSuccess('Success. Please Find Company Above for ROI report');
    }
    else {
      FlashMessages.sendSuccess('Successfully Updated Company Profile');
    }

    //Router.go("/allroi");
  

  },

  // Called when any submit operation fails
  onError: function(formType, error) {
    console.log('error with form: ' + error);
  }
  /*,

  // Called every time the form is revalidated, which can be often if keyup
  // validation is used.
  
  formToDoc: function(doc, ss, formId) {
    console.log('formToDoc: ' + doc);
  },

  // Called whenever `doc` attribute reactively changes, before values
  // are set in the form fields.
  docToForm: function(doc, ss) {
    console.log('docToForm: ' + doc);
  }
  */
  /*
  // Called at the beginning and end of submission, respectively.
  // This is the place to disable/enable buttons or the form,
  // show/hide a "Please wait" message, etc. If these hooks are
  // not defined, then by default the submit button is disabled
  // during submission.
  beginSubmit: function() {},
  endSubmit: function() {}
  */
};

AutoForm.addHooks(['insertCompany','editCompany'], hooksObject);