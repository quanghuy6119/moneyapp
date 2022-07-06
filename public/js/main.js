$(document).ready(function(){

    $('.list-group-item-category').click(function(){
        $('.layout-modal').removeClass('unactive');
    });

    $('.layout-modal').click(function(){
        $('.layout-modal').addClass('unactive');
    });

    $('.category-exit').click(function(){
        $('.layout-modal').addClass('unactive');
    });



});