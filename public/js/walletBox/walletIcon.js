$(document).ready(function () {
    //chọn wallet icon

    function selectIconBadge() {
        let length = $('.wallet-icon-length').val();
        for (let i = 0; i < length; i++) {
            $(`.badge-wallet${i}`).click(function () {
                //gan src icon chon cho box
                let srcAttr = $(`.badge-wallet-img${i}`).attr('src')
                $('.wallet-icon-img').attr('src', srcAttr);

                // gan id transaction icon vo the
                let idTrans = $(`.wallet-icon-id${i}`).val();
                $('.wallet-icon-input').val(idTrans);

                //chon icon xong tat
                $('.badge-wallet').remove();
                $('.wallet-icon-length').remove();
                $('.wallet-icon-script').remove();
                $('.box-modal-wallet-icon').addClass('inactive');

            });
        }
    }
    selectIconBadge();
});