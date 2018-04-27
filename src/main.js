import { API } from './api-class';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import $ from 'jquery';

$(document).ready(function() {
  $('#doctorData').submit(function(event) {
    event.preventDefault();
    let api = new API();
    let promise = api.makeCall();
    promise.then(function(response) {
      let body = JSON.parse(response);
      console.log(body);
    })

  });
});
