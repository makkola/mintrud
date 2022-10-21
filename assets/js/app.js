'use strict'

$(document).ready(function() {
    var headerSelect2Width = 'resolve'
    var widthTrigger = $('.branding-rt-text')

    if (widthTrigger && widthTrigger.length) {
        headerSelect2Width = widthTrigger.width()
    }

    $('.home__header__select select')
        .select2({
            width: headerSelect2Width,
            theme: 'custom',
            placeholder: 'Выберите учреждение',
            allowClear: true,
            language: {
                noResults: function(params) {
                    return 'Увы, ничего не найдено. Выберте из списка.'
                }
            }
        })
        .on('change', function() {
            function isValidUrl(url) {
                var objRE = /(^https?:\/\/)?[a-z0-9~_\-\.]+\.[a-z]{2,9}(\/|:|\?[!-~]*)?$/i
                return objRE.test(url)
            }

            if (isValidUrl('http://' + this.value))
                location.href = 'http://' + this.value
            /* + location.pathname*/ else location.href = 'http://tatartrud.ru'
        })

    $('.job-page__form select:not([multiple])')
        .select2({
            theme: 'custom2',
            minimumResultsForSearch: 100,
            placeholder: ' ',
            allowClear: true
        })
        .on('change', function() {
            if ($(this).val())
                $(this)
                    .closest('.input')
                    .addClass('hover')
            else
                $(this)
                    .closest('.input')
                    .removeClass('hover')
        })

    $('.job-page__form select[multiple]')
        .select2({
            theme: 'custom2',
            minimumResultsForSearch: 100,
            placeholder: ' ',
            allowClear: false
        })
        .on('change', function() {
            if ($(this).val() && $(this).val().length)
                $(this)
                    .closest('.input')
                    .addClass('hover')
            else
                $(this)
                    .closest('.input')
                    .removeClass('hover')
        })

    $('.home__header__carousel_items').slick({
        autoplay: true,
        autoplaySpeed: 3000,
        arrows: false,
        dots: true,
        infinite: true,
        fade: true,
        cssEase: 'linear'
    })

    $('.page-carousel__items').slick({
        arrows: true,
        dots: true,
        infinite: true,
        fade: true,
        cssEase: 'linear'
    })

    $('.home__calendar__right #calendar')
        .datetimepicker({
            inline: true,
            viewMode: 'days',
            format: 'DD/MM/YYYY',
            locale: 'ru'
        })
        .on('dp.update', highlightDateHome)

    highlightDateHome()

    $('.datepicker .day').click(function() {
        return false
    })
    $('.datepicker .picker-switch').click(function() {
        return false
    })

    $('.datepicker .day.highlight').click(function() {
        var url_arr = $(this)
            .attr('data-day')
            .split('.')

        document.location.href =
            '/events/' + url_arr[2] + '/' + url_arr[1] + '/' + url_arr[0]
        return false
    })
})

function highlightDateHome() {
    var daysString = $('.home__calendar__right #calendar').data('day')
    var days = []
    if (daysString) {
        days = daysString.split(',')
        $.each(days, function(index, item) {
            $('#calendar td[data-day="' + item + '"]').addClass('highlight')
        })
    }
}

$(document).ready(function() {
    function setCookieInvalid(font, color) {
        if (font == undefined && color == undefined) {
            setCookie('invalid_version_default', true, { expires: 10000 })
            setCookie('invalid_font', false, { expires: 10000 })
            setCookie('invalid_color', false, { expires: 10000 })
        } else if (font == undefined) {
            console.log(123)
            setCookie('invalid_version_default', false, { expires: 10000 })
            setCookie('invalid_color', color, { expires: 10000 })
        } else if (color == undefined) {
            setCookie('invalid_version_default', false, { expires: 10000 })
            setCookie('invalid_font', font, { expires: 10000 })
        } else {
            setCookie('invalid_version_default', false, { expires: 10000 })
            setCookie('invalid_font', font, { expires: 10000 })
            setCookie('invalid_color', color, { expires: 10000 })
        }
    }

    $('.invalid-menu__size a').on('click', function(e) {
        e.preventDefault()
        if ($(this).hasClass('sm')) {
            setCookieInvalid('sm')
            $('html').addClass('sm')
            $('html').removeClass('lg normal')
        } else if ($(this).hasClass('normal')) {
            setCookieInvalid('normal')
            $('html').addClass('normal')
            $('html').removeClass('sm lg')
        } else if ($(this).hasClass('lg')) {
            setCookieInvalid('lg')
            $('html').addClass('lg')
            $('html').removeClass('sm normal')
        }

        $(this)
            .addClass('active')
            .siblings()
            .removeClass('active')
    })

    $('.invalid-menu__color a').on('click', function(e) {
        e.preventDefault()

        if ($(this).hasClass('white')) {
            setCookieInvalid(undefined, 'white-theme')
            $('body').addClass('white-theme')
            $('body').removeClass('black-theme blue-theme')
        }

        if ($(this).hasClass('black')) {
            setCookieInvalid(undefined, 'black-theme')
            $('body').addClass('black-theme')
            $('body').removeClass('white-theme blue-theme')
        }

        if ($(this).hasClass('blue')) {
            setCookieInvalid(undefined, 'blue-theme')
            $('body').addClass('blue-theme')
            $('body').removeClass('white-theme black-theme')
        }
    })

    $('.invalid').on('click', function(e) {
        e.preventDefault()
        setCookieInvalid('normal', 'white-theme')
        $('body').addClass('white-theme')
        $('html').addClass('normal')
    })

    $('.invalid-menu__default').on('click', function(e) {
        setCookieInvalid()
        e.preventDefault()
        $('body').removeClass('white-theme black-theme blue-theme')
        $('html').removeClass('normal sm lg')
    })
})
