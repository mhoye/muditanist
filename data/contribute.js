function setLink(id, url) {
  let link = document.getElementById(id);
  link.textContent = url;
  link.setAttribute("href", url);
}


self.port.on("data", function (e) {
  document.getElementById("name").textContent = e.name;
  document.getElementById("description").textContent = e.description;
  setLink("repository.url", e.repository.url);
  setLink("participate.home", e.participate.home);

  return true;
});
