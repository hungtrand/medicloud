function typeahead() {
	this.userObjs;
	this.userNames;
	this.init()
}

typeahead.prototype = {
	constructor: typeahead,

	init: function() {
		this.fetch();
	},

	fetch: function() {
		var that = this;
		var userObjs = {};
		var userNames = [];
		var throttledRequest = _.debounce(function(query, process){
		$.ajax({
			url: '../../connections/php/Connections_controller.php',
			data: {'keywords':query},
			type: 'POST',
			contentType: 'text/plain'
		}).done(function(json) {
			try {
				json = $.parseJSON(json);
				userObjs = {};
				userNames = [];
				_.each( json, function(item, ix, list){
					userNames.push( item['Name'] );
					userObjs[ item['Name'] ] = item;
					process( userNames );	
				});
			} catch (ev) {
				console.log(json);
				console.log(ev);
			}
			});
		}, 750);


		$(".typeahead").typeahead({
			source: function ( query, process ) {
				throttledRequest( query, process );
			},

			highlighter: function( item ){
          		var user = userObjs[ item ];
          		var ProfileImage = '/image/user_img.png';
          		if (user['ProfileImage']) ProfileImage = user['ProfileImage'];
          		var suggestElement = '<div class="user" style="padding: 5px;">'+'<img src="'+ProfileImage+'"/>';
          		suggestElement += '<strong>'+user['Name']+'</strong><br /><em>&nbsp;'+user['JobTitle']+'&nbsp;</em></div>';
          		return suggestElement;
        	}, 
        	updater: function ( selectedName ) {
        		if ($('#userID').val() == '')
        			$("#userID").val(userObjs[selectedName].UserID);
        		else {
        			var newVal = $('#userID').val() + ', ' + userObjs[selectedName].UserID;
        			$('#userID').val(newVal);
        		}

        		var recip = $('<label class="label recipient">'+selectedName+'&nbsp;<a href="#"><span class="glyphicon glyphicon-remove"></span></a></label>');
        		recip.find('a').on('click', function(e) { 
        			e.preventDefault();
        			var ids = $('#userID').val();
        			ids = ids.split(', ');
        			for (var i=0, l = ids.length; i < l; i++) {
        				if (ids[i] == userObjs[selectedName].UserID) {
        					ids.splice(i, 1);
        				}
        			}

        			ids = ids.join(', ');
        			$('#userID').val(ids);
        			$(this).parent('label').remove();
        			if (ids.trim().length == 0) $('#recipients').parent().toggleClass('hidden', true);
        		});
        		$('#recipients').append(recip, '&nbsp;');
        		$('#recipients').parent().toggleClass('hidden', false);
				// $( "#userID" ).val( userObjs[ selectedName ].id );
				// console.log($( "#userID" ).val( userObjs[ selectedName ] ));
				// console.log($("#userID").attr("value"));
					return '';
				}
			});
	}
}