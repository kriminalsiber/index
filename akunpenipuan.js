var config = {
    apiKey: "AIzaSyD5b30j_XRxmKE6KNBRoR3ObEqUaFLjZ4E",
    authDomain: "kriminal-siber.firebaseapp.com",
    databaseURL: "https://kriminal-siber.firebaseio.com",
    projectId: "kriminal-siber",
    storageBucket: "kriminal-siber.appspot.com",
    messagingSenderId: "919734031920"
  };
  firebase.initializeApp(config);

// Firebase Database Reference and the child
const dbRef = firebase.database().ref();
const usersRef = dbRef.child('akunpenipu');


	readUserData();

// --------------------------
// READ
// --------------------------
function readUserData() {

	const userListUI = document.getElementById("table_body");

	usersRef.orderByChild("nomor").on("value", snap => {

		userListUI.innerHTML = ""

		snap.forEach(childSnap => {

	var nomor = snap.child("nomor").val();
	var nama = snap.child("nama").val();
	var namaakun = snap.child("namaakun").val();
	var link = snap.child("link").val();
	var kasus = snap.child("kasus").val();
	var idakun = snap.child("kronologi").val();
	var platform = snap.child("platform").val();


			let key = childSnap.key,
				value = childSnap.val()
			let $li = document.createElement("tr");

			

			$li.innerHTML = ( "<tr><td>" + value.nomor + "</td><td>" + value.nama + "</td><td class='batasan'><a href="+ value.link +">" + value.namaakun + "</td><td>" + value.platform + "</td><td>" + value.kasus + "</td><td role='cell' class='batasan'><a href="+ value.kronologi +" class='mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent''>Kronologi</tr>");
			

			$li.setAttribute("user-key", key);
			$li.addEventListener("click", userClicked)
			userListUI.append($li);

 		});


	})
	
}

function userClicked(e) {


		var userID = e.target.getAttribute("user-key");

		const userRef = dbRef.child('akunpenipu/' + userID);
		const userDetailUI = document.getElementById("MainDiv");

		userRef.on("value", snap => {

			userDetailUI.innerHTML = ""

			snap.forEach(childSnap => {
				var $p = document.createElement("p");
				$p.innerHTML = childSnap.key  + " - " +  childSnap.val();
				userDetailUI.append($p);
			})

		});

 
}
