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

// --------------------------
// ADD
// --------------------------

const addUserBtnUI = document.getElementById("add-user-btn");
addUserBtnUI.addEventListener("click", addUserBtnClicked)

function addUserBtnClicked() {

	const usersRef = dbRef.child('akunpenipu');

	const addUserInputsUI = document.getElementsByClassName("user-input");

 	// this object will hold the new user information
    let newUser = {};

    // loop through View to get the data for the model
    for (let i = 0, len = addUserInputsUI.length; i < len; i++) {

        let key = addUserInputsUI[i].getAttribute('data-key');
        let value = addUserInputsUI[i].value;
        newUser[key] = value;
    }

	usersRef.push(newUser);
	

   document.forms['myform'].reset();
  document.getElementById("imel").focus();

}

// --------------------------
// DELETE
// --------------------------
function deleteButtonClicked(e) {

		e.stopPropagation();

		var userID = e.target.getAttribute("userid");

		const userRef = dbRef.child('akunpenipu/' + userID);

		userRef.remove();

}

// --------------------------
// EDIT
// --------------------------
function editButtonClicked(e) {

	document.getElementById('add-user-module').style.display = "block";

	//set user id to the hidden input field
	document.querySelector(".edit-userid").value = e.target.getAttribute("userid");

	const userRef = dbRef.child('akunpenipu/' + e.target.getAttribute("userid"));

	// set data to the user field
	const editUserInputsUI = document.querySelectorAll(".user-input");


	userRef.on("value", snap => {

		for(var i = 0, len = editUserInputsUI.length; i < len; i++) {

			var key = editUserInputsUI[i].getAttribute("data-key");
					editUserInputsUI[i].value = snap.val()[key];
		}

	});
	const saveBtn = document.querySelector("#update");
	saveBtn.addEventListener("click", saveUserBtnClicked)

	document.getElementById("update").style.visibility = "visible";
  document.getElementById("add-user-btn").style.visibility = "hidden";
	// document.getElementById("add-user-btn").hidden = true;
	// document.getElementById("update").hidden = false;
	document.getElementById("imel").focus();

}


function saveUserBtnClicked(e) {

	const userID = document.querySelector(".edit-userid").value;
	const userRef = dbRef.child('akunpenipu/' + userID);

	var editedUserObject = {}

	const editUserInputsUI = document.querySelectorAll(".user-input");

	editUserInputsUI.forEach(function(textField) {
		let key = textField.getAttribute("data-key");
		let value = textField.value;
  		editedUserObject[textField.getAttribute("data-key")] = textField.value
	});
	userRef.update(editedUserObject);

	document.getElementById('add-user-module').style.display = "";

 document.forms['myform'].reset();
  document.getElementById("imel").focus();
  document.getElementById("update").style.visibility = "hidden";
  document.getElementById("add-user-btn").style.visibility = "visible";
  // document.getElementById("add-user-btn").hidden = false;
// document.getElementById("update").hidden = true;
}
