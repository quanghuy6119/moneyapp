$(document).ready(function() {
    axios.get("/api/moneyApp/idWallet").then(response => {
        let result = response.data;
        console.log(result[0].id);
        for (let i = 0; i < result.length; i++) {
            $(`.btn-wallet-layouts${result[i].id}`).click(function() {
                console.log($(`.btn-wallet-layouts${result[i].id}`));
            });
        }
    });
});