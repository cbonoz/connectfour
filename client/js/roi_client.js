
Session.set('roi_amount',0);
Session.set('current_template', 'dashboard');
console.log('hi');

$('#hire_number').change(function() {
  console.log('hire number changed');
  alert('hi');
});

$('#cost_per_hire').change(function() {
  console.log('cost_per_hire changed');
});

function changeTemplate(name) {
  Session.set('current_template', name);
  console.log('Changed template to ' + name);
}

Template.content_area.helpers({
  whichOne: function () {
    return Session.get('current_template');
    // note that we return a string - per http://docs.meteor.com/#template_dynamic
  }
});


Template.dashboard.helpers({
    savedPrice: function() {
        return Session.get("roi_amount");
    },
    totalPrice: function(){
       var price= 0;
       var items= Items.find({});
       items.forEach(function(item){
           price+=item.price;
       });
       return price;
    },
    totalQty: function(){
       return Items.find({}).count();
    },
    items:function(){
      return Items.find({});
    }
});

Template.dashboard.events({
    'submit form': function(event){
    event.preventDefault();
    var hire_num = $('#hire_number').val();
    var cost_hire = $('#cost_per_hire').val();
    console.log('hire_num: ' + hire_num);
    var saved = Math.round(hire_num*cost_hire*.8);
    console.log('saved money: ' + saved);
    Session.set('roi_amount',saved);
  }

})



