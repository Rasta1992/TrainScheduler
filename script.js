
// Firebase Config // 
var config = {
	apiKey: "AIzaSyDSXvdCZxc6AmwcPfHnRc0Z69sxin81Bhk",
	authDomain: "trainscheduler-e4742.firebaseapp.com",
	databaseURL: "https://trainscheduler-e4742.firebaseio.com",
	projectId: "trainscheduler-e4742",
	storageBucket: "trainscheduler-e4742.appspot.com",
	messagingSenderId: "404104950498"
};

// Initialize Firebase //
firebase.initializeApp(config);


// FirebaseDB Reference //
var database = firebase.database();
console.log("database loaded");
$("#btn-submit").on("click", function() {
console.log("Ive been clicked");
// Train Variables //
var trainName = $("#train-name").val().trim();
var destination = $("#destination-name").val().trim();
var firstTrain = moment($("#train-time").val().trim(),"HH:mm").subtract(10, "years").format("X");
var frequency = $("#frequency").val().trim();

 var newTrain = {
 	name: trainName,
 	destination: destination,
 	firstTrain: firstTrain,
 	frequency: frequency
 } 

database.ref().push(newTrain);
alert("Train Added!!!");

$("#train-name").val("");
$("#destination-name").val("");
$("#train-time").val("");
$("#frequency").val("");

return false;

})




// Update Table on start up //
database.ref().on('child_added', function(snapshot){
	var name = snapshot.val().name;
	var destination = snapshot.val().destination;
	var firstTrain = snapshot.val().firstTrain;
	var frequency = snapshot.val().frequency;


	var remainder = moment().diff(moment.unix(firstTrain),"minutes")%frequency;
	var minutes = frequency - remainder;
	var arrival = moment().add(minutes,"m").format("hh:mm A");
	
	console.log(remainder);
	console.log(minutes);
	console.log(arrival);

$("#trainTable > tBody").addClass("text-center").append("<tr><td>"+name+"</td><td>"+destination+"</td><td>"+frequency+"</td><td>"+arrival+"</td><td>"+minutes+"</td></tr>");



});
