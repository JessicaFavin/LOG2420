$(document).ready(function(){

	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
		   // Typical action to be performed when the document is ready:
		   document.getElementById("web-page-content").innerHTML = xhttp.responseText;
			 console.log("displayed");
		}else {
			console.log("err");
			console.log(this.readyState);
			console.log(this.status);
		}
	};

	function loadWebPage(filename) {
		xhttp.open("GET", filename, true);
		xhttp.send();
	}
	
	document.getElementById("general").addEventListener("click", () => loadWebPage('fs_general.php'));
  document.getElementById("reaction").addEventListener("click", () => loadWebPage('fs_reaction.php'));
});
