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
      
        _swat.fetchWrtEventTypeET(
          function (wishlistProducts){
//             var productCardsMarkup = SwymUtils.renderTemplateString(productCardsMarkup,{products:products});
//              wishlistItemsContainer.innerHTML = productCardsMarkup;
            
            let productitem="";
            console.log(wishlistProducts);
            wishlistProducts.forEach(function(product){

              let addtobtn_text = "Add to cart"
              product.isInCart = _swat.platform.isInDeviceCart(product.epi);    
              productitem += `<li class="grid__item"> <div class="card-wrapper">

<a href="" 
data-epi="${product.epi}" 
data-empi="${product.empi}" 
data-du="${product.du}" 
data-iu="${product.iu}" data-pr="${product.pr}" data-stk="${product.stk}" data-variants="${product.vi}"
class="remove">X</a>

<div class="card-information"><div class="card-information__wrapper">

<div class="caption-with-letter-spacing light">
<a href="/collections/${(product.bt).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-$/, '').replace(/^-/, '')}">${product.bt}</a>
</div>

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
            console.log(productitem);
            wishlistItemsContainer.innerHTML = productitem;
            
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

  