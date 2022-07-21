$(document).ready(function () {

    if (window.location.hash == '' || window.location.hash == '#payment') {
        activePayment();
    } else if (window.location.hash == '#income') {
        activeIncome();
    } else if (window.location.hash == '#transfer') {
        activeTransfer();
    };

    jQuery(window).on("hashchange", function () {
        var router = window.location.hash.trim();
        var url;
        if (router == '') {
            url = '/payment';
        } else {
            url = '/' + router.slice(1, router.length);
        }

        if (url == '/payment') {
            activePayment();

        } else if (url == '/income') {
            activeIncome();
        } else if (url == '/transfer') {
            activeTransfer();
        }
    });



    ////// thẻ modal details wallet
    var checkWalletDetails = 0;
    $('.wallet-details-origin').click(async function (e) {
        e.preventDefault();
        if (checkWalletDetails == 0) {
            checkWalletDetails = 1;
            $('#load').toggle("inactive");
            await getWallet();
            checkWalletDetails = 0;
        }
    });

    /// tắt details wallet 
    $('.wallet-details-exit').click(function () {
        $('.badge-wallet').remove();
        $('.wallet-details-script').remove();
        $('.box-modal-wallet-details').addClass('inactive');
    });

    ////// thẻ modal details icon
    var checkIconDetails = 0;
    $('.wallet-details-transaction').click(async function (e) {
        e.preventDefault();
        if (checkIconDetails == 0) {
            checkIconDetails = 1;
            $('#load').toggle("inactive");
            await getCategory();
            checkIconDetails = 0;
        }
    });

    /// tắt details icon
    $('.icon-details-exit').click(function () {
        $('.badge-wallet').remove();
        $('.icon-details-script').remove();
        $('.box-modal-icon-details').addClass('inactive');
    });

});

const getWallet = async () => {
    await $.ajax({
        type: "GET",
        url: "/api/moneyApp/wallet",
        processData: false,
        mimeType: "multipart/form-data",
        contentType: false,
        success: function (response) {
            let result = JSON.parse(response);
            if (result.length != 0) {
                for (let i = 0; i < result.length; i++) {
                    $('.row-wallet-details').append(
                        `
                            <div class="badge badge-wallet badge-wallet-details${result[i].id} bg-danger col-3 mx-3 my-3">
                                <img src="${window.location.origin}/${result[i].symbol}" class="icon-transaction badge-wallet-details-img${result[i].id}"> 
                                <span class="badge-wallet-details-name${result[i].id}">${result[i].name}</span>
                                <input type="hidden" class="badge-wallet-details-id${result[i].id}" value="${result[i].id}">
                             </div>
                        `)
                };
            };
            $('.row-wallet-details').append(`<script src="${window.location.origin}/js/transactionBox/transWallet.js" class="wallet-details-script"></script>`);
        },
        error: function (e) {
            console.log(e);
        }
    });
    // hiển thị layout modal
    await $('#load').toggle("inactive");
    await $('.box-modal-wallet-details').removeClass('inactive');
};


const getCategory = async () => {
    await $.ajax({
        type: "GET",
        url: "/api/moneyApp/category",
        processData: false,
        mimeType: "multipart/form-data",
        contentType: false,
        success: function (response) {
            let result = JSON.parse(response);
            for (let i = 0; i < result.length; i++) {
                $('.row-icon-details').append(
                    `
                        <div class="badge badge-wallet badge-icon-details${result[i].id} bg-danger col-3 mx-3 my-3">
                             <img src="${window.location.origin}/${result[i].symbol}" class="icon-transaction badge-icon-details-img${result[i].id}">  
                             <span class="badge-icon-details-name${result[i].id}">${result[i].name}</span>  
                             <input type="hidden" class="badge-icon-details-id${result[i].id}" value="${result[i].id}">
                         </div>
                    `)
            };
            $('.row-wallet-details').append(`<script src="${window.location.origin}/js/transactionBox/transIcon.js" class="icon-details-script"></script>`);
        },
        error: function (e) {
            console.log(e);
        }
    });
    // hiển thị layout modal
    await $('#load').toggle("inactive");
    await $('.box-modal-icon-details').removeClass('inactive');
};

function activePayment() {
    $('a[href="#payment"]').addClass('active');
    $('a[href="#income"]').removeClass('active');
    $('a[href="#transfer"]').removeClass('active');
    $('.typeTrans-details').val(1);
}

function activeIncome() {
    $('a[href="#income"]').addClass('active');
    $('a[href="#payment"]').removeClass('active');
    $('a[href="#transfer"]').removeClass('active');
    $('.typeTrans-details').val(2);
}

function activeTransfer() {
    $('a[href="#income"]').removeClass('active');
    $('a[href="#payment"]').removeClass('active');
    $('a[href="#transfer"]').addClass('active');
    $('.typeTrans-details').val(3);
}