
$('document').ready(function (){
    $('.table .selectedLocation .btn').on('click', function (event) {
        event.preventDefault();
        $('.bg-modal').show();

    });
});

$(function(){
    $(".close").click(function(){
        $(".bg-modal").hide();
    });
});


