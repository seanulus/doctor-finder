class API {
  makeCall() {
    let promise = new Promise(function(resolve, reject) {
      let request = new XMLHttpRequest();
      let url = `https://api.betterdoctor.com/2018-04-27/doctors?location=Portland,or,us&limit=10&user_key=${exports.apikey}`
      request.onload = function() {
        if (this.status === 200) {
          resolve(request.response);
        } else {
          reject(Error(request.statusText));
        }
      }
      request.open("GET", url, true);
      request.send();
    });
    return promise;
  }
}

export { API  };
