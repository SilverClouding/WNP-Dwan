if (!customElements.get('product-form')) {
  customElements.define('product-form', class ProductForm extends HTMLElement {
    constructor() {
      super();

      this.form = this.querySelector('form');
      this.form.querySelector('[name=id]').disabled = false;
      this.form.addEventListener('submit', this.onSubmitHandler.bind(this));
      this.cartNotification = document.querySelector('cart-notification');
    }

    onSubmitHandler(evt) {
      evt.preventDefault();
      const submitButton = this.querySelector('[type="submit"]');
      if (submitButton.classList.contains('loading')) return;

      this.handleErrorMessage();
      this.cartNotification.setActiveElement(document.activeElement);

      submitButton.setAttribute('aria-disabled', true);
      submitButton.classList.add('loading');
      this.querySelector('.loading-overlay__spinner').classList.remove('hidden');

      const config = fetchConfig('javascript');
      config.headers['X-Requested-With'] = 'XMLHttpRequest';
      delete config.headers['Content-Type'];

      const formData = new FormData(this.form);
      formData.append('sections', this.cartNotification.getSectionsToRender().map((section) => section.id));
      formData.append('sections_url', window.location.pathname);
      config.body = formData;

      fetch(`${routes.cart_add_url}`, config)
        .then((response) => response.json())
        .then((response) => {
        
        let selectedId = this.form.querySelector('[name=id]').value;
        let IdValue = "data_"+selectedId;
        let variant__Qty = document.querySelector(".fancybox-inner variant-radios , .product-handle variant-radios").getAttribute(IdValue);
         console.log(variant__Qty)
          if (response.status) {
           document.querySelector(".fancybox-inner .quantity__input, .product-handle .quantity__input").setAttribute('value',parseInt(variant__Qty));
             document.querySelector(".fancybox-inner .quantity__input, .product-handle .quantity__input").setAttribute('placeholder',parseInt(variant__Qty));
            this.handleErrorMessage(response.description);
            return;
          }
			
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
        	
//           this.cartNotification.renderContents(response);
        })
        .catch((e) => {
          console.error(e);
        })
        .finally(() => {
          submitButton.classList.remove('loading');
          submitButton.removeAttribute('aria-disabled');
          this.querySelector('.loading-overlay__spinner').classList.add('hidden');
        });
    }

    handleErrorMessage(errorMessage = false) {
      this.errorMessageWrapper = this.errorMessageWrapper || this.querySelector('.product-form__error-message-wrapper');
      this.errorMessage = this.errorMessage || this.errorMessageWrapper.querySelector('.product-form__error-message');

      this.errorMessageWrapper.toggleAttribute('hidden', !errorMessage);
console.log("errorMessage"+errorMessage);
      if (errorMessage) {
//         this.errorMessage.textContent = errorMessage;
        this.errorMessage.textContent = 'Quantity exceeds available stock';
      }
    }
  });
}
