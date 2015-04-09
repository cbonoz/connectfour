Router.route('/', function () {
  // render the Home template with a custom data context
  this.render('games', {data: {title: 'Current Games'}});
});

// when you navigate to "/one" automatically render the template named "One".
Router.route('/games');
Router.route('/leaderboard');
Router.route('/about');
Router.route('/create');
Router.route('/features');
Router.route('/pricing');
//Router.route('/analytics');

Router.route('/gamePlayDetail', {
  path: '/game/:_id/',
  notFoundTemplate: 'gameNotFound',
  data: function() {
    return Games.findOne({_id: this.params._id});
  }
});
/*
Router.route('/roiViewDetail', {
  path: '/roi/view/:_id',
  notFoundTemplate: 'companyNotFound',
  data: function() {
    return Companies.findOne({_id: this.params._id});
  }
  
});
*/

// when you navigate to "/two" automatically render the template named "Two".
/*Router.route('/');*/
