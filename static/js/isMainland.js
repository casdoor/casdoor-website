(function() {
  fetch("https://oa.casbin.com/api/is-mainland-ip")
    .then(response => {
      return response.json();
    })
    .then(data => {
      localStorage.setItem("mainland", data);
    });
})();
