(function($) {
  
  
  // stx reorder 
  this.reorder = new function(){
    var self = this;

    this.pushQueue = function(i, data, el){

      //LOW STOCK -- add as many as possible if stock is below requested ammount
      if(data[i].check_inventory){
        data[i].quantity = Math.min(parseInt(data[i].inventory), parseInt(data[i].quantity));
      }

      $.ajax({
        url: '/cart/add.js',
        method: 'POST',
        data: {
          quantity: data[i].quantity,
          id: data[i].id
        },
        complete: function(res){
          if(i >= data.length - 1){
            //products from queue are now added to the cart -> stop loading signal and go to cart
            el.removeClass('loading');
//             window.location.href = '/cart';
            
            
            //       mini cart section render


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

              //           var count = document.querySelector('.count-cross .count').getAttribute('count');
              //           document.getElementById("CartCount").innerHTML= count;
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

              console.log(mainPercent);

              document.getElementById("precentfill").style.width = mainPercent+"%";
              if(cartTotal >= cartthreshhold ){
                document.getElementById("textmsg").innerHTML= Shopify.formatMoney(cartthreshhold) +" Done, You are eligible for";
              }else{
                document.getElementById("textmsg").innerHTML= "Spend "+Shopify.formatMoney(needAmmount)+" more to receive";
              }

            });


            console.log("notification off");
            
            return;
          }else{
            // Calls are async as required by Shopify Docs
               self.pushQueue(i+1, data, el);
          }
        }
      });
    }

    this.listen = function(){
      var el = $(this);
      var ids = el.attr('data-variant-ids').split(',');
      var quantities = el.attr('data-variant-quantities').split(',');
      var inventories = el.attr('data-variant-inventories').split(',');
      var inventory_policies = el.attr('data-variant-inventory-policies').split(',');
      var inventory_trackers = el.attr('data-variant-inventory-trackers').split(',');
      ids.splice(-1, 1);
      quantities.splice(-1, 1);
      inventories.splice(-1, 1);
      inventory_policies.splice(-1, 1);
      inventory_trackers.splice(-1, 1);

      var data = [];
      for(var i=0; i<ids.length; i++){
        data.push({
          id: ids[i],
          quantity: quantities[i],
          inventory: inventories[i],
          check_inventory: (inventory_policies[i] == "deny" && inventory_trackers[i] != "")
        });
      }
      el.addClass('loading');
      self.pushQueue(0, data, el);
    }

    this.init = function(){
      $('.reorder-btn').on('click', self.listen);
    }
  }

  $(reorder.init);
 
  
})(jQuery)