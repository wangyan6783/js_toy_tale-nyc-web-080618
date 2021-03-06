document.addEventListener("DOMContentLoaded", () => {
    const toyCollection = document.querySelector("#toy-collection");
    fetch("http://localhost:3000/toys")
    .then(response => response.json())
    .then(data => {
      let toyHTML = data.map((toyObj) => {
                      return `
                      <div class="card" id=${data.name}>
                        <h2>${toyObj.name}</h2>
                        <img src=${toyObj.image} class="toy-avatar">
                        <p id="${toyObj.name}_like">${toyObj.likes} Likes </p>
                        <button class="like-btn" data-name="${toyObj.name}">Like <3</button>
                      </div>
                      `
                    }).join("");

      toyCollection.innerHTML = toyHTML;
    })

  const addBtn = document.querySelector('#new-toy-btn')
  const toyForm = document.querySelector('.container')
  let addToy = false

  addBtn.addEventListener('click', () => {
    // hide & seek with the form
    addToy = !addToy
    if (addToy) {
      toyForm.style.display = 'block'
      toyForm.addEventListener("submit", (event) => {
        event.preventDefault();
        let toyName = document.getElementById("toy-name").value;
        let toyImg = document.getElementById("toy-img").value;
        fetch("http://localhost:3000/toys", {
          method: "POST",
          headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
          },
          body: JSON.stringify({name: toyName, image: toyImg, likes: 0})
        })
        .then(response => response.json())
        .then(data => {
          toyCollection.innerHTML +=
          `
          <div class="card" id=${data.name}>
            <h2>${data.name}</h2>
            <img src=${data.image} class="toy-avatar">
            <p id="${data.name}_like">${data.likes} Likes </p>
            <button class="like-btn" data-name="${toyObj.name}">Like <3</button>
          </div>
          `
        })
      })
    } else {
      toyForm.style.display = 'none'
    }
  })

  toyCollection.addEventListener("click", (event) => {
    if (event.target.className === "like-btn") {
      let toyName = event.target.dataset.name;
      let toyId;
      let toyLikes;
      let toyImg;
      fetch("http://localhost:3000/toys/")
      .then(response => response.json())
      .then(
        data => {
        let toyObj = data.find((toyObj) => toyObj.name === toyName)
        toyId = toyObj.id;
        toyLikes = toyObj.likes+1;
        toyImg = toyObj.image;
        fetch(`http://localhost:3000/toys/${toyId}`, {
          method: 'PUT',
          headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
          },
          body: JSON.stringify({name: toyName, image: toyImg, likes: toyLikes})
        })
        console.log(toyLikes);
        let likeP = document.getElementById(`${toyName}_like`)
        likeP.innerHTML = `
          <p>${toyLikes} Likes </p>
        `
      })
    }
  })

})
