var a = 100;
var b = 100 > 20;
var c = 100 < 20;

if (b && c) {
    console.log("✅ ✅");
}else if (b) {
    console.log("✅ ❌");
}else if (c) {
    console.log("❌ ✅");
}else {
    console.log("❌ ❌");
}



// This is switch statements
var month = "May";
switch(month){
    case "Aprial":
        console.log("It is not my birthday month.");
        break;
        case "May":
            console.log("It's my birthday month.");
            break;
            case "June":
                console.log("It is not my birthday month.");
                break;
                default:
                    console.log("Happy Birthday!");
                    break;
}


var flowers = "Rose";
switch(flowers){
    case "Lily":
        console.log("I don't like lily flower.");
        break;
        case "Tulip":
            console.log("I don't like tulip flower.");
            break;
            case "Rose":
                console.log("I like rose flower.");
                break;
                default:
                    console.log("I love you");
                    break;
}