onmessage = function(e) {
  fetch(e.data[0], {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(r => r.json())
    .then(res => {
      if (res) {
        let random = Math.floor(Math.random() * (res.length - 1)) + 0;
        let pic = res[random];
        postMessage({
          src: pic.urls.regular || pic.urls.full,
          artist: pic.user.name,
          url: pic.links.self,
          color: pic.color
        });
      }
    })
    .catch(e => console.error(e));
};
