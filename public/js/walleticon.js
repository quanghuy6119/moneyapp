$(document).ready(function() {
    //chọn wallet icon

    function selectIconBage() {
        let length = $('.walllet-icon-length').val();
        for (let i = 0; i < length; i++) {
            $(`.badge-wallet${i}`).click(function() {
                //gan src icon chon cho box
                let srcAttr = $(`.badge-wallet-img${i}`).attr('src')
                $('.wallet-icon-img').attr('src', srcAttr);

                //chon icon xong tat
                $('.badge-wallet').remove();
                $('.walllet-icon-length').remove();
                $('.walllet-icon-script').remove();
                $('.box-modal-wallet-icon').addClass('unactive');

                // gan id transaction icon vo the
                $('.wallet-icon-input').val(`${i}`);
            });
        }
    }
    selectIconBage();
});