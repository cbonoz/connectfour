Router.route('/', function () {
  // render the Home template with a custom data context
  this.render('allroi', {data: {title: 'Recent ROI Calculations'}});
});

// when you navigate to "/one" automatically render the template named "One".
Router.route('/recent');
Router.route('/newroi');
Router.route('/about');
Router.route('/analytics');


Router.route('/roiEditDetail', {
  path: '/roi/edit/:_id/',
  notFoundTemplate: 'companyNotFound',
  data: function() {
    return Companies.findOne({_id: this.params._id});
  }
  
});

Router.route('/roiViewDetail', {
  path: '/roi/view/:_id',
  notFoundTemplate: 'companyNotFound',
  data: function() {
    return Companies.findOne({_id: this.params._id});
  }
  
});


// when you navigate to "/two" automatically render the template named "Two".
/*Router.route('/');*/
