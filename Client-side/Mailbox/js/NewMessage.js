function NewMessage(container) {
	this.container = container;
	this.user;
	this.userID;
	this.subject;
	this.bodyContent;
	this.sendBtn;
	this.cancelBtn;
	this.init();
}

NewMessage.prototype = {
	constructor: NewMessage,

	init: function() {
		var that = this;
		
		$('#MessageListEndAlert').toggleClass('hidden', true).html('');
		that.sendBtn = $(".send-btn");

		that.sendBtn.on('click', function(ev) {
			ev.preventDefault();
			if($("#userID").val().length===0) {
				alert("Cannot send message, no recipients selected");
			} else if($("#summary-textarea").val().length===0) {
				alert("Cannot send message, the message body is empty");
			} else {
				that.user = $("#recipient-textarea").val();
				that.userID = $("#userID").val();
				that.subject = $("#recipient-subject-textarea").val();
				that.bodyContent =$("#summary-textarea").val();

				$("#loading-sent").show();
				that.sendMsg( function(callback) {
					that.confirmSent(callback);
				});				
			}
		});

		that.cancelBtn = $(".cancel-btn");
		that.cancelBtn.on('click', function(ev) {
			ev.preventDefault();
			that.cancelMsg();
		})
	},

	sendMsg: function(callback) {
		var that = this;
		var data={action: 'send', UserID: this.userID, Subject: this.subject, Message: this.bodyContent};
		$.ajax({
			url: 'php/MailActions_controller.php',
			data: data,
			type: 'POST'
		}).done(function(json) {
			try {
				json = $.parseJSON(json);
				callback(json);
			} catch (ev) {
				console.log(json);
			}
		}).fail(function(ev) {
			console.log(ev);
		});
	},

	confirmSent: function(json) {
		var that = this;
		$('#MessageListEndAlert').toggleClass('alert-success', true).toggleClass('alert-info', false);;
		$('#MessageListEndAlert').html('Message sent.');
		setTimeout(function() {
			$(that.container).fadeOut('800', function() {
				$('#loading-sent').toggleClass('alert-success', false).toggleClass('alert-info', true);
				$("#loading-sent").hide();
				that.cancelBtn.trigger('click');
			})
		}, 1500);
	},

	cancelMsg: function() {
		$("#message-frame-display").empty();
		var iniMessages = new LoadMessages($('.message-frame-display'), "Inbox", 1);
		iniMessages.load()
	}
}