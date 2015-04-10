Meteor.subscribe('games');
Meteor.subscribe('players');

FlashMessages.configure({
    autoHide: true,
    hideDelay: 5000,
    autoScroll: true
  });

var RUNNING = 0;
var STOPPED = 1;
var ZERO_BOARD = [
[0,0,0,0,0,0,0],
[0,0,0,0,0,0,0],
[0,0,0,0,0,0,0],
[0,0,0,0,0,0,0],
[0,0,0,0,0,0,0],
[0,0,0,0,0,0,0]
];

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
      Session.set("selectedGameName", this.gamename);
      console.log('Viewing game: ' + this.gamename);
      Router.go('gameboard', {_name: this.gamename});      
    }

});

Template.currentgames.helpers({

  games: function() {
    //return Companies.find();
    return Games.find({},{sort:{datecreated:-1}, reactive:true});
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
    console.log('Creating game: ' + nametext + ', players: ' + emailtext);

    if (Games.findOne({gamename: nametext})) {
        FlashMessages.sendError('Failed to Create: Game with same name already exists!');
       return;
    }

    Games.insert({
      gamename: nametext,
      playernames: [emailtext],
      datecreated: new Date(), // current time
      boardstate: ZERO_BOARD,
      gamestate: RUNNING
    }, function(error, result) {
      console.log('Insert error: ' + error);
      console.log('Insert result: ' + result);
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
  "click .join-game ": function() {
    var currentname = this.gamename;
    Session.set("selectedGameName",currentname);
    console.log('Entering game: ')
    Router.go('gameboard', currentname);
  }
});

Template.gameboard.helpers({
  currentgame: function() {
    var currentname = Session.get("selectedGameName");
    
    console.log('current game: ' + currentname);
    return Games.findOne({gamename: currentname});
  },
  playerEmails: function() {
    return this.playernames.join(',');
  }
});

Template.gameboard.events({
  'click .menu-return': function() {
    console.log('Return to menu');
    Router.go('/games');
  },
   'click .end-game': function() {
    console.log('Game Ended');
    //delete game from collection here
    var currentname = Session.get("selectedGameName");
    console.log('Game ' + currentname + ' ended.');
    Games.remove(this._id);
    Router.go('/games');
  }
});





