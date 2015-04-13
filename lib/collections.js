Games = new Mongo.Collection("games");
Players = new Mongo.Collection("players");

Schemas = {};

//Template.registerHelper("Schemas", Schemas);

Schemas.Game = new SimpleSchema({
  gamename: {
    type: String,
    unique: true
  },
  playernames: {
    type: [String],
    optional: true
  },
  datecreated: {
    type: Date,
    optional: false,
    max: 50
  },

  boardstate: {
    type: [[Number]],
    optional: false
  },
  gamestate: {
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