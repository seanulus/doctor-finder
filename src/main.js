import { API } from './api-class';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import $ from 'jquery';

let errorMessage = function(body) {
  if(body.length === 0) {
    $("#doctorInfo").append("Sorry, there were no results for your query. Please try again");
  }
}

let blankError = function(name, symptom, api) {
  if(name === "" && symptom === "") {
    alert("Please enter a doctor or a symptom");
    api.abort();
  }
}

$(document).ready(function() {
  $('#doctorData').submit(function(event) {
    event.preventDefault();
    $('#doctorInfo').empty();
    let api = new API();
    let name = $("#doctorName").val().toUpperCase();
    let symptom = $("#symptomName").val().toUpperCase();
    blankError(name, symptom, api);
    api.nameCall(name, symptom).then(function(response) {
      let body = JSON.parse(response);

      for (var i = 0; i < body.data.length; i++) {
        $("#doctorInfo").append(`<li>First Name: ${body.data[i].profile.first_name}<br>
                                     Last name: ${body.data[i].profile.last_name}<br>
                                     Address: ${body.data[i].practices[0].visit_address.city}, ${body.data[i].practices[0].visit_address.state}<br>
                                     ${body.data[i].practices[0].visit_address.street}<br>
                                     ${body.data[i].practices[0].visit_address.zip}<br>
                                     Phone Number: ${body.data[i].practices[0].phones[0].number}<br>
                                     Accepting Patients: ${body.data[i].practices[0].accepts_new_patients}<br>
                                     Website:
                                     <a href="${body.data[i].practices[0].website}">Click Here</a></li>`);
                                   }
                                  errorMessage(`${body.data}`);
    },  function(error) {
        $("#showError").text(`There was an error processing your request: ${error.message}`)
    });
  });
});
