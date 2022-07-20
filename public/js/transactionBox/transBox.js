$(document).ready(function() {
    ////// thẻ modal parent wallet
    $('.wallet-details-origin').click(function(e) {
        e.preventDefault();
        $('#load').toggle("inactive");

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

                        $('.row-wallet-details').append(`
                        <div class="badge badge-wallet badge-wallet-parent bg-danger col-3 mx-3 my-3">
                            <img src="${window.location.origin}/img/wallet-svgrepo-com.svg" class="icon-transaction badge-wallet-parent-img"> 
                            <span class="badge-wallet-parent-name"> Origin Wallet</span>
                            <input type="hidden" class="badge-wallet-parent-id" value="">
                        </div>
                        `);

                        for (let i = 0; i < result.length; i++) {
                                $('.row-wallet-details').append(
                                    `
                                    <div class="badge badge-wallet badge-wallet-parent${i} bg-danger col-3 mx-3 my-3">
                                        <img src="${window.location.origin}/${result[i].symbol}" class="icon-transaction badge-wallet-parent-img${i}"> 
                                        <span class="badge-wallet-parent-name${i}">${result[i].name}</span>
                                        <input type="hidden" class="badge-wallet-parent-id${i}" value="${result[i].id}">
                                     </div>
                                `)
                        };
                    };
                    // $('.row-wallet-parent').append(`<input type="hidden" class="wallet-parent-length" value="${result.length}">`);
                    // $('.row-wallet-parent').append(`<script src="${window.location.origin}/js/walletBox/walletList.js" class="wallet-parent-script"></script>`);
                },
                error: function(e) {
                    console.log(e);
                }
            });
            // hiển thị layout modal
            await $('#load').toggle("inactive");
            await $('.box-modal-wallet-details').removeClass('inactive');
        };
        getWallet();
    });

    /// tắt wallet parent
    $('.wallet-details-exit').click(function() {
        $('.badge-wallet').remove();
        // $('.wallet-parent-length').remove();
        // $('.wallet-parent-script').remove();
        $('.box-modal-wallet-details').addClass('inactive');
    });
});