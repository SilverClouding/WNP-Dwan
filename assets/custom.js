// announcement slideShow
const announcement_text_slider = new Swiper('.announcement_text_slider', {
  autoHeight: false,
  centeredSlides: true,
  freeMode: false,
  loop: true,
  autoplay: {
    delay: 2500,
    disableOnInteraction: false,
  },
});


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
}
function featured_col_Swiper2(){
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


// always page go top after page load
 document.body.scrollTop = document.documentElement.scrollTop = 0;

//Quick View
jQuery(function($){

  $(document).ready(function () {
    $.getScript("//cdnjs.cloudflare.com/ajax/libs/fancybox/2.1.5/jquery.fancybox.min.js").done(function() {
      quickView();
    });
  });

  function quickView() {
    $(document).on('click',".quick-view", function () {
      if ($('#quick-view').length == 0){$("body").append('<div id="quick-view"></div>');}
      var product_handle = $(this).data('handle');
      $('#quick-view').addClass(product_handle);
      jQuery.getJSON('/products/' + product_handle + '.js', function (product) {
        var title = product.title;
        var type = product.type;
        var price = 0;
        var original_price = 0;
        var desc = product.description;
        var images = product.images;
        var variants = product.variants;
        var options = product.options;
        var url = '/products/' + product_handle;
        $('.qv-product-title').text(title);
        $('.qv-product-type').text(type);
        $('.qv-product-description').html(desc.substring(0, 300).split(" ").slice(0, -1).join(" ") + "...");
        $('.view-product').attr('href', url);
        var imageCount = $(images).length;
        console.log(imageCount);
        $(images).each(function (i, image) {
          if (i == imageCount - 1) {
            var image_embed = '<div class="swiper-slide"><img src="' + image + '"></div>';
            image_embed = image_embed.replace('.jpg', '_800x.jpg').replace('.png', '_800x.png');
            $('.qv-product-images').append(image_embed);

            $('.qv-product-images').slick({
              'dots': false,
              'arrows': false,
              'respondTo': 'min',
              'useTransform': false
            }).css('opacity', '1');

            //           const swiper = new Swiper('.qv_img_slider', {
            //             autoHeight: false,
            //             effect: "fade",

            //             // If we need pagination
            //             pagination: {
            //               el: '.swiper-pagination',
            //             },

            //             // Navigation arrows
            //             navigation: {
            //               nextEl: '.swiper-button-next',
            //               prevEl: '.swiper-button-prev',
            //             },

            //             // And if we need scrollbar
            //             scrollbar: {
            //               el: '.swiper-scrollbar',
            //             },
            //           });


          } else {
            image_embed = '<div class="swiper-slide"><img src="' + image + '"></div>';
            image_embed = image_embed.replace('.jpg', '_800x.jpg').replace('.png', '_800x.png');
            $('.qv-product-images').append(image_embed);
          }
        });
        $(options).each(function (i, option) {
          var opt = option.name;
          var selectClass = '.option.' + opt.toLowerCase();
          $('.qv-product-options').append('<div class="option-selection-' + opt.toLowerCase() + '"><span class="option">' + opt + '</span><select class="option-' + i + ' option ' + opt.toLowerCase() + '"></select></div>');
          $(option.values).each(function (i, value) {
            $('.option.' + opt.toLowerCase()).append('<option value="' + value + '">' + value + '</option>');
          });
        });
        $(product.variants).each(function (i, v) {
          console.log( v);
          if (v.available == false) {
            $('.qv-add-button').prop('disabled', true).val('Sold Out');
            $('.qv-add-to-cart').hide();
            $('.qv-product-price').text('Sold Out').show();
            return true
          } else {
            price = parseFloat(v.price / 100).toFixed(2);
            original_price = parseFloat(v.compare_at_price / 100).toFixed(2);
            $('.qv-product-price').text('$' + price);
            if (original_price > 0) {
              $('.qv-product-original-price').text('$' + original_price).show();
            } else {
              $('.qv-product-original-price').hide();
            }
            $('select.option-0').val(v.option1);
            $('select.option-1').val(v.option2);
            $('select.option-2').val(v.option3);
            return false
          }
        });
      });

      $(document).on("change", "#quick-view select", function () {
        var selectedOptions = '';
        $('#quick-view select').each(function (i) {
          if (selectedOptions == '') {
            selectedOptions = $(this).val();
          } else {
            selectedOptions = selectedOptions + ' / ' + $(this).val();
          }
        });
        jQuery.getJSON('/products/' + product_handle + '.js', function (product) {

          $(product.variants).each(function (i, v) {
            if (v.title == selectedOptions) {
              var price = parseFloat(v.price / 100).toFixed(2);
              var original_price = parseFloat(v.compare_at_price / 100).toFixed(2);
              var v_qty = v.inventory_quantity;
              var v_inv = v.inventory_management;
              $('.qv-product-price').text('$' + price);
              $('.qv-product-original-price').text('$' + original_price);
              if (v_inv == null) {
                $('.qv-add-button').prop('disabled', false).val('Add to Cart');
              } else {
                if (v.inventory_quantity < 1) {
                  $('.qv-add-button').prop('disabled', true).val('Sold Out');
                } else {
                  $('.qv-add-button').prop('disabled', false).val('Add to Cart');
                }
              }
            }
          });
        });
      });
      $.fancybox({
        href: '#quick-view',
        maxWidth: 1040,
        maxHeight: 600,
        fitToView: true,
        width: '75%',
        height: '70%',
        autoSize: false,
        closeClick: false,
        openEffect: 'none',
        closeEffect: 'none',
        'beforeLoad': function () {
          var product_handle = $('#quick-view').attr('class');
          $(document).on("click", ".qv-add-button", function () {
            var qty = $('.qv-quantity').val();
            var selectedOptions = '';
            var var_id = '';
            $('#quick-view select').each(function (i) {
              if (selectedOptions == '') {
                selectedOptions = $(this).val();
              } else {
                selectedOptions = selectedOptions + ' / ' + $(this).val();
              }
            });
            jQuery.getJSON('/products/' + product_handle + '.js', function (product) {
              $(product.variants).each(function (i, v) {
                if (v.title == selectedOptions) {
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


                //                 $('.qv-add-to-cart-response').addClass('success').html('<span>' + $('.qv-product-title').text() + ' has been added to your cart. <a href="/cart">Click here to view your cart.</a>');


              })
              .fail(function ($xhr) {
                var data = $xhr.responseJSON;
                $('.qv-add-to-cart-response').addClass('error').html('<span><b>ERROR: </b>' + data.description);
              });


            }
          });
          $('.fancybox-wrap').css('overflow', 'hidden !important');
        },
        'afterShow': function () {
          $('#quick-view').hide().html(content).css('opacity', '1').fadeIn(function () {
            $('.qv-product-images').addClass('loaded');
          });
        },
        'afterClose': function () {
          $('#quick-view').removeClass().empty();
        }
      });
    });
  };

  $(window).resize(function () {
    if ($('#quick-view').is(':visible')) {
      $('.qv-product-images').slick('setPosition');
    }
  });


});



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
  $(document).on('click','.mega_parent',function(e){
    e.preventDefault();
    var targetData = $(this).attr('terget_megamenu');
    $('[data-dropdown='+targetData+']').parents(".mega-menu-section").siblings().removeClass('active');
    $('[data-dropdown='+targetData+']').parents(".mega-menu-section").toggleClass('active');
    console.log(targetData)
  });

  // for sticky menu
  $(document).on('click','.level_1_item ',function(e){
    e.preventDefault();
    var triger_megamenu = $(this).attr('triger_megamenu');
    $(this).siblings().removeClass('active');
    $(this).addClass('active');
    $('[data-dropdown='+triger_megamenu+']').parents(".mega-menu-section").siblings().removeClass('active');
    $('[data-dropdown='+triger_megamenu+']').parents(".mega-menu-section").toggleClass('active');
  });


  $(document).on('click','.humbergerfor_sticky svg',function(e){

    $(this).parent().toggleClass('open');
    $(".mega-menu-container.do-sticky").toggleClass('active');
    $('#shopify-section-mega-menu-1').addClass('active');
    $('.main_nav_1').addClass('active');
  });
});