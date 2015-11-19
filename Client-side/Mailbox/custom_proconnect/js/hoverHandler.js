$(document).ready(function() {
var md = 768;
		$("#message").hover(function(){
			if(window.outerWidth >= md) {
			$("#message-menu").attr("aria-expanded","true");
			$("#message").addClass("open");
			}
		},function(){
			$("#message-menu").attr("aria-expanded","false");
			$("#message").removeClass("open");
		});
		$("#notification").hover(function(){
			if(window.outerWidth >= md) {
			$("#notification-menu").attr("aria-expanded","true");
			$("#notification").addClass("open");
			}
		},function(){
			$("#notification-menu").attr("aria-expanded","false");
			$("#notification").removeClass("open");
		});
		$("#connection").hover(function(){
			if(window.outerWidth >= md) {
			$("#connection-menu").attr("aria-expanded","true");
			$("#connection").addClass("open");
			}
		},function(){
			$("#connection-menu").attr("aria-expanded","false");
			$("#connection").removeClass("open");
		});
		$("#caret").hover(function(){
			$("#caret-menu").attr("aria-expanded","true");
			$("#caret").addClass("open");
		},function(){
			$("#caret-menu").attr("aria-expanded","false");
			$("#caret").removeClass("open");
		});
	
});
