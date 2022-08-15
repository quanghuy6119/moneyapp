$(document).ready(function() {
    axios.get("/api/moneyApp/idWallet").then(response => {
        let result = response.data;
        for (let i = 0; i < result.length; i++) {
            $(`.btn-wallet-layouts${result[i].id}`).click(function() {
                let url = result[i].id;
                // gan id wallet vo the input
                $('.default-wallet').val(url);
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
