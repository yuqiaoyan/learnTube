$(document).ready(function() {
$.ajax('http://en.wikipedia.org/w/api.php?action=query&prop=revisions&titles=Threadless&rvprop=content&format=json&rvsection=0&rvparse=1', {
			success : wikiSuccess,
			error : ajaxError
		});

});

function wikiSuccess(data){
	var $p = $('<p>');
	$p.html(data);
	$('#page').append($p);
}

function ajaxError(jqxhr, type, error) {
var msg = "An Ajax error occurred!\n\n";
if (type == 'error') {
	if (jqxhr.readyState == 0) {
		// Request was never made - security block?
		msg += "Looks like the browser security-blocked the request.";
	} else {
		// Probably an HTTP error.
		msg += 'Error code: ' + jqxhr.status + "\n" + 
			   'Error text: ' + error + "\n" + 
			   'Full content of response: \n\n' + jqxhr.responseText;
	}
} else {
	msg += 'Error type: ' + type;
	if (error != "") {
		msg += "\nError text: " + error;
	}
}
alert(msg);
}