var body = document.body;
var h1El = document.createElement("h1");
var infoEl = document.createElement("div");
var imgEl = document.createElement("img");
var kittenEl = document.createElement("div");
var nameEl = document.createElement("div");
var favoriteEl = document.createElement("div");
var listEl = document.createElement("ol");
var li1 = document.createElement("li");
var li2 = document.createElement("li");
var li3 = document.createElement("li");
var li4 = document.createElement("li");
var li5 = document.createElement("li");

h1El.textContent = "Welcome to my page";
kittenEl.textContent = "This is my kitten 🐱.";
nameEl.textContent = "My name is Berry.";
favoriteEl.textContent = "My favourite foods are:";
li1.textContent = "Strawberry ";
li2.textContent = "Durine ";
li3.textContent = "Mango";
li4.textContent = "Lemon";
li5.textContent = "Apple";

body.appendChild(h1El);
body.appendChild(infoEl);
infoEl.appendChild(imgEl);
infoEl.appendChild(kittenEl);
infoEl.appendChild(nameEl);
body.appendChild(favoriteEl);
favoriteEl.appendChild(listEl);
favoriteEl.appendChild(listEl);
listEl.appendChild(li1);
listEl.appendChild(li2);
listEl.appendChild(li3);
listEl.appendChild(li4);
listEl.appendChild(li5);

h1El.setAttribute("style", "margin:auto; width:50%; text-align:center;");
infoEl.setAttribute("style", "margin:auto; width:50%; text-align:center;");
imgEl.setAttribute("src", "http://placekitten.com/200/300");
nameEl.setAttribute("style", "font-size:25px; text-align:center;");
kittenEl.setAttribute("style", "font-size:25px; text-align:center;");
favoriteEl.setAttribute("style", "font-size:20px;");
listEl.setAttribute("style", "background:gray; padding:20px;");
li1.setAttribute("style", "color:white; background: red; padding: 5px; margin-left: 35px;");
li2.setAttribute("style", "color:white; background: yellow; padding: 5px; margin-left: 35px;");
li3.setAttribute("style", "color:white; background: yellowgreen; padding: 5px; margin-left: 35px;");
li4.setAttribute("style", "color:white; background: green; padding: 5px; margin-left: 35px;");
li5.setAttribute("style", "color:white; background: pink; padding: 5px; margin-left: 35px;");



