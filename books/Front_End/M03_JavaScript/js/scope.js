// TODO: Declare variable 'shout' with the value 'Shout' so it's available to `justShout` and `shoutItAllOut` functions
var shout = 'Shout';

function justShout() {
  console.log(shout + ', ' + shout);
  return;
}

function shoutItAllOut() {
  console.log(shout + ' it all out! ');
  return;
}

justShout();
shoutItAllOut();

// TODO: Declare variable 'animal' with the value 'Tigers' so it is only available to the 'sayTigers' function
var animal = "Tigers";

function sayLions() {
  var animal = 'Lions';
  console.log(animal);
  return;
}

function sayTigers() {
  console.log('and ' + animal + ' and ');
  return;
}

// TODO: The variable 'bears' should only declared once and 'sayBears' should return "Bears! OH MY!".
var bears = 'Bears';

function sayBears() {
  var bears = 'Pandas';
  console.log(bears + '! OH MY!');
  return;
}

sayLions();
sayTigers();
sayBears();

// TODO: The variable 'sing' should be declared once in the local scope.
var sing = 'Sing';

function singAlong() {
  console.log(sing + ',');
  var singASong = function() {
    console.log(sing + ' a Song.');
  };
  singASong();
}

singAlong();




var shout = 'good vibes';
function justShout(){
  console.log(shout + ',' + shout + '.');
  return;
}
justShout();



// Lexical Scope
function getName(){
  const myName = "Berry";
  return myName;
}


function showlastName(){
  const lastName = "K";
  return lastName;
}
function displayFullName(){
  const FullName = "Berry" + showlastName();
  return FullName;
}
console.log(displayFullName());