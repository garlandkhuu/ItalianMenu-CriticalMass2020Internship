import "./styles.css";
import menu from "./menu";

const menuItems = menu.items;
const itemMap = {};
const flags = {
  showSpicy: true
};

menuItems.forEach(item => {
  const type = item.type;

  //Initialize an array whose key is the item type
  if (!(type in itemMap)) itemMap[type] = [];

  //Append item into the appropriate array
  itemMap[type] = itemMap[type].concat([item]);
});

//Sort all of the arrays by menu order
Object.keys(itemMap).forEach(key => {
  itemMap[key] = itemMap[key].sort((a, b) =>
    a.menuOrder < b.menuOrder ? -1 : 1
  );
});

//Map all the items into the menu by injecting into HTML
Object.keys(itemMap).forEach(key => {
  const table = document.getElementById(key);
  itemMap[key].forEach(item => {
    const itemName = document.createElement("h4");
    itemName.innerText = item.name;

    const itemPrice = document.createElement("h4");
    itemPrice.innerText = "$" + item.price.toFixed(2);

    //Put the item info into table cells
    const itemNameCell = document.createElement("td");
    itemNameCell.appendChild(itemName);
    itemNameCell.setAttribute("class", "item-name-cell");

    const itemPriceCell = document.createElement("td");
    itemPriceCell.appendChild(itemPrice);

    const itemRow = document.createElement("tr");
    itemRow.appendChild(itemNameCell);
    itemRow.appendChild(itemPriceCell);

    const itemDescription = document.createElement("p");
    itemDescription.setAttribute("class", "item-description");
    itemDescription.innerText = item.description;

    const itemDescriptionRow = document.createElement("tr");
    itemDescriptionRow.appendChild(itemDescription);

    //If item is spicy, give it special tag to toggle
    if (item.spicy) {
      const spicyIcon = document.createElement("i");
      spicyIcon.setAttribute("class", "spicy spicy-indicator");
      itemNameCell.appendChild(spicyIcon);
      itemRow.setAttribute("class", "is-spicy-name");
      itemDescriptionRow.setAttribute("class", "is-spicy-desc");
    }

    table.appendChild(itemRow);
    table.appendChild(itemDescriptionRow);
  });
});

//Toggles the spice flag
const toggleSpicy = () => {
  flags.showSpicy = !flags.showSpicy;
  const spicyItems = document.getElementsByClassName("is-spicy-name");
  const spicyItemDesc = document.getElementsByClassName("is-spicy-desc");
  const spicyBtn = document.getElementById("spicy-btn");

  //Toggle button appearance and hides/shows spicy items
  if (flags.showSpicy) {
    spicyBtn.setAttribute("class", "spicy-btn active");
    const icon = document.createElement("i");
    icon.setAttribute("class", "spicy");
    spicyBtn.appendChild(icon);
    spicyBtn.innerText = "Click to Hide Spicy Items";
    Object.keys(spicyItems).forEach(key => {
      spicyItems[key].style.display = "";
      spicyItemDesc[key].style.display = "";
    });
  } else {
    spicyBtn.setAttribute("class", "spicy-btn");
    const icon = document.createElement("i");
    icon.setAttribute("class", "spicy");
    spicyBtn.appendChild(icon);
    spicyBtn.innerText = "Click to Show Spicy Items";
    Object.keys(spicyItems).forEach(key => {
      spicyItems[key].style.display = "none";
      spicyItemDesc[key].style.display = "none";
    });
  }
};

//Bind the function to the button on click.
const spicyBtn = document.getElementById("spicy-btn");
spicyBtn.onclick = toggleSpicy;
