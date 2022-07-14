$(document).ready(function() {

    if(window.location.hash == '' || window.location.hash == '#wallet'){
        getWallets('/wallet');
    }

    jQuery(window).on("hashchange", function() {
        var router = window.location.hash.trim();
        var url;
        if (router == '') {
            url = '/wallet';
        } else {
            url = '/' + router.slice(1, router.length);
        }

        if (url == '/wallet') {
            getWallets(url);
        }
    });
});


function getWallets(url) {

    $.ajax({
        type: "GET",
        url: "/api/moneyApp/wallet",
        processData: false,
        mimeType: "multipart/form-data",
        contentType: false,
        success: function(response) {
            let result = JSON.parse(response);
            //cần check xem có thay đổi nội dung hay không
            //khi thay đổi ở 1 máy khác thì máy hiện tại xử lí thế nào
            //làm sao để chèn vào đúng vị trí mà ko phải xóa tất cả
            if (result.length != $('.row-layouts-wallet figure').length) {

                for (let i = 0; i < result.length; i++) {
                    //wallet cha
                    if (result[i].parent_id == null) {
                        $('.row-layouts-wallet').append(`
                        <figure class="wallet-wallet">
                            <div class="img">
                                <h3>Ví ${result[i].name}</h3>
                                <img src="${window.location.origin}/${result[i].symbol}" alt="Portfolio Item">
                            </div>
                            <figcaption>
                                <h3>Loại: Ví gốc </h3>
                                <p>Số tiền ban đầu: <span class="money">${result[i].budget_init}</span> <br>
                                    Số tiền hiện tại: <span class="money">${result[i].budget_real}</span></p>
                                <div class="btn btn-success btn-wallet-layouts${result[i].id}">Chọn ví</div>
                            </figcaption>
                    </figure>
                        `);
                    } else {
                        $('.row-layouts-wallet').append(`
                        <figure class="wallet-child">
                            <div class="img">
                                <h4>${result[i].name}</h4>
                                <img src="${window.location.origin}/${result[i].symbol}" alt="Portfolio Item">
                            </div>
                            <figcaption>
                                <h3>Loại: Ví con </h3>
                                <h3>Thuộc ví: Ví ${result[i].parent_name}</h3>
                                <p>Số tiền ban đầu: <span class="money">${result[i].budget_init}</span> <br>
                                    Số tiền hiện tại: <span class="money">${result[i].budget_real}</span></p>
                                <div class="btn btn-success btn-wallet-layouts${result[i].id}">Chọn ví</div>
                            </figcaption>
                        </figure>
                        `);
                    }
                }

            }
        },
        error: function(e) {
            console.log(e);
        }
    })
};