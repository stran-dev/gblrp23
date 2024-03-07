$(document).ready(function () {

    $("#chane_passcode").on('click', function (e) {
        e.preventDefault();
        Fancybox.show([{src: "#cl-pop_up", type: "inline"}], {click: false, closeButton: 'outside', dragToClose: false})
    })

    let MyUrl = "/api/user/passcode"
    $(".cl-pop-body input[type=password]").mask('00000');

    $("form.cl-pop-body").on('submit', function (e) {
        e.preventDefault();
        let $error_msg = $("#error_msg");
        let $button = $(this).find("button");
        $.ajax({
            type: "POST",
            data: $(this).serialize(),
            cache: false,
            url: MyUrl,
            dataType: 'json',
            beforeSend: function (jqXHR, settings) {
                $(this).find("input").attr("readonly", "readonly");
                $error_msg.fadeOut("fast");
                $button.attr("disabled", "disabled");
                $button.find("span").html("Please wait...");
                $(".carousel__button.is-close").fadeOut("slow");
            },
            success: function (data) {
                if (data.status === "OK") {
                    $error_msg.html(data.msg);
                    $error_msg.removeClass('alert-danger').addClass('alert-success');
                    $error_msg.fadeIn("fast");
                    $button.addClass("done")
                    $button.find("span").html("Change passcode");
                    $(".carousel__button.is-close").fadeIn("slow");
                } else {
                    $error_msg.html(data.msg);
                    $error_msg.removeClass('alert-success').addClass('alert-danger');
                    $error_msg.fadeIn("fast");
                    $(this).find("input").removeAttr("readonly");
                    $button.removeAttr("disabled");
                    $button.find("span").html("Change passcode");
                    $(".carousel__button.is-close").fadeIn("slow");
                }
            },
            error: function (e) {
                $error_msg.html(e.message);
                $error_msg.removeClass('alert-success').addClass('alert-danger');
                $error_msg.fadeIn("fast");
                $(this).find("input").removeAttr("readonly");
                $button.removeAttr("disabled");
                $button.find("span").html("Change passcode");
                $(".carousel__button.is-close").fadeIn("slow");
            }
        });
    })


    $("#link-shortener").on('click', function (e) {
        e.preventDefault();
        alert("This feature is not yet available, please key checking.")
    })

/*    let the_sweetalert = localStorage.getItem("_is_shown_alert") === null || localStorage.getItem("_is_shown_alert") === undefined || typeof localStorage.getItem("_is_shown_alert") === 'undefined'
    if(the_sweetalert===true){
        Swal.fire({
            title: 'Telegram ID Changed',
            html: '<p style="font-family: \'Roboto\', sans-serif;line-height: 18px;font-size: 15px;"><strong style="font-weight: 900">Jm Tech</strong> telegram account was deleted, please forward all your messages to this new ID <span style="font-weight: 700">@Official_JmTech</span><br>Thanks for you understanding.</p>',
            imageUrl: 'https://i.ibb.co/m8xyLJ3/Telegram-Icon.png',
            imageWidth: 50,
            imageHeight: 50,
            imageAlt: 'Official Jm Tech - @Official_JmTech',
        }).then((result) => {
            if(result.isConfirmed === true)
                localStorage.setItem('_is_shown_alert', "Thank You");
        })
    }*/

})

//fancybox.show();