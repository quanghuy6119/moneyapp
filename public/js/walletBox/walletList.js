$(document).ready(function () {
    //chọn wallet icon

    function selectWalletBadge() {
        let length = $('.wallet-parent-length').val();
        if (length != 0) {
            for (let i = 0; i < length; i++) {
                $(`.badge-wallet-parent${i}`).click(function () {
                    //gan src icon chon cho box
                    let srcAttr = $(`.badge-wallet-parent-img${i}`).attr('src')
                    $('.wallet-parent-img').attr('src', srcAttr);

                    // gan id wallet vo the input
                    let idWallet = $(`.badge-wallet-parent-id${i}`).val();
                    $('.wallet-parent-id').val(idWallet);

                    // gan name vo button
                    let nameWallet = $(`.badge-wallet-parent-name${i}`).text();
                    $('.wallet-parent-name').text(nameWallet);

                    //chon wallet xong tat
                    $('.badge-wallet').remove();
                    $('.wallet-parent-length').remove();
                    $('.wallet-parent-script').remove();
                    $('.box-modal-wallet-parent').addClass('inactive');

                });
            }
        }
        // chọn origin wallet
        $('.badge-wallet-parent').click(function () {
            //gan src icon chon cho box
            let srcAttr = $(`.badge-wallet-parent-img`).attr('src')
            $('.wallet-parent-img').attr('src', srcAttr);

            // gan id wallet vo the input
            let idWallet = $(`.badge-wallet-parent-id`).val();
            $('.wallet-parent-id').val(idWallet);

            // gan name vo button
            let nameWallet = $(`.badge-wallet-parent-name`).text();
            $('.wallet-parent-name').text(nameWallet);

            //chon wallet xong tat
            $('.badge-wallet').remove();
            $('.wallet-parent-length').remove();
            $('.wallet-parent-script').remove();
            $('.box-modal-wallet-parent').addClass('inactive');
        });
    }

    selectWalletBadge();
});