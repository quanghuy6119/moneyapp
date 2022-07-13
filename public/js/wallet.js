$(document).ready(function () {
    // console.log(window.location.href);
    jQuery(window).on("hashchange", function () {
        var router = window.location.hash.trim();
        console.log(router);
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


    $(".btn-test").click(function () {
        $('.row-layouts-wallet').append(`
        <figure>
            <img src='${window.location.origin}/img/wallet-svgrepo-com.svg' alt="Portfolio Item">
            <figcaption>
                <h3>Title</h3>
                <p>Description.</p>
            </figcaption>
        </figure> `)

        console.log($('.row-layouts-wallet figure').length);
    })
});