/* eslint-disable no-undef */

$(function(){
    //eslint-disable-next-line
    const editor = new MediumEditor('#post-body', {
        placeholder: {
            text: '',
            hideOnClick: true
        }
    });

    // publish button
    $('.publish-button').on('click', function(e){
        e.preventDefault();
  
        var data = {
          title: $('#post-title').val(),
          body: $('#post-body').html(),
        };

        $.ajax({
            type: 'POST',
            data: JSON.stringify(data),
            contentType: 'application/json',
            url: '/post/add'
        }).done( function(data) {
            console.log(data)
            if(!data.ok){
                
            }else {

            }
        }).catch( (err) => {
            throw new Error(err)
        })
    });
  
});

/* eslint-enable no-undef */