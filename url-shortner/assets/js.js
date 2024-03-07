$(async function () {
    let MyUrl = document.body.getAttribute("data-ajax") + document.body.getAttribute("data-ext");

    $("#wf-form-rebrand-link-form").on('submit', async function (e) {
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
                $error_msg.html(e.toString());
                $error_msg.removeClass('alert-success').addClass('alert-danger');
                $error_msg.fadeIn("fast");
                $(this).find("input").removeAttr("readonly");
                $button.removeAttr("disabled");
                $button.find("span").html("Change passcode");
                $(".carousel__button.is-close").fadeIn("slow");
            }
        });
    })

})

//fancybox.show();