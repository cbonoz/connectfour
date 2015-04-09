
Meteor.publish("Companies", function () {
    return Companies.find({});
});

