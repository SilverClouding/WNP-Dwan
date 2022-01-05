//Quick View
jQuery(function($){

  $(document).ready(function () {
    $.getScript("//cdnjs.cloudflare.com/ajax/libs/fancybox/2.1.5/jquery.fancybox.min.js").done(function() {
      quickView();
    });
  });

  function quickView() {
    $('.qv_price__badge-new').hide();
    $('.qv_price__badge-sale').hide();
    $(document).on('click',".quick-view", function () {
      var productdata = $(this).data('product');
      console.log(productdata);
      
      
      if ($('#quick-view').length == 0){$("body").append('<div id="quick-view"></div>');}
      var product_handle = $(this).data('handle');
      $('#quick-view').addClass(product_handle);
      jQuery.getJSON('/products/' + product_handle + '.js', function (product) {
        console.log(product);
        var title = product.title;
        var type = product.vendor;
        var price = 0;
        var original_price = 0;
        var desc = product.description;
        var images = product.images;
        var variants = product.variants;
        var options = product.options;
        var url = '/products/' + product_handle;
        $('.qv-product-title').text(title);
        $('.qv-product-vendor').text(type);
        
        $('.qvswym').html('<button class="qvbutton-wishlist" data-swaction="addToWishlist" data-product-id="'+product.id+'" ></button>');
        console.log(window._swat);
        if(window._swat){ window._swat.initializeActionButtons(".qvbutton-wishlist"); }else{ window.SwymCallbacks = window.SwymCallbacks || []; window.SwymCallbacks.push(function(){ window._swat.initializeActionButtons(".qvbutton-wishlist"); }); }
        
        if (desc != ""){
        $('.qv-product-description').html(desc.substring(0, 150).split(" ").slice(0, -1).join(" ") + "...");
          $('.view-product').removeClass('hide');
          $('.view-product').attr('href', url);
        }
        
        
        var imageCount = $(images).length;
        $(images).each(function (i, image) {
          if (i == imageCount - 1) {
            var image_embed = '<div class="slide"><img src="' + image + '"></div>';
            image_embed = image_embed.replace('.jpg', '_800x.jpg').replace('.png', '_800x.png');
            $('.qv-product-main-images').append(image_embed);

            var image_embed_thumb = '<div class="slide"><img src="' + image + '"></div>';
            image_embed_thumb = image_embed_thumb.replace('.jpg', '_100x.jpg').replace('.png', '_100x.png');
            $('.qv-product-thumb-images').append(image_embed_thumb);

            $('.qv-product-main-images').slick({
              dots: false,
              arrows: true,
              respondTo: 'min',
              useTransform: false,
              asNavFor: '.slider-nav'
            }).css('opacity', '1');

            $('.slider-nav').slick({
              slidesToShow: 4,
              slidesToScroll: 1,
              asNavFor: '.qv-product-main-images',
              dots: false,
              centerMode: false,
              focusOnSelect: true,
              arrows: false,
            });


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
            image_embed = '<div class="slide"><img src="' + image + '"></div>';
            image_embed = image_embed.replace('.jpg', '_800x.jpg').replace('.png', '_800x.png');
            $('.qv-product-main-images').append(image_embed);
            
            image_embed_thumb = '<div class="slide"><img src="' + image + '"></div>';
            image_embed_thumb = image_embed_thumb.replace('.jpg', '_100x.jpg').replace('.png', '_100x.png');
            $('.qv-product-thumb-images').append(image_embed_thumb);
          }
        });
        $(options).each(function (i, option) {
          var opt = option.name;
          var selectClass = '.option.' + opt.toLowerCase();
//           $('.qv-product-options').append('<div class="option-selection-' + opt.toLowerCase() + '"><span class="option">' + opt + '</span><select class="option-' + i + ' option ' + opt.toLowerCase() + '"></select></div>');
          $('.qv-product-options').append('<div class="option-selection-' + opt.toLowerCase() + '"><span class="option">' + opt + '</span><div class="option-' + i + ' option ' + opt.toLowerCase() + '"></div></div>');
       
          $(option.values).each(function (i, value) {
//             $('.option.' + opt.toLowerCase()).append('<option value="' + value + '">' + value + '</option>');
            var checked = '';
            if(i == 0){
            checked = 'checked';
            }else{
             checked = '';
            }
            
            
            $('.option.' + opt.toLowerCase()).append('<input '+checked+' class="radio_butt" index="'+i+'"type="radio" id="'+opt.toLowerCase()+'_'+value.toLowerCase().replace(/\s/g, '')+'" name="'+opt+'" value="'+value+'" form=""><label for="'+opt.toLowerCase()+'_'+value.toLowerCase().replace(/\s/g, '')+'">'+value+'</label>');
            
          });
        });
        $(product.variants).each(function (i, v) {
         
          if (v.available == false) {
            $('.qv-add-button').prop('disabled', true).val('Sold Out');
            $('.qv-add-to-cart').hide();
            $('.qv-product-price').text('Sold Out').show();
            return true
          } else { 
            console.log( v);
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
        
        
        $(product.tags).each(function (i, v) {
          if (v.indexOf('New') > -1){
            console.log(v);
            $('.qv_price__badge-new').addClass('show');
          }else{
            if(product.compare_at_price > product.price ){
              $('.qv_price__badge-sale').addClass('show');
            }

          }
        });
        
        
        
      });

      $(document).on("change", "#quick-view select, .radio_butt", function () {
         console.log($('.radio_butt').val());
        var selectedOptions = '';
        $('#quick-view  select, .radio_butt:checked').each(function (i) {
          if (selectedOptions == '') {
            selectedOptions = $(this).val();
          } else {
            selectedOptions = selectedOptions + ' / ' + $(this).val();
          }
        });
        console.log( selectedOptions );
        
        jQuery.getJSON('/products/' + product_handle + '.js', function (product) {

          $(product.variants).each(function (i, v) {
           
            if (v.title == selectedOptions) { 
              var price = parseFloat(v.price / 100).toFixed(2);
              var original_price = parseFloat(v.compare_at_price / 100).toFixed(2);
              var v_qty = v.inventory_quantity;
              var v_inv = v.inventory_management;
              console.log(v);
              $('.qv-product-price').text('$' + price);
              $('.qv-product-original-price').text('$' + original_price);
              if (v_inv == null) {
                $('.qv-add-button').prop('disabled', false).val('Add to Cart');
              } else {
                if (v.available) {
                $('.qv-add-button').prop('disabled', false).val('Add to Cart');
                } else {
                   $('.qv-add-button').prop('disabled', true).val('Sold Out'); 
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
            $('#quick-view select, .radio_butt:checked').each(function (i) {
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


                // $('.qv-add-to-cart-response').addClass('success').html('<span>' + $('.qv-product-title').text() + ' has been added to your cart. <a href="/cart">Click here to view your cart.</a>');


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
            $('.qv-product-main-images').addClass('loaded');
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
      $('.qv-product-main-images').slick('setPosition');
    }
  });


});

