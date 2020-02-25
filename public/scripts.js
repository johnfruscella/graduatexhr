const sendHTTPRequest = (method, url, data) => {
  const promise = new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    xhr.open(method, url);

    xhr.responseType = "json";

    if (data) {
      xhr.setRequestHeader("Content-Type", "application/json");
      xhr.onload = () => {
        if (xhr.status >= 400) {
          reject(xhr.response);
        } else {
          resolve(xhr.response);
        }
      }
      xhr.onerror = () => {
        reject('something went wrong');
      }
      xhr.send(JSON.stringify(data));
    }
  });
  return promise;
};

//Create GET request
const getAllGraduates = () => {
  sendHTTPRequest(GET, "http:localhost:3000/api/graduates", true).then(
    responseData => {
      console.log(responseData);
      // document.getElementById('results').innerHTML = JSON.stringify(responseData);

      const listGraduates = responseData.map(element => {
        return (
          "<li>" +
           "First Name: " + 
           element.firstName + 
           ", " + 
           "Last Name:" + 
           element.lastName + 
           ", " + 
           "Email: " + 
           element.email + 
           "<li>"
        );

      });
      console.log(listGraduates);
      document.getElementById(results).innerHTML = "<ul>" + listGraduates.join("\n") + "</ul>";
    }
  );
}

//Create Post Request
function createNewGraduate() {
  const graduate = {
    firstName: document.getElementById('firstName').value,
    lastName: document.getElementById('lastName').value,
    email: document.getElementById('email').value
  }
  var xhr = new XMLHttpRequest();

  xhr.open("POST", "http://localhost:3000/api/graduates");
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send(JSON.stringify(graduate));

}