
$(function() {
  console.log('hello world :o');
  
  $.get('/users', function(users) {
    dreams.forEach(function(user) {
      $('<li></li>').text(user).appendTo('ul#users');
    });
  });

});
