$(document).ready(function() {
    $(".button-chart-report").click(function () {
        if ($('.default-wallet').val() == "") {
            return alert("Vui lòng chọn ví");
        } else if ($(".select-month-report").val() == "") {
            return alert("Vui lòng chọn tháng");
            getReportChart(id_default)
        }
    });
});
    // get notes in database
async function getReportChart(id) {

    // $('#load').toggleClass("inactive");
    // await $.ajax({
    //     type: "GET",
    //     url: "/api/moneyApp/note",
    //     processData: false,
    //     mimeType: "multipart/form-data",
    //     contentType: false,
    //     success: function (response) {
    //         let result = JSON.parse(response);
    //         console.log(result);
    //     }
    // })


    // $('#load').toggleClass("inactive");

    const ctx = $('#myChart')[0];

    const myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
            datasets: [{
                label: '# of Votes',
                data: [12, 19, 3, 5, 2, 3],
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
        },
        // options: {
        //     scales: {
        //         y: {
        //             beginAtZero: true
        //         }
        //     }
        // }
    });
    // await $('#load').toggleClass("inactive");
};

$(".select-month-report").click(function () {
    console.log($(".select-month-report").val())
});