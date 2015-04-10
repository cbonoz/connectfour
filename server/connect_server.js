
Meteor.publish("games", function () {
    return Games.find({});
});

Meteor.publish("players", function () {
    return Players.find({});
});



