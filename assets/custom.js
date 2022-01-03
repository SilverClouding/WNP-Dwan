// announcement slideShow

const announcement_text_slider = new Swiper('.announcement_text_slider', {
  autoHeight: false,
  centeredSlides: true,
  freeMode: false,
  loop: true,
  autoplay: {
    delay: 2500,
    disableOnInteraction: false,
    reverseDirection: true,
  },
 

});

$(".announcement_text_slider").each(function(elem, target){
    var swp = target.swiper;
    $(this).hover(function() {
        swp.autoplay.stop();
    }, function() {
        swp.autoplay.start();
    });
})



// Banner slideShow
const swiper = new Swiper('.mySwiper', {
  autoHeight: true,
  effect: "fade",

  // If we need pagination
  pagination: {
    el: '.mySwiper .swiper-pagination',
    clickable: true,
  },

  // Navigation arrows
  navigation: {
    nextEl: '.mySwiper .swiper-button-next',
    prevEl: '.mySwiper .swiper-button-prev',
  },

  // And if we need scrollbar
  scrollbar: {
    el: '.mySwiper .swiper-scrollbar',
  },
});

// Featured collection slider
function featured_col_Swiper(){
  const featured_col_Swiper = new Swiper(".featured_col_Swiper", {
    slidesPerView: 1,
    spaceBetween: 10,
    pagination: {
      el: ".featured_col_Swiper .swiper-pagination",
      clickable: true,
    },
    // Navigation arrows
    navigation: {
      nextEl: '.featured_col_Swiper .swiper-button-next',
      prevEl: '.featured_col_Swiper .swiper-button-prev',
    },
    // And if we need scrollbar
    scrollbar: {
      el: '.featured_col_Swiper .swiper-scrollbar',
      type: "progressbar",
    },
    breakpoints: {
      640: {
        slidesPerView: 1,
        spaceBetween: 10,
      },
      768: {
        slidesPerView: 4,
        spaceBetween: 10,
      },
      1024: {
        slidesPerView: 5,
        spaceBetween: 10,
      },
    },
  });
}
function featured_col_Swiper2(){
  const featured_col_Swiper2 = new Swiper(".featured_col_Swiper2", {
    slidesPerView: 1,
    spaceBetween: 10,
    pagination: {
      el: ".featured_col_Swiper2 .swiper-pagination",
      clickable: true,
    },
    // Navigation arrows
    navigation: {
      nextEl: '.featured_col_Swiper2 .swiper-button-next',
      prevEl: '.featured_col_Swiper2 .swiper-button-prev',
    },
    // And if we need scrollbar
    scrollbar: {
      el: '.featured_col_Swiper2 .swiper-scrollbar',
      type: "progressbar",
    },
    breakpoints: {
      640: {
        slidesPerView: 1,
        spaceBetween: 10,
      },
      768: {
        slidesPerView: 4,
        spaceBetween: 10,
      },
      1024: {
        slidesPerView: 5,
        spaceBetween: 10,
      },
    },
  });
}
featured_col_Swiper();
featured_col_Swiper2();

// Multicolumn slider
const multicolumn_Swiper = new Swiper(".multicolumn_Swiper", {
  slidesPerView: 2,
  spaceBetween: 10,
  pagination: {
    el: ".multicolumn_Swiper .swiper-pagination",
    clickable: true,
  },
  // Navigation arrows
  navigation: {
    nextEl: '.multicolumn_Swiper .swiper-button-next',
    prevEl: '.multicolumn_Swiper .swiper-button-prev',
  },
  // And if we need scrollbar
  scrollbar: {
    el: '.multicolumn_Swiper .swiper-scrollbar',
    type: "progressbar",
  },
  breakpoints: {
    640: {
      slidesPerView: 2,
      spaceBetween: 10,
    },
    768: {
      slidesPerView: 4,
      spaceBetween: 10,
      //        loop: true,
    },
    1024: {
      slidesPerView: 6,
      spaceBetween: 10,
      //        loop: true,
    },
  },
});

// main-collection-page_Swiper
const main_collection_page_Swiper = new Swiper(".main-collection-page_Swiper", {
  slidesPerView: 2,
  spaceBetween: 10,
//     loop: true,
  pagination: {
    el: ".main-collection-page_Swiper .swiper-pagination",
    clickable: true,
  },
  // Navigation arrows
  navigation: {
    nextEl: '.main-collection-page_Swiper .swiper-button-next',
    prevEl: '.main-collection-page_Swiper .swiper-button-prev',
  },
  // And if we need scrollbar
  scrollbar: {
    el: '.main-collection-page_Swiper .swiper-scrollbar',
    type: "progressbar",
  },
  breakpoints: {
    1024: {
      slidesPerView: 7,
      spaceBetween: 10,
//              loop: true,
    },
    768: {
      slidesPerView: 4,
      spaceBetween: 10,
//              loop: true,
    },
     640: {
      slidesPerView: 2,
      spaceBetween: 10,
    },
  },
});


//image and only text slider
const text_slider = new Swiper('.text_slider', {
  effect: "slide",

  // If we need pagination
  pagination: {
    el: '.text_slider .swiper-pagination',
    clickable: true,
    type: 'bullets',
  },

  // Navigation arrows
  navigation: {
    nextEl: '.text_slider .swiper-button-next',
    prevEl: '.text_slider .swiper-button-prev',
  },

  // And if we need scrollbar
  //   scrollbar: {
  //     el: '.text_slider .swiper-scrollbar',
  //   },
});





// footer accordion

var acc = document.getElementsByClassName("footer-block__heading");
var i;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var panel = this.nextElementSibling;
    if (panel.style.display === "block") {
      panel.style.display = "none";
    } else {
      panel.style.display = "block";
    }
  });
}











// always page go top after page load
 document.body.scrollTop = document.documentElement.scrollTop = 0;



// featured collection tab
jQuery(function($){
  $('.col_tab li').on('click', function(){


    $(this).siblings().removeClass('active');
    $(this).addClass('active');
    var trigger = $(this).attr('triggervalue');

    if(trigger == 'col_1'){ }else{  }
    const featured_col_Swiper = new Swiper(".featured_col_Swiper", {
      slidesPerView: 2,
      spaceBetween: 10,
      pagination: {
        el: ".featured_col_Swiper .swiper-pagination",
        clickable: true,
      },
      // Navigation arrows
      navigation: {
        nextEl: '.featured_col_Swiper .swiper-button-next',
        prevEl: '.featured_col_Swiper .swiper-button-prev',
      },
      // And if we need scrollbar
      scrollbar: {
        el: '.featured_col_Swiper .swiper-scrollbar',
        type: "progressbar",
      },
      breakpoints: {
        640: {
          slidesPerView: 2,
          spaceBetween: 10,
        },
        768: {
          slidesPerView: 4,
          spaceBetween: 10,
        },
        1024: {
          slidesPerView: 5,
          spaceBetween: 10,
        },
      },
    });

    const featured_col_Swiper2 = new Swiper(".featured_col_Swiper2", {
      slidesPerView: 2,
      spaceBetween: 10,
      pagination: {
        el: ".featured_col_Swiper2 .swiper-pagination",
        clickable: true,
      },
      // Navigation arrows
      navigation: {
        nextEl: '.featured_col_Swiper2 .swiper-button-next',
        prevEl: '.featured_col_Swiper2 .swiper-button-prev',
      },
      // And if we need scrollbar
      scrollbar: {
        el: '.featured_col_Swiper2 .swiper-scrollbar',
        type: "progressbar",
      },
      breakpoints: {
        640: {
          slidesPerView: 2,
          spaceBetween: 10,
        },
        768: {
          slidesPerView: 4,
          spaceBetween: 10,
        },
        1024: {
          slidesPerView: 5,
          spaceBetween: 10,
        },
      },
    });


    $('.'+trigger).siblings().removeClass('active');
    $('.'+trigger).addClass('active');
  });
});


// megamenu
jQuery(function($){
//   $(document).on('click','.mega_parent',function(e){
    
    $( ".mega_parent" ).mouseenter(function() {
    
//     e.preventDefault();
    $(this).siblings().removeClass('active');
    $(this).addClass('active');
    var targetData = $(this).attr('terget_megamenu');
    $('[data-dropdown='+targetData+']').parents(".mega-menu-section").siblings().removeClass('active');
    $('[data-dropdown='+targetData+']').parents(".mega-menu-section").addClass('active');
    console.log(targetData)
  });
  
  
  $( ".dropdown_container" ).mouseleave(function() {
    console.log('leave');
    $(this).parents(".not-sticky .mega-menu-section").removeClass('active');
    var targetData1 = $(this).attr('data-dropdown');
    $('[terget_megamenu='+targetData1+']').removeClass('active');
  });

  

  // for sticky menu
//   $(document).on('click','.level_1_item ',function(e){
//     e.preventDefault();
  $( ".level_1_item" ).mouseenter(function() {
    var triger_megamenu = $(this).attr('triger_megamenu');
    $(this).siblings().removeClass('active');
    $(this).addClass('active');
    $('[data-dropdown='+triger_megamenu+']').parents(".mega-menu-section").siblings().removeClass('active');
    $('[data-dropdown='+triger_megamenu+']').parents(".mega-menu-section").toggleClass('active');
  });


  $(document).on('click','.humbergerfor_sticky svg',function(e){

    $(this).parent().addClass('open');
    $(".mega-menu-container.do-sticky").addClass('active');
    $('#shopify-section-mega-menu-1').addClass('active');
    $('.main_nav_1').addClass('active');
  });
  
   $(document).on('click','.humbergerfor_sticky.open svg',function(e){

    $(this).parent().removeClass('open');
    $(".mega-menu-container.do-sticky").removeClass('active');
    $('.mega-menu-section').removeClass('active');
    $('.main_nav_1').removeClass('active');
     $('.level_1_item').removeClass('active');
  });
  
});


// product description learn more , show more
jQuery(function($){
  $(document).on('click', '.show_more',function(){
    $(this).addClass('hide');
    $(this).siblings('.show_less').removeClass('hide');
    $(this).parents('.des_bottom_div').siblings('.short_des').addClass('hide');
    $(this).parents('.des_bottom_div').siblings('.long_des').removeClass('hide');
    $(this).parents('.bottomImg').removeAttr('style');
  });

  $(document).on('click', '.show_less',function(){
    $(this).addClass('hide');
    $(this).siblings('.show_more').removeClass('hide');
    $(this).parents('.des_bottom_div').siblings('.short_des').removeClass('hide');
    $(this).parents('.des_bottom_div').siblings('.long_des').addClass('hide');
    $(this).parents('.bottomImg').css('height',$(this).parents('.bottomImg').height());
  });
});

// newsletter popup
jQuery(function($){
  var checkNewsletter = function(){
    var date = new Date();
    if(localStorage.getItem('tmx-newsletter') == null || localStorage.getItem('tmx-newsletter') == "undefined" ){
      $("#newsletter-popup").modal({
        fadeDuration: 500
      });
      localStorage.setItem('tmx-newsletter', date );
    }
    else{
      var check_time = new Date(date) - new Date(localStorage.getItem('tmx-newsletter'));
      var ms = check_time % 1000;
      check_time = (check_time - ms) / 1000;
      var days = Math.floor(check_time / 86400);//200 is sec for day set
      console.log('check_time:- '+check_time);
      console.log('days:- '+days);
      if(days > 1){
        $("#newsletter-popup").modal({
          fadeDuration: 500
        });
        localStorage.setItem('tmx-newsletter', date );
      }
    }
     console.log(date);
    console.log(localStorage);
  }

  $(document).ready(function(){
    if($("#newsletter-popup").length > 0) checkNewsletter();
  });

  $(document).on('click', '.false_btn',function(){
    var inputval = $('#first-name').val();
    var emailVal = $('.emailValid').val();
    console.log(inputval);
    if(inputval == "" ){
      $("#valError").addClass('show');
    }
    if(emailVal == "" ){
      $("#lblError").text('Please enter a valid email address.');
    }
    
    
//     $(".error-fields").addClass("show");
  });
  
  
});


// notify me
  $(document).on('click', '.notifyme', function(){
    console.log('click work notify')
  });


// hide varient
// jQuery(function($){
//   $( document ).ready(function() {
//     if( typeof product_variants_removed != undefined ) {  // was there items to be removed?
//       var $addToCartForm = $('form[action="/cart/add"]');
//       if (window.MutationObserver && $addToCartForm.length) {
//         if (typeof observer === 'object' && typeof observer.disconnect === 'function') {
//           observer.disconnect();
//         }
//         var config = { childList: true, subtree: true };
//         var observer = new MutationObserver(function() {
//           product_variants_removed.forEach(function(item){
//             $('.single-option-selector option').filter(function() { return $(this).text() === item; }).prop('disabled', true);
//           });
//           observer.disconnect();
//         });  
//         observer.observe($addToCartForm[0], config);
//         $('.single-option-selector').trigger('change');
//       }
//     }
//   });
//   $( document ).ready(function() {
//     if( typeof product_variants_removed != undefined ) {  // was there items to be removed?
//       var $addToCartForm = $('form[action="/cart/add"]');
//       if (window.MutationObserver && $addToCartForm.length) {
//         var config = { childList: true, subtree: true };
//         product_variants_removed.forEach(function(item){
//           $('.single-option-selector option').filter(function() { return $(this).text() === item; }).prop('disabled', true);
//         });    
//       }
//     }
//   });

// });

jQuery(function($){
  
  


  $.ajax({
    url: '/products/' + $('.product-handle').attr('product-handle')+ '.js',
    type: 'get',
    dataType: 'json',
    contentType: 'application/json',
    success: function (product) {
     
      var Var1 = "";
      var Var2 = "";
      var Var3 = "";
      $(product.variants).each(function (i, variant) {
//         console.log(variant);
       
        if(variant.available){
          console.log(variant.title);
//           console.log(inv_qty[ variant.id ]);
        var txt = variant.title;
        txt = txt.split('/')

         Var1 = txt[0].toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-$/, '').replace(/^-/, '');
         Var2 = Var2+","+txt[1];
         Var3 = txt[2];
        console.log("Var1"+Var1);
//              console.log("Var2"+Var2);
//             console.log("Var3"+Var3);
        $("."+Var1).attr("nextoption_value",Var2);
          $("."+Var1).attr("nextoption_value2",Var3);
        
        }
      });

      
      var $productForm = $('.product'); 
      const JSONData = $productForm.data('product');
      const productID = product.id;
      const productSection = '.product-' + productID + ' .js-product_section';
      const swatchOptions = $productForm.find('.swatch_options .swatch');
      if (swatchOptions.length > 1){
        Shopify.linkOptionSelectors(JSONData, productSection);
      }
      
      Shopify.updateOptionsInSelector = function(selectorIndex, parent) {
        console.log(selectorIndex);
        console.log(parent);
        switch (selectorIndex) {
          case 0:
            console.log('0');
            var key = 'root';
            var selector = $(parent + ' .single-option-selector:eq(0)');
            break;
          case 1:
            console.log('1');
            var key = $(parent + ' .single-option-selector:eq(0)').val();
            var selector = $(parent + ' .single-option-selector:eq(1)');
            break;
          case 2:
            console.log('2');
            var key = $(parent + ' .single-option-selector:eq(0)').val();
            key += ' / ' + $(parent + ' .single-option-selector:eq(1)').val();
            var selector = $(parent + ' .single-option-selector:eq(2)');
        }

        var availableOptions = Shopify.optionsMap[key];
        $(parent + ' .swatch[data-option-index="' + selectorIndex + '"] .swatch-element').each(function() {
          if ($.inArray($(this).attr('data-value'), availableOptions) !== -1) {
            $(this).removeClass('soldout').find(':radio').removeAttr('disabled','disabled').removeAttr('checked');
          }
          else {
            $(this).addClass('soldout').find(':radio').removeAttr('checked').attr('disabled','disabled');
          }
        });

      };
      Shopify.linkOptionSelectors = function(product, parent) {
        // Building our mapping object.
        Shopify.optionsMap = {};
        for (var i=0; i<product.variants.length; i++) {
          var variant = product.variants[i];
          if (variant.available) {
            // Gathering values for the 1st drop-down.
            Shopify.optionsMap['root'] = Shopify.optionsMap['root'] || [];
            Shopify.optionsMap['root'].push(variant.option1);
            Shopify.optionsMap['root'] = Shopify.uniq(Shopify.optionsMap['root']);
            // Gathering values for the 2nd drop-down.
            if (product.options.length > 1) {
              var key = variant.option1;
              Shopify.optionsMap[key] = Shopify.optionsMap[key] || [];
              Shopify.optionsMap[key].push(variant.option2);
              Shopify.optionsMap[key] = Shopify.uniq(Shopify.optionsMap[key]);
            }
            // Gathering values for the 3rd drop-down.
            if (product.options.length === 3) {
              var key = variant.option1 + ' / ' + variant.option2;
              Shopify.optionsMap[key] = Shopify.optionsMap[key] || [];
              Shopify.optionsMap[key].push(variant.option3);
              Shopify.optionsMap[key] = Shopify.uniq(Shopify.optionsMap[key]);
            }
          }
        }
        // Update options right away.
        Shopify.updateOptionsInSelector(0, parent);
        if (product.options.length > 1) Shopify.updateOptionsInSelector(1, parent);
        if (product.options.length === 3) Shopify.updateOptionsInSelector(2, parent);
        // When there is an update in the first dropdown.
        $(parent + " .single-option-selector:eq(0)").change(function() {
          Shopify.updateOptionsInSelector(1, parent);
          if (product.options.length === 3) Shopify.updateOptionsInSelector(2, parent);
          return true;
        });
        // When there is an update in the second dropdown.
        $(parent + " .single-option-selector:eq(1)").change(function() {
          if (product.options.length === 3) Shopify.updateOptionsInSelector(2, parent);
          return true;
        });
      };

//       $('body').on('change', '.swatch :radio', function() {
//         var optionIndex = $(this).closest('.swatch').attr('data-option-index');
//         var optionValue = $(this).val();
//         var parentForm = $(this).closest('.product__info-container');
//         if (parentForm.siblings('.notify_form').length){
//           var notifyForm = parentForm.siblings('.notify_form');
//         } else {
//           var notifyForm = $('.js-notify-form');
//         }

//         var option1 = parentForm.find('.swatch_options input:checked').eq(0).val();
//         var option2 = parentForm.find('.swatch_options input:checked').eq(1).val() || '';
//         var option3 = parentForm.find('.swatch_options input:checked').eq(2).val() || '';

//         if (option1 && option2 && option3){
//           var notifyMessage = option1 + ' / ' + option2 + ' / ' + option3;
//         } else if (option1 && option2){
//           var notifyMessage = option1 + ' / ' + option2;
//         } else {
//           var notifyMessage = option1;
//         }

//         $(product.variants).each(function (i, variant) {
//           console.log(variant);
//             console.log(inv_qty[ variant.id ]);
//           if(variant.available){
//         console.log(variant.title);
           
//           }
//         });
        
//         console.log(notifyMessage);


//         var txt = notifyMessage;
//         txt = txt.split('/')

//         var Var1 = txt[0];
//         var Var2 = txt[1];
//         var Var3 = txt[2]

//         //      console.log("Var1"+Var1);
//         //      console.log("Var2"+Var2);
//         //     console.log("Var3"+Var3);


//         notifyForm.find(".notify_form_message").attr("value", notifyForm.find(".notify_form_message").data('body') + " - " + notifyMessage );

//         $(this)
//         .closest('form')
//         .find('.single-option-selector')
//         .eq(optionIndex)
//         .val(optionValue)
//         .trigger('change');
//       });




    }
  });
});