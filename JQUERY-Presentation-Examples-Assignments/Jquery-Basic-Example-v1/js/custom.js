$(document).ready(function(){

	/* Implement the accordion using jquery*/
	$("h4").click(function(){
		$(this).next().slideToggle();	
	});

	/* Write 5 to 6 paragraphs and one button in html. When user Click on button hide all paragraphs */
	$("#buttton-one").click(function(){
		$("p").hide();	
	});
	
	
	/* Implement hide and show concept in jquery */
	$("#hide").click(function(){
		$("p.panel-2-p").hide();	
	});
	
	$("#show").click(function(){
		$("p.panel-2-p").show();	
	});
	
	/* Add different background colors to the table odd and even rows using jquery */
	$("table tbody tr:even").css("background","#bbbbff");
	$("table tbody tr:odd").css({"color":"red","background":"yellow"});
	
	
	/* Use Jquery Add events (append, prepend, after, before) and create one example */
	$("#btn1").click(function(){
        $("p").prepend("<b>Prepended text</b>. ");
    });
	$("#btn2").click(function(){
        $("p").append("<b>Append text</b>. ");
    });
	$("#btn3").click(function(){
        $("ol li").after("<b>After text</b>. ");
    });
	$("#btn4").click(function(){
        $("ol li").before("<b>Before text</b>. ");
    });
	
	/* Write 6 paragraphs in html and use jquery selectors ADD different classes to the first paragraph, last paragraph and for the 5th paragraph add in-line css. */
	$(".sudo-classes p:first-child").css({"color":"red"});
	$(".sudo-classes p:last-child").css({"color":"orange"});
	$(".sudo-classes p:nth-child(5)").css({"color":"green"});
	
	/* Click on button animate DIV position from one location to other location. */
	$("#animation").click(function(){
		$("p.animate-txt").animate({left: "250px"});
	});
	
	/* Jquery tab concept pure code */
	$(".tabitem").click(function(){
		$(".tabitem").removeClass("tabactive");
		$(".tabexpand").hide();
		var content=$(this).addClass("tabactive").attr("id");
		$("."+content).show();
	});

	/* Tab concept Using Jquery UI */
	$("#accordion").accordion();
	
	/* $('#imageflow').jshowoff(); */
	
});