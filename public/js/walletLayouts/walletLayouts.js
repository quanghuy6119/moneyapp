$(document).ready(function() {
    axios.get("/api/moneyApp/idWallet").then(response => {
        let result = response.data;
        for (let i = 0; i < result.length; i++) {
            $(`.btn-wallet-layouts${result[i].id}`).click(function() {
                let url = result[i].id;
                // gan id wallet vo the input
                $('.default-wallet').val(url);
                // gan name vo button
                let nameWallet = $(`.btn-wallet-name-layouts${result[i].id}`).val();
                $('.total-down-name').text(nameWallet);

                // gan so tien cua vi 
                let budgetReal = $(`.btn-wallet-budget-layouts${result[i].id}`).val();
                $('.total-budget').text(formatCash(budgetReal));
            });
        }
    });
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