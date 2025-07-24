function myFunction() {
    const firstname = document.getElementById("firstname").value.trim();
    const secondname = document.getElementById("secondname").value.trim();
    const number = document.getElementById("contactNumber").value.trim();
    const email = document.getElementById("email").value.trim();
    const location = document.getElementById("location").value.trim();

    if (firstname === "" || secondname === "" || number === "" || email === "" || location === "") {
        document.getElementById("error-messages").style.display = "block";
    } else {
        document.getElementById("error-messages").style.display = "none";
    }
}