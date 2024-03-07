$(function (){
    $("#main_form_submit").on('submit', function (e){
        e.preventDefault();
        document.getElementById('generate_url_license').value = document.getElementById('license').value;
        $("#dialog").slideDown("slow");
    })
})