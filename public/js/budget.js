$(document).ready(function () {
    $(".button-budget-report").click(function () {
        if ($('.default-wallet').val() == "") {
            return alert("Vui lòng chọn ví");
        } else if ($(".select-month-budget").val() == "") {
            return alert("Vui lòng chọn tháng");
        } else if ($(".select-type-budget").val() == "") {
            return alert("Vui lòng chọn loại chi tiêu");
        } else {
            delBudgetLayouts();
            addBudgetLayouts();
            let id = $('.default-wallet').val();
            let month = $(".select-month-budget").val();
            let type = $(".select-type-budget").val();
            getBudgetChart(id, month, type);
        }
    });
});
// get budget in database
async function getBudgetChart(id, month, type) {

    $('#load').toggleClass("inactive");
    let rs;
    await $.ajax({
        type: "GET",
        url: `/api/moneyApp/reportBudget?id=${id}&month=${month}&type=${type}`,
        processData: false,
        mimeType: "multipart/form-data",
        contentType: false,
        success: function (response) {
            console.log(response);
            let result = JSON.parse(response);
            // console.log(result);
            rs = result;
            //
            alert("Tổng số tiền chi tiêu: " + formatCash(rs[2]) + " VND");
        },
        error: function (e) {
            console.log(e);
        }
    })

    const ctx = $('#myBudget')[0];
    const myBudget = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: rs[0],
            datasets: [{
                label: 'Money',
                data: rs[1],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        }
    });
    await $('#load').toggleClass("inactive");
};

//del Budget Layouts
function delBudgetLayouts() {
    $('.container-budget').remove();
    $('.budget-layouts').addClass('inactive');
}

//add row wallet
function addBudgetLayouts() {
    $('.budget-layouts').append(`
    <div class="container-budget" style="width=80%;margin-left:100px">
        <canvas id="myBudget" width="1000" height="1000"></canvas>
    </div>    
    `);
    $('.budget-layouts').removeClass('inactive');
}

//format currency vnd
function formatCash(str) {
    if (typeof (str) !== 'string') {
        str = str.toString();
    }
    return str.split('').reverse().reduce((prev, next, index) => {
        return ((index % 3) ? next : (next + ',')) + prev
    })
}