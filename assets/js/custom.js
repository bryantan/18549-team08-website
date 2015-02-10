$(document).ready(function() {
    // enabling popovers
    $('.popover-markup>.trigger').popover({
        html: true,
        container: 'body',
        title: function () {
            return $(this).parent().find('.head').html();
        },
        content: function () {
            return $(this).parent().find('.content').html();
        }
    });

    // hiding popovers when clicking outside of one
    $('body').on('click', function (e) {
        //did not click a popover toggle or anything inside a popover
        if (!$(e.target).is('.popover-markup>.trigger') &&
            $(e.target).parents('.popover').length === 0) {
            $('.popover-markup>.trigger').popover('hide');
        }
    });

    var rightSidebar = $('#right-sidebar');
    rightSidebar.hide();

    $('#about-toggle').click(function() {
        $('#right-sidebar').toggle();
    });

    $(document).on('submit', '.comment-form', function(e) {
        e.preventDefault();
        var text = $(this).find('input[name="text"]').val();
        var csrf = $(this).find('input[name="csrfmiddlewaretoken"]').val();
        var dataString = '&text=' + text + '&csrfmiddlewaretoken=' + csrf;
        console.log(dataString);
        $.ajax({
            data: dataString,
            type: $(this).attr('method'),
            url: $(this).attr('action'),
            success: function(response) {
                $(e.target).before(response);
            }
        });
    });
});
