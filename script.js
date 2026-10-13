const form = document.getElementById("itemForm");
const itemsList = document.getElementById("itemsList");
const search = document.getElementById("search");
const message = document.getElementById("message");

let items = JSON.parse(
  localStorage.getItem("lostFoundItems") || "[]"
);

function displayItems() {
  const query = search.value.toLowerCase();

  const filtered = items.filter(item =>
    (item.name + " " + item.location + " " + item.type)
      .toLowerCase().includes(query)
  );

  itemsList.replaceChildren();

  if (filtered.length === 0) {
    const empty = document.createElement("p");
    empty.textContent = "No matching items found.";
    itemsList.appendChild(empty);
    return;
  }

  filtered.forEach(item => {
    const card = document.createElement("article");
    card.className = "item-card";

    const title = document.createElement("h3");
    title.textContent = item.name;

    const tag = document.createElement("p");
    tag.className = "tag";
    tag.textContent = item.type + " Item";

    const location = document.createElement("p");
    location.textContent = "Location: " + item.location;

    const contact = document.createElement("p");
    contact.textContent = "Contact: " + item.contact;

    card.append(title, tag, location, contact);
    itemsList.appendChild(card);
  });
}

form.addEventListener("submit", function(event) {
  event.preventDefault();

  const item = {
    name: document.getElementById("itemName").value.trim(),
    type: document.getElementById("itemType").value,
    location: document.getElementById("itemLocation").value.trim(),
    contact: document.getElementById("itemContact").value.trim()
  };

  if (!item.name || !item.location || !item.contact) {
    message.textContent = "Please fill in all fields.";
    return;
  }

  items.unshift(item);

  localStorage.setItem(
    "lostFoundItems",
    JSON.stringify(items)
  );

  form.reset();
  message.textContent = "Your report was submitted successfully!";
  displayItems();
});

search.addEventListener("input", displayItems);

displayItems();