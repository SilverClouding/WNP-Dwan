$(document).ready(function(){

    // your product card markup
    var productTileMarkup = `


<li class="grid__item"> <div class="card-wrapper"><div class="card-information"><div class="card-information__wrapper">
<div class="caption-with-letter-spacing light">{{bt}}</div>
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

                        </div>

                        </div><a href="" data-product-id="{{empi}}" data-url="{{du}}" data-variant-id="{{epi}}" class="add-to-cart">
{{#isInCart}}Moved to cart{{/isInCart}}
{{^isInCart}}Move to cart{{/isInCart}}
  </a>

  </li>

`;

    function swymCallbackFn(){
//       var wishlistItemsContainer = document.getElementById("wishlist-items");
      const wishlistItemsContainer = document.getElementById('swym_main_collection_product_grid');
      if(wishlistItemsContainer){
        window._swat.fetchWrtEventTypeET(
          function(wishlistProducts) {
            let productitem="";
            wishlistProducts.forEach(function(product){
              product.isInCart = _swat.platform.isInDeviceCart(product.epi);
//               var renderedProductTile = SwymUtils.renderTemplateString(productTileMarkup, wishlistProduct);
//               wishlistItemsContainer.insertAdjacentHTML( 'beforeend', renderedProductTile );
              
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

                                  </div>
                                    <a href="" data-product-id="${product.empi}" data-url="${product.du}" data-variant-id="${product.epi}" class="button button--full-width button--primary add-to-cart"> Add to cart </a>
                                  </li>`
              
            });
            
            wishlistItemsContainer.innerHTML = productitem;

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