$(document).ready(function(){

    // your product card markup
    var productTileMarkup = `


<li class="grid__item"> <div class="card-wrapper"><div class="card-information"><div class="card-information__wrapper">
                      <div class="caption-with-letter-spacing light">${product.bt}</div>
                      <h3 class="card-information__text h5">
<a href="{{du}}" class="full-unstyled-link">
{{dt}}
                        </a>
                        </h3>
                      <div class="price " data-wg-notranslate="manual">
                      <div>
                      <div class="price__regular">
                      <span class="price-item price-item--regular">
HK{{Shopify.formatMoney(pr * 100.00}}
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
<img src="{{iu}}" 
alt="{{dt}}" 
                      class="motion-reduce" 
                      width="1000" height="1000">
                        </div>
                        </div>

                        </div>
<a href="" data-product-id="{{empi}}" data-url="{{du}}" data-variant-id="{{epi}}" class="add-to-cart">
{{#isInCart}}Moved to cart{{/isInCart}}
{{^isInCart}}Move to cart{{/isInCart}}
  </a>
                        </div>

                        </div>

  </li>

`;

    function swymCallbackFn(){
      var wishlistItemsContainer = document.getElementById("wishlist-items");
      if(wishlistItemsContainer){
        window._swat.fetchWrtEventTypeET(
          function(wishlistProducts) {
            wishlistProducts.forEach(function(wishlistProduct){
              wishlistProduct.isInCart = _swat.platform.isInDeviceCart(wishlistProduct.epi);
              var renderedProductTile = SwymUtils.renderTemplateString(productTileMarkup, wishlistProduct);
              wishlistItemsContainer.insertAdjacentHTML( 'beforeend', renderedProductTile );
            });

            attachClickListeners();
          },
          window._swat.EventTypes.addToWishList
        );
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
        window._swat.replayAddToCart(
          {empi: productId, du: du},
          variantId,
          function() {
            e.target.innerHTML = "Moved to cart";
            window.location.reload();
            console.log("Successfully added product to cart.");
          },
          function(e) {
            console.log(e);
          }
        );
      }); 
    }
  });