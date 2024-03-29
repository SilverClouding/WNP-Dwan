$(document).ready(function(){
    function swymCallbackFn(){
      const wishlistItemsContainer = document.getElementById('swym_main_collection_product_grid');
      if(wishlistItemsContainer){ 
        window._swat.fetchWrtEventTypeET(function(wishlistProducts) {
            let productitem="";
            wishlistProducts.forEach(function(product){
              console.log(product);
              let addtobtn_text = "Add to cart"
              product.isInCart = _swat.platform.isInDeviceCart(product.epi);    
              productitem += `<li class="grid__item"> <div class="card-wrapper"><div class="card-information"><div class="card-information__wrapper">
                                  <div class="caption-with-letter-spacing light">${product.bt}</div>
                                  <h3 class="card-information__text h5">
                                  <a href="${product.du}" class="full-unstyled-link">
                                  ${product.dt}
                                  </a>
                                  </h3>
                                  <div class="price " data-wg-notranslate="manual">
                                  <div>
                                  <div class="price__regular">
                                  <span class="price-item price-item--regular">
                                  HK${Shopify.formatMoney(product.pr * 100.00)}
                                  </span>
                                  </div>
                                  </div>
                                  </div>
                                  </div>
                                  </div>
                                  <div class="card card--product card--outline" tabindex="-1">
                                  <div class="card__inner">
                                  <div>
                                  <div class="media media--transparent media--square media--hover-effect">
                                  <img src="${product.iu}" 
                                  alt="${product.dt}" 
                                  class="motion-reduce" 
                                  width="1000" height="1000">
                                  </div>
                                  </div>
                                  </div>
                                  </div>
                                  <a href="" id="${product.empi}" data-product-id="${product.empi}" data-url="${product.du}" data-variant-id="${product.epi}" class="button button--full-width button--primary add-to-cart">${addtobtn_text}</a>
                                 </div> </li>`
           fnc_prouductJson(product);  
            });
       
            wishlistItemsContainer.innerHTML = productitem;
            attachClickListeners();
          },window._swat.EventTypes.addToWishList);
      } else {
        attachClickListeners(); 
      }
      
      
     
    }
    if(!window.SwymCallbacks){
      window.SwymCallbacks = [];
    }
    window.SwymCallbacks.push(swymCallbackFn);

  
  
  

    function attachClickListeners(){
      $(".add-to-cart").on("click", function(e){
        e.preventDefault();
        var productId = e.target.getAttribute("data-product-id");
        var variantId = e.target.getAttribute("data-variant-id");
        var du = e.target.getAttribute("data-url");
        e.target.innerHTML = "Moving..";
        window._swat.replayAddToCart({empi: productId, du: du},variantId, function() {
            e.target.innerHTML = "Added to cart";
//             window.location.reload();
            console.log("Successfully added product to cart.");
            //minicart section start
            fetch('/?sections=cart-items')
            .then((response) => response.json())
            .then((data) => {
              console.log(data);

              var SectionHtml = data['cart-items'] ;
              var IDminiCart = document.getElementById("mini-cart");
              var IDminiCartMask = document.getElementById("minibag_mask");
              IDminiCart.innerHTML = SectionHtml;
              IDminiCart.classList.add("show-minibag");
              IDminiCart.classList.remove("hide-minibag");
              document.body.style.overflow = "hidden";
              IDminiCartMask.style.display = 'block';
              window._swat.initializeActionButtons('.min-cart-items', '.swym-button');
            });
            //minicart section end

            fetch('/cart.js')
            .then((response) => response.json())
            .then((cart) => {
              var count = cart.item_count;
              console.log(cart.total_price);
              document.getElementById("CartCount").innerHTML= count;
              var cartTotal = cart.total_price;
              var cartthreshhold = 1000 * 100.00;
              var percentmainvalue = cartTotal / cartthreshhold;
              var mainPercent = percentmainvalue * 100.00 ;
              var needAmmount = Math.abs(cartTotal - cartthreshhold);
              document.getElementById("precentfill").style.width = mainPercent+"%";
              if(cartTotal >= cartthreshhold ){
                document.getElementById("textmsg").innerHTML= Shopify.formatMoney(cartthreshhold) +" Done, You are eligible for";
              }else{
                document.getElementById("textmsg").innerHTML= "Spend "+Shopify.formatMoney(needAmmount)+" more to receive";
              }
            });        

          },
          function(e) {
            console.log(e);
          }
        );
      }); 
    }
  
    function fnc_prouductJson(product){
      window._swat.getProductDetails(product, function(productJson) {
        console.log("Entire product json:", productJson.id);
        if(productJson.available ){
          document.getElementById(`${productJson.id}`).innerText ="Add to cart";
          document.getElementById(`${productJson.id}`).classList.remove('disable'); 
        }else{
        document.getElementById(`${productJson.id}`).innerText ="Sold out";  
          document.getElementById(`${productJson.id}`).classList.add('disable'); 
        }
      },function(e) {console.log(e);});
    }
  
  
 

  });