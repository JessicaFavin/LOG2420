//let path = 'http://localhoast:5000/'

$(document).ready(function(){

	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
		   // Typical action to be performed when the document is ready:
		   document.getElementById("web-page-content").innerHTML = xhttp.responseText;
		}else {
			console.log("err");
			console.log(this.readyState);
			console.log(this.status);
		}
	};

	var loadWebPage = function(filename) {
		xhttp.open("GET", filename, true);
		xhttp.send();
	}
	
	var changeText = function(){
		$("test").text("Test");
		console.log("heho");
	}

	$("general").click(changeText);
	$("reaction").click(loadWebPage('fs_reaction.php'));
});


