function HideFunction() {
  var IDminiCart = document.getElementById("mini-cart");
  var IDminiCartMask = document.getElementById("minibag_mask");
  IDminiCart.classList.remove("show-minibag");
  IDminiCart.classList.add("hide-minibag");
  document.body.style.overflow = "auto";
  IDminiCartMask.style.display = 'none';
}

function ShowFuntion(IDminiCart,IDminiCartMask) {
  IDminiCart.classList.add("show-minibag");
  IDminiCart.classList.remove("hide-minibag");
  document.body.style.overflow = "hidden";
  IDminiCartMask.style.display = 'block';
}

// Hearder icon hover
const container = document.querySelector('.header__icon--cart');
const showView = (event) => {
  event.preventDefault();
  console.log('show');
  //mini cart section render
  fetch('/?sections=cart-items')
  .then((response) => response.json())
  .then((data) => {
    var SectionHtml = data['cart-items'] ;
    var IDminiCart = document.getElementById("mini-cart");
    var IDminiCartMask = document.getElementById("minibag_mask");
    IDminiCart.innerHTML = SectionHtml;
    ShowFuntion(IDminiCart,IDminiCartMask);
  });
}
container.onmouseenter = showView;



// Item remove
function updateItemById(id,quantity,sections) {
  let formData = {
    'id': id,
    'quantity': quantity,
    'sections':sections
  };
//  console.log(JSON.stringify(formData));
  fetch('/cart/change.js', {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(formData)
  })
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    console.log(data);
    document.getElementById("CartCount").innerHTML= data.item_count;
    var sectionHtmlData =  data; 
    var SectionHtml = sectionHtmlData.sections['cart-items'] ;
    var IDminiCart = document.getElementById("mini-cart");
    IDminiCart.innerHTML = SectionHtml;     
  })
  .catch((error) => {
    console.error('Error:', error);
  });
}