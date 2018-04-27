import { API } from './api-class';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import $ from 'jquery';



$(document).ready(function() {
  $('#doctorData').submit(function(event) {
    event.preventDefault();
    $('#doctorInfo').empty();
    let api = new API();
    let name = $("#doctorName").val().toUpperCase();

    api.nameCall(name).then(function(response) {
      let body = JSON.parse(response);
      console.log(body);

      for (var i = 0; i < body.data.length; i++) {
        $("#doctorInfo").append(`<li>First Name: ${body.data[i].profile.first_name}<br>Last name: ${body.data[i].profile.last_name}<br>Address: ${body.data[i].practices[0].visit_address.city}, ${body.data[i].practices[0].visit_address.state}<br>${body.data[i].practices[0].visit_address.street}<br>${body.data[i].practices[0].visit_address.zip}<br>Phone Number: ${body.data[i].practices[0].phones[0].number}<br>Accepting Patients: ${body.data[i].practices[0].accepts_new_patients}</li>`)
      }
    });
  });
});
