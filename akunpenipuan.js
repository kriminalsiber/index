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
	var link = snap.child("link").val();
	var idakun = snap.child("idakun").val();
	var kasus = snap.child("kasus").val();
	var idakun = snap.child("kronologi").val();

			let key = childSnap.key,
				value = childSnap.val()
			let $li = document.createElement("tr");

			// edit icon
			let editIconUI = document.createElement("td");
			editIconUI.class = "hapoes";
			editIconUI.innerHTML = " ✎";
			editIconUI.setAttribute("userid", key);
			editIconUI.addEventListener("click", editButtonClicked)

			// delete icon
			let deleteIconUI = document.createElement("td");
			deleteIconUI.class = "hapoes";
			deleteIconUI.innerHTML = " ✘";
			deleteIconUI.setAttribute("userid", key);
			deleteIconUI.addEventListener("click", deleteButtonClicked)

			$li.innerHTML = ( "<tr><td>" + value.nomor + "</td><td>" + value.nama + "</td><td class='batasan'><a href="+ value.link +">" + value.link + "</td><td>" + value.kasus + "</td><td>" + value.kronologi + "</td><td>" + value.idakun + "</td></tr>");
			$li.append(editIconUI);
			$li.append(deleteIconUI);

			$li.setAttribute("user-key", key);
			$li.addEventListener("click", userClicked)
			userListUI.append($li);

 		});


	})
	// document.getElementById("update").hidden = true;
	 document.getElementById("update").style.visibility = "hidden";
	 document.getElementById("imel").focus();



}
