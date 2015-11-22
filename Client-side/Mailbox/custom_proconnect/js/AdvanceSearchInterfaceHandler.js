var AdvanceSearchInterfaceHandler = (function(){
	var count = 0;

	function init() {
		$("#ao-main-box").on("click",function(e){ e.stopPropagation();}); //prevent closing on random click*/

		$(".ao-close").on("click",function(e){$("#ao-show-btn").trigger("click");}); //enable close button

		$(".main-nav-search-btn").on("click",function(){$(this).closest("form").trigger("submit");}); //manually trigger submit onclick

		$(".ao-add-option").keypress(function(e){    //handle adding options
			if(e.charCode === 13) {
				e.preventDefault();
				e.stopPropagation();
				var forID = "ao-id-" + count++;
				var optionName = $(this).val();
				var name = $(this).siblings(".dynamic-result-div").prop("id");

				var baseItem = document.getElementById("ao-checkbox").content.cloneNode(true);//stamping out template
				var checkBox = baseItem.querySelector("input[type=checkbox]");
				checkBox.value = optionName;
				checkBox.name = name;
				checkBox.id = forID;

				var textNode = document.createTextNode(" " + optionName);

				var label = baseItem.querySelector("label.ao-label");
				label.appendChild(textNode);
				label.htmlFor = forID;

				$(this).siblings(".dynamic-result-div").append(baseItem); //attach baseItem
				$(this).val("");			//clear out text field
			}	
		});
	}

	return {
		init: init
	}
})();