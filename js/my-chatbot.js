var chevronup = 'images/collapse-chevron.svg';
var chevrondown = 'images/expand-chevron.svg';
var activesendbtn = 'images/send-button-active.svg';
var sendbtn = 'images/send-button.svg';
var quicklink2 = 'images/quicklink-icon2.svg';
var quicklink2act = 'images/quick-link-on-hover.svg';
var feedbacksendinact = 'images/SBI_chatbot_response_sendbutton_inactive.svg';
var feedbacksendact = 'images/SBI_chatbot_response_sendbutton_active.svg';

$(document).ready(function () {
    init();

    $('.modal-toggle').on('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        $('.modal').toggleClass('is-visible');
    });
    $('input.chatbot__input').keyup(function () {
        if ($(this).val()) {
            $(this).siblings('span.send-icon').children().attr('src', activesendbtn);
        } else {
            $(this).siblings('span.send-icon').children().attr('src', sendbtn);
        }
    });

    $(".default-ela").click(function () {
        $(".mug-shot").hide();
        $(".chatbot").toggleClass("chatbot--closed");
        $(".chatbot__header,.normalchatbar").show();
    });

    $("body").on('click', '.thumbs-down,.modal2 .modal-toggle2,.modal2 .feedbackclose', function (e) {
        e.preventDefault();
        e.stopPropagation();
        $('.modal2').toggleClass('is-visible');
    });
    // $("body").on('click', '.send-icon.chatbot__submit', function(e) {
    //     e.preventDefault();
    //     e.stopPropagation();
    //     $('.modal-logout').addClass('is-visible');
    // });
    $("body").on('click', '.modal-logout .feedbackclose,.modal-logout .cancel-btn,.confirm-btn-logout', function (e) {
        e.preventDefault();
        e.stopPropagation();
        $('.modal-logout').removeClass('is-visible');
    });
    $("body").on('click', '.modal-logout .cancel-btn', function (e) {
        e.preventDefault();
        e.stopPropagation();
        $('.modal-logout-sure').addClass('is-visible');
    });
    $("body").on('click', '.modal-logout-sure .feedbackclose,.confirm-btn-logout-sure', function (e) {
        e.preventDefault();
        e.stopPropagation();
        $('.modal-logout-sure').removeClass('is-visible');
    });
    $('input.chatbot__input2').keyup(function () {
        if ($(this).val()) {
            $(this).siblings('span').children().attr('src', feedbacksendact);
        } else {
            $(this).siblings('span').children().attr('src', feedbacksendinact);
        }
    });

    // handle login button and modal
    $('body').on('click', '.chatbot__messages .ChatItem-chatText button.my-login-button', function () {
        $('div.my-login-modal').show(0);
    });
    $('div.my-login-modal .my-toggle img').click(function () {
        $('div.my-login-modal').hide(0);
    });

    // handle date button and modal
    $('body').on('click', '.chatbot__messages .ChatItem-chatText button.my-date-button', function () {
        var data_for = $(this).attr('data-for') || '';
        $('div.my-date-modal button').html('Show me my ' + data_for);
        $('div.my-date-modal').show(0);
    });
    $('div.my-date-modal .my-toggle img').click(function () {
        $('div.my-date-modal').hide(0);
    });

    // handle transaction history button and modal
    $('body').on('click', '.chatbot__messages .ChatItem-chatText button.my-transaction-history-button', function () {
        $('div.my-transaction-history-modal').show(0);
    });
    $('div.my-transaction-history-modal .my-toggle img').click(function () {
        $('div.my-transaction-history-modal').hide(0);
    });
    $('div.my-transaction-history-modal form').on('submit', function (e) {
        e.preventDefault();
        var selected_date = $(this).find('input[type=text]').val();
        $('.chatbot__messages .ChatItem-chatText button.my-transaction-history-button').html(selected_date + '<img src="images/edit-button.svg">');
        $('div.my-transaction-history-modal').hide(0);
        $('.show-transaction-history-button').removeClass('inactive');
    });

    // handle transaction history button 2 and modal 2
    $('body').on('click', '.chatbot__messages .ChatItem-chatText button.my-transaction-history-button-2', function () {
        $('div.my-transaction-history-modal-2').show(0);
    });
    $('div.my-transaction-history-modal-2 .my-toggle img').click(function () {
        $('div.my-transaction-history-modal-2').hide(0);
    });
    $('div.my-transaction-history-modal-2 form').on('submit', function (e) {
        e.preventDefault();
        var selected_date = $(this).find('input[type=text]').val();
        $('.chatbot__messages .ChatItem-chatText button.my-transaction-history-button-2').html(selected_date + '<img src="images/edit-button.svg">');
        $('div.my-transaction-history-modal-2').hide(0);
    });

    // handle select transactions button and modal
    $('body').on('click', '.chatbot__messages .ChatItem-chatText button.my-select-transactions-button, .my-account-summary.cross-sell-flexipay a.my-select-transactions-button', function () {
        $('div.my-select-transactions-modal').show(0);
    });
    $('div.my-select-transactions-modal .my-toggle img').click(function () {
        $('div.my-select-transactions-modal').hide(0);
    });
    $('div.my-select-transactions-modal .my-content button').click(function () {
        $('div.my-select-transactions-modal').hide(0);
    });

    // handle new bank button and modal
    $('body').on('click', '.chatbot__messages .ChatItem-chatText span.new-bank-button', function () {
        $('div.my-new-bank-modal').show(0);
    });
    $('div.my-new-bank-modal .my-toggle img').click(function () {
        $('div.my-new-bank-modal').hide(0);
    });

    $("#new-bank").selectmenu({
        width: 386,
        classes: {
            "ui-selectmenu-button": "date-label"
        },
        change: function (event, ui) {
            var val = ui.item.value;
            var id = $(this)[0].id;
            if (val === 'Please select') {
                $(`#${id}-button`).addClass('date-label').removeClass('blue-border');
            } else {
                $(`#${id}-button`).removeClass('date-label').addClass('blue-border');
            }
        }
    });

    $('div.my-new-bank-modal .my-form button').click(function (e) {
        e.preventDefault();
        var $this = $(this);
        var enteredValue = $this.siblings('.my-date-picker').find('.ui-selectmenu-text').html();
        if (enteredValue !== 'Please select') {
            validateMessage(enteredValue);
        }
        $('div.my-new-bank-modal').hide(0);
    });

    // handle add new account button and modal
    $('body').on('click', '.chatbot__messages .ChatItem-chatText span.add-new-account-button', function () {
        $('div.my-account-details-modal').show(0);
    });
    $('div.my-account-details-modal .my-toggle img').click(function () {
        $('div.my-account-details-modal').hide(0);
    });

    // handle personal details button and modal
    $('body').on('click', '.chatbot__messages .ChatItem-chatText .my-personal-details-button', function () {
        $('div.my-personal-details-modal').show(0);
    });
    $('body').on('click', '.chatbot__messages .ChatItem-chatText .spend-details-box .blue-text', function () {
        $('div.my-personal-details-modal').show(0);
    });
    $('div.my-personal-details-modal .my-toggle img').click(function () {
        $('div.my-personal-details-modal').hide(0);
        $("#overviewDoughchart").show();
        $("ul.graph-nav li:first-child").addClass("active").siblings().removeClass("active");
        $("#overviewBarchart").hide();
    });
    $('.send-otp').click(function (e) {
        e.preventDefault();
        $(this).html('Resend OTP');
    });

    // handle Bank details button and modal
    $('body').on('click', '.chatbot__messages .ChatItem-chatText button.enter-bank-details', function () {
        $('div.my-bank-details-modal').show(0);
    });
    $('div.my-bank-details-modal .my-toggle img').click(function () {
        $('div.my-bank-details-modal').hide(0);
    });

    // handle pan details button and modal
    $('body').on('click', '.chatbot__messages .ChatItem-chatText button.my-pan-details-button', function () {
        $('div.my-pan-details-modal').show(0);
    });
    $('div.my-pan-details-modal .my-toggle img').click(function () {
        $('div.my-pan-details-modal').hide(0);
    });

    // handle income details button and modal
    $('body').on('click', '.chatbot__messages .ChatItem-chatText button.my-income-details-button', function () {
        $('div.my-income-details-modal').show(0);
    });
    $('div.my-income-details-modal .my-toggle img').click(function () {
        $('div.my-income-details-modal').hide(0);
    });

    // handle add-on card button and modal
    $('body').on('click', '.chatbot__messages .ChatItem-chatText button.my-addon-card-button', function () {
        $('div.my-addon-card-modal').show(0);
    });
    $('div.my-addon-card-modal .my-toggle img').click(function () {
        $('div.my-addon-card-modal').hide(0);
    });
    // handle the change of gender to then change the following dropdown
    $('input[type=radio][name=addon-gender]').change(function () {
        var $this = $(this);
        if ($this.val() === 'male') {
            $('ul#addon-relationship-menu').removeClass('female').addClass('male');
        }
        else if ($this.val() === 'female') {
            $('ul#addon-relationship-menu').removeClass('male').addClass('female');
        }
    });

    // handle domestic transactions button and modal
    // $('body').on('click', '.chatbot__messages .ChatItem-chatText button.my-domestic-transactions-button', function () {
    //     $('div.my-domestic-transactions-modal').show(0);
    // });
    $('div.my-domestic-transactions-modal .my-toggle img').click(function () {
        $('div.my-domestic-transactions-modal').hide(0);
    });

    // handle international transactions button and modal
    // $('body').on('click', '.chatbot__messages .ChatItem-chatText button.my-international-transactions-button', function () {
    //     $('div.my-international-transactions-modal').show(0);
    // });
    $('div.my-international-transactions-modal .my-toggle img').click(function () {
        $('div.my-international-transactions-modal').hide(0);
    });

    // handle tokenized transactions button and modal
    // $('body').on('click', '.chatbot__messages .ChatItem-chatText button.my-tokenized-transactions-button', function () {
    //     $('div.my-tokenized-transactions-modal').show(0);
    // });
    $('div.my-tokenized-transactions-modal .my-toggle img').click(function () {
        $('div.my-tokenized-transactions-modal').hide(0);
    });

    // handle click on confirm close button
    $('.confirm-btn').click(function () {
        $(".mug-shot").show();
        $(".chatbot").toggleClass("chatbot--closed");
        $(".chatbot__header, #livechatModal").hide();
    });

    // handle click on accordion login/logout buttons
    $('div.chatbot__accordion div.accordion-option.last').on('click', function () {
        var $this = $(this);
        quickLinkMessage($this.find('span'));
    });

    // handle click on offer apply button
    $('body').on('click', '.cross-sell-flexipay button.confirm', function () {
        var $this = $(this);
        validateMessage('Apply offer of ' + $this.attr('data-offer'));
    });

    // handle opening/closing of accordion drawer
    $('.open-accordion-drawer').on('click', function () {
        $(this).children("#sbi_hamburger_anim").toggleClass('rotate');
        var $accordion = $('div.chatbot__accordion-container'),
            $accordion_entry = $('div.chatbot__entry'),
            $chatbot_messages = $('.chatbot__messages');

        if ($accordion.hasClass('open')) {
            $accordion.removeClass('open').delay(200).hide(0);
        }
        else {
            $accordion.show(0).addClass('open');
        }

        $chatbot_messages.toggleClass('open');
        $accordion_entry.toggleClass('open');
    });

    $('body').on('click', 'a', function () {
        $(this).addClass('visited');
    });
});

function init() {
    $(".thumbs-up").on('click', function () {
        $(this).addClass("active");
        $(this).siblings().removeClass("active");
    });
    $(".thumbs-down").on('click', function () {
        $(this).addClass("active");
        $(this).siblings().removeClass("active");
    });

}

function quickLinkMessage(el, message) {
    // If own message is present then append own message 
    if(message){
        validateMessage(message);
    } else {
        validateMessage($(el).html());
    }
}

// JS for the dates modals
function generateOptions(from, till, reverse = false) {
    var optionsString = '';
    for (var i = from; i <= till; i++) {
        var toAdd;
        if (i < 10) {
            toAdd = '0' + i;
        } else {
            toAdd = i;
        }

        if (reverse) {
            optionsString = ('<option>' + toAdd + '</option>') + optionsString;
        } else {
            optionsString += ('<option>' + toAdd + '</option>');
        }
    }
    return optionsString;
}

var datesString = generateOptions(1, 31),
    monthsString = generateOptions(1, 12),
    yearsString = generateOptions(1950, 2018, true);

var startDate = $("#startDate"),
    endDate = $("#endDate"),
    startMonth = $("#startMonth"),
    endMonth = $("#endMonth"),
    startYear = $("#startYear"),
    endYear = $("#endYear");

startDate.append(datesString);
endDate.append(datesString);
startMonth.append(monthsString);
endMonth.append(monthsString);
startYear.append(yearsString);
endYear.append(yearsString);

// for the add-on-card modal
var addonAgeDate = $('#addon-age-date'),
    addonAgeMonth = $('#addon-age-month'),
    addonAgeYear = $('#addon-age-year');

addonAgeDate.append(datesString);
addonAgeMonth.append(monthsString);
addonAgeYear.append(yearsString);

// init select menus
var labels = ['DD', 'MM', 'YYYY'];
var twoDigitOptions = {
    width: 80,
    classes: {
        "ui-selectmenu-button": "date-label"
    },
    change: function (event, ui) {
        var val = ui.item.value;
        var id = $(this)[0].id;
        if (val === 'DD' || val === 'MM') {
            $('#' + id + '-button').addClass('date-label');
        } else {
            $('#' + id + '-button').removeClass('date-label');
        }
        if ($('#simpli_card_cont').hasClass('otp-pending')) {
            doCardFieldsValidations()
        }
    }
};

var fourDigitOptions = {
    width: 180,
    classes: {
        "ui-selectmenu-button": "date-label"
    },
    change: function (event, ui) {
        var val = ui.item.value;
        var id = $(this)[0].id;
        if (val === 'YYYY') {
            $('#' + id + '-button').addClass('date-label');
        } else {
            $('#' + id + '-button').removeClass('date-label');
        }
        if ($('#simpli_card_cont').hasClass('otp-pending')) {
            doCardFieldsValidations()
        }
    }
}

startDate.selectmenu(twoDigitOptions);
endDate.selectmenu(twoDigitOptions);
startMonth.selectmenu(twoDigitOptions);
endMonth.selectmenu(twoDigitOptions);


addonAgeDate.selectmenu(twoDigitOptions);
addonAgeMonth.selectmenu(twoDigitOptions);

startYear.selectmenu(fourDigitOptions);
endYear.selectmenu(fourDigitOptions);

addonAgeYear.selectmenu(fourDigitOptions);

// handle click on load more
$("body").on('click', 'div.my-transaction-history .load-more span', function () {
    $(this).closest('div.my-transaction-history').find('.read-more-info').slideDown();
});

// activate dropdown for income selection (apply-for-card.html)
var otherDropdowns = {
    width: 386,
    classes: {
        "ui-selectmenu-button": "date-label"
    },
    change: function (event, ui) {
        var val = ui.item.value;
        var id = $(this)[0].id;
        if (val === 'Please select') {
            $(`#${id}-button`).addClass('date-label');
        } else {
            $(`#${id}-button`).removeClass('date-label');
        }
    }
};

$('#gross-income').selectmenu(otherDropdowns);

otherDropdowns.open = function () {
    $('ul#addon-relationship-menu li.ui-menu-item').each(function (i) {
        var gender = $('#addon-relationship option').eq(i).attr('class');
        $(this).addClass(gender || 'none');
    });
};
/*Phase 3  */
var dropdownwithbutton = {
    width: 211,
    classes: {
        "ui-selectmenu-button": "date-label"
    },
    change: function (event, ui) {
        var val = ui.item.value;
        var id = $(this)[0].id;
        if (val === 'Please select') {
            $(`#${id}-button`).addClass('date-label');
        } else {
            $(`#${id}-button`).removeClass('date-label');
        }
    }
};
$('#new-bank-city-chatbot').selectmenu(otherDropdowns);
$('#new-bank-branch-chatbot').selectmenu(dropdownwithbutton);

// handle date button and modal
$('body').on('click', '.chatbot__messages .ChatItem-chatText button.service-request-chatbot', function () {
    $('div.service-request-modal-chatbot button').html('Show me my Service Requests');
    $('div.service-request-modal-chatbot').show(0);
});
$('div.service-request-modal-chatbot .my-toggle img').click(function () {
    $('div.service-request-modal-chatbot').hide(0);
});
$('input.service-request-input-num').keyup(function () {
    if ($(this).val()) {
        $('div.service-request-modal-chatbot button').removeClass("inactive");
    } else {
        $('div.service-request-modal-chatbot button').addClass("inactive");
    }
});

/*login simlification*/
/*user*/
$('body').on('click', '.chatbot__messages .ChatItem-chatText button.login-simplification', function () {
    $('div.login-simpli-modal-chatbot button.login').html('Login');
    $('div.login-simpli-modal-chatbot button.otp').html('Send OTP');
    $('div.login-simpli-modal-chatbot').show(0);
});
$('div.login-simpli-modal-chatbot .my-toggle img').click(function () {
    $('div.login-simpli-modal-chatbot').hide(0);
});
$('#simpli_user_cont input.login-simpli-input-user,#simpli_user_cont input.login-simpli-input-pass').keyup(function () {
    if ($('input.login-simpli-input-user').val() && $('input.login-simpli-input-pass').val()) {
        $('div.login-simpli-modal-chatbot #simpli_user_cont button').removeClass("inactive");
    } else {
        $('div.login-simpli-modal-chatbot #simpli_user_cont button').addClass("inactive");
    }
});

/*mobile*/
$('#simpli_mob_cont input.login-simpli-input-mob').keyup(function () {
    if ($('#simpli_mob_cont input.login-simpli-input-mob').val().length == 10) {
        $('div.login-simpli-modal-chatbot #simpli_mob_cont button.otp').removeClass("inactive");
    } else {
        $('div.login-simpli-modal-chatbot #simpli_mob_cont button.otp').addClass("inactive");
    }
});
$('div.login-simpli-modal-chatbot #simpli_mob_cont button.otp').click(function (e) {
    e.preventDefault();
    console.log(this);
    if (!$('div.login-simpli-modal-chatbot #simpli_mob_cont button.otp').hasClass("inactive")) {
        $("div.login-simpli-modal-chatbot #simpli_mob_cont #afterOtp").show(0);
        $("div.login-simpli-modal-chatbot #simpli_mob_cont #beforeOtp").hide(0);
        $("div.login-simpli-modal-chatbot #simpli_mob_cont .edit-icon").show(0);
        $('#simpli_mob_cont input.login-simpli-input-mob').prop("disabled", true);
        $('#simpli_mob_cont .nineone').css("color","#b2b2b2");
    }
    /*mobile after otp check*/
    if ($('#simpli_mob_cont input.login-simpli-input-otp').val() && $('#simpli_mob_cont input.login-simpli-input-atm').val() && $('#simpli_mob_cont input.login-simpli-input-otp').val().length == 6 && $('#simpli_mob_cont input.login-simpli-input-atm').val().length == 4) {
        $('div.login-simpli-modal-chatbot #simpli_mob_cont button.login').removeClass("inactive");
    }
    else {
        $('div.login-simpli-modal-chatbot #simpli_mob_cont button.login').addClass("inactive");
    }
    /*mobile with cards after otp check*/
    if ($('#simpli_mob_cont.hasMultiCard input.login-simpli-input-otp').val() && $('#simpli_mob_cont input.login-simpli-input-card-num').val() && $('#simpli_mob_cont input.login-simpli-input-atm').val() && $('#simpli_mob_cont input.login-simpli-input-otp').val().length == 6 && $('#simpli_mob_cont input.login-simpli-input-atm').val().length == 4 && $('#simpli_mob_cont input.login-simpli-input-card-num').val().length == 19) {
        $('div.login-simpli-modal-chatbot #simpli_mob_cont button.login').removeClass("inactive");
    } else {
        $('div.login-simpli-modal-chatbot #simpli_mob_cont button.login').addClass("inactive");
    }
});
$('div.login-simpli-modal-chatbot #simpli_mob_cont .edit-icon').click(function (e) {
    e.preventDefault();
    $("div.login-simpli-modal-chatbot #simpli_mob_cont #beforeOtp").show(0);
    $("div.login-simpli-modal-chatbot #simpli_mob_cont #afterOtp").hide(0);
    $("div.login-simpli-modal-chatbot #simpli_mob_cont .edit-icon").hide(0);
    $('#simpli_mob_cont input.login-simpli-input-mob').prop("disabled", false);
    $('#simpli_mob_cont .nineone').css("color","#333333");

});
$('#simpli_mob_cont #afterOtp input.login-simpli-input-otp').keyup(function () {
    if ($('#simpli_mob_cont input.login-simpli-input-otp').val().length == 6) {
        $('div.login-simpli-modal-chatbot #simpli_mob_cont .tick-icon').show(0);
    } else {
        $('div.login-simpli-modal-chatbot #simpli_mob_cont .tick-icon').hide(0);
    }
});
$('#simpli_mob_cont.hasSingleCard input.login-simpli-input-otp,#simpli_mob_cont.hasSingleCard input.login-simpli-input-atm').on('keyup keypress blur change load', function (e) {
    if ($('#simpli_mob_cont.hasSingleCard input.login-simpli-input-otp').val()
        && $('#simpli_mob_cont.hasSingleCard input.login-simpli-input-atm').val()
        && $('#simpli_mob_cont.hasSingleCard input.login-simpli-input-otp').val().length == 6
        && $('#simpli_mob_cont.hasSingleCard input.login-simpli-input-atm').val().length == 4) {
        $('div.login-simpli-modal-chatbot #simpli_mob_cont.hasSingleCard button.login').removeClass("inactive");
    } else {
        $('div.login-simpli-modal-chatbot #simpli_mob_cont.hasSingleCard button.login').addClass("inactive");
    }
});
$('div.login-simpli-modal-chatbot #afterOtp .resendotp').click(function () {
    $('div.login-simpli-modal-chatbot #afterOtp .otp-resent').show(0);
});
/*mobile with cards*/
$('#simpli_mob_cont.hasMultiCard input.login-simpli-input-otp,#simpli_mob_cont.hasMultiCard input.login-simpli-input-atm,#simpli_mob_cont.hasMultiCard input.login-simpli-input-card-num').on('keyup keypress blur change load', function (e) {
    console.log(this);
    if ($('#simpli_mob_cont.hasMultiCard input.login-simpli-input-otp').val() && $('#simpli_mob_cont.hasMultiCard input.login-simpli-input-card-num').val() && $('#simpli_mob_cont.hasMultiCard input.login-simpli-input-atm').val() && $('#simpli_mob_cont.hasMultiCard input.login-simpli-input-otp').val().length == 6 && $('#simpli_mob_cont.hasMultiCard input.login-simpli-input-atm').val().length == 4 && $('#simpli_mob_cont.hasMultiCard input.login-simpli-input-card-num').val().length == 19) {
        $('div.login-simpli-modal-chatbot #simpli_mob_cont.hasMultiCard button.login').removeClass("inactive");
    } else {
        $('div.login-simpli-modal-chatbot #simpli_mob_cont.hasMultiCard button.login').addClass("inactive");
    }
});
/*card number check*/
$('#simpli_card_cont input.login-simpli-your-card-num').keyup(function () {
    if ($('#simpli_card_cont input.login-simpli-your-card-num').val().length == 19) {
        $('div.login-simpli-modal-chatbot #simpli_card_cont button.otp').removeClass("inactive");
    } else {
        $('div.login-simpli-modal-chatbot #simpli_card_cont button.otp').addClass("inactive");
    }
});
$('#simpli_card_cont button.otp').click(function (e) {
    e.preventDefault();
    console.log(this);

    if (!$('div.login-simpli-modal-chatbot #simpli_card_cont button.otp').hasClass("inactive")) {
        $("div.login-simpli-modal-chatbot #simpli_card_cont #afterOtp").show(0);
        $("div.login-simpli-modal-chatbot #simpli_card_cont #beforeOtp").hide(0);
        $("div.login-simpli-modal-chatbot #simpli_card_cont .edit-icon").show(0);
        $('#simpli_card_cont input.login-simpli-your-card-num').prop("disabled", true);
        $('#simpli_card_cont').addClass('otp-pending');
        $('#simpli_mob_cont .nineone').css("color","#b2b2b2");
    }
    /*mobile with cards after otp check*/
    if ($('#simpli_card_cont input.login-simpli-input-otp').val() && $('#simpli_card_cont input.login-simpli-your-card-num').val() && $('#simpli_card_cont input.login-simpli-input-atm').val() && $('#simpli_card_cont input.login-simpli-input-otp').val().length == 6 && $('#simpli_card_cont input.login-simpli-input-atm').val().length == 4 && $('#simpli_card_cont input.login-simpli-your-card-num').val().length == 19) {
        $('div.login-simpli-modal-chatbot #simpli_card_cont button.login').removeClass("inactive");
    }
    /*mobile after otp check*/
    if ($('#simpli_card_cont input.login-simpli-input-otp').val() && $('#simpli_card_cont input.login-simpli-input-atm').val() && $('#simpli_card_cont input.login-simpli-input-otp').val().length == 6 && $('#simpli_card_cont input.login-simpli-input-atm').val().length == 4) {
        $('div.login-simpli-modal-chatbot #simpli_card_cont button.login').removeClass("inactive");
    }
    else {
        $('div.login-simpli-modal-chatbot #simpli_card_cont button.login').addClass("inactive");
    }
});
$('div.login-simpli-modal-chatbot #simpli_card_cont .edit-icon').click(function (e) {
    e.preventDefault();
    $("div.login-simpli-modal-chatbot #simpli_card_cont #beforeOtp").show(0);
    $("div.login-simpli-modal-chatbot #simpli_card_cont #afterOtp").hide(0);
    $("div.login-simpli-modal-chatbot #simpli_card_cont .edit-icon").hide(0);
    $('#simpli_card_cont input.login-simpli-your-card-num').prop("disabled", false);
    $('#simpli_mob_cont .nineone').css("color","#333333");

});
$('div.login-simpli-modal-chatbot #simpli_card_cont #afterOtp .resendotp').click(function () {
    $('div.login-simpli-modal-chatbot #afterOtp .otp-resent').show(0);
});
$('#simpli_card_cont #afterOtp input.login-simpli-input-otp').keyup(function () {
    if ($('#simpli_card_cont input.login-simpli-input-otp').val().length == 6) {
        $('div.login-simpli-modal-chatbot #simpli_card_cont .tick-icon').show(0);
    } else {
        $('div.login-simpli-modal-chatbot #simpli_card_cont .tick-icon').hide(0);
    }
});
var birthDate = $("#simpli_card_cont .my-date-picker #startDate");
var birthMonth = $("#simpli_card_cont .my-date-picker #startMonth");
var birthYear = $("#simpli_card_cont .my-date-picker #startYear");
var abc = $("#simpli_card_cont .my-date-picker .ui-selectmenu-text");
$('#simpli_card_cont input.login-simpli-input-otp').on('keyup keypress blur change load', function (e) {
    doCardFieldsValidations()
});
function doCardFieldsValidations() {
    if ($('#simpli_card_cont input.login-simpli-input-otp').val()
        && $('#simpli_card_cont input.login-simpli-input-otp').val().length == 6
        && parseInt(birthDate.val()) > 0 && parseInt(birthMonth.val()) > 0 && parseInt(birthYear.val()) > 0) {
        $('div.login-simpli-modal-chatbot #simpli_card_cont button.login').removeClass("inactive");
    } else {
        $('div.login-simpli-modal-chatbot #simpli_card_cont button.login').addClass("inactive");
    }
}
birthDate.on('change', function () {
    console.log(this.value);
});
// $("#simpli_card_cont").on('click', ".my-date-picker .ui-selectmenu-text,.my-date-picker #startDate-button,.my-date-picker #startMonth-button,.my-date-picker #startYear-button", function () {
//     // $('#simpli_card_cont .my-date-picker #startDate-button,#simpli_card_cont .my-date-picker #startMonth-button,#simpli_card_cont .my-date-picker #startYear-button').change(function() {
//     if (!$("#simpli_card_cont .my-date-picker #startDate-button").hasClass("date-label") && !$("#simpli_card_cont .my-date-picker #startMonth-button").hasClass("date-label") && !$("#simpli_card_cont .my-date-picker #startYear-button").hasClass("date-label")) {
//         $('div.login-simpli-modal-chatbot #simpli_card_cont button.login').removeClass("inactive");
//     } else {
//         $('div.login-simpli-modal-chatbot #simpli_card_cont button.login').addClass("inactive");
//     }
// });
$(function () {
    var availableBranchs = [
        "Cyber City, Gurgaon",
        "Sector 1, Gurgaon",
        "Sector 2, Gurgaon",
        "Sector 3, Gurgaon",
        "Sector 4, Gurgaon",
        "Sector 5, Gurgaon",
        "Sector 6, Gurgaon"
    ];
    var availableCities = [
        "Mumbai",
        "Delhi",
        "Jaipur",
        "Kerela",
        "Chandigarh",
        "Gurgaon"
    ];
    $("#neft-branch-chatbot").autocomplete({
        source: availableBranchs
    });
    $("#neft-city-chatbot").autocomplete({
        source: availableCities
    });
});

// handle newbankcard modal
$('body').on('click', '.chatbot__messages .ChatItem-chatText a.newbankcard-details', function () {
    $('div.new-bank-card-details-modal').show(0);
});
$('div.new-bank-card-details-modal .my-toggle img').click(function () {
    $('div.new-bank-card-details-modal').hide(0);
});
$('div.new-bank-card-details-modal .my-content button').click(function () {
    $('div.new-bank-card-details-modal').hide(0);
});

// handle send otp modal
$('body').on('click', '.chatbot__messages .ChatItem-chatText button.sendotp-chatbot', function () {
    $('div.sendotp-chatbot-modal').show(0);
});
$('div.sendotp-chatbot-modal .my-toggle img').click(function () {
    $('div.sendotp-chatbot-modal').hide(0);
});
$('div.sendotp-chatbot-modal .my-content button').click(function () {
    $('div.sendotp-chatbot-modal').hide(0);
});
// handle click on confirm address button
$('body').on('click', 'a.confirm-address', function () {
    var $this = $(this);
    validateMessage($this.attr('data-offer'));
});

// handle click on login/logout on chatbot header
$('.login-icon-chatbot,.login-chatbot,.logout-chatbot,.logout-icon-chatbot').on('click', function (e) {
    e.preventDefault();
    e.stopPropagation();
    return null; //temporarily set to null
});

$(".new-bank-card-details-modal .card-number-input").keyup(function () {
    if (this.value.length == this.maxLength) {
        $(this).next('.card-number-input').focus();
    }
});
$(".new-bank-card-details-modal .card-number-input").keyup(function (e) {
    if (e.keyCode == 8 && this.value.length == 0) {
        $(this).prev('.card-number-input').focus();
    }
});

// $(".chatbot-transactioncont .custom-checkbox input[type=checkbox]").change(function(e) {
//     e.preventDefault();
//     e.stopPropagation();
//     $(".chatbot-transactioncon input[type=text].amount-input").attr('disabled',!this.checked);
// });
$(document).on("change", ".transaction-option .custom-checkbox input[type='checkbox']", function () {
    $(this).closest("div").find("input").not(this).prop("readOnly", !this.checked);
});

$('input.live__chatbot__input').keyup(function () {
    if ($(this).val()) {
        $(this).siblings('span.send-icon').children().attr('src', activesendbtn);
    } else {
        $(this).siblings('span.send-icon').children().attr('src', sendbtn);
    }
});

/************* lead capture ************/

//Perosnal details
$('body').on('click', '.chatbot__messages .ChatItem-chatText #personal-detals-form', function () {
    $('div.my-personal-details-modal').show(0);
});
$('div.my-personal-details-modal .my-toggle img').click(function () {
    $('div.my-personal-details-modal').hide(0);
});
//contact details
$('body').on('click', '.chatbot__messages .ChatItem-chatText #contact-detals-form', function () {
    $('div.my-contact-details-modal').show(0);
});
$('div.my-contact-details-modal .my-toggle img').click(function () {
    $('div.my-contact-details-modal').hide(0);
});
//income details
$('body').on('click', '.chatbot__messages .ChatItem-chatText #income-detals-form', function () {
    $('div.my-income-details-modal').show(0);
});
$('div.my-income-details-modal .my-toggle img').click(function () {
    $('div.my-income-details-modal').hide(0);
});
//spend details
$('body').on('click', '.top3Spends #spend-details', function () {
    $('div.my-spend-details-modal').show(0);
});
$('div.my-spend-details-modal .my-toggle img').click(function () {
    $('div.my-spend-details-modal').hide(0);
});
//spend internal details
$('body').on('click', '#spend-details-internal p.amount', function () {
    $('div.my-spend-details-internal-modal').show(0);
});
$('div.my-spend-details-internal-modal .my-toggle img').click(function () {
    $('div.my-spend-details-internal-modal').hide(0);
});
// handle Residential details button and modal
$('body').on('click', '.chatbot__messages .ChatItem-chatText button.my-residential-details-button', function () {
    $('div.my-residential-details-modal').show(0);
});
$('div.my-residential-details-modal .my-toggle img').click(function () {
    $('div.my-residential-details-modal').hide(0);
});

//focus input boxes in transaction modals
$('.my-lead-model .set-limit-box input').focus(function(){
    $(this).parent().css('border-color' , '#009dd8')
});
$('.my-lead-model .set-limit-box input').blur(function(){
    $(this).parent().css('border-color' , '#b2b2b2')
});

var personalTitle = {
    width: 80,
    classes: {
        "ui-selectmenu-button": "date-label"
    },
    change: function (event, ui) {
        var val = ui.item.value;
        var id = $(this)[0].id;
        if (val === 'Please select') {
            $(`#${id}-button`).addClass('date-label');
        } else {
            $(`#${id}-button`).removeClass('date-label');
        }
    }
}
// activate dropdown 50% width
var otherDropdownshalf = {
    width: 190,
    classes: {
        "ui-selectmenu-button": "date-label"
    },
    change: function (event, ui) {
        var val = ui.item.value;
        var id = $(this)[0].id;
        if (val === 'Please select') {
            $(`#${id}-button`).addClass('date-label');
        } else {
            $(`#${id}-button`).removeClass('date-label');
        }
    }
};
$('#personal-title').selectmenu(personalTitle);
$('#nationality-title').selectmenu(otherDropdowns);
$('#source-income').selectmenu(otherDropdownshalf);
$('#annual-income').selectmenu(otherDropdownshalf);
// for the add-on-card modal
var leadCaptureAgeDate = $('#lead-age-date'),
    leadCaptureAgeMonth = $('#lead-age-month'),
    leadCaptureAgeYear = $('#lead-age-year');

leadCaptureAgeDate.append(datesString);
leadCaptureAgeMonth.append(monthsString);
leadCaptureAgeYear.append(yearsString);

leadCaptureAgeDate.selectmenu(twoDigitOptions);
leadCaptureAgeMonth.selectmenu(twoDigitOptions);
leadCaptureAgeYear.selectmenu(fourDigitOptions);

/*mobile number only*/
// Numeric only control handler
jQuery.fn.ForceNumericOnly =
    function () {
        return this.each(function () {
            $(this).keydown(function (e) {
                var key = e.charCode || e.keyCode || 0;
                // allow backspace, tab, delete, enter, arrows, numbers and keypad numbers ONLY
                // home, end, period, and numpad decimal
                return (
                    key == 8 ||
                    key == 9 ||
                    key == 13 ||
                    key == 46 ||
                    key == 110 ||
                    key == 190 ||
                    (key >= 35 && key <= 40) ||
                    (key >= 48 && key <= 57) ||
                    (key >= 96 && key <= 105));
            });
        });
    };
$(".login-simpli-input-mob,.login-simpli-input-otp,.login-simpli-input-atm,.login-simpli-input-card-num,.login-simpli-your-card-num").ForceNumericOnly();


$('.login-simpli-input-card-num,.login-simpli-your-card-num').keyup(function () {
    var v = $(this).val().replace(/\D/g, ''); // Remove non-numerics
    v = v.replace(/(\d{4})(?=\d)/g, '$1-'); // Add dashes every 4th digit
    $(this).val(v)
});
// var inputs = $('.my-form input').not(':submit');
// inputs.on('input', function() {
//     $(inputs[inputs.index(this) + 1]).toggleClass('button-inactive', this.value > '');
//   });

