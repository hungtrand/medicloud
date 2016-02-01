var reserveCallback = function() {
	if (isNaN(parseInt(this.currentCallbackID))) this.currentCallbackID = -1;

	var nextCallbackID = this.currentCallbackID + 1;
	this[nextCallbackID] = { onSuccess: null, onFailure: null };
	this.currentCallbackID = nextCallbackID;

	return nextCallbackID;
}

var execCallback = function(callbackID, data, success) {
	if (!this.hasOwnProperty(callbackID)) {
		console.log("Error: callbackID " + callbackID + "does not exists in context.");
		console.log(this.author);
		return false;
	}

	var fn = this[callbackID];

	if (success) (fn.onSuccess || angular.noop)(data);
	else (fn.onFailure || angular.noop)(data);

	delete this[callbackID];
}

var setCallbacks = function(fnSuccess, fnFailure) {
	if (!this.hasOwnProperty('currentCallbackID')) {
		console.log('ERROR: Must call reserveCallback before being able to setCallbacks');
		console.log(this.author);
	}

	var callbackID = this.currentCallbackID;
	this[callbackID]['onSuccess'] = fnSuccess || null;
	this[callbackID]['onFailure'] = fnFailure || null;
}