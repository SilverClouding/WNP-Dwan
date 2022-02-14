//   new code 
  var productCardsMarkup = `<ul>
{{#products}}
<li class="grid__item"> <div class="card-wrapper"> <a href="" data-epi="{{epi}}" data-empi="{{empi}}"data-du="{{du}}" data-iu="{{iu}}" data-pr="{{pr}}" data-stk="{{stk}}" data-variants="{{vi}}"class="remove">X</a><div class="card-information"><div class="card-information__wrapper"><div class="caption-with-letter-spacing light"></div>
                       
<h3 class="card-information__text h5">
<a href="{{du}}" class="full-unstyled-link">
{{dt}}
                          </a>
                          </h3>
                        <div class="price " data-wg-notranslate="manual">
                        <div>
                        <div class="price__regular">
                        <span class="price-item price-item--regular">
HK{{pr}}
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
<a href="" id="{{empi}}" data-product-id="{{empi}}" data-url="{{du}}" data-variant-id="{{epi}}" class="button button--full-width button--primary add-to-cart">{{addtobtn_text}}</a>
                          </div> </li>
{{/products}}</ul>
`;
  
  function swymCallbackFn(){
       const wishlistItemsContainer = document.getElementById('swym_main_collection_product_grid');
        _swat.fetchWrtEventTypeET(
          function (products){
            var productCardsMarkup = SwymUtils.renderTemplateString(productCardsMarkup,{products:products});
             wishlistItemsContainer.innerHTML = productCardsMarkup;
          }
        )
      
//      if(wishlistItemsContainer){  } else {
//         attachClickListeners(); 
//         removeClickListeners();
//       }
    }
  
  
    if(!window.SwymCallbacks){
      window.SwymCallbacks = [];
    }
    window.SwymCallbacks.push(swymCallbackFn);

  