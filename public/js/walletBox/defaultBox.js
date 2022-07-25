$(document).ready(function() {
    axios.get("/api/moneyApp/idWallet").then(response => {
        let result = response.data;
        for (let i = 0; i < result.length; i++) {
            $(`.badge-wallet-default${result[i].id}`).click(function() {

                // gan id wallet vo the input
                let idWallet = $(`.badge-wallet-default-id${result[i].id}`).val();
                $('.default-wallet').val(idWallet);

                // gan name vo button
                let nameWallet = $(`.badge-wallet-default-name${result[i].id}`).text();
                $('.total-down-name').text(nameWallet);

                // gan so tien cua vi 
                let budgetReal = $(`.badge-wallet-default-budget${result[i].id}`).val();
                $('.total-budget').text(formatCash(budgetReal));

                //chon wallet xong tat
                $('.badge-wallet').remove();
                $('.wallet-default-script').remove();
                $('.box-modal-wallet-default').addClass('inactive');
                $('.layout-modal').addClass('inactive');
            });
        }
    });
});


//format currency vnd
function formatCash(str) {
    return str.split('').reverse().reduce((prev, next, index) => {
        return ((index % 3) ? next : (next + ',')) + prev
    })
}