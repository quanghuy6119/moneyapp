$(document).ready(function() {
    axios.get("/api/moneyApp/idCategory").then(response => {
        let result = response.data;
        for (let i = 0; i < result.length; i++) {
            $(`.badge-icon-details${result[i].id}`).click(function() {
                //gan src icon chon cho box
                let srcAttr = $(`.badge-icon-details-img${result[i].id}`).attr('src')
                $('.wallet-icon-details-img').attr('src', srcAttr);

                // gan id wallet vo the input
                let idCategory = $(`.badge-icon-details-id${result[i].id}`).val();
                $('.wallet-icon-details-id').val(idCategory);

                // gan name vo button
                let nameCategory = $(`.badge-icon-details-name${result[i].id}`).text();
                $('.wallet-details-icon-name').text(nameCategory);

                //chon wallet xong tat
                $('.badge-wallet').remove();
                $('.icon-details-script').remove();
                $('.box-modal-icon-details').addClass('inactive');
            });
        }
    });
});

