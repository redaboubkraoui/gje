(function() {
    var aph_serverUrls = "https://assets.apphero.co",
        aph_ajaxUrls = "https://apphero.co";

    function insertAphBar(a, e, o, t, i, n) {
        1 == aph_checkCreateBar(a, t) && aph_barTargeting(a, e, o, t, i, n)
    }

    function aph_prepareSpecialBars(a, e, o, t) {
        "counter" == a.bar_type ? aph_setupCounter(a, e) : "shipping" == a.bar_type ? (aph_cartChangeListener(a.id, o), aph_updateCurrentTotal(a.id, o)) : "email" == a.bar_type && aph_emailCollapseCreate(a, t)
    }

    function aph_buildBarCode(a, e, o, t, i) {
        var n;
        aph_insertBarFiles(a), n = aph_createBarElements(a, e, t, i), $(document).ready(function() {
            aph_showBarSettings(a), aph_appendBarContent(n, a), aph_prepareSpecialBars(a, o, t, i), aph_setInitialFunctions(a), aph_fixBarHeight(a)
        })
    }
    var aph_loadTimeHolder = new Date,
        aph_pageScrollHolder = 0;

    function aph_showBarSettings(a) {}

    function aph_checkWebSafe(a) {
        var e = !1;
        return ["Helvetica", "Verdana", "Courier"].includes(a) && (e = !0), e
    }

    function aph_assignStoreFont(a) {
        var e, o = 0;
        $("#bar" + a).find(".aph_bar_holder").each(function() {
            var a;
            "Match Store Font" == $(this).find("input.aph_message_font").val() && (a = aph_getHeadersFont(), $(this).find(".aph_bar_message_body").css({
                "font-family": a
            }), $(this).find(".aph_bar_message_body a").css({
                "font-family": a
            }), $(this).find(".aph_bar_counter").css({
                "font-family": a
            }), o = 1)
        }), 1 == o && (e = aph_getHeadersFont(), $("#collapse" + a).find("div").each(function() {
            0 < $(this).css("font-family").indexOf("Match Store Font") && $(this).css({
                "font-family": e
            })
        }), $("#collapse" + a).find("a").each(function() {
            0 < $(this).css("font-family").indexOf("Match Store Font") && $(this).css({
                "font-family": e
            })
        }))
    }

    function aph_getHeadersFont() {
        for (var a = "", e = 6; 0 < e && (null == (a = $("h" + e).css("font-family")) || "" == a); e--);
        return a
    }

    function aph_checkFirstVisit(a) {
        var e = !1,
            o = !0;
        return null == aph_getCookie("aph_first_visit" + a) && ($("#bar" + a).find(".aph_bar_holder").each(function() {
            $(this).innerHeight();
            "Match Store Font" != $(this).find("input.aph_message_font").val() && (aph_checkWebSafe($(this).find(".aph_bar_message_body").css("font-family")) || (o = !1))
        }), o || (aph_setCookie("aph_first_visit" + a, "true"), e = !0)), e
    }
    var aph_iterationNo = 0,
        aph_switchLoop = 0;

    function aph_fixBarHeight(e) {
        var i = 0;
        try {
            var a = e.id;
            aph_iterationNo += 1, aph_assignStoreFont(a);
            var o = (o = $("#bar" + a).find(".aph_bar_holder").eq(0).css("padding-top") + "").toLowerCase().replace("px", "");
            "counter" == e.bar_type ? $("#bar" + a).find("#aph_counter" + a).hasClass("aph_counter_ready") || (o = "") : "shipping" == e.bar_type && ($("#bar" + a).find(".aph_bar_container").hasClass("aph_shipping_ready") || (o = "")), $(window).width() <= 750 && aph_iterationNo < 5 && (aph_checkFirstVisit(a) && 0 == aph_switchLoop ? (aph_switchLoop = 1, o = "") : 1 == aph_switchLoop && (aph_switchLoop = 0, o = "")), "" != o && "0" < o || 20 < aph_iterationNo ? ($("#bar" + a).find(".aph_bar_holder").each(function(a, e) {
                $(this).innerHeight() > i && (i = $(this).innerHeight());
                var o = "<input type='hidden' class='aph_bar_heighthold' value='" + $(this).innerHeight() + "' />";
                $(this).append(o)
            }), "shipping" == e.bar_type ? $("#bar" + a).find(".aph_bar_holder").each(function() {
                if ("none" != $(this).css("display")) return i = $(this).find("input.aph_bar_heighthold").val(), !1
            }) : $("#bar" + a).find(".aph_bar_holder").each(function(a, e) {
                var o = i - $(this).innerHeight(),
                    t = $(this).css("padding-top") + "";
                t = +(t = t.toLowerCase().replace("px", "")), 0 < o && $(this).css("padding-top", Math.ceil(o / 2) + t + "px")
            }), aph_whenToShowBar(e, i)) : setTimeout(function() {
                aph_fixBarHeight(e)
            }, 300)
        } catch (a) {
            aph_whenToShowBar(e, i)
        }
    }

    function aph_whenToShowBar(a, e) {
        0 || (aph_showAphBar(a, e), aph_fixThemeLoadCheck(a.id), aph_countUserImpressions(a))
    }
    var aph_fixThemeCounter = 0;

    function aph_fixThemeLoadCheck(a) {
        aph_checkThemeExternal < 0 ? -10 == aph_checkThemeExternal && setTimeout(function() {
            aph_headerFixedSolution(a)
        }, 500) : "function" == typeof aph_fixThemeSpecialCase ? setTimeout(function() {
            aph_fixThemeSpecialCase(a, aph_checkThemeExternal)
        }, 500) : (aph_fixThemeCounter += 1) < 10 && setTimeout(function() {
            aph_fixThemeLoadCheck(a)
        }, 300)
    }

    function aph_headerFixedSolution(a) {
        var e = $("header");
        "fixed" == e.css("position") && e.css({
            top: $("bar" + a).height() + "px"
        })
    }

    function aph_showAphBar(a, e) {
        var o = a.bar_type,
            t = a.id;
        "multi" == o ? ($("#bar" + t).find(".aph_bar_holder").hide(), aph_loop_messages(t)) : "single" == o || "counter" == o ? $("#bar" + t).find(".aph_bar_holder").eq(0).show() : "email" == o && ($("#bar" + t).find(".aph_bar_holder").eq(0).show(), aph_CollapseStartPosition(a)), $("#bar" + t).find(".aph_bar_container").css("height", e + "px"), $("#bar" + t).css("visibility", "visible");
        "top" == a.position ? "true" == a.posOnTop ? ($("#bar" + t).css({
            top: -1 * e + "px",
            height: e + "px"
        }), $("#bar" + t).animate({
            top: "0px"
        }, 500), $("#barPlcHold" + t).animate({
            height: e + "px"
        }, 500)) : ($("#bar" + t).css({
            float: "none",
            "margin-top": -1 * e + "px",
            height: e + "px"
        }), $("#bar" + t).animate({
            marginTop: "0px"
        }, 500)) : "bottom" == a.position ? ($("#bar" + t).css({
            bottom: -1 * e + "px",
            height: e + "px"
        }), $("#bar" + t).animate({
            bottom: "0px"
        }, 500)) : "custom" == a.position && ("true" == a.posOnTop ? (o = $("#bar" + t).parent().offset(), $("#bar" + t).css({
            width: $("#bar" + t).parent().width() + "px",
            left: o.left + "px"
        }), $("#bar" + t).parent().animate({
            height: e + "px"
        }), $("#barPlcHold" + t).css({
            float: "left"
        }), $("#barPlcHold" + t).animate({
            height: e + "px"
        }, 500)) : $("#bar" + t).css("float", "none"), $("#bar" + t).animate({
            height: e + "px"
        }, 500)), aph_getBarOffset(a)
    }
    var aph_barIterCounter = 0;

    function aph_getBarOffset(o) {
        aph_barIterCounter += 1;
        var a = o.id,
            t = 0,
            e = 0,
            i = 0,
            n = 0,
            s = 0,
            p = 0,
            r = 0;
        $("#bar" + a).parent().find(".aph_bar_bar").each(function() {
            "bottom" == o.position ? "bottom" == $(this).find("input.hidBarPosition").val() && (s += 1, (r = +(r = $(this).css("bottom")).toLowerCase().replace("px", "")) < 0 && (e = 1)) : "top" == o.position && "top" == $(this).find("input.hidBarPosition").val() && (p += 1, "fixed" == $(this).css("position") ? (i = 1, r = $(this).css("top")) : "relative" == $(this).css("position") && (n = 1, r = $(this).css("margin-top")), (r = +r.toLowerCase().replace("px", "")) < 0 && (e = 1))
        }), 0 == e || 20 <= aph_barIterCounter ? (1 < s || 1 < p) && ("top" == o.position && 1 == i && 1 == n && $("#bar" + a).parent().find(".aph_bar_bar").each(function() {
            var a;
            "relative" == $(this).css("position") && (a = (a = $(this).parent().find(".aph_bar_plchold").last().attr("id")).replace("barPlcHold", "bar"), $(this).insertAfter($("#" + a)))
        }), $("#bar" + a).parent().find(".aph_bar_bar").each(function(a) {
            var e = 200 - a;
            "bottom" == o.position ? (e = 200 + a, "bottom" == $(this).find("input.hidBarPosition").val() && ($(this).animate({
                bottom: t + "px"
            }, 300), t += $(this).height())) : "top" == o.position && "top" == $(this).find("input.hidBarPosition").val() && ("fixed" == $(this).css("position") ? $(this).animate({
                top: t + "px"
            }, 300) : $(this).css("position"), t += $(this).height()), $(this).css("z-index", e)
        })) : setTimeout(function() {
            aph_getBarOffset(o)
        }, 300)
    }

    function aph_countUserImpressions(a) {
        setTimeout(function() {
            aph_count_impre(a)
        }, 3e3)
    }

    function aph_setInitialFunctions(a) {
        var e, o = a.id;
        $(".aph_dismiss_multi").off("click"), $(".aph_dismiss_multi").on("click", function() {
            aph_closeBar($(this).attr("id").replace("dismiss", ""))
        }), "multi" == a.bar_type ? ($("#bar" + o).off("mouseenter").on("mouseenter", function() {
            "multi" == $(this).data("type") && (aph_loopstop = !0, clearTimeout(aph_animTimeMain), clearTimeout(aph_animTimeResume))
        }), $("#bar" + o).off("mouseleave").on("mouseleave", function() {
            "multi" == $(this).data("type") && (aph_loopstop = !1, aph_animTimeResume = setTimeout(function() {
                aph_loopstop || aph_loop_messages(o)
            }, 1e3))
        })) : "email" == a.bar_type && ($(".aph_collapse_arrow a, .aph_collapse_bar_clickable").off("click"), $(".aph_collapse_arrow a, .aph_collapse_bar_clickable").on("click", function() {
            var a, e, o;
            0 == aph_allowCollapseExpand && (aph_allowCollapseExpand = 1, e = "", 0 < $(this).parents(".aph_collapse").length ? (e = (e = (a = $(this).parents(".aph_collapse")).attr("id")).replace("collapse", ""), o = a.find(".aph_collapse_type").val(), $(this).parents(".aph_collapse_arrow").css({
                visibility: "hidden"
            }), "dismissable" == o && aph_closeBar(e)) : (e = (e = $(this).parents(".aph_bar_bar").attr("id")).replace("bar", ""), a = $("#collapse" + e)), aph_emailCollapseExpand(a))
        }), $(".aph_collapse_optin_square").off("click"), $(".aph_collapse_optin_square").on("click", function() {
            aph_optInChange($(this))
        }), $("a.aph_collapse_btn").off("click"), $("a.aph_collapse_btn").on("click", function() {
            aph_submitCollapseInfo(a, $(this))
        }), e = "input.aph_collapse_first_name,input.aph_collapse_last_name", e += ",input.aph_collapse_email", $(e).off("input"), $(e).on("input", function() {
            $(this).css({
                "background-color": "#fff",
                border: "solid 0px #000"
            })
        })), $(".aph_bar_clickable").off("click"), $(".aph_bar_clickable").on("click", function() {
            aph_barLink($(this).find("input.aph_clickableBarTarget").val(), $(this).find("input.aph_clickableBarType").val())
        }), $("a.aph_bar_coupon, a.aph_collapse_coupon").off("click"), $("a.aph_bar_coupon, a.aph_collapse_coupon").on("click", function() {
            aph_copy_coupon($(this))
        }), aph_checkThemeId(o, 0)
    }

    function aph_closeBar(a) {
        aph_setCookie("AH_OP_BAR_CLOSED" + a, "true"), aph_SlideBar(a), "function" == typeof aph_CloseThemeSpecialCase && aph_CloseThemeSpecialCase(a)
    }
    var aph_checkThemeExternal = 0;

    function aph_checkThemeId(a, e) {
        var o, t;
        e += 1, "undefined" == typeof Shopify ? e < 20 && setTimeout(function() {
            aph_checkThemeId(a, e)
        }, 300) : (null == (o = Shopify.theme.theme_store_id) && (-1 < Shopify.theme.name.indexOf("Debutify") ? o = 123 : -1 < Shopify.theme.name.indexOf("Dawn-main") ? (o = 11111, obj = $("div#shopify-section-header"), 0 < obj.length && "bottom" == $("#bar" + a).find(".hidBarPosition").val() && obj.css({
            "will-change": "auto"
        })) : aph_checkThemeExternal = -10), [679, 855, 857, 871, 872, 847, 735, 836, 782, 719, 730, 766, 885, 829, 775, 606, 796, 688, 587, 601, 123, 11111].includes(o) ? ((t = document.createElement("script")).type = "text/javascript", t.readyState ? t.onreadystatechange = function() {
            "loaded" != t.readyState && "complete" != t.readyState || (t.onreadystatechange = null, aph_checkThemeExternal = o)
        } : t.onload = function() {
            aph_checkThemeExternal = o
        }, t.src = aph_serverUrls + "/js/aphThemeExtend02.js", document.getElementsByTagName("head")[0].appendChild(t)) : aph_checkThemeExternal = [578, 380].includes(o) ? -20 : -10)
    }

    function aph_SlideBar(a) {
        var e = 0,
            o = "",
            t = 0,
            i = 0;
        $("#bar" + a).parent().find(".aph_bar_bar").each(function() {
            $(this).attr("id") == "bar" + a ? (e = 1, o = $(this).find(".hidBarPosition").val(), t = $(this).height(), "custom" == o && $(this).parent().animate({
                height: "0px"
            }, 500), $(this).animate({
                height: "0px"
            }, 500), $("#barPlcHold" + a).animate({
                height: "0px"
            }, 500)) : 1 == e && $(this).find(".hidBarPosition").val() == o && "fixed" == $(this).css("position") && ("top" == o ? (i = +(i = $(this).css("top")).toLowerCase().replace("px", ""), i -= t, $(this).animate({
                top: i + "px"
            }, 500)) : "bottom" == o && (i = +(i = $(this).css("bottom")).toLowerCase().replace("px", ""), i -= t, $(this).animate({
                bottom: i + "px"
            }, 500)))
        })
    }

    function aph_barLink(a, e) {
        "new" == e ? window.open(a, "_blank") : window.location.href = a
    }

    function aph_insertBarFiles(a) {
        var e = document.getElementsByTagName("head")[0],
            o = document.createElement("link");
        o.type = "text/css", o.rel = "stylesheet", o.href = aph_serverUrls + "/css/aph_bar_style02.css", e.appendChild(o);
        o = document.createElement("link");
        o.type = "text/css", o.rel = "stylesheet", o.href = "https://assets.apphero.co/css/fawesome.css", e.appendChild(o), "counter" == a.bar_type && ((a = document.createElement("link")).type = "text/css", a.rel = "stylesheet", a.href = "https://assets.apphero.co/css/soon.min.css", e.appendChild(a), (a = document.createElement("script")).type = "text/javascript", a.src = "https://assets.apphero.co/js/soon.min.js", e.appendChild(a), (a = document.createElement("script")).type = "text/javascript", a.src = "https://assets.apphero.co/js/soon.module.js", e.appendChild(a))
    }
    var aph_animTimeResume, aph_animTimeMain, aph_loopstop = !1,
        aph_loop_messages = function(a) {
            var e = -1,
                o = $("#bar" + a).find(".aph_bar_holder").length;
            1 < o ? ($("#bar" + a).find(".aph_bar_holder").each(function() {
                if (e += 1, "none" != $(this).css("display")) return !1
            }), -1 < e ? $("#bar" + a).find(".aph_bar_holder").eq(e).fadeOut(function() {
                $("#bar" + a).find(".aph_bar_holder").hide(), o <= (e += 1) && (e = 0), $("#bar" + a).find(".aph_bar_holder").eq(e).fadeIn()
            }) : ($("#bar" + a).find(".aph_bar_holder").hide(), $("#bar" + a).find(".aph_bar_holder").eq(0).fadeIn()), aph_animTimeMain = setTimeout(function() {
                aph_loopstop || aph_loop_messages(a)
            }, 4e3)) : $("#bar" + a).find(".aph_bar_holder").show()
        };

    function aph_emailCollapseCreate(a, l) {
        var c, h = a.id,
            _ = 0,
            d = "",
            u = "",
            f = "",
            m = "<div id='collapse" + h + "' class='aph_collapse' style='display:none;'>";
        m += aph_emailCallapseBackgroud(a), m += "<div class='aph_collapse_holder'>", m += "<div class='aph_collapse_content_holder'>", $("#bar" + h).find(".aph_bar_holder").each(function() {
            _ += 1;
            var a, e, o = $(this).find("input.aph_message_font").val(),
                t = $(this).find("input.aph_message_font_size").val(),
                i = $(this).find(".aph_bar_message_body"),
                n = "",
                s = "",
                p = aph_getCookie("aph_coupon_show" + h),
                r = aph_getCookie("aph_coupon_value" + h);
            p && (n = " style='display:none;'", s = " style='display:block;'", l.collapseMode = "dismissable", null != r && "" != r || (l.couponMethod = "nocoupon")), 1 == _ || 3 == _ ? (d = o, u = aph_emailBtnFieldsFontSize(u = t, "button"), f = aph_emailBtnFieldsFontSize(t, "fields"), c = i.find("a"), i.find("a").css({
                display: "none"
            }), 1 == _ ? (m += "<div class='aph_collapse_info'" + n + ">", m += "<div class='aph_collapse_title'") : 3 == _ && (m += "<div class='aph_collapse_thank'" + s + ">", m += "<div class='aph_collapse_thank_title'"), m += " style='font-family:" + o + ";font-size:" + t + "px;color:" + i.css("color") + ";'>", 0 < i.find("i").length && (a = (a = i.find("i").attr("class")).replace("aph_bar_icon_new", "aph_collapse_icon"), m += "<i class='" + a + "' style='font-size:" + t + "px;color:" + i.find("i").css("color") + ";'></i>"), (a = $(i).clone()).find("i").remove(), a.find("span").remove(), m += a.html(), m += "</div>") : 2 != _ && 4 != _ || ("" != aph_trimString(i.html()) && (2 == _ ? m += "<div class='aph_collapse_subtitle'" : 4 == _ && (m += "<div class='aph_collapse_thank_subtitle'"), m += " style='font-family:" + o + ";font-size:" + t + "px;color:" + i.css("color") + ";'>", m += i.html(), m += "</div>"), 2 == _ ? (m += "<div class='aph_collapse_fields'>", e = i = t = "", "full_name" == l.nameFieldType ? (e = " aph_emailfieldsThree", t = " aph_collapse_small_field", i = " aph_collapse_float_right") : "first_name" == l.nameFieldType || "last_name" == l.nameFieldType ? e = " aph_emailfieldsTwo" : "disabled" == l.nameFieldType && (e = " aph_emailfieldsOne"), "first_name" != l.nameFieldType && "full_name" != l.nameFieldType || (m += "<input type='text' style='font-size:" + f + "px;' class='aph_collapse_first_name" + t + e + "' maxlength='25' placeholder='" + l.firstNameLabel + "' />"), "last_name" != l.nameFieldType && "full_name" != l.nameFieldType || (m += "<input type='text' style='font-size:" + f + "px;' class='aph_collapse_last_name" + t + i + e + "' maxlength='25' placeholder='" + l.lastNameLabel + "' />"), m += "<input type='text' style='font-size:" + f + "px;' class='aph_collapse_email" + e + "' maxlength='50' placeholder='" + l.emailLabel + "' />", m += aph_emailCollapseOptIn(l, "mobile", f), e = (e = c.attr("class")).replace("aph_bar_btn_new", "aph_collapse_btn") + " aph_noSelect", m += "<a class='" + e + "'", m += " style='font-family:" + d + ";font-size:" + u + "px;", m += "background-color:" + c.css("background-color") + ";", m += "border-color:" + c.css("border-left-color") + ";color:" + c.css("color") + ";'>", m += "<span>" + c.html() + "</span>", m += "</a>", m += "</div>", m += aph_emailCollapseOptIn(l, "", f)) : 4 == _ && "nocoupon" != l.couponMethod && (c.find("span").html(""), null != r && c.find("span").html(r), m += "<div class='aph_collapse_thank_fields'>", e = (e = c.attr("class")).replace("aph_bar_btn_new", "aph_collapse_btn").replace("aph_bar_coupon", "aph_collapse_coupon") + " aph_noSelect", m += "<a class='" + e + "'", m += " style='font-family:" + d + ";font-size:" + u + "px;", m += "border-color:" + c.css("border-left-color") + ";color:" + c.css("color") + ";'>", m += c.html(), m += "</a>", m += "<input type='hidden' value='" + l.couponMethod + "' />", m += "</div>"), m += "</div>")
        }), m += "<div class='aph_loadAnim'>", m += '<span></span><span></span><span style="margin:0;"></span>', m += "</div>", m += "</div>", m += aph_emailCollapseArrow(a, l), m += "</div></div>", m += "<input type='hidden' class='aph_collapse_height' />", m += "<input type='hidden' class='aph_collapse_type' value='" + l.collapseMode + "' />", m += "<input type='hidden' class='aph_collapse_optin_value' value='1' />", m += "</div>", $(m).insertAfter("#bar" + a.id), aph_barCollapseArrow(a, l), aph_CollapseCheckSection(a.id)
    }

    function aph_emailBtnFieldsFontSize(a, e) {
        var o = 16,
            t = 0;
        return "button" == e || "fields" == e ? t = (a - 24) / 24 / 2 : "bar" == e && (t = (a - 24) / 24, a < 24 && (t /= 2)), o += o * t, o = Math.round(o), "fields" == e && (o -= 2) < 12 && (o = 12), o
    }

    function aph_emailCollapseOptIn(a, e, o) {
        var t = "";
        "mobile" == e && (t = " aph_mobile_optin");
        e = "";
        return "true" == a.optin && (e += "<div class='aph_collapse_optin" + t + "'>", e += "<span class='aph_collapse_optin_square'>", e += "<i class='aph_collapse_icon fa fa-check' style='visibility:hidden;margin:0 !important;'></i>", e += "</span>", e += "<span class='aph_collapse_optin_text' style='font-family:Helvetica;font-size:" + o + "px;color:#" + a.optinTextColor + ";'>" + a.optinLabel + "</span>", e += "</div>"), e
    }

    function aph_emailCallapseBackgroud(a) {
        var e, o = "",
            t = a.id,
            i = "transparent";
        return 0 < $("#bar" + t).find(".aph_bg-section").length ? (e = $("#bar" + t).find(".aph_bg-section").clone(), a = document.createElement("div"), $(a).append(e), o = $(a).html()) : i = $("#bar" + t).find(".aph_bar_container").css("background-color"), o = "<div class='aph_collapse_container' style='background-color:" + i + ";'>" + o
    }

    function aph_emailCollapseArrow(a, e) {
        var o = "",
            t = "fa-chevron-up-n";
        "bottom" == a.position && (t = "fa-chevron-down-n"), "dismissable" == e.collapseMode && (t = "fa-cancel-n");
        return o += "<div class='aph_collapse_arrow'>", o += "<a class='aph_noSelect'>", o += "<i class='aph_collapse_icon fa " + (t += " " + a.bar_dismiss_style) + "'></i>", o += "</a>", o += "<input type='hidden' class='aph_collapse_direction' value='1' />", o += "</div>"
    }

    function aph_barCollapseArrow(a, e) {
        var o = a.id,
            t = (t = $("#collapse" + o).find(".aph_collapse_arrow i").attr("class")).replace("fa-chevron-down-n", "").replace("fa-chevron-up-n", ""),
            i = " fa-chevron-down-n";
        "bottom" == a.position && (i = " fa-chevron-up-n");
        a = "<div id='collapseArrow" + o + "' class='aph_barCollapseArrow'>";
        a += "<i class='" + t + i + "'></i>", a += "</div>", $("#bar" + o).find(".aph_bar_container").addClass("aph_collapse_bar_clickable"), $("#bar" + o).find(".aph_bar_container").append(a), $("#bar" + o).find(".aph_dismiss_multi").remove()
    }

    function aph_CollapseCheckSection(a) {
        aph_getCookie("aph_coupon_show" + a) && ((a = $("#collapse" + a)).find(".aph_collapse_info").css({
            display: "none"
        }), a.find(".aph_collapse_thank").css({
            display: "block"
        }), a.find(".aph_collapse_type").val("dismissable"))
    }

    function aph_CollapseStartPosition(a) {
        var e = a.id,
            o = $("#collapse" + e),
            t = $("#collapse" + e).innerHeight();
        o.find(".aph_collapse_height").val(t);
        var i = "fixed";
        "top" == a.position ? ("true" != a.posOnTop && (i = "absolute"), o.css({
            position: i,
            bottom: "auto",
            top: -t + "px"
        })) : "bottom" == a.position ? o.css({
            position: i,
            bottom: -t + "px",
            top: "auto"
        }) : "custom" == a.position && (n = (t = $("#bar" + e).parent().offset()).top + "px", "true" != a.posOnTop && (i = "absolute", n = "auto", "none" == o.find(".aph_collapse_thank").css("display") && (a = $("#bar" + e).find(".aph_bar_holder").eq(0).innerHeight(), o.css({
            "margin-top": -a + "px"
        }))), o.css({
            width: $("#bar" + e).parent().width() + "px",
            height: "0"
        }), o.css({
            position: i,
            left: t.left + "px",
            top: n,
            bottom: "auto"
        })), o.css({
            display: "block"
        });
        var n = o.find(".aph_collapse_fields .aph_collapse_btn").innerHeight();
        o.find(".aph_collapse_fields input[type='text']").css({
            height: n + 4 + "px"
        });
        n = o.find(".aph_collapse_type").val();
        "expanded" == n ? aph_emailCollapseExpand($(o)) : "collapsed" == n || "dismissable" == n && ($("#bar" + e).css({
            display: "none"
        }), aph_emailCollapseExpand($(o)))
    }

    function aph_emailCollapseExpand(a) {
        var e = a.attr("id");
        aph_updateCollapseHeight(e = e.replace("collapse", ""));
        var o = a.find(".aph_collapse_direction").val(),
            t = a.find(".aph_collapse_height").val();
        "1" == o ? (t = 0, a.find(".aph_collapse_arrow").css({
            visibility: "visible"
        }), aph_collapseMove(e, o, t)) : "0" == o && (t = -t, $("#bar" + e).css({
            opacity: 1
        }), a.find(".aph_collapse_arrow").css({
            visibility: "hidden"
        }), aph_collapseMove(e, o, t))
    }

    function aph_collapseMove(a, e, o) {
        var t = $("#collapse" + a),
            i = $("#bar" + a).find(".hidBarPosition").val();
        "top" == i ? t.animate({
            top: o + "px"
        }, 500, function() {
            aph_collapseMoveFinish($(this), a)
        }) : "bottom" == i ? t.animate({
            bottom: o + "px"
        }, 500, function() {
            aph_collapseMoveFinish($(this), a)
        }) : "custom" == i && (o = o < 0 ? 0 : t.find(".aph_collapse_holder").innerHeight(), t.animate({
            height: o + "px"
        }, 500, function() {
            aph_collapseMoveFinish($(this), a)
        }))
    }
    var aph_allowCollapseExpand = 0;

    function aph_collapseMoveFinish(a, e) {
        var o = $(a).find(".aph_collapse_arrow").find(".aph_collapse_direction"),
            t = ($("#bar" + e).find(".hidBarPosition").val(), $("#collapse" + e).find(".aph_collapse_type").val()),
            i = o.val(),
            a = 0;
        0 == i ? a = 1 : 1 == i && (a = 0), "dismissable" != t && aph_collapseBarAnimation(e, i), o.val(a), aph_allowCollapseExpand = 0
    }

    function aph_collapseBarAnimation(a, e) {
        var o = 1;
        0 == e ? o = 1 : 1 == e && (o = 0), $("#bar" + a).css({
            opacity: o
        })
    }

    function aph_optInChange(a) {
        var e = "1",
            o = $(a).parents(".aph_collapse");
        "visible" == $(a).find("i").css("visibility") ? (e = "0", o.find(".aph_collapse_optin_square i").css({
            visibility: "hidden"
        })) : o.find(".aph_collapse_optin_square i").css({
            visibility: "visible"
        }), $(a).css({
            "background-color": "#fff",
            border: "solid 1px #c2c2c2"
        }), o.find(".aph_collapse_optin_value").val(e)
    }
    var aph_loadAnimTimer = 0;

    function aph_loadAnimation(t, i, a) {
        var e, o, n;
        0 == a && (o = (e = i.find(".aph_loadAnim")).innerWidth(), n = e.innerHeight(), o = ((a = i.find(".aph_collapse_content_holder")).width() - o) / 2, n = (a.height() - n) / 2, a = i.find(".aph_collapse_title").css("color"), i.find(".aph_loadAnim span").css({
            "background-color": a
        }), e.css({
            left: o + "px",
            top: -n + "px",
            display: "block"
        })), i.find(".aph_loadAnim span").each(function(a) {
            var e, o;
            t == a && (e = 200, $(this).css({
                opacity: 0
            }), $(this).animate({
                opacity: 1
            }, 800), 2 < (o = a + 1) && (o = 0, e = 1e3), aph_loadAnimTimer = setTimeout(function() {
                aph_loadAnimation(o, i, 1)
            }, e))
        })
    }

    function aph_submitCollapseInfo(a, e) {
        var o = $(e).parents(".aph_collapse"),
            e = !0,
            e = aph_valdateEmailFields(o.find(".aph_collapse_first_name"), 1, !0);
        e = aph_valdateEmailFields(o.find(".aph_collapse_last_name"), 1, e), e = aph_valdateEmailFields(o.find(".aph_collapse_email"), 2, e), 1 == (e = aph_valdateEmailFields(o.find(".aph_collapse_optin_square"), 3, e)) && (aph_sendEmailInfo(a), o.find(".aph_collapse_info").animate({
            opacity: 0
        }, 500, function() {
            aph_loadAnimation(0, o, 0)
        }))
    }

    function aph_collapseThankYou(a, e) {
        var o = "",
            t = $(a).find(".aph_collapse_thank_fields");
        0 < t.length && "" == (o = t.find("a span").html()).trim() && t.remove(), $(a).css({
            height: $(a).innerHeight() + "px"
        }), $(a).find(".aph_collapse_info").css({
            display: "none"
        }), $(a).find(".aph_loadAnim").css({
            display: "none"
        }), clearTimeout(aph_loadAnimTimer), $(a).find(".aph_collapse_thank").css({
            opacity: 0,
            display: "block"
        });
        t = $(a).find(".aph_collapse_holder").innerHeight();
        $(a).animate({
            height: t + "px"
        }), $(a).find(".aph_collapse_height").val(t), $(a).find(".aph_collapse_thank").animate({
            opacity: 1
        }, 500, function() {
            aph_AfterInfoSent($(a), o)
        })
    }

    function aph_AfterInfoSent(a, e) {
        var o = (o = $(a).attr("id")).replace("collapse", "");
        $(a).find(".aph_collapse_arrow i").removeClass("fa-chevron-down-n").removeClass("fa-chevron-up-n").addClass("fa-cancel-n"), $(a).find(".aph_collapse_type").val("dismissable"), aph_updateCollapseHeight(o), aph_setCookie("aph_coupon_show" + o, "true"), aph_setCookie("aph_coupon_value" + o, e)
    }

    function aph_valdateEmailFields(a, e, o) {
        var t, i = !0;
        return 0 < $(a).length && (1 == e ? ((t = (t = $(a).val()).trim()).length < 1 || 25 < t.length) && (i = !1) : 2 == e ? i = !(50 < (t = (t = $(a).val()).trim()).length) && aph_isEmail(t) : 3 == e && "hidden" == $(a).find("i").css("visibility") && (i = !1), 0 == i ? $(a).css({
            "background-color": "#f7d8d5",
            border: "solid 1px #ed6347"
        }) : ($(a).css({
            "background-color": "#fff",
            border: "solid 0px #000"
        }), 3 == e && $(a).css({
            border: "solid 1px #c2c2c2"
        })), aph_updateCollapseHeight($(a).parents(".aph_collapse").attr("id").replace("collapse", ""))), 0 == o && (i = o), i
    }

    function aph_updateCollapseHeight(a) {
        var e = $("#collapse" + a).innerHeight();
        $("#collapse" + a).find(".aph_collapse_height").val(e), $("#collapse" + a).css({
            height: e + "px"
        })
    }

    function aph_sendEmailInfo(o) {
        var t = $("#collapse" + o.id),
            a = o.bar_id,
            e = aph_getShopifyStore(),
            i = "nocoupon",
            n = (new Date).getTime(),
            s = a + "-" + n + "-" + e,
            p = t.find(".aph_collapse_thank_fields");
        0 < p.length && (i = p.find("input").val());
        s = {
            shop: e,
            bar_id: a,
            coupon_method: i,
            time_stamp: n,
            add_info: aph_concatString(s),
            first_name: aph_checkIfExist(t.find(".aph_collapse_first_name")),
            last_name: aph_checkIfExist(t.find(".aph_collapse_last_name")),
            email: t.find(".aph_collapse_email").val(),
            optin: t.find(".aph_collapse_optin_value").val()
        };
        $.ajax({
            url: aph_ajaxUrls + "/api/email?op=store",
            type: "POST",
            data: s,
            success: function(a) {
                try {
                    var e = JSON.parse(a);
                    "ok" == e.status && (p.find("a span").html(e.coupon), aph_collapseThankYou(t, o))
                } catch (a) {
                    aph_collapseThankYou(t, o), p.hide()
                }
            },
            error: function(a, e, o) {
                console.error(a), console.error(e), console.error(o)
            }
        })
    }

    function aph_checkIfExist(a) {
        var e = "";
        return 0 < $(a).length && (e = $(a).val()), e
    }
    var aph_current_total = 0,
        aph_goal = 0,
        aph_remaining_goal = 0,
        aph_extra_goal = 0;

    function aph_formatForShipping(a, e, o) {
        aph_goal = aph_goal % 1 != 0 ? Number(aph_goal).toFixed(2) : aph_goal, aph_remaining_goal = aph_remaining_goal % 1 != 0 ? Number(aph_remaining_goal).toFixed(2) : aph_remaining_goal, aph_extra_goal = aph_extra_goal % 1 != 0 ? Number(aph_extra_goal).toFixed(2) : aph_extra_goal;
        var t = e;
        aph_goal.toString().indexOf(".") < 0 && (t = e.split("0").join("")), a.indexOf("aph_money_holder") < 0 && o && (t = "<span class='aph_money_holder'>" + t + "</span>");
        var i = aph_goal + "",
            e = aph_remaining_goal + "",
            o = aph_extra_goal + "";
        return -1 < t.indexOf("with_comma_separator") && (i = i.replace(".", ","), e = e.replace(".", ","), o = o.replace(".", ",")), t = aph_replaceCurrencyFormat(t), a.replace("{{amount}}", t.replace("{{amount}}", i)).replace("{{remaining_amount}}", t.replace("{{amount}}", e)).replace("{{extra_amount}}", t.replace("{{amount}}", o))
    }

    function aph_replaceCurrencyFormat(a) {
        return a = (a = (a = a.replace("{{ ", "{{").replace(" }}", "}}")).replace("{{amount_no_decimals_with_comma_separator}}", "{{amount}}").replace("{{amount_with_apostrophe_separator}}", "{{amount}}")).replace("{{amount_no_decimals}}", "{{amount}}").replace("{{amount_with_comma_separator}}", "{{amount}}")
    }

    function aph_updateCurrentTotal(e, o) {
        $.getJSON("/cart.js", function(a) {
            aph_current_total = Number(aph_formatMoney(a.total_price, "{{amount}}")), aph_renderShippingMessage(e, o)
        })
    }

    function aph_renderShippingMessage(a, e) {
        var o = -1 != e.goal.indexOf(".") ? 2 : 0;
        aph_goal = Number(e.goal).toFixed(o), aph_extra_goal = Number(e.secondaryGoal).toFixed(o);
        var t, i = 0,
            n = "{{amount}}";
        null != aph_current_total && (0 < aph_current_total && aph_current_total < aph_goal ? (i = 1, aph_remaining_goal = Number(aph_goal - aph_current_total).toFixed(o), n = "{{remaining_amount}}") : aph_goal <= aph_current_total && ("1" == e.hasSecondary ? aph_current_total < aph_extra_goal ? (i = 3, aph_extra_goal = Number(aph_extra_goal - aph_current_total).toFixed(o), n = "{{extra_amount}}") : aph_extra_goal <= aph_current_total && (i = 4) : i = 2), $("#bar" + a).find(".aph_bar_holder").hide(), 0 < (o = $("#bar" + a).find(".aph_bar_holder").eq(i).find(".aph_bar_message_holder")).find("span.aph_money_holder").length && (t = aph_formatForShipping(n, e.moneyFormat, !1), o.find("span.aph_money_holder").html(t)), $("#bar" + a).find(".aph_bar_holder").eq(i).show(), t = $("#bar" + a).find(".aph_bar_holder").eq(i).innerHeight(), 0 < $("#bar" + a).find(".aph_bar_holder").eq(i).find("input.aph_bar_heighthold").length && ($("#bar" + a).find(".aph_bar_holder").eq(i).find("input.aph_bar_heighthold").val(t), $("#bar" + a).find(".aph_bar_container").css({
            height: t + "px"
        }), $("#bar" + a).css({
            height: t + "px"
        }), $("#barPlcHold" + a).css({
            height: t + "px"
        })), $("#bar" + a).find(".aph_bar_container").hasClass("aph_shipping_ready") ? aph_checkThemeId(a, 0) : $("#bar" + a).find(".aph_bar_container").addClass("aph_shipping_ready"))
    }

    function aph_cartChangeListener(t, i) {
        $(document).ajaxSuccess(function(a, e, o) {
            null == o || -1 == o.url.indexOf("/cart/update.js") && -1 == o.url.indexOf("/cart/change.js") && -1 == o.url.indexOf("/cart/add.js") || aph_updateCurrentTotal(t, i)
        });
        var a = window.fetch;
        window.fetch = function() {
            return new Promise((e, o) => {
                a.apply(this, arguments).then(a => {
                    (-1 < a.url.indexOf("/cart/add.js") || -1 < a.url.indexOf("/cart/change.js") || -1 < a.url.indexOf("/cart/update.js")) && "cors" != a.type && aph_updateCurrentTotal(t, i), e(a)
                }).catch(a => {
                    o(response)
                })
            })
        }, window.addEventListener("pageshow", function(a) {
            a.persisted && aph_updateCurrentTotal(t, i)
        }, !1)
    }

    function aph_formatMoney(a, e) {
        var o = /\{\{\s*(\w+)\s*\}\}/;
        switch (e = e || this.money_format, "string" == typeof a && (a = a.replace(/[^0-9]/g, "")), (a = (a = parseInt(a)).toString()).length) {
            case 0:
                a = "000";
                break;
            case 1:
                a = "00" + a;
                break;
            case 2:
                a = "0" + a
        }
        var t = a.substr(a.length - 2),
            i = a.substr(0, a.length - 2),
            n = ",",
            s = ".";
        switch (e.match(o)[1]) {
            case "amount_no_decimals":
                s = t = "";
                break;
            case "amount_with_comma_separator":
                n = ".", s = ",";
                break;
            case "amount_no_decimals_with_comma_separator":
                n = ".", s = t = ""
        }
        i = aph_addSeparator(i, n) + s + t;
        return e.replace(o, i)
    }

    function aph_addSeparator(a, e) {
        return e = e || ",", a.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1" + e)
    }

    function aph_setupCounter(e, o) {
        var t = e.id,
            i = function(a) {
                0 < $("#aph_counter" + t).length && "undefined" != typeof Soon ? a(e, o) : setTimeout(function() {
                    i(a)
                }, 100)
            };
        i(function(a, e) {
            aph_createCounterElement(a.id, e, !1)
        })
    }

    function aph_counterReady(a) {
        $("#bar" + a).find(".soon-slot-inner").css("width", "0.8em"), $("#bar" + a).find(".soon-flip-inner").css("width", "1em"), $("#bar" + a).find("#aph_counter" + a).addClass("aph_counter_ready")
    }

    function aph_createCounterElement(a, e, o) {
        var t = !0,
            i = aph_calculateDueDate(a, e);
        aph_calculateEndTime(a, e, o);
        var n = document.querySelector("#aph_counter" + a);
        Soon.create(n, {
            due: i,
            face: e.timerFace.replace("-bordered", "").replace("-background", ""),
            format: e.format,
            layout: e.layout,
            separator: ":",
            padding: !0,
            cascade: !0,
            paddingDays: "00",
            paddingHours: "00",
            paddingMinutes: "00",
            labelsDays: e.daysLabel,
            labelsHours: e.hoursLabel,
            labelsMinutes: e.minutesLabel,
            labelsSeconds: e.secondsLabel,
            eventComplete: function() {
                aph_handleTimerEnd(a, e, n)
            },
            eventTick: function() {
                t && "0" != i && (setTimeout(function() {
                    aph_counterStyling(a, e), aph_counterReady(a)
                }, 200), t = !1)
            }
        })
    }

    function aph_calculateDueDate(a, e) {
        var o = 0,
            t = (new Date).getTime();
        return "all" == e.timing_algo ? o = e.end_ms <= t ? "0" : new Date(Number(e.end_ms)).toISOString() : "peruser" == e.timing_algo && (o = "in " + aph_toMinutes(e) + " minutes", "repeated" != (a = aph_getCookie("aph_timer_end" + a)) && null != a && "NaN" != a && (o = a - t <= 0 ? "0" : "in " + Math.round((a - t) / 60 / 1e3) + " minutes")), o
    }

    function aph_toMinutes(a) {
        var e = a.days,
            o = a.hours,
            a = a.minutes;
        return 24 * Number(e) * 60 + 60 * Number(o) + Number(a)
    }

    function aph_calculateEndTime(a, e, o) {
        null != aph_getCookie("aph_timer_end" + a) && "NaN" != aph_getCookie("aph_timer_end" + a) && !o || (o = (new Date).getTime(), aph_setCookie("aph_timer_end" + a, Number(o) + 60 * aph_toMinutes(e) * 1e3, aph_toMinutes(e) / 60 / 24))
    }

    function aph_handleTimerEnd(a, e, o) {
        var t = (new Date).getTime();
        "0" == e.timer_end_action ? aph_setCookie("aph_timer_end" + a, t, 1) : "1" == e.timer_end_action ? (aph_setCookie("aph_timer_end" + a, t, 365), aph_SlideBar(a)) : "2" == e.timer_end_action && (Soon.destroy(o), aph_setCookie("aph_timer_end" + a, "repeated", 1), aph_createCounterElement(a, e, !0))
    }

    function aph_counterStyling(t, i) {
        var n = [i.daysLabel, i.hoursLabel, i.minutesLabel, i.secondsLabel],
            a = $("#bar" + t).find(".aph_bar_message_body"),
            e = $("#bar" + t).find(".aph_bar_counter span.soon-label");
        switch (e.css("color", a.css("color")), e.css("font-family", a.css("font-family")), i.timerFace) {
            case "slot":
                $("#bar" + t).find(".soon-value").css("background", "transparent"), $("#bar" + t).find(".soon-value").css("color", "#" + i.timerTextColor), $("#bar" + t).find(".soon-value").css("border", "1px solid transparent"), $("#bar" + t).find(".soon-value").css("font-weight", "600");
                break;
            case "slot-background":
                $("#bar" + t).find(".soon-value").css("background", "#" + i.timerBgColor), $("#bar" + t).find(".soon-value").css("color", "#" + i.timerTextColor), $("#bar" + t).find(".soon-value").css("border", "1px solid #" + i.timerBgColor), "inline" == i.layout && $("#bar" + t).find(".soon[data-layout*=line] .soon-value, .soon[data-layout*=line] .soon-label").css("margin-right", "0.325em");
                break;
            case "slot-bordered":
                $("#bar" + t).find(".soon-value").css("border", "1px solid #" + i.timerBorderColor), $("#bar" + t).find(".soon-value").css("color", "#" + i.timerTextColor), "inline" == i.layout && $("#bar" + t).find(".soon[data-layout*=line] .soon-value, .soon[data-layout*=line] .soon-label").css("margin-right", "0.325em");
                break;
            case "flip":
                $("#bar" + t).find(".soon-flip-face").css("background", "#" + i.timerBgColor).css("color", "#" + i.timerTextColor), $("#bar" + t).find(".soon-flip-face-fallback").css("background", "#" + i.timerBgColor).css("color", "#" + i.timerTextColor);
                break;
            case "matrix 3x5":
                var o = "<style>#bar" + t + " .soon-matrix-dot[data-state='1']  {background-color:#" + i.timerTextColor + " !important;}",
                    o = "<div class='aph_added_style'>" + (o += " #bar" + t + " .soon-matrix-dot[data-state='0'] {background-color: transparent !important;}</style>") + "</div>";
                $(o).appendTo("body")
        }
        "inline" == i.layout && ($("#bar" + t).find(".soon [class*=soon-]").css("vertical-align", "middle"), $("#bar" + t).find(".soon-separator").hide(), $("#bar" + t).find(".soon-group-separator").css("padding-right", "5px"), 0 < i.days && $("#bar" + t).find(".soon-group-separator:first").css("padding-right", "10px")), 0 < i.days && $("#bar" + t).find(".soon-separator:first").hide(), $("#bar" + t).find(".soon-label").each(function(a, e) {
            var o = n.length - $("#bar" + t).children().find(".soon-label").length;
            "" == n[a + o] && "inline" != i.layout || " " == n[a + o] && "inline" != i.layout ? ($("#bar" + t).find(".soon-label").eq(a).css("visibility", "hidden"), $("#bar" + t).find(".soon-wrapper [class*='soon-'], .soon [class*='soon-']").css("vertical-align", "top")) : "" == n[a + o] && "inline" == i.layout && $("#bar" + t).find(".soon-label").eq(a).css("display", "none")
        });
        a = $("#bar" + t).find(".aph_bar_message_body").css("font-size");
        16 <= (a = +(a = a.toLowerCase().replace("px", ""))) && 750 < $(window).width() && $("#bar" + t).find(".soon-wrapper[data-layout*='group'] .soon-label, .soon[data-layout*='group'] .soon-label").css("font-size", "10px")
    }

    function aph_createBarMessage(a, e, o, t) {
        var i, n = "",
            s = "",
            p = "",
            r = "",
            l = "",
            c = "",
            h = "",
            _ = "",
            d = "";
        aph_checkWebSafe(e.font) || "Match Store Font" == e.font_name || (i = document.getElementsByTagName("head")[0], (u = document.createElement("link")).type = "text/css", u.rel = "stylesheet", u.href = "https://fonts.googleapis.com/css?family=" + e.font, i.appendChild(u)), $(window).width() <= 750 && (e.fontSize = Math.floor(.9 * e.fontSize));
        var u, f = "";
        switch (Number(e.cta_type)) {
            case 1:
                var m = "<input type='hidden' class='aph_clickableBarTarget' value='" + e.btnTarget + "' />";
                m += "<input type='hidden' class='aph_clickableBarType' value='" + e.linkType + "' />", r = " aph_bar_clickable", l = e.message + m;
                break;
            case 2:
                f = "javascript:void(0);", "" != e.btnTarget && (f = e.btnTarget, "new" == e.linkType && (s = "target='_blank'")), p = "<span class='aph_bar_btn_holder'><a href='" + f + "' " + s + " style='font-family:" + e.font + ";background:#" + e.btnColor + ";color:#" + e.btnTextColor + ";border-color:#" + e.btnColor + ";' class='aph_bar_btn_new aph_" + e.btn_style + "'>" + e.btnText + "</a></span>", l = e.message;
                break;
            case 3:
                f = "javascript:void(0);", "" != e.btnTarget && (f = e.btnTarget), "new" == e.linkType && (s = "target='_blank'"), p = "<a href='" + f + "' " + s + " style='font-family:" + e.font + "; font-size:" + e.fontSize + "px; color:#" + e.btnTextColor + ";' class='aph_slink_new'>" + e.btnText + "</a>", l = e.message + "&nbsp;" + p, p = "";
                break;
            case 4:
                m = "<span class='aph_bar_btn_holder'><a href='javascript:void(0);' style='font-family:" + e.font + ";border-color:#" + e.btnColor + "; color:#" + e.btnTextColor + ";' ";
                m += "class='aph_bar_btn_new aph_bar_coupon aph_" + e.btn_style + "'>", m += "<span>" + e.btnText + "</span><i class='aph_bar_icon_new fa fa-spin-n aph_coupon_spinner'></i><i class='aph_bar_icon_new fa fa-check-circle'></i></a></span>", l = e.message, p = m;
                break;
            case 0:
                l = e.message
        }
        return "counter" == a.bar_type ? (u = " style='display:inline-block;font-family:" + e.font + ";font-size:" + Number(e.fontSize) + "px;color:#" + e.textColor + ";vertical-align:middle;padding:0;'", c = "<div id='aph_counter" + a.id + "' class='aph_bar_counter'" + u + "></div>", h = "vertical-align:middle;") : "shipping" == a.bar_type ? (aph_goal = o.goal, aph_extra_goal = o.secondaryGoal, l = aph_formatForShipping(l, o.moneyFormat, !0)) : "email" == a.bar_type && (_ += "<input type='hidden' class='aph_message_font_size' value='" + e.fontSize + "' />", e.fontSize = aph_emailBtnFieldsFontSize(e.fontSize, "bar"), d = " aph_collapse_message_holder"), "" != e.icon && (n = "<i style='font-size:" + Number(e.fontSize) + "px;color:#" + e.iconColor + ";line-height:inherit;' class='aph_bar_icon_new " + e.icon + "'></i>"), l = n + l + p + c, "<div style='display:none;' class='aph_bar_holder" + r + "'>" + ("<div class='aph_bar_message_holder" + d + "'>" + ("<div class='aph_bar_message_body' style='font-family:" + e.font + ";font-size:" + Number(e.fontSize) + "px;color:#" + e.textColor + ";" + h + "'>" + l + "</div>") + "</div>") + ("<input type='hidden' class='aph_message_font' value='" + e.font_name + "' />" + _) + "</div>"
    }

    function aph_copy_coupon(a) {
        var e, o;
        "none" != $(a).find("span").css("display") && (e = $(a).find("span").html(), (o = document.createElement("textarea")).value = e, o.style.width = "1px", o.style.height = "1px", o.style.background = "transparent", document.body.append(o), o.select(), document.execCommand("copy"), document.body.removeChild(o), 1 == $(a).hasClass("aph_collapse_coupon") && "0px" == $(a).css("margin-right") || $(a).css({
            width: $(a).innerWidth() + 4 + "px"
        }), $(a).find("span").css({
            display: "none"
        }), $(a).find("i.fa-spin-n").css({
            display: "block",
            position: "relative"
        }), setTimeout(function() {
            aph_coupon_animation($(a).find("i.fa-spin-n"), "top", 0)
        }, 2200), aph_applyDiscountCode(e))
    }

    function aph_coupon_animation(a, e, o) {
        var t;
        $(a).css({
            top: "0",
            left: "0",
            display: "none"
        }), 1 == $(a).parents("a").hasClass("aph_collapse_coupon") && "0px" == $(a).parents("a").css("margin-right") || (t = $(a).parents("a").innerWidth() + 4, $(a).parents("a").css({
            width: t
        })), $(a).parent().find("i.fa-check-circle").css({
            display: "block"
        })
    }

    function aph_applyDiscountCode(a) {
        var e = window.location.origin;
        e += "/discount/" + a, $.ajax({
            type: "GET",
            url: e,
            success: function(a) {}
        })
    }

    function aph_createBarContainer(a, e) {
        var o = "",
            t = aph_hexToRgb(e.bgColor),
            i = "";
        return "" != e.bgImage ? (i = "<div class='aph_bg-section'" + (" style='background:url(\"" + e.bgImage + '") left top repeat;opacity:' + e.opacity + ";top:0;left:0;display:block;'") + ">&nbsp;</div>", o = "transparent") : null != t && (o = "rgba(" + t.r + "," + t.g + "," + t.b + "," + e.opacity + ")"), "<div class='aph_bar_container' style='background-color:" + o + "'>" + i + a + "</div>"
    }

    function aph_createBarHtml(a, e) {
        var o = "";
        "true" == e.user_closable && (o = "<div id='dismiss" + e.id + "' class='aph_dismiss_multi " + e.bar_dismiss_style + "'>&#xd7;</div>");
        var t = "",
            i = "";
        switch (e.position) {
            case "bottom":
                i = "style='position:fixed;bottom:0;'";
                break;
            case "top":
                "true" == e.posOnTop && (i = " style='position:fixed;top:0;'", t = "<div id='barPlcHold" + e.id + "' class='aph_bar_plchold'></div>");
                break;
            case "custom":
                "true" == e.posOnTop && (i = " style='position:fixed;'", t = "<div id='barPlcHold" + e.id + "' class='aph_bar_plchold'></div>")
        }
        var n = "<input type='hidden' class='hidBarPosition' value='" + e.position + "' />";
        return t + ("<div id='bar" + e.id + "' class='aph_bar_bar' " + i + " data-type='" + e.bar_type + "'>" + a + o + n + "</div>")
    }

    function aph_createBarElements(o, a, t, i) {
        var n = "";
        return a.forEach(function(a, e) {
            n += aph_createBarMessage(o, a, t, i)
        }), aph_createBarHtml(aph_createBarContainer(n, o, a), o, a)
    }

    function aph_appendBarContent(a, e) {
        ("custom" == e.position ? $(a).appendTo("#aph_bar_wrapper_" + e.custom_pos_id) : 0 < $("div#shopify-section-header").length ? $(a).prependTo("div#shopify-section-header") : $(a).prependTo("body")).css({
            height: 0,
            visibility: "hidden"
        })
    }

    function aph_checkCreateBar(a, e) {
        var o = !0;
        return (aph_getCookie("AH_OP_BAR_CLOSED" + a.id) || "counter" == a.bar_type && "0" == aph_calculateDueDate(a.id, e)) && (o = !1), o
    }

    function aph_barTargeting(e, o, t, i, n, s) {
        t.countryOptions = JSON.parse(t.countryOptions), t.pageTargetOptions = JSON.parse(t.pageTargetOptions), t.domainTargetOptions = JSON.parse(t.domainTargetOptions);
        var a, p, r = !1;
        "free" == e.plan && ("single" == e.bar_type || "email" == e.bar_type) || "plus" == e.plan ? r = !0 : "pro" != e.plan && "max" != e.plan || (a = window.location.href + "", ("" != (p = document.referrer) ? p.match(/:\/\/(.[^/]+)/)[1] : "").replace("http://", "").replace("https://", ""), ("all" == t.pageTarget || "home" == t.pageTarget && "/" == window.location.pathname || "collection" == t.pageTarget && -1 < window.location.pathname.indexOf("collection") || "product" == t.pageTarget && -1 < window.location.pathname.indexOf("product") || "custom" == t.pageTarget && -1 < t.pageTargetOptions.indexOf(a)) && ("specific" == t.domainTarget && -1 < t.domainTargetOptions.indexOf(window.location.host.split(".")[0]) || "all" == t.domainTarget || "" == t.domainTarget || "main" == t.domainTarget && !aph_isSubDomain(window.location.host)) && (1 == t.device_target && !aph_mobile_check() || 2 == t.device_target && aph_mobile_check() || 0 == t.device_target) && (null != p.match("[^.s]+." + t.source_mode) || "custom" == t.source_mode && t.source_url == p || "utm" == t.source_mode && window.location.href.includes(t.utm_code) || "disabled" == t.source_mode || "true" == sessionStorage["holdRef" + e.id]) && (sessionStorage["holdRef" + e.id] = !0, 0 == t.countryOptions.length || "true" == sessionStorage["holdCountry" + e.id] ? r = !0 : $.ajax({
            url: "https://apphero.co/ip.php",
            dataType: "jsonp",
            success: function(a) {
                a = a.isoCode;
                "" != a && 0 < t.countryOptions.length && -1 < t.countryOptions.indexOf(a) && (sessionStorage["holdCountry" + e.id] = !0, aph_buildBarCode(e, o, i, n, s))
            }
        }))), 1 == r && aph_buildBarCode(e, o, i, n, s)
    }

    function aph_getShopifyStore() {
        var a = "";
        return "undefined" != typeof Shopify && (a = Shopify.shop), a
    }

    function aph_setCookie(a, e, o) {
        var t = new Date;
        t.setTime(t.getTime() + 24 * o * 60 * 60 * 1e3);
        t = "expires=" + t.toUTCString();
        document.cookie = a + "=" + e + ";" + t + ";path=/"
    }

    function aph_getCookie(a) {
        a = ("; " + document.cookie).split("; " + a + "=");
        if (2 == a.length) return a.pop().split(";").shift()
    }

    function aph_hexToRgb(a) {
        a = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(a);
        return a ? {
            r: parseInt(a[1], 16),
            g: parseInt(a[2], 16),
            b: parseInt(a[3], 16)
        } : null
    }

    function aph_trimString(a) {
        return a = a.replace(/^\s\s*/, "").replace(/\s\s*$/, "")
    }

    function aph_mobile_check() {
        var a, e = !1;
        return a = navigator.userAgent || navigator.vendor || window.opera, (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) && (e = !0), e
    }

    function aph_isSubDomain(a) {
        return (a = (a = (a = (a = (a = (a = a.replace(new RegExp(/^\s+/), "")).replace(new RegExp(/\s+$/), "")).replace(new RegExp(/\\/g), "/")).replace(new RegExp(/^http\:\/\/|^https\:\/\/|^ftp\:\/\//i), "")).replace(new RegExp(/^www\./i), "")).replace(new RegExp(/\/(.*)/), "")).match(new RegExp(/\.[a-z]{2,3}\.[a-z]{2}$/i)) ? a = a.replace(new RegExp(/\.[a-z]{2,3}\.[a-z]{2}$/i), "") : a.match(new RegExp(/\.[a-z]{2,4}$/i)) && (a = a.replace(new RegExp(/\.[a-z]{2,4}$/i), "")), !!a.match(new RegExp(/\./g))
    }

    function aph_isEmail(a) {
        return /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,6})+$/.test(a)
    }

    function aph_trimString(a) {
        return a = a.replace(/^\s\s*/, "").replace(/\s\s*$/, "")
    }

    function aph_concatString(a) {
        return window.btoa(encodeURIComponent(a))
    }

    function aph_count_impre(a) {
        $("#bar" + a.id).is($(".aph_bar_bar")[0]) && "pro" != a.plan && "max" != a.plan && 11 == Math.floor(20 * Math.random()) + 1 && $.ajax({
            type: "GET",
            url: "https://apphero.co/countimpre.php?shop=" + a.shop,
            dataType: "jsonp",
            success: function(a) {}
        })
    }
    if (typeof jQuery != 'undefined') {
        insertAphBar({
            "bgColor": "404854",
            "name": "Free Shipping Bar Example",
            "position": "top",
            "posOnTop": "true",
            "opacity": "1",
            "bgImage": "",
            "user_closable": "false",
            "bar_dismiss_style": "Light",
            "custom_pos_id": "0",
            "bar_id": "19190",
            "id": "989065_606265",
            "shop": "app-hero.myshopify.com",
            "bar_type": "shipping",
            "plan": "pro"
        }, [{
            "message": "Get free shipping when you spend {{amount}} or more",
            "font": "Helvetica",
            "font_name": "Helvetica",
            "cta_type": "0",
            "fontSize": "16",
            "textColor": "E6E6E6",
            "icon": "fa fa-truck fa-lg",
            "iconColor": "E7C656"
        }, {
            "message": "Spend {{remaining_amount}} more to get free shipping",
            "font": "Helvetica",
            "font_name": "Helvetica",
            "cta_type": "0",
            "fontSize": "16",
            "textColor": "E6E6E6",
            "icon": "fa fa-shipping-fast fa-lg",
            "iconColor": "E7C656"
        }, {
            "message": "Congratulations! You got free shipping!",
            "font": "Helvetica",
            "font_name": "Helvetica",
            "cta_type": "0",
            "fontSize": "16",
            "textColor": "E6E6E6",
            "icon": "fa fa-check-circle fa-lg",
            "iconColor": "E7C656"
        }], {
            "domainTarget": "all",
            "pageTarget": "custom",
            "domainTargetOptions": "[]",
            "pageTargetOptions": "[\"https:\/\/app-hero.myshopify.com\/products\/womens-short-sleeve-t-shirt-1\"]",
            "countryOptions": "[]",
            "source_mode": "disabled",
            "utm_code": "",
            "source_url": "",
            "device_target": "0"
        }, "{}", {
            "goal": "35",
            "moneyFormat": "${{amount}}",
            "hasSecondary": "0"
        }, "{}");
    } else {
        var head = document.getElementsByTagName('head')[0];
        var jq = document.createElement('script');
        jq.src = 'https://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js';
        head.appendChild(jq);
        jq.onload = function() {
            insertAphBar({
                "bgColor": "404854",
                "name": "Free Shipping Bar Example",
                "position": "top",
                "posOnTop": "true",
                "opacity": "1",
                "bgImage": "",
                "user_closable": "false",
                "bar_dismiss_style": "Light",
                "custom_pos_id": "0",
                "bar_id": "19190",
                "id": "989065_606265",
                "shop": "app-hero.myshopify.com",
                "bar_type": "shipping",
                "plan": "pro"
            }, [{
                "message": "Get free shipping when you spend {{amount}} or more",
                "font": "Helvetica",
                "font_name": "Helvetica",
                "cta_type": "0",
                "fontSize": "16",
                "textColor": "E6E6E6",
                "icon": "fa fa-truck fa-lg",
                "iconColor": "E7C656"
            }, {
                "message": "Spend {{remaining_amount}} more to get free shipping",
                "font": "Helvetica",
                "font_name": "Helvetica",
                "cta_type": "0",
                "fontSize": "16",
                "textColor": "E6E6E6",
                "icon": "fa fa-shipping-fast fa-lg",
                "iconColor": "E7C656"
            }, {
                "message": "Congratulations! You got free shipping!",
                "font": "Helvetica",
                "font_name": "Helvetica",
                "cta_type": "0",
                "fontSize": "16",
                "textColor": "E6E6E6",
                "icon": "fa fa-check-circle fa-lg",
                "iconColor": "E7C656"
            }], {
                "domainTarget": "all",
                "pageTarget": "custom",
                "domainTargetOptions": "[]",
                "pageTargetOptions": "[\"https:\/\/app-hero.myshopify.com\/products\/womens-short-sleeve-t-shirt-1\"]",
                "countryOptions": "[]",
                "source_mode": "disabled",
                "utm_code": "",
                "source_url": "",
                "device_target": "0"
            }, "{}", {
                "goal": "35",
                "moneyFormat": "${{amount}}",
                "hasSecondary": "0"
            }, "{}");
        }
    }
})();
