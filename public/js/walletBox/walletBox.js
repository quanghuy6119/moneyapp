﻿$(document).ready(function() {

    // định dạng tiền cho các hộp box
    var checkTyping = 0;
    $('.money-trans').keyup(function() {
        if (checkTyping == 0) {
            checkTyping = 1;
            let money = $('.money-trans').val();
            $('.money-trans').val(format(money));
            checkTyping = 0;
        }
    });

    $('.money-wallet').keyup(function() {
        if (checkTyping == 0) {
            checkTyping = 1;
            let money = $('.money-wallet').val();
            $('.money-wallet').val(format(money));
            checkTyping = 0;
        }
    });


    // mở wallet box
    $('.add-wallet').click(function() {
        // $('#load').toggle("inactive");
        $('.layout-modal').removeClass('inactive');
        $('.box-modal-wallet').removeClass('inactive');
    });

    //tắt wallet box
    $('.wallet-exit').click(function() {
        // reset - reset - reset - reset
        $('input[name="name"]').val("");
        $('input[name="budgetInit"]').val("");
        $('input[name="budgetReal"]').val("");
        $('input[name="walletParentId"]').val("");
        $('input[name="transactionId"]').val("1");
        $('.wallet-icon-img').attr('src', `${window.location.origin}/img/wallet-svgrepo-com.svg`);
        $('.wallet-parent-img').attr('src', `${window.location.origin}/img/wallet-svgrepo-com.svg`);
        $('.wallet-parent-name').text('Origin Wallet');

        // TẮT LAYOUT
        $('.layout-modal').addClass('inactive');
        $('.box-modal-wallet').addClass('inactive');
    });

    ////// thẻ modal icon wallet
    $('.wallet-icon').click(function(e) {
        e.preventDefault();
        $('#load').toggleClass("inactive");

        const getCategory = async() => {
            await $.ajax({
                type: "GET",
                url: "/api/moneyApp/category",
                processData: false,
                mimeType: "multipart/form-data",
                contentType: false,
                success: function(response) {
                    let result = JSON.parse(response);
                    if (result.length != 0) {
                        for (let i = 0; i < result.length; i++) {
                            if (result[i].parent_id == null) {
                                $('.row-wallet').append(
                                    `
                                    <div class="badge badge-wallet badge-wallet${i} bg-danger col-3 mx-3 my-3"> ${result[i].name}
                                         <img src="${window.location.origin}/${result[i].symbol}" class="icon-transaction badge-wallet-img${i}">
                                         <input type="hidden" class="wallet-icon-id${i}" value="${result[i].id}">
                                     </div>
                                `)
                            }
                        };

                        $('.row-wallet').append(`<input type="hidden" class="wallet-icon-length" value="${result.length}">`);
                        $('.row-wallet').append(`<script src="${window.location.origin}/js/walletBox/walletIcon.js" class="wallet-icon-script"></script>`);
                    }
                },
                error: function(e) {
                    console.log(e);
                }
            });
            // hiển thị layout modal
            await $('#load').toggleClass("inactive");
            await $('.box-modal-wallet-icon').removeClass('inactive');
        };
        getCategory();
    });

    /// tắt wallet icon
    $('.wallet-icon-exit').click(function() {
        $('.badge-wallet').remove();
        $('.wallet-icon-length').remove();
        $('.wallet-icon-script').remove();
        $('.box-modal-wallet-icon').addClass('inactive');
    });

    // budget real
    $('.wallet-budget').blur(function() {
        let budgetInit = $('.wallet-budget').val();
        $('.wallet-budget-real').val(budgetInit);
    });


    ////// thẻ modal parent wallet
    $('.wallet-parent').click(function(e) {
        e.preventDefault();
        $('#load').toggleClass("inactive");

        const getWallet = async() => {
            await $.ajax({
                type: "GET",
                url: "/api/moneyApp/wallet",
                processData: false,
                mimeType: "multipart/form-data",
                contentType: false,
                success: function(response) {
                    let result = JSON.parse(response);
                    if (result.length != 0) {

                        $('.row-wallet-parent').append(`
                        <div class="badge badge-wallet badge-wallet-parent bg-danger col-3 mx-3 my-3">
                            <img src="${window.location.origin}/img/wallet-svgrepo-com.svg" class="icon-transaction badge-wallet-parent-img"> 
                            <span class="badge-wallet-parent-name"> Origin Wallet</span>
                            <input type="hidden" class="badge-wallet-parent-id" value="">
                        </div>
                        `);

                        for (let i = 0; i < result.length; i++) {
                            if (result[i].parent_id == null) {
                                $('.row-wallet-parent').append(
                                    `
                                    <div class="badge badge-wallet badge-wallet-parent${i} bg-danger col-3 mx-3 my-3">
                                        <img src="${window.location.origin}/${result[i].symbol}" class="icon-transaction badge-wallet-parent-img${i}"> 
                                        <span class="badge-wallet-parent-name${i}">${result[i].name}</span>
                                        <input type="hidden" class="badge-wallet-parent-id${i}" value="${result[i].id}">
                                     </div>
                                `)
                            }
                        };
                    };
                    $('.row-wallet-parent').append(`<input type="hidden" class="wallet-parent-length" value="${result.length}">`);
                    $('.row-wallet-parent').append(`<script src="${window.location.origin}/js/walletBox/walletList.js" class="wallet-parent-script"></script>`);
                },
                error: function(e) {
                    console.log(e);
                }
            });
            // hiển thị layout modal
            await $('#load').toggleClass("inactive");
            await $('.box-modal-wallet-parent').removeClass('inactive');
        };
        getWallet();
    });

    /// tắt wallet parent
    $('.wallet-parent-exit').click(function() {
        $('.badge-wallet').remove();
        $('.wallet-parent-length').remove();
        $('.wallet-parent-script').remove();
        $('.box-modal-wallet-parent').addClass('inactive');
    });



    //// tạo wallet 

    $('.btn-form-wallet').click(function(e) {
        e.preventDefault();
        var formData = new FormData($('.form-wallet')[0]);
        //Post to server
        $.ajax({
            type: "POST",
            url: "/api/moneyApp/wallet",
            processData: false,
            mimeType: "multipart/form-data",
            contentType: false,
            data: formData,
            success: function(response) {
                let result = JSON.parse(response);
                // console.log(response);
                if (result[0].parent_id == null) {
                    $('.row-layouts-wallet').append(`
                    <figure class="wallet-wallet">
                        <div class="img">
                            <h3>Ví ${result[0].name}</h3>
                            <img src="${result[2]}" alt="Portfolio Item">
                        </div>
                        <figcaption>
                            <h3>Loại: Ví gốc </h3>
                            <p>Số tiền ban đầu: <span>${formatCash(result[0].budget_init)}</span> <span> VND </span> <br>
                                Số tiền hiện tại: <span>${formatCash(result[0].budget_real)}</span> <span> VND </span></p>
                                <div class="btn btn-success btn-wallet-layouts btn-wallet-layouts${result[0].id}">
                                <a href="#transaction" style="text-decoration:none;color:white;width:100%;height:100%;display:inline-block">Chọn ví</a>
                            </div>
                        </figcaption>
                </figure>
                    `);
                } else {
                    $('.row-layouts-wallet').append(`
                    <figure class="wallet-child">
                        <div class="img">
                            <h4>${result[0].name}</h4>
                            <img src="${result[2]}" alt="Portfolio Item">
                        </div>
                        <figcaption>
                            <h3>Loại: Ví con </h3>
                            <h3>Thuộc ví: Ví ${result[1]}</h3>
                            <p>Số tiền ban đầu: <span>${formatCash(result[0].budget_init)}</span> <span> VND </span>  <br>
                                Số tiền hiện tại: <span>${formatCash(result[0].budget_real)}</span><span> VND </span></p>
                                <div class="btn btn-success btn-wallet-layouts btn-wallet-layouts${result[0].id}">
                                <a href="#transaction" style="text-decoration:none;color:white;width:100%;height:100%;display:inline-block">Chọn ví</a>
                            </div>
                        </figcaption>
                    </figure>
                    `);
                }

                $('.row-layouts-wallet').append(`
                <input type="hidden"  class="btn-wallet-name-layouts${result[0].id}" value="${result[0].name}">
                <input type="hidden"  class="btn-wallet-budget-layouts${result[0].id}" value="${result[0].budget_real}">
                `);

                $('.row-layouts-wallet').append(`<script src="${window.location.origin}/js/walletLayouts/walletLayouts.js" class="wallet-layouts-script"></script>`);

                //reset js click
                $('wallet-layouts-script').remove();
                $('.row-layouts-wallet').append(`<script src="${window.location.origin}/js/walletLayouts/walletLayouts.js" class="wallet-layouts-script"></script>`);

                // reset - reset - reset - reset
                $('input[name="name"]').val("");
                $('input[name="budgetInit"]').val("");
                $('input[name="budgetReal"]').val("");
                $('input[name="walletParentId"]').val("");
                $('input[name="transactionId"]').val("1");
                $('.wallet-icon-img').attr('src', `${window.location.origin}/img/wallet-svgrepo-com.svg`);
                $('.wallet-parent-img').attr('src', `${window.location.origin}/img/wallet-svgrepo-com.svg`);
                $('.wallet-parent-name').text('Origin Wallet');

            },
            error: function(e) {
                console.log(e);
            }
        });
    })
});

//format currency vnd
function formatCash(str) {
    if (typeof(str) !== 'string') {
        str = str.toString();
    }
    return str.split('').reverse().reduce((prev, next, index) => {
        return ((index % 3) ? next : (next + ',')) + prev
    })
}

function format(str) {
    str = str.replace(/,/g, '');
    const format = str.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return format;
}