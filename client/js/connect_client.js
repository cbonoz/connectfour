Meteor.subscribe('Games');
Meteor.subscribe('Users');
FlashMessages.configure({
    autoHide: true,
    hideDelay: 5000,
    autoScroll: true
  });

var RUNNING = 0;
var STOPPED = 1;
var ZERO_BOARD = new Array([
[0,0,0,0,0,0,0],
[0,0,0,0,0,0,0],
[0,0,0,0,0,0,0],
[0,0,0,0,0,0,0],
[0,0,0,0,0,0,0],
[0,0,0,0,0,0,0]
]);

Template.home.events({
  "click .main-start-button": function() {
    console.log('going to games list');
    Router.go('/games');
  }
  });

Template.games.events({
  "click .create-button": function() {
    console.log('create');
    Router.go('/creategame');

  },

    "click .join-game" : function () {
      Session.set("selectedGameId", this._id);
      console.log('Viewing game: ' + this._id);
      Router.go('gamePlayDetail', {_id: this._id});      
    }

});

Template.games.helpers({

  games: function() {
    //return Companies.find();
    return Games.find({},{sort:{createdat:-1}, reactive:true});
  },
  numGames: function() {
    return Games.find().count();
  }

});


Template.creategame.events({
  "submit form": function(event) {
    event.preventDefault(); console.log("Form submitted"); console.log(event.type);

    var nametext = event.target.namefield.value;
    var emailtext = event.target.emailfield.value;
    console.log('Creating game: ' + nametext);

    if (Games.findOne({gamename: nametext})) {
        FlashMessages.sendError('Failed to Create: Game with same name already exists!');
       return;
    }
    Games.insert({
      gamename: nametext,
      playernames: [emailtext],
      datecreated: new Date(), // current time
      boardstate: ZERO_BOARD,
      gamestate: RUNNING,
      players: 1
    }, function() {
      Session.set("selectedGameName",nametext);
      Router.go('gameboard', {_name: nametext});
    });
    
    // Prevent default form submit
    return false;
  }
});

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
  currentgame: function() {
    var current_gamename = Session.get("selectedGameName");
    
    console.log('current game: ' + current_gamename);
    return Games.findOne({gamename: current_gamename});
  }
});


