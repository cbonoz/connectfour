Meteor.subscribe('Games');
Meteor.subscribe('Users');

Template.home.events({
  "click .main-start-button": function() {
    console.log('going to games list');
    Router.go('/games');
  }
  });

Template.games.events({
  "click .create-button": function() {
    console.log('creating a new game');
    Router.go('/create');

  },

    "click .join-game" : function () {
      Session.set("selectedGameId", this._id);
      console.log('Viewing game: ' + this._id);
      Router.go('gamePlayDetail', {_id: this._id});      
    }

})

Template.home.rendered = function() {
  $("#intro-header").vide("shop.mp4");
};


Template.game.helpers({
  "click .game-entry ": function() {
    var gameId = this._id;
    Router.go('gamePlayDetail', gameId);
  }
});

Template.gameboard.helpers({

});


