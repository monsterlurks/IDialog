$(document).ready(function() {
    //календарь
    $('.form_date').datepicker({
        changeMonth: true,
        changeYear: true
    });
    //выпадающие списки
    $('.select').click(function() {
        $(this).children().toggleClass('drop_list_display_block');
        $(this).children().siblings('img').toggleClass('rotate_arrow');
    });
    $(document).on('click', 'ul li', function() {
        $(this).siblings().removeClass('chosen');
        $(this).addClass('chosen');
        var selectLi = $(this).text();
        $(this).parent('ul').siblings('.drop_list_close').text(selectLi);
    });
    //модальное окно e-mail
    $(document).on('click', '.btn_addemail', function() {
        $('.modal_underlay').css({
            'display': 'block'
        });
        $('.modal').css({
            'display': 'block'
        });
    })
    $(document).on('click', '.modal_close', function() {
            $('.modal_underlay').css({
                'display': 'none'
            });
            $('.modal').css({
                'display': 'none'
            });
        })
        //валидация формы email
    $(document).on('input', '.validate_input', function() {
        if (goValidate($(this), /^\w+@\w+\.\w{2,4}$/i) === null) {
            $(this).css({'color': 'red'});
        } else {
            $(this).css({'color': '#808082'});
        }
    })

    function goValidate(value, regular) {
        var emailVal = $('.validate_input').val();
        return emailVal.match(regular);
    }
});