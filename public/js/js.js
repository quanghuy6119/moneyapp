$(document).ready(function() {
    $('body').append(
        `
        <script src="${window.location.origin}/js/categoryBox/category.js"></script>
        <script src="${window.location.origin}/js/walletBox/walletBox.js"></script>
        <script src="${window.location.origin}/js/base.js"></script>
        `
    )
});