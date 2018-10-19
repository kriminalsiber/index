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
const usersRef = dbRef.child('penipuan');


	readUserData();

// --------------------------
// READ
// --------------------------
function readUserData() {

	const userListUI = document.getElementById("table_body");

	usersRef.orderByChild("nomor").on("value", snap => {

		userListUI.innerHTML = ""

		snap.forEach(childSnap => {

	var timee = snap.child("timee").val();
	var nomor = snap.child("nomor").val();
	var rekening = snap.child("rekening").val();
	var bank = snap.child("bank").val();
	var nama = snap.child("nama").val();
	var kasus = snap.child("kasus").val();
	var link = snap.child("link").val();

			let key = childSnap.key,
				value = childSnap.val()
			let $li = document.createElement("tr");

			

			$li.innerHTML = ( "<tr><td role='cell'>" + value.nomor + "</td role='cell'><td>" + value.rekening + "</td><td role='cell'>" + value.bank + "</td><td role='cell'>" + value.nama + "</td><td role='cell'>" + value.kasus + "</td><td role='cell' class='batasan'><a href="+ value.link +" class='mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent''>Kronologi</td></tr>");
			

			$li.setAttribute("user-key", key);
			$li.addEventListener("click", userClicked)
			userListUI.append($li);

 		});


	})
	
}

function userClicked(e) {


		var userID = e.target.getAttribute("user-key");

		const userRef = dbRef.child('penipuan/' + userID);
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

// --------------------------
// ADD
// --------------------------


