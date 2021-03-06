function passwordShower() {
    console.log('you can now un/see password');
    var x = document.getElementById("exampleInputPassword1");
    if (x.type === "password") {
    x.type = "text";
    } else {
    x.type = "password";
    }
}