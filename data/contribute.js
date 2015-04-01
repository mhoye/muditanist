
self.port.on("data", function (e) {
  document.getElementById("name").textContent = e.name;
  document.getElementById("description").textContent = e.description;
  document.getElementById("repository.url").textContent = e.repository.url;
  document.getElementById("participate.home").textContent = e.participate.home;

  return true;
});
