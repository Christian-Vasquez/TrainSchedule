
  var config = {
    apiKey: "AIzaSyB0UKz5kdqo3mbS9EgqDutzUY76SzNuB9o",
    authDomain: "chris-claswork.firebaseapp.com",
    databaseURL: "https://chris-claswork.firebaseio.com",
    projectId: "chris-claswork",
    storageBucket: "chris-claswork.appspot.com",
    messagingSenderId: "627913910654"
  };

firebase.initializeApp(config);

var database = firebase.database();


$("#add-train-btn").on("click", function(event) {
  event.preventDefault();


  var trainName = $("#train-name-input").val().trim();
  var trainDest = $("#destination-input").val().trim();
  var trainStart = moment($("#start-input").val().trim(), "HH:mm").format("X");
  var freqIn = moment($("#start-input").val().trim(), "mm").format("X");
  var arrivaltime = trainStart;
  var trAway = 0;
  var current = moment().format("X");

   while (moment(arrivaltime, "X").isBefore(moment(current, "X"))) {
    arrivaltime = moment(arrivaltime, "X").add(freqIn).format("X");
  }

  trAway = moment().diff(moment(arrivaltime, "X"), "minutes") * (-1);
  trAway = moment(trAway,"X").format("mm");
  arrivaltime = moment(arrivaltime,"x").format("HH:mm");


  var newTrain = {
    name: trainName,
    dest: trainDest,
    start: trainStart,
    freq: freqIn,
    away: trAway,
    arrival: arrivaltime
  };

  database.ref().push(newTrain);


  console.log(newTrain.name);
  console.log(newTrain.dest);
  console.log(newTrain.start);
  console.log(newTrain.freq);
  console.log(newTrain.away);
  console.log(newTrain.arrival);


  alert("Employee successfully added");


  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#start-input").val("");
  $("#freq-input").val("");


  return false;
});


database.ref().on("child_added", function(childSnapshot, prevChildKey) {

  console.log(childSnapshot.val());

  var trainName = childSnapshot.val().name;
  var trainDest = childSnapshot.val().dest;
  var trainStart = childSnapshot.val().start;
  var freqIn = moment(childSnapshot.val().freq, "X").format("HH:mm");
  var trAway = childSnapshot.val().away;
  var arrivaltime = childSnapshot.val().arrival;



  console.log(trainName);
  console.log(trainDest);
  console.log(trainStart);
  console.log(freqIn);

  $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDest + "</td><td>" +
  freqIn + "</td><td>" + arrivaltime + "</td><td>" + trAway + "</td></tr>");
});