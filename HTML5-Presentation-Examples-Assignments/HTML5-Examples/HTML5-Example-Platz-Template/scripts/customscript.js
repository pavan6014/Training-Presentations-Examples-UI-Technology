$(document).ready(function(){
      $('#imageflow').jshowoff();

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

$(document).ready(function () {
				$('#menu').tabify();
				$('#menu2').tabify();
			});

