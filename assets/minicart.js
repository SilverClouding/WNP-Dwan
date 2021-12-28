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


//qty change

function qty_plus_updateItemById(id,quantity,sections) {
  quantity = quantity + 1;
  console.log(quantity);
  updateItemById(id,quantity,sections);
}
function qty_minus_updateItemById(id,quantity,sections) {  
  quantity = quantity - 1;
  console.log(quantity);
  updateItemById(id,quantity,sections);
}

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

// ---------------------------------------------------------
// POST to cart/add.js returns the JSON of the line item.
// ---------------------------------------------------------
function addItemFromForm (form_id, callback) {
  console.log(form_id);console.log(callback);
    var params = {
      type: 'POST',
      url: '/cart/add.js',
      data: jQuery('#' + form_id).serialize(),
      dataType: 'json',
      success: function(line_item) { 
        if ((typeof callback) === 'function') {
          callback(line_item);
        }
        else {
          Shopify.onItemAdded(line_item);
        }
      },
      error: function(XMLHttpRequest, textStatus) {
        Shopify.onError(XMLHttpRequest, textStatus);
      }
    };
    jQuery.ajax(params);
};


jQuery(function(){
 $(document).on('click',".mini-add-button", function (e) {
   e.preventDefault();
   console.log('click work');
 });

});
