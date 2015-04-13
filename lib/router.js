Router.route('/', function () {
  // render the Home template with a custom data context
  this.render('games', {data: {title: 'Current Games'}});
});

// when you navigate to "/one" automatically render the template named "One".
Router.route('/home')
Router.route('/games');
Router.route('/leaderboard');
Router.route('/about');
Router.route('/creategame');
Router.route('/features');
Router.route('/pricing');
//Router.route('/analytics');

Router.route('gameboard', {
  path: '/game/:_name/',
  notFoundTemplate: 'gameNotFound',
  data: function() {
    return Games.findOne({gamename: this.params._name});
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
