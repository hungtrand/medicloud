var counter = 0;
var totalMessages = 0;

function Messages(data,form) {
	this.container;
	this.btnSend;
	this.btnArchive;
	this.btnRecover;
	this.btnRemove;
	this.ConnTemplate;
	this.totalMsg;
	this.form = form;
	this.data;
	this.init(data);
	this.Alert = $('#MessageListEndAlert');
}

Messages.prototype = {
	constructor: this,

	init: function(data) {
		counter++;
		if(counter > 8) {
			counter = 0;
		}
		var that = this;
		that.data = data;
		that.ConnTemplate = $('#sender-message-content').html();

		var conn = $(that.ConnTemplate);
		conn.find('.messageID').val(data['messageID']);
		conn.find('.sender-picture').attr("src", data['sender-picture']);
		conn.find('.sender-name').text(data['sender-name']);
		conn.find('.sender-href').attr("href", data['sender-href']);
		conn.find('.message-subject').text(data['message-subject']);
		conn.find('.message-time').text(data['message-time']);
		conn.find('.sender-message').text(data['sender-message']);
		totalMessages = data['total-messages'];

		switch(that.form) {
			case "Inbox":
				conn.find("#footers ol").append('<li role="presentation"><a href="#" class="message-friend"><span class="glyphicon glyphicon-envelope"></span>&nbsp;Reply</a></li>');
				conn.find("#footers ol").append('<li role="presentation"><a href="#" class="archive-message"><span class="glyphicon glyphicon-folder-open"></span>&nbsp;&nbsp;Archive</a></li>');
				conn.find("#footers ol").append('<li role="presentation"><a href="#" class="remove-mail" ><span class="glyphicon glyphicon-trash"></span>&nbsp;Trash</a></li>');
			break;
			case "Outbox":
				conn.find("#footers ol").append('<li role="presentation"><a href="#" class="remove-mail" ><span class="glyphicon glyphicon-trash"></span>&nbsp;Trash</a></li>');
			break;
			case "Archive":
				conn.find("#footers ol").append('<li role="presentation"><a href="#" class="recover-message"><span class="glyphicon glyphicon-transfer"></span>&nbsp;&nbsp;Recover</a></li>');
				conn.find("#footers ol").append('<li role="presentation"><a href="#" class="remove-mail" ><span class="glyphicon glyphicon-trash"></span>&nbsp;Trash</a></li>');
			break;
			case "Trash":
				$("#remove-trash").show();
				conn.find("#footers ol").append('<li role="presentation"><a href="#" class="recover-message"><span class="glyphicon glyphicon-transfer"></span>&nbsp;&nbsp;Recover</a></li>');
				//conn.find("#footers ol").append('<li role="presentation"><a href="#" class="remove-mail" ><span class="glyphicon glyphicon-trash"></span>&nbsp;Trash</a></li>');
			break;
			case "SearchedBox":
				conn.find("#footers ol").append('<li role="presentation"><a href="#" class="message-friend"><span class="glyphicon glyphicon-envelope"></span>&nbsp;Reply</a></li>');
				conn.find("#footers ol").append('<li role="presentation"><a href="#" class="archive-message"><span class="glyphicon glyphicon-folder-open"></span>&nbsp;&nbsp;Archive</a></li>');
				conn.find("#footers ol").append('<li role="presentation"><a href="#" class="remove-mail" ><span class="glyphicon glyphicon-trash"></span>&nbsp;Trash</a></li>');
			default:
			break;
		}

		that.container = conn;

		$('article').readmore({
			speed: 600
		});

		that.btnSend = that.container.find('.message-friend');
		that.btnSend.on('click', function(ev) {
			ev.preventDefault();
			that.send();
		});
		that.btnArchive = that.container.find('.archive-message');
		that.btnArchive.on('click', function(ev) {
			ev.preventDefault();
			that.archive( function(returnedData) {
				that.confirmRemove(returnedData);
			});
		});
		that.btnRecover = that.container.find('.recover-message');
		that.btnRecover.on('click', function(ev) {
			ev.preventDefault();
			that.recover( function(returnedData) {
				that.confirmRemove(returnedData);
			});
		});
		that.btnRemove = that.container.find('.remove-mail');
		that.btnRemove.on('click', function(ev) {
			ev.preventDefault();
			that.remove( function(returnedData) {
				that.confirmRemove(returnedData);
			});
		});
	},

	send: function() {
		var that = this;
		$(".message-frame-display").empty();
		$("#message-nav-footer").remove();
		var value = $(that).attr("value");
		var textbox = $("#message-textfield").html();
		$(".message-frame-name").text(value);
		$(".message-frame-display").append(textbox);
		$("#recipient-textarea").val(that.data['sender-name']);
		$("#userID").val(that.data['sender-ID']);
		$("#recipient-subject-textarea").val("RE:"+that.data['message-subject']);
		$('html,body').animate({
	   		scrollTop: $("#message-div").offset().top - 1000
	   	});
		var userTypeahead = new typeahead();
	   	var sendMessage = new NewMessage(textbox);
	},

	remove: function(returnedData) {
		var that = this;
		var data = {
			'messageID': this.data['messageID'],
			'action': 'delete'
		};

		$.ajax({
			url: 'php/MailActions_controller.php',
			data: data,
			type: 'POST'
		}).done(function(json) {
			try {
				json = $.parseJSON(json);
				returnedData(json);
			} catch (ev) {
				that.failRemove(json);
			}
		}).fail(function(ev) {
			that.failRemove();
		});
	},

	recover: function(returnedData) {
		var that = this;
		var data = {
			'action': 'recover',
			'messageID': this.data['messageID']
		}

		$.ajax({
			url: 'php/MailActions_controller.php',
			data: data,
			type: 'POST'
		}).done(function(json) {
			console.log(json);
			try {
				json = $.parseJSON(json);
				returnedData(json);
			} catch (ev) {
				that.failRemove(json);
			}
		}).fail(function(ev) {
			that.failRemove();
		});
	},

	archive: function(returnedData) {
		var that = this;
		var data = {
			'messageID': this.data['messageID'],
			'action': 'archive'
		}

		$.ajax({
			url: 'php/MailActions_controller.php',
			data: data,
			type: 'POST'
		}).done(function(json) {
			try {
				json = $.parseJSON(json);
				returnedData(json);
			} catch (ev) {
				that.failRemove(json);
			}
		}).fail(function(ev) {
			that.failRemove();
		});
	},

	confirmRemove: function(json) {
		var that = this;

		setTimeout(function() {
			that.container.fadeOut('800', function() {
				$(this).remove();
				that.showAlert("Successfully moved the message", 'success');
			})
		}, 200);

	},

	failRemove: function() {
		var that = this;
		that.showAlert("Message was not removed successfully", 'danger');
	},

	getView: function() {
		var that = this;
		return that.container;
	},

	showAlert: function(msg, type) {
		var that = this;
		that.Alert.html(msg);
		switch(type) {
			case 'success':
				that.Alert.attr('class', 'alert alert-success').slideDown();
			break;
			case 'danger':
				that.Alert.attr('class', 'alert alert-danger').slideDown();
			default:
				that.Alert.attr('class', 'alert alert-info').slideDown();
				
		}

		$(document).one('click', function() {
			setTimeout(function() {
				that.Alert.attr('class', 'alert alert-info').fadeOut(1000);
			}, 2000);
		});
		
	}
}