
$(document).ready(function () {

/* Display current Date start */
    var currentTime = new Date()

    var month = currentTime.getMonth() + 1
    var day = currentTime.getDate()
    var year = currentTime.getFullYear()

    var h = currentTime.getHours();
    var m = currentTime.getMinutes();
    var s = currentTime.getSeconds();
    // document.write(h + ":" + m + ":" + s + "</br>")

    $('#todaydate').text(month + "/" + day + "/" + year);
/*Display current Date end */

});



$(document).ready(function () {

 /*tabs with normal jquery code strat*/
    $("#link1").click(function () { $("#content1").show(); $("#content2").hide(); $("#content3").hide(); $("#content4").hide(); });
    $("#link2").click(function () { $("#content1").hide(); $("#content2").show(); $("#content3").hide(); $("#content4").hide(); });
    $("#link3").click(function () { $("#content1").hide(); $("#content2").hide(); $("#content3").show(); $("#content4").hide(); });
    $("#link4").click(function () { $("#content1").hide(); $("#content2").hide(); $("#content3").hide(); $("#content4").show(); });

    $("#showme").click(function () { $("#pavan").show(); });
    $("#hideme").click(function () { $("#pavan").hide(); });

    $('.tab li').hover(function () {
        $(this).addClass('hover');
    },
function () {
    $(this).removeClass('hover');
});


    $('.tab li a').click(function () {
        $('.tab li').removeClass('active');
        $(this).parent().addClass('active');
    });
    /*tabs with normal jquery code end*/

});



/*tabs jquery using switch condition  start*/
$(document).ready(function () {

    $("a", '.tab2').click(function (e) {

        var MyVar = $(this).attr('id');

        $("#f1content").hide(); $("#f2content").hide(); $("#f3content").hide(); $("#f4content").hide();

        switch (MyVar) {

            case 'f1': $("#" + MyVar + "content").show(); break;
            case 'f2': $("#" + MyVar + "content").show(); break;
            case 'f3': $("#" + MyVar + "content").show(); break;
            case 'f4': $("#" + MyVar + "content").show(); break;
        }

    });

});
/*tabs jquery using switch condition end*/


$(document).ready(function(){

/* Form Validation for credit card, phone, email, url, phoneUS start */
jQuery.validator.addMethod("phoneUS", function (phone_number, element) {
    phone_number = phone_number.replace(/\s+/g, "");
    return this.optional(element) || phone_number.length > 9 &&
		phone_number.match(/^(1-?)?(\([2-9]\d{2}\)|[2-9]\d{2})-?[2-9]\d{2}-?\d{4}$/);
}, "Please specify a valid phone number");

$("#myform").validate({

    rules: {
        phone: {
            required: true,
            minlength: 9,
            number: true
        }
    }
});
/* Form Validation for credit card, phone, email, url, phoneUS end */

});


$(document).ready(function () {

   /*Drop Down issue in IE8 rectified using Jquery start*/
    if ($.browser.msie && parseInt($.browser.version) <= 8) $('select.expandDrpn')
                    .bind('focus mouseover', function () { $(this).addClass('expand').removeClass('chkstatus'); })
                    .bind('click', function () { $(this).toggleClass('chkstatus'); })
                    .bind('mouseout', function () { if (!$(this).hasClass('chkstatus')) { $(this).removeClass('expand'); } })
                    .bind('change', function () { $(this).removeClass('expand chkstatus'); })
                    .bind('blur', function () { $(this).removeClass('expand chkstatus'); })
                  
    /*Drop Down issue in IE8 rectified using Jquery end*/


});



$(document).ready(function () {

/*Hide show tab start*/
    $('#dtlscont').click(function () {
        $('#branchinfo').toggle();
        $('#viewde').text('hide details');
    });
/*Hide show tab end*/

});


$(document).ready(function () {

/* Adding two numbers results should be in appear in thrid field start */
    $('#input1, #input2').change(function () {

        var input1 = 0;
        var input2 = 0;
        var result = 0;
        if ($('#input1').val() != null && $('#input1').val() != "") {
            input1 = parseInt($('#input1').val());
        }
        if ($('#input2').val() != null && $('#input2').val() != "") {
            input2 = parseInt($('#input2').val());
        }

        result = input1 + input2;

        $('#result').val(result);

        //$('#result').text(result);

    });
    /* Adding two numbers results should be in appear in thrid field end */

});


$(document).ready(function () {

/* accordion menu custom example start */
    $('a#se1').click(function () {
        $('#se1c').show();
        $('#se2c').hide();
    });

    $('a#se2').click(function () {
        $('#se1c').hide();
        $('#se2c').show();
    });
/* accordion menu custom example end */

});


$(document).ready(function () {
/* accordion menu download examples start*/
    $("#firstpane p.menu_head").click(function () {
        $(this).addClass('downpng').next("div.menu_body").slideToggle(0).siblings("div.menu_body").hide();
        $(this).siblings().addClass('leftpng');
    });


    $("#secondpane p.menu_head").mouseover(function () {
        $(this).addClass('downpng').next("div.menu_body").slideDown(500).siblings("div.menu_body").slideUp("slow");
        $(this).siblings().addClass('leftpng');

    });
  /* accordion menu download examples end */

});


$(document).ready(function(){

/* Popup Window jquery start*/
    $('.example1demo').popupWindow({
        height: 500,
        width: 800,
        top: 50,
        left: 50
    });

/* Popup Window jquery end*/
});





$(document).ready(function () {

/* Zoom in Zoom Out jquery start*/
$(function () {
        $('.wrap img').toggle(function () {
            var $this = $(this);
            $this.stop().animate({
            'opacity':'0.5',
            'height':'100px',
          
            });
        },
     
        function () {
            var $this = $(this);
            $this.stop().animate({
                'opacity': '1.5',
                'height': '50',
                
            });

        }
    );

    });
    /* Zoom in Zoom Out jquery end*/

});



$(document).ready(function(){

    /*fancy box popup window start*/
    $("a#fancypop").fancybox({
				'width'				: '75%',
				'height'			: '75%',
				'autoScale'			: false,
				'transitionIn'		: 'none',
				'transitionOut'		: 'none',
				'type'				: 'iframe'
			});
     /*fancy box popup window end*/

     });




$(document).ready(function () {
   
   /* Custom form validation start */
    $("#Submit").click(function () {

        var firstName = $("#name").val();
        var address = $("#address").val();
        var phone = $("#phone").val();
        var query = $("#query").val();
        var msgerror = "";

        if (firstName == "") {

            msgerror += "please enter name";
            $("#name").focus();
            $("#name").addClass("error");
            $("#namerror").text(msgerror);

        }

        else {
            $("#name").removeClass("error");
            $("#namerror").remove();

        }

        if (address == "") {

            msgerror += "please enter address";
            $('#address').focus();
            $("#address").addClass("error");
            $("#adderror").text(msgerror);

        }
        else {
            $("#address").removeClass("error");
        }

        $("input").focus(function () {
            $(this).next("span").css('display', 'inline').fadeOut(1000);
        });


    });
    /*Custom Form validation end*/

});

$(document).ready(function(){

$('#imageflow').jshowoff();

});
