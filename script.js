$(document).ready(function() {
    //календарь
    $('.form_date').datepicker({
        changeMonth: true,
        changeYear: true
    });
    //выпадающие списки
    $('.select').click(function() {
        $(this).children().toggleClass('drop');
        $(this).children().siblings('img').toggleClass('rotate_arrow');
    });
    $(document).on('click', '.drop_list li', function() {
        $(this).siblings().removeClass('chosen');
        $(this).addClass('chosen');
        var selectLi = $(this).text();
        $(this).parent('ul').siblings('.drop_list_close').text(selectLi);
    });
    //модальное окно e-mail
    $(document).on('click', '.btn_addemail', function() {
        $('.modal input').val('');
        $('.modal_underlay').css({
            'display': 'block'
        });
        $('.modal').fadeIn(400)
            .css({
            'display': 'block'
        });
    })
    $(document).on('click', '.modal_close', function(e) {
            $('.modal_underlay').css({
            'display': 'none'
        });
        $('.modal').css({
            'display': 'none'
        });
    })
    $(document).on('click', '.modal_underlay', function() {
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
            $(this).css({
                'color': 'red'
            });
        } else {
            $(this).css({
                'color': '#808082'
            });
        }
    })
    function goValidate(value, regular) {
        var emailVal = $('.validate_input').val();
        return emailVal.match(regular);
    }
    //ajax переключение по вкладкам без перезагрузки
    $('.nav_set').click(function(e) {
        e.preventDefault();
        $.ajax({
            url: "settings.html", //Страница, которую загружаем в контейнер
            cache: false, //Если false, запрашиваемая страница не будет кэшироваться браузером
            success: function(html) { //если все ок, то выполняем ф-ию.. В параметре - возвращаемые с сервера данные, в данном случае это html
                $("#ajax-container").html(html); //заменяем содержимое контейнера наданные из settings.html
            }
        });
    });
    //настройки
    $('.sec_block_01').click(function() {
        $(this).children('.sec_block_01-drop').slideToggle(300);
        $(this).children('img').toggleClass('rotate_arrow');
    });
    //модальное окно в настройках 01
    $(document).on('click', '.sec_block_02', function() {
        $('.modal input').val('');
        $('.sec_block_01-drop').css({
            'display': 'none'
        });
        $('.modal_underlay').css({
            'display': 'block'
        });
        $('.modal').fadeIn(400)
            .css({
            'display': 'block'
        });
    });
    $(document).on('click', '.modal_close', function() {
        $('.modal_underlay').css({
            'display': 'none'
        });
        $('.modal').css({
            'display': 'none'
        });
    });
    $(document).on('click', '.modal_underlay', function() {
        $('.modal_underlay').css({
            'display': 'none'
        });
        $('.modal').css({
            'display': 'none'
        });
    });
    //модальное окно в настройках 01
    $(document).on('click', '.sec_02-btn', function() {
        $('.modal_addgroup input').val('');
        $('.modal_underlay').css({
            'display': 'block'
        });
        $('.modal_addgroup').fadeIn(400)
            .css({
            'display': 'block'
        });
    });
    $(document).on('click', '.modal_close', function() {
        $('.modal_underlay').css({
            'display': 'none'
        });
        $('.modal_addgroup').css({
            'display': 'none'
        });
    });
    $(document).on('click', '.modal_underlay', function() {
        $('.modal_underlay').css({
            'display': 'none'
        });
        $('.modal_addgroup').css({
            'display': 'none'
        });
    });
    //валидация формы "введите офис/отдел"
    $(document).on('click', '.modal_btn-addgroup', function() {
        var valueInput = $('.validate_input-group').val();
        if (valueInput === '') {
            alert('Поле не должно оставаться пустым!')
        } else {
        $('.modal_underlay').css({
            'display': 'none'
        });
        $('.modal_addgroup').css({
            'display': 'none'
        });
            $('.sec_02-col01 ul').append('<li><div class="group">' + valueInput + '</div> <div class="switcher"><div class="switch"></div></div><a href="#" class="edit">Редактировать</a><a href="#" class="del">Удалить</a></li>');
        }
    });
//модальное окно закрывается по нажатию интер, когда вводишь value
$( '.validate_input-group').keyup(function(){
    var valueInput = $('.validate_input-group').val();
     if(event.keyCode == 13)
       {
        $('.modal_addgroup input').val('');
        $('.modal_underlay').css({
            'display': 'none'
        });
        $('.modal_addgroup').css({
            'display': 'none'
        });
        $('.sec_02-col01 ul').append('<li><div class="group">' + valueInput + '</div> <div class="switcher"><div class="switch"></div></div><a href="#" class="edit">Редактировать</a><a href="#" class="del">Удалить</a></li>');
   }
});
    //валидация формы "добавьте виджет" и //добавление офиса на страницу
    $(document).on('click', '.modal_btn', function() {
        var valueInput = $('.validate_input-widget').val();
        if (valueInput === '') {
            alert('Поле не должно оставаться пустым!')
        }
    });
    $('body').on('click', '.switcher', function() {
        $(this).toggleClass('switcher-on');
        $(this).children().toggleClass('switch-on');
    });
     $('body').on('click', '.del', function(e) {
       $(this).parent('li').remove();
    });
});