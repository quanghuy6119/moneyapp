$(document).ready(function() {
    axios.get("/api/moneyApp/idWallet").then(response => {
        let result = response.data;
        for (let i = 0; i < result.length; i++) {
            $(`.btn-wallet-layouts${result[i].id}`).click(function() {
                let url = result[i].id;
                delWalletLayouts();
                addTransactionLayouts();
                getWalletDetails(url);
            });
        }
    });
});


//add Transaction wallet
function addTransactionLayouts() {
    $('.transaction-layouts').append(`    
    <div class="container h-100 container-transaction-layouts">
        <div class="row d-flex justify-content-center">
            <div class="col-md-12 col-xl-10 mt-5 row-transactions-layouts">
            </div>
        </div>
    </div>`)
    $('.transaction-layouts').removeClass('inactive');
}

//del wallet layouts
function delWalletLayouts() {
    $('.container-wallet-layouts').remove();
    $('.wallet-layouts').addClass('inactive');
}

// add table display detail wallet
// function addCardDetailWalletLayouts() {
//     $('.row-transactions-layouts').append(`    
//     <div class="card mask-custom">
//         <div class="card-body p-4 text-white">
//             <div class="text-center pt-3 pb-2">
//                 <h2 class="my-4">Wallet Transaction Details</h2>
//                 <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-todo-list/check1.webp"  width="60">
//             </div>

//             <table class="table text-white mb-0">
//                 <thead>
//                     <tr>
//                         <th scope="col">Money Cash</th>
//                         <th scope="col">Surplus</th>
//                         <th scope="col">Description</th>
//                         <th scope="col">Transaction</th>
//                         <th scope="col">Day</th>
//                         <th scope="col">Action</th>
//                     </tr>
//                 </thead>
//                 <tbody class="transactions-wallet-details">
//                 </tbody>
//             </table>
//         </div>
//     </div>
//     `)
// }

// get wallet detail 
// function getWalletDetails(url) {
//     addCardDetailWalletLayouts();
//     $('.transactions-wallet-details').append(`
//     <tr class="fw-normal">
//         <td class="align-middle">
//             <h6 class="mb-0">
//                 <span class="badge bg-danger money"> <i class="fas fa-dollar-sign"></i>100000000 </span>
//             </h6>
//         </td>
    
//         <td class="align-middle">
//             <h6 class="mb-0">
//                 <span class="badge bg-danger"> <i class="fas fa-dollar-sign"></i> 1.100.000</span>
//             </h6>
//         </td>
    
//         <td class="align-middle">
//             <span>Call Sam For payments</span>
//         </td>
    
//         <td class="align-middle">
//             <h6 class="mb-0"><span class="badge bg-danger">Beverage 
//             <img src="{{ asset('img/alcohol-beer-beverage-drink-mug-pub-svgrepo-com.svg') }}" class="icon-transaction"></span></h6>
//         </td>
    
//     <td class="align-middle">
//         <h6 class="mb-0"><span class="badge bg-info">7/6/2022</span></h6>
//     </td>
    
//     <td class="align-middle">
//         <a href="#!" data-mdb-toggle="tooltip" title="Done"><i
//                 class="fas fa-user-edit fa-lg text-success me-3"></i></a>
//         <a href="#!" data-mdb-toggle="tooltip" title="Remove"><i
//                 class="fas fa-trash-alt fa-lg text-warning"></i></a>
//     </td>
// </tr>
//     `)
// }


//format currency vnd
function formatCash(str) {
    return str.split('').reverse().reduce((prev, next, index) => {
        return ((index % 3) ? next : (next + ',')) + prev
    })
}