/* eslint-disable no-undef */
$(function(){

    $('#apc-save').on('click', function(e){
        e.preventDefault();

        
        var data = {
            symbolCount: $('#symbolCount').val(),
            period: $('#period').val()
        }

        console.log(data)
 
        $.ajax({
            type: 'POST',
            data: JSON.stringify(data),
            contentType: 'application/json',
            url: '/apc/settings/req'
        }).done(function (data) {
            console.log(data);
            if(!data.ok){
                $('h1').after('<p class="error">' + data.error + '</p>');
            } else {
                $('h1').after('<h2> Данные были успешно отправлены! </h2>');
            }
        })
    })

});

/* eslint-enable no-undef */