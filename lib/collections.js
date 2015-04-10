Games = new Mongo.Collection("Games");
Players = new Mongo.Collection("Players");

Schemas = {};

//Template.registerHelper("Schemas", Schemas);

Schemas.Game = new SimpleSchema({
  gamename: {
    type: String,
    unique: true
  },
  playernames: {
    type: [Object],
    optional: true
  },
  datecreated: {
    type: Date,
    optional: false
  },

  boardstate: {
    type: [Object],
    optional: false
  },
  gamestate: {
    type: Number,
    optional: false
  },
  players: {
    type: Number,
    optional: false
  }
  
});

Schemas.Player = new SimpleSchema({
  playername: {
    type: String,
    unique: true
  },
  email: {
    type: String,
    unique: true
  },
  wins: {
    type: Number,
    optional: false
  },
  losses: {
    type: Number,
    optional: false
  }

})

Games.attachSchema(Schemas.Game);
Players.attachSchema(Schemas.Player);

RegExp.escape = function(s) {  
  return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
};
Number.prototype.round = function(places) {
  return +(Math.round(this + "e+" + places)  + "e-" + places);
}