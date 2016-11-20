$(function() {
  $.get('/all_users', function(users) {
    users.forEach(function(user) {
      $('<li></li>').text(user).appendTo('ul#user');
    });
  });
});