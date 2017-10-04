// jQuery function
// Will wait for document to be ready before performing updates
$(document).ready(function(){

	var xhttp = new XMLHttpRequest();

	// Callback executed when a request is sent
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
		   // Action to be performed when the state is ready
		   document.getElementById("web-page-content").innerHTML = xhttp.responseText;
			 console.log("displayed");
		} else {
			// Fallback
			console.log("Error");
			console.log("Ready state: " + this.readyState);
			console.log("Status: " + this.status);
		}
	};

	// To call when a click is fired from our html
	// Take the filename as argument and send a GET request
	function loadWebPage(filename) {
		xhttp.open("GET", filename, true);
		xhttp.send();
	}

	// Listen for click events in our html
	// Assign loadWebPage callback to it with proper filename
	document.getElementById("general").addEventListener("click", () => loadWebPage('fs_general.php'));
  document.getElementById("reaction").addEventListener("click", () => loadWebPage('fs_reaction.php'));

});
