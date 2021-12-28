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

 


jQuery(function($){ 
  var selectedOptions = '';
  $(document).on('change', '.minicart_variant select', function() {
        //Use $option (with the "$") to see that the variable is a jQuery object
        var $option = $(this).find('option:selected');
        //Added with the EDIT
        var value = $option.val();//to get content of "value" attrib
        var text = $option.text();//to get <option>Text</option> content
        selectedOptions = value;
      });
       console.log(selectedOptions);
  
  $(document).on('click',".mini-add-button", function (e) {
    e.preventDefault();
    console.log('click work');
     var product_handle = $(this).data('handle');
    jQuery.getJSON('/products/' + product_handle + '.js', function (product) {
      console.log(product);
      var title = product.title;
      product_handle = product.handle;
      var url = '/products/' + product_handle;
  	  var qty = 1;
      var var_id = 0;
     
      var select = $(this).parents('.minicart_add_to_cart').siblings('.minicart_variant').children('select'); 
      $(select).addClass('ok');
      
//       $(select+' option:selected').each(function (i) {

//         selectedOptions = $(this).val();

//       });

    
      
      
      jQuery.getJSON('/products/' + product_handle + '.js', function (product) {
        $(product.variants).each(function (i, v) { 
         
            console.log(v.available+"-"+v.title);
          console.log(v.id); 
          console.log(selectedOptions);
          if ( v.id == selectedOptions ){ 
            var_id = v.id;
            processCart();
            
          }
          
        });
      });
      
      function processCart() {
        jQuery.post('/cart/add.js', {
          quantity: qty,
          id: var_id
        },
                    null,
                    "json"
                   ).done(function () {



          $.getJSON('/?sections=cart-items', function(data) {      
            var sectionHtmlData = data; 
            console.log(data);
            var SectionHtml = sectionHtmlData['cart-items'] ;
            $("#mini-cart").html(SectionHtml);
            $('#mini-cart').toggleClass("show-minibag");
            $('body').toggleClass("overflow-hidden");
            $('.minibag-mask').show();
            $('#mini-cart').removeClass("hide-minibag");
            $('.crosssell-group .feedback-add_in_modal').each(function(e){
              theme.applyAjaxToProductForm($(this));
            });

          });


          // $('.qv-add-to-cart-response').addClass('success').html('<span>' + $('.qv-product-title').text() + ' has been added to your cart. <a href="/cart">Click here to view your cart.</a>');


        })
        .fail(function ($xhr) {
          var data = $xhr.responseJSON;
          $('.qv-add-to-cart-response').addClass('error').html('<span><b>ERROR: </b>' + data.description);
        });


      }



    });
  });

});
