$(document).ready(function() {
    console.log(window.location.href);
    jQuery(window).on( "hashchange", function() {
        console.log('huy');
        var router = window.location.hash.trim();
        console.log('test    ' + router);
        var url;
        if (router == '') {
            url = '/site/dashboard';
        } else {
            url = '/' + router.slice(1, router.length);
        }

        console.log(router);

        // console.log(url);

        // $.ajax({
        //     url: url
        // }).done(function (data) {
        //     document.title = $(data).find('.page-header').text();
        //     $('#page-wrapper').html(data);
        // });
    });
});