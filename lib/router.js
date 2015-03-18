Router.route('/', function () {
  // render the Home template with a custom data context
  this.render('dashboard', {data: {title: 'New ROI'}});
});

// when you navigate to "/one" automatically render the template named "One".
Router.route('/recent');

// when you navigate to "/two" automatically render the template named "Two".
Router.route('/all');
