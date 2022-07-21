$(document).ready(function() {
    axios.get("/api/moneyApp/idWallet").then(response => {
        let result = response.data;
        for (let i = 0; i < result.length; i++) {
            $(`.badge-wallet-details${result[i].id}`).click(function() {
                //gan src icon chon cho box
                let srcAttr = $(`.badge-wallet-details-img${result[i].id}`).attr('src')
                $('.wallet-details-origin-img').attr('src', srcAttr);

                // gan id wallet vo the input
                let idWallet = $(`.badge-wallet-details-id${result[i].id}`).val();
                $('.wallet-details-origin-id').val(idWallet);

                // gan name vo button
                let nameWallet = $(`.badge-wallet-details-name${result[i].id}`).text();
                $('.wallet-details-origin-name').text('Ví ' + nameWallet);

                //chon wallet xong tat
                $('.badge-wallet').remove();
                $('.wallet-details-script').remove();
                $('.box-modal-wallet-details').addClass('inactive');
            });
        }
    });
});

