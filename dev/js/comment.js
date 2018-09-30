$(function () {

    var commentForm;

    $('#new, #reply').on('click', function (e) {
        if(commentForm) commentForm.remove();

        commentForm = $('form.comment').clone(true, true);

        if ($(this).attr('id') === 'new') {
            commentForm.appendTo('.comment-list');
        }

        commentForm.css({
            display: 'flex'
        });
    })

    $('form.comment .send').on('click', function (e) {
        e.preventDefault();
        // removeErrors()

        var data = {
            body: $('#post-body').html()
        };

        $.ajax({
            type: 'POST',
            data: JSON.stringify(data),
            contentType: 'application/json',
            url: '/post/add'
        }).done(function (data) {
            console.log(data);
            if (!data.ok) {
                $('.post-form h2').after('<p class="error">' + data.error + '</p>');
                if (data.fields) {
                    data.fields.forEach(function (item) {
                        $('#post-' + item).addClass('error');
                    });
                }
            } else {
                // $('.post-form h2').after('<p class="success">Отлично!</p>');
                $(location).attr('href', '/');
            }
        });
    })
});