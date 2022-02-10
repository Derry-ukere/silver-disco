const cafee = document.querySelector("#cafe-list");
const form = document.querySelector("#add-cafe-form");

//render data;
const renderCafe = (doc) => {
  const li = document.createElement("li");
  const name = document.createElement("span");
  const city = document.createElement("span");
  const cross = document.createElement("div");

  li.setAttribute("data-id", doc.id);
  name.textContent = doc.data().name;
  city.textContent = doc.data().city;
  cross.textContent = "X";

  li.appendChild(name);
  li.appendChild(city);
  li.append(cross);

  cafee.appendChild(li);

  cross.addEventListener("click", (event) => {
    const id = event.target.parentElement.getAttribute("data-id");
    db.collection("cafee")
      .doc(id)
      .delete()
      .then(() => console.log("deleted"));
  });
};


//saving data

form.addEventListener("submit", (event) => {
  event.preventDefault();
  db.collection("cafee")
    .add({
      name: form.name.value,
      city: form.city.value,
    })
    .then((re) => {
      console.log("saved");
    });

  form.name.value = "";
  form.city.value = "";
});


// real time database

db.collection('cafee').onSnapshot((snapshot) => {
  let changes = snapshot.docChanges()
  changes.forEach((change) => {
    if(change.type == 'added'){
      renderCafe(change.doc)
    }else if(change.type =="removed"){
      let li = cafee.querySelector('[data-id=' + change.doc.id + ']');
      cafee.removeChild(li);
    }

  })
})