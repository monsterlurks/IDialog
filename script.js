$(document).ready(function() {
    //ajax переключение по вкладкам без перезагрузки
    $(function() {
        $('nav ul li a').each(function(index, elem) {
            var linkName = $(this).attr('class');
                $(document).on('click', '.' + linkName, function(e) {
                e.preventDefault();
                    $.ajax({
                    url: linkName + '.html', //Страница, которую загружаем в контейнер
                    cache: false, //Если false, запрашиваемая страница не будет кэшироваться браузером
                    success: function(html) { //если все ок, то выполняем ф-ию.. В параметре - возвращаемые с сервера данные, в данном случае это html
                        $("#ajax-container").html(html); //заменяем содержимое контейнера наданные из settings.html
                    }
                });
            });
        });
    });
    //выпадающее меню, дополнительные пункты настроек
    $(document).on('click','nav ul li', function(){
        if($(this).children().hasClass('settings')){
              $('.drop_nav').fadeIn(400);
              $(this).siblings().children().removeClass('active_btn');
              $(this).children().addClass('active_btn');
        } else {

            $('.drop_nav').fadeOut(400);
             $(this).siblings().children().removeClass('active_btn');
            $(this).children().addClass('active_btn');
        }
    })
    //календарь, подключение готового плагина
    $('.form_date').datepicker({
        changeMonth: true,
        changeYear: true
    });
    //выпадающие списки
    $(document).on('click', '.select', function() {
        $(this).children('.drop_list').slideToggle();
        $(this).children().siblings('img').toggleClass('rotate_arrow');
    });
    $(document).on('click', '.drop_list li', function() {
        $(this).siblings().removeClass('chosen');
        $(this).addClass('chosen');
        var selectLi = $(this).text();
        $(this).parent('ul').siblings('.drop_list_close').text(selectLi);
    });
    //модальное окно, вызов и закрытие
    $(document).on('click', '.btn_addemail', function() {
        $('.modal input').val('');
        $('.modal_underlay').css({
            'display': 'block'
        });
        $(this).siblings('.modal').fadeIn(400);
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
    function goValidate(value, regular) { // функция валидации
        var emailVal = $('.validate_input').val();
        return emailVal.match(regular);
    }
    //юлок настроек
    $(document).on('click', '.sec_block_01', function() {
        $(this).children('.sec_block_01-drop').slideToggle(300);
        $(this).children('img').toggleClass('rotate_arrow');
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
    $(document).on('keyup', '.validate_input-group', function() {
        var valueInput = $('.validate_input-group').val();
        if (event.keyCode == 13 && valueInput !== '') {
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
    $('body').on('click', '.switcher', function() { //вешаем обработчик на body, потому что элемент switcher динамически создан
        $(this).toggleClass('switcher-on');
        $(this).children().toggleClass('switch-on');
    });
    $('body').on('click', '.del', function(e) {
        $(this).parent('li').remove();
    });
    //плавный скролл к редактированию
    $(document).on('click', '.edit', function() {
        $('html, body').animate({
            scrollTop: ($('.sec-03').offset().top)
        }, 700);
    });
    //установка флажков
    $(document).on('click', '.radio', function() {
        $('.radio').removeClass('rad_cheked'); //удалили бэкграунд с галкой
        $('.radio').siblings('input[type=checkbox]').prop("checked", false); //ближайший нечекнутый чекбокс
        $(this).addClass('rad_cheked'); //добавили выбранному элементу класс с галкой
        $(this).siblings('input[type=checkbox]').prop("checked", "checked"); //ближайший к выбранному элементу чекбокс чекается
    });
    //вкл/выкл
    $(document).on('click', '.a_on', function() {
        $(this).removeClass('a-disabled');
        $(this).addClass('a-active');
        $('.a_off') //.removeClass('a-active')
            .addClass('a-disabled')
    });
    $(document).on('click', '.a_off', function() {
        $(this).removeClass('a-disabled');
        $(this).addClass('a-active');
        $('.a_on') //.removeClass('a-active')
            .addClass('a-disabled')
    });
    $(document).on('click', '.sec-04-rad-btn', function() {
        $(this).toggleClass('rad_cheked');
    });
        //suupport выезжающие ответы
    $(document).on('click', '.see_answ', function() {
        $(this).siblings('.answ_open').slideToggle(300);
    });
});