
Meteor.publish("Games", function () {
    return Games.find({});
});

Meteor.publish("Players", function () {
    return Players.find({});
});



