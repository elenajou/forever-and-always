function ajaxGET(url, callback) {
    const xhr = new XMLHttpRequest();
    // This is only initialized to a function
    // Triggered only when request is xhr.send() is completed
    xhr.onload = function() {
        if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
            // calls the external function in the parameters
            callback(this.responseText);
        } else {
            console.log(this.status);
        }
    }
    // This only initializes the request.
    // Triggered only when it is xhr.send() is completed
    xhr.open("GET", url);
    // This requests the data from the server
    xhr.send();
}