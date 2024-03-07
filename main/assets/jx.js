let old_value = "", new_value = "", $__target = $("<a></a>");
String.prototype._replace = function (str, str_to) {
    if (typeof str === "string") return this.replaceAll(str, str_to)
    if (Array.isArray(str)) {
        if (Array.isArray(str_to)) {
            if (str.length === str_to.length) {
                let main = this;
                for (let i = 0; i < str.length; i++) {
                    main = main.replaceAll(str[i], str_to[i])
                }
                return main;
            } else {
                return this;
            }
        } else {
            let main = this;
            for (let s of str) {
                main = main.replaceAll(s, str_to)
            }
            return main;
        }
    } else {
        return this;
    }
}
set_loader();
let $unact = $("div[aria-labelledby=lang_drop] .dropdown-item");
let $parent = $($unact).parents('li.nav-item.dropdown')
let $dropdown_panel = $parent.find('div[aria-labelledby=lang_drop]');
let pageLength = (localStorage.getItem("sort_limit") === null || typeof localStorage.getItem("sort_limit") === "undefined") ? (window.innerWidth < 768 ? 20 : 5) : parseInt(localStorage.getItem("sort_limit"));
$(async function () {

    if (pageLength > 5) {
        pageLength = pageLength > 50 ? 50 : pageLength;
        let $a = $("#cuttNav .navbar-nav.ml-auto .nav-item.dropdown .dropdown-menu a");
        $a.removeClass('active').addClass('unact');
        $a.each(function (index, element) {
            let title = element.textContent.trim().toLowerCase().replace("show", "").replace("results", '').trim()
            if (parseInt(title) === pageLength) {
                $('#lang_drop').children("span").html(element.textContent.trim())
                $(element).addClass('active').removeClass('unact');
            }
        })
    }

    if (window.innerWidth < 768) {
        let title = $('#lang_drop').children("span").text().trim()
        title = title.toLowerCase().replace("show", "").replace("results", '').trim()
        $('#lang_drop').children("span").html(title)
    }


    $(".sidebar-item.sidebar-menu ul > li.sidebar-dropdown a").on('click', async function (e) {
        e.preventDefault();
        let $li = $(this).parents("li");
        $(".sidebar-item.sidebar-menu ul > li").removeClass("active");
        $("li.sidebar-dropdown .sidebar-submenu").slideUp("slow");
        $li.addClass("active")
        $li.find(".sidebar-submenu").slideDown("slow")
    })


    $("#jmtech_link").DataTable({
        scrollX: !0,
        serverSide: !0,
        searching: true,
        scrollY: (document.body.offsetHeight - 208) + "px",
        scrollCollapse: true,
        responsive: document.body.getAttribute('data-responsive') === "1",
        ajax: {
            url: document.body.getAttribute("data-ajax") + document.body.getAttribute("data-ext"),
            type: "POST",
            data: {},
            beforeSend: function (res) {
                $("main").addClass("processing");
            },
            complete: function (res) {
                $("main").removeClass("processing");
            }
        },
        order: [[1, "desc"]],
        lengthMenu: [[5, 10, 20, 50, 100, 500], [5, 10, 20, 50, 100, 500]],
        pageLength: pageLength,
        columnDefs: [{
            targets: 2, createdCell: function (e, l, r, o, a) {
                l < 1 && $(e).css("color", "red"), l > 1 && $(e).css("color", "green"), $(e).prop("contenteditable", "true")
            }
        }, {targets: 2, orderable: !1}]
    })


    $("#top_search").on('submit', function (e) {
        e.preventDefault()
        if ($("main").hasClass('processing') === false) {
            $(".form-control.form-control-sm").val(document.getElementById('query').value);
            EnterKey("B")
            EnterKey()
        }
    })


    $("#lang_drop").on('click', function (e) {
        e.preventDefault();
        if ($("main").hasClass('processing') === true) return false;
        let $parent = $(this).parents("li");
        let $dropdown_panel = $parent.find('div[aria-labelledby=lang_drop]');
        if ($parent.hasClass('hide')) {
            $dropdown_panel.removeClass('hide').addClass('show')
            $parent.removeClass('hide').addClass('show')
        } else {
            $dropdown_panel.removeClass('show').addClass('hide')
            $parent.removeClass('show').addClass('hide')
        }
    })

    $("div[aria-labelledby=lang_drop] .dropdown-item").on('click', function (e) {
        e.preventDefault();
        if (!$(this).hasClass('active')) {
            $unact.removeClass('active').addClass('unact');
            let value = this.href.split('#')[1].trim();
            let title = this.textContent.trim();
            if (window.innerWidth < 768) title = title.toLowerCase().replace("show", "").replace("results", '').trim()
            $parent.children('#lang_drop').children("span").html(title)
            $(this).addClass('active').removeClass('unact');
            $("#jmtech_link_length select").val(value).change();
            localStorage.setItem("sort_limit", value)
            $dropdown_panel.removeClass('show').addClass('hide')
            $parent.removeClass('show').addClass('hide')
        }
    })


    $(document).on('click mouseclick keypress change', function (e) {
        //console.log(e.type, e)
        let timeout = the_timeout()
        if (timeout === true) {
            let timeout = parseInt(Cookies.get("_cl_timeout"));
            let time_now = new Date().getTime();
            if (timeout > time_now) {
                Cookies.set('_cl_timeout', AddMinutes(60).getTime().toString(), {expires: 1})
                Cookies.set('_cl_check', "Jm Tech", {expires: 7})
            }
        }
    })


    $("#logout").on('click', function (e) {
        e.preventDefault();
        if (Cookies.get().hasOwnProperty("_cl") === true)
            Cookies.remove('_cl');
        if (Cookies.get().hasOwnProperty("_cl_timeout") === true)
            Cookies.remove('_cl_timeout');
        if (Cookies.get().hasOwnProperty("_cl_check") === true)
            Cookies.remove('_cl_check');
        if (Cookies.get().hasOwnProperty("_cl_time") === true)
            Cookies.remove('_cl_time');
        window.location.replace(location.href);
    })

    $('#query').on('keyup paste keypress keydown', function (e) {
        if ($("main").hasClass('processing') === true) {
            e.preventDefault();
        }
    })

    initiate_timeout();
});


document.getElementById('query').addEventListener("input", function (e) {
    new_value = this.value
    /*$(".form-control.form-control-sm").val(this.value);
    EnterKey("B")
    EnterKey()*/
});

window.addEventListener('resize', function (e) {
    set_loader();
})


function set_loader() {
    if (document.body.offsetWidth < 768) {
        $("body").attr('data-responsive', "1");
        document.getElementById("jmtech_link").classList.add('responsive');
    } else {
        $("body").attr('data-responsive', "0");
        document.getElementById("jmtech_link").classList.remove('responsive');
    }
}

/*observeElement(document.getElementById('query'), "value", function (oldValue, newValue) {
    document.querySelector(".form-control.form-control-sm").value = newValue;
    EnterKey()
    console.log("Input value changed via API. Value changed from '%s' to '%s'", oldValue, newValue);
});*/

document.addEventListener('click', function (e) {
    let is_included = _is_included(e.path);
    let is_second = __level_2(e.target);
    if (!is_included && !is_second) {
        if ($parent.hasClass("show")) {
            $dropdown_panel.removeClass('show').addClass('hide')
            $parent.removeClass('show').addClass('hide')
        }
    }
})

function __level_2(target) {
    $__target = $(target);
    let optionClick = ($__target[0].tagName.toLowerCase() === 'a' && $__target.hasClass('dropdown-item') && $__target[0].parentElement.id && $__target.parent().hasClass('dropdown-menu') && $__target[0].parentElement.tagName.toLowerCase() === 'div');
    return ($__target[0].tagName.toLowerCase() === 'span' && $__target[0].parentElement.id && $__target[0].parentElement.id === 'lang_drop') ||
        ($__target[0].tagName.toLowerCase() === 'a' && $__target[0].id && $__target[0].id === 'lang_drop') || optionClick;


}


function _is_included(path = []) {
    let is_included = 'a#lang_drop.nav-link.dropdown-toggle.rounded-6.lang_nav,a#lang_drop,.nav-link.dropdown-toggle.rounded-6.lang_nav,ul.navbar-nav.ml-auto,.navbar-nav.ml-auto,.navbar-nav.ml-auto'.split(',');

    for (let element of path) {
        for (let item of is_included) {
            let id = item.includes("#") ? (item.split("#")[1].includes(".") ? item.split("#")[1].split(".")[0] : item.split("#")[1]) : "";
            let ele = item.includes("#") ? item.split("#")[0] : "";
            item = id.length > 0 ? item.split(id)[1].split(".") : item.split(".");
            ele = ele.length > 0 ? ele : item[0];
            let classes = "", count = 0;
            for (let c of item) {
                if (count > 0) classes += ` ${c}`
                count++;
            }
            if (id.length > 0) {
                if ($(element).attr('id') === id) {
                    if (ele.length > 0) {
                        if ($(element)[0].nodeName.toLowerCase() === ele) return true;
                    } else if (classes.length > 0) {
                        if ($(element).hasClass(classes)) {
                            return true;
                        }
                    } else {
                        return true;
                    }
                }
            } else if (classes.length > 0) {
                if ($(element).hasClass(classes)) {
                    if (ele.length > 0) {
                        if ($(element)[0].nodeName.toLowerCase() === ele) return true;
                    } else {
                        return true;
                    }
                }
            }
        }
    }
    return false;
}


function observeElement(element, property, callback, delay = 0) {
    let elementPrototype = Object.getPrototypeOf(element);
    if (elementPrototype.hasOwnProperty(property)) {
        let descriptor = Object.getOwnPropertyDescriptor(elementPrototype, property);
        Object.defineProperty(element, property, {
            get: function () {
                return descriptor.get.apply(this, arguments);
            },
            set: function () {
                let oldValue = this[property];
                descriptor.set.apply(this, arguments);
                let newValue = this[property];
                if (typeof callback == "function") {
                    setTimeout(callback.bind(this, oldValue, newValue), delay);
                }
                return newValue;
            }
        });
    }
}


function EnterKey(key = "Backspace") {
    let keys = key === "Backspace" ? {key: "P", code: "KeyP", which: 80} : {key: "Backspace"};
    const keyEvent = new KeyboardEvent("keyup", key === "Backspace" ? {
        key: "P",
        code: "KeyP",
        which: 80
    } : {key: "Backspace"});
    document.querySelector(".form-control.form-control-sm").dispatchEvent(keyEvent);
}


function AddMinutes(minute = 20) {
    let date = new Date();
    date.setMinutes(date.getMinutes() + minute);
    return date;
}


function initiate_timeout() {
    if (Cookies.get().hasOwnProperty("_cl_time") === true) {
        if (Cookies.get().hasOwnProperty("_cl_check") === false) {
            Cookies.set('_cl_timeout', AddMinutes(60).getTime().toString(), {expires: 1})
            Cookies.set('_cl_check', "Jm Tech", {expires: 7})
        } else {
            the_timeout(true);
        }
        const timeout = setInterval(function () {
            if (Cookies.get().hasOwnProperty("_cl_time") === true) {
                the_timeout(true);
                let timeout = parseInt(Cookies.get("_cl_timeout"));
                let time_now = new Date().getTime();
                if (timeout > time_now) {
                    let inner = convertMillisecondsTime(timeout - time_now)
                    $('#expiring').html("Your session will expire in " + inner)
                } else {
                    the_timeout(true);
                    if (Cookies.get().hasOwnProperty("_cl_timeout") === true)
                        Cookies.remove('_cl_timeout');
                    if (Cookies.get().hasOwnProperty("_cl_check") === true)
                        Cookies.remove('_cl_check');
                    if (Cookies.get().hasOwnProperty("_cl_time") === true)
                        Cookies.remove('_cl_time');
                    window.location.replace(location.href);
                    clearInterval(timeout);
                }
            } else {
                window.location.replace(location.href);
                clearInterval(timeout);
            }
        }, 100)
    } else {
        window.location.replace(location.href);
    }
}


function the_timeout(is_removed = false) {
    if (Cookies.get().hasOwnProperty("_cl_timeout") === true) {
        let timeout = parseInt(Cookies.get("_cl_timeout"));
        if (timeout > new Date().getTime()) {
            return true;
        } else {
            if (Cookies.get().hasOwnProperty("_cl_timeout") === true)
                Cookies.remove('_cl_timeout');
            if (Cookies.get().hasOwnProperty("_cl_check") === true)
                Cookies.remove('_cl_check');
            if (Cookies.get().hasOwnProperty("_cl_time") === true)
                Cookies.remove('_cl_time');
            return false;
        }
    } else {
        if (is_removed === true) {
            if (Cookies.get().hasOwnProperty("_cl_check") === true)
                Cookies.remove('_cl_check');
            if (Cookies.get().hasOwnProperty("_cl_time") === true)
                Cookies.remove('_cl_time');
        }
        return false;
    }
}

function convertMillisecondsTime(time = 0) {
    let dateObj = new Date(time);
    let minutes = dateObj.getUTCMinutes();
    let seconds = dateObj.getSeconds();

    if (minutes > 0 && seconds === 0) {
        let str = minutes > 1 ? " minutes" : " minute";
        return minutes + str;
    } else if (minutes > 0) {
        let str = minutes > 1 ? " minutes" : " minute";
        let str_2 = minutes > 1 ? " seconds" : " second";
        return minutes + str + " " + seconds + str_2;
    } else if (seconds > 0) {
        let str_2 = minutes > 1 ? " seconds" : " second";
        return seconds + str_2;
    } else {
        return ""
    }
}

function postResult(sid) {
    if (typeof localStorage.getItem('__ssid') === 'string') {
        let __ssid = atob(localStorage.getItem('__ssid'))
        if (sid.toString() === __ssid) return false;
    }
    $.ajax({
        url: "/subscriber.php",
        type: 'POST',
        dataType: "text",
        data: {
            sid: sid,
        },
        success: function (response) {
            if (response.trim() === "Done!" || response.trim().includes("Done!")) {
                localStorage.setItem('__ssid', btoa(sid))
            }
        },
        error: function (response) {
            let error = {errors: response.responseText}
            console.log(error)
        }
    });
}
