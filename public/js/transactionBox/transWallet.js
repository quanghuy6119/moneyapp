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

                // gan so tien cua vi 
                let budgetReal = $(`.badge-wallet-details-budget${result[i].id}`).val();
                $('.wallet-details-budget-real').text(formatCash(budgetReal));
                $('.wallet-details-origin-budget').val(budgetReal);

                //chon wallet xong tat
                $('.badge-wallet').remove();
                $('.wallet-details-script').remove();
                $('.box-modal-wallet-details').addClass('inactive');
            });
        }
    });
});


//format currency vnd
function formatCash(str) {
    if(typeof(str) !== 'string'){
        str = str.toString();
    }
    return str.split('').reverse().reduce((prev, next, index) => {
        return ((index % 3) ? next : (next + ',')) + prev
    })
}
