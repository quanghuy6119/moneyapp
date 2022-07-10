$(document).ready(function() {

    //format money
    $('.money').simpleMoneyFormat();


    // mở wallet box
    $('.add-wallet').click(function() {
        // $('#load').toggle("unactive");
        $('.layout-modal').removeClass('unactive');
        $('.box-modal-wallet').removeClass('unactive');
    });

    //tắt wallet box
    $('.wallet-exit').click(function() {
        $('.layout-modal').addClass('unactive');
        $('.box-modal-wallet').addClass('unactive');
    });

    ////// thẻ modal icon wallet
    $('.wallet-icon').click(function(e) {
        e.preventDefault();
        $('#load').toggle("unactive");

        const getCategory = async() => {
            await $.ajax({
                type: "GET",
                url: "/api/moneyapp/category",
                processData: false,
                mimeType: "multipart/form-data",
                contentType: false,
                success: function(response) {
                    let result = JSON.parse(response);
                    for (let i = 0; i < result.length; i++) {
                        $('.row-wallet').append(
                            `
                            <div class="badge badge-wallet badge-wallet${i} bg-danger col-3 mx-3 my-3">${result[i].name}
                                 <img src="${window.location.origin}/${result[i].symbol}" class="icon-transaction badge-wallet-img${i}">
                             </div>
                        `)
                    };
                    $('.row-wallet').append(`<input type="hidden" class="walllet-icon-length" value="${result.length}">`);
                    $('.row-wallet').append(`<script src="${window.location.origin}/js/walleticon.js" class="walllet-icon-script"></script>`);
                },
                error: function(e) {
                    console.log(e);
                }
            });
            // hiển thị layout modal
            await $('#load').toggle("unactive");
            await $('.box-modal-wallet-icon').removeClass('unactive');
        };
        getCategory();
    });

    /// tắt wallet icon
    $('.wallet-icon-exit').click(function() {
        $('.badge-wallet').remove();
        $('.walllet-icon-length').remove();
        $('.walllet-icon-script').remove();
        $('.box-modal-wallet-icon').addClass('unactive');
    });

    // budget real
    $('.wallet-budget').blur(function() {
        let budgetInit = $('.wallet-budget').val();
        $('.wallet-budget-real').val(budgetInit);
    });


    ////// thẻ modal parent wallet
    $('.wallet-parent').click(function(e) {
        e.preventDefault();
        $('#load').toggle("unactive");

        const getWallet = async() => {
            await $.ajax({
                type: "GET",
                url: "/api/moneyapp/walletBox",
                processData: false,
                mimeType: "multipart/form-data",
                contentType: false,
                success: function(response) {
                    let result = JSON.parse(response);
                    if (result.length != 0) {
                        for (let i = 0; i < result.length; i++) {
                            if (result[i].parent_id == null) {
                                $('.row-wallet-parent').append(
                                    `
                                <div class="badge badge-wallet badge-wallet-parent${result[i].id} bg-danger col-3 mx-3 my-3">
                                     <img src="${window.location.origin}/${result[i].symbol}" class="icon-transaction badge-wallet-parent${i}">
                                     ${result[i].name}
                                 </div>
                            `)
                            }
                        };
                        // $('.row-wallet').append(`<input type="hidden" class="walllet-icon-length" value="${result.length}">`);
                        // $('.row-wallet').append(`<script src="${window.location.origin}/js/walleticon.js" class="walllet-icon-script"></script>`);
                    }
                },
                error: function(e) {
                    console.log(e);
                }
            });
            // hiển thị layout modal
            await $('#load').toggle("unactive");
            await $('.box-modal-wallet-parent').removeClass('unactive');
        };
        getWallet();
    });

});