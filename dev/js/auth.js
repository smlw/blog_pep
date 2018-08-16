/* eslint-disable no-undef */
$(function() {
    // toggle 1
    var flag = true;
    $('.switch-button').on('click', function(e) {
      e.preventDefault();
  
      if (flag) {
        flag = false;
        $('.register').show('slow');
        $('.login').hide();
      } else {
        flag = true;
        $('.login').show('slow');
        $('.register').hide();
      }
    });

    /* register button */
    $('.register-button').on('click', function(e){
      e.preventDefault();

      var data = {
        login: $('#register-login').val(),
        password: $('#register-password').val(),
        passwordConfirm: $('#register-password-confirm').val()
      }

      $.ajax({
        type: 'POST',
        data: JSON.stringify(data),
        contentType: 'application/json',
        url: '/api/auth/register'
      }).done(function(data){
        console.log(data);
      })
    });
  });




/* eslint-enable no-undef */