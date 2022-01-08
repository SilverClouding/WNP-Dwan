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

//instagram slider
 jQuery(function($){
   
   setTimeout(function() {
    $('#insta-feed').slick({
       lazyLoad: 'ondemand',
      infinite: true,
      centerMode: true,
      centerPadding: '60px',
      slidesToShow: 5,
      responsive: [
        {
          breakpoint: 768,
          settings: {
             lazyLoad: 'ondemand',
            infinite: true,
            arrows: true,
            centerMode: true,
            centerPadding: '40px',
            slidesToShow: 3
          }
        },
        {
          breakpoint: 480,
          settings: {
             lazyLoad: 'ondemand',
            infinite: true,
            arrows: true,
            centerMode: true,
            centerPadding: '40px',
            slidesToShow: 1
          }
        }
      ]
    });
     $('#insta-feed').slick('slickGoTo', 3);
   $('#insta-feed').addClass('active');
   }, 3000);
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


    $('.'+trigger).siblings().removeClass('active');
    $('.'+trigger).addClass('active');
    
//     featured_col_Swiper();
//     featured_col_Swiper2();
    
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


//open qty popup

// $(document).ready(function() {
//   $("a.fancybox").fancybox()
// });
jQuery(function($){
  $(document).on('click', '.popup_minq', function(e){
     e.preventDefault();
    $('.open_popup_minq').addClass('active');
  });
  
  $(document).on('click', '.open_popup_minq_close', function(e){
     e.preventDefault();
    $(this).parents('.open_popup_minq').removeClass('active');
  });
  
});
























var theme = theme || {};
//disable soldout option in product page 
jQuery(function($){

  theme.varChangefunc = function(){
    $('body').on('change', '.option1_for_below_input.swatch :radio', function() {
      var thisValue = $(this).attr("value");
      var data_option1 = $(this).attr('data_option1');

      var data_option2 = $(this).attr('data_option2');
      var lastChar2 = data_option2.slice(-1);
      if (lastChar2 == ',') {
        data_option2 = data_option2.slice(0, -1);
      }

      var data_option3 = $(this).attr('data_option3');
      var lastChar3 = data_option3.slice(-1);
      if (lastChar3 == ',') {
        data_option3 = data_option3.slice(0, -1);
      }
      console.log(data_option2);
      var data_option2Array = data_option2.split(",");
      var allOption2 = '';
      $.each(data_option2Array,function(i){
        var triggerOption2 = data_option2Array[0].toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-$/, '').replace(/^-/, '');
        allOption2 = data_option2Array[i].toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-$/, '').replace(/^-/, '');
        console.log(i+"-"+data_option2Array[i].toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-$/, '').replace(/^-/, ''));
        //       $(".option2_for_below_input .input-"+allOption2).siblings("label").addClass('soldout');
        //        $(".option2_for_below_input .input-"+allOption2).siblings("label").removeClass('available');
        $(".option2_for_below_input label").addClass('soldout');
        $(".option2_for_below_input label").removeClass('available');
        $(".option2_for_below_input .input-"+triggerOption2).trigger('click'); 

        $(".option2_for_below_input .label-"+allOption2).removeClass('soldout');
        $(".option2_for_below_input .label-"+allOption2).addClass('available');
        $(".option2_for_below_input .label-"+triggerOption2).removeClass('soldout');
        $(".option2_for_below_input .label-"+triggerOption2).addClass('available');
      });

      var data_option3Array = data_option3.split(",");
      $.each(data_option3Array,function(i){
        var triggerOption3 = data_option3Array[0].toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-$/, '').replace(/^-/, '');
        var allOption3 = data_option3Array[i].toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-$/, '').replace(/^-/, '');
        //       console.log(triggerOption3);
        $(".option3_for_below_input label").addClass('soldout');
        $(".option3_for_below_input label").removeClass('available');
        $(".option3_for_below_input .input-"+triggerOption3).trigger('click'); 

        $(".option3_for_below_input .label-"+allOption3).removeClass('soldout');
        $(".option3_for_below_input .label-"+allOption3).addClass('available');
        $(".option3_for_below_input .label-"+triggerOption3).removeClass('soldout');
        $(".option3_for_below_input .label-"+triggerOption3).addClass('available');
      });


    });
  }

//  theme.varChangefunc();
      
});



  //   new quickview
jQuery(function($){
  $(document).on('click',".quick-view_new", function () {

    var openId = "#qv_"+$(this).attr('data-productid');
    //     $(openId).addClass('active');
    //     $(openId).show(); 

    // $('.qv-product-main-images').slick({
    //           dots: false,
    //           arrows: true,
    //           respondTo: 'min',
    //           useTransform: false,
    //           asNavFor: '.slider-nav'
    //         });

    //         $('.slider-nav').slick({
    //           slidesToShow: 4,
    //           slidesToScroll: 1,
    //           asNavFor: '.qv-product-main-images',
    //           dots: false,
    //           centerMode: false,
    //           focusOnSelect: true,
    //           arrows: false,
    //         });

    $.fancybox({
      href: "#qv_"+$(this).attr('data-productid'),
      maxWidth: 1040,
      maxHeight: 600,
      fitToView: true,
      width: '75%',
      height: '70%',
      autoSize: false,
      closeClick: false,
      openEffect: 'none',
      closeEffect: 'none',
      'afterShow': function () {
         console.log(theme.varChangefunc());
        $("#qv_"+$(this).attr('data-productid')).hide().html(content).css('opacity', '1').fadeIn(function () {
          $('.qv-product-main-images').addClass('loaded');
          $('.slider-nav').addClass('loaded');
        });

        $('.qv-product-main-images').slick({
          dots: false,
          arrows: true,
          respondTo: 'min',
          useTransform: false,
          asNavFor: '.slider-nav'
        });

        $('.slider-nav').slick({
          slidesToShow: 4,
          slidesToScroll: 1,
          asNavFor: '.qv-product-main-images',
          dots: false,
          centerMode: false,
          focusOnSelect: true,
          arrows: false,
        });

      },
      'afterClose': function () {
        $("#qv_"+$(this).attr('data-productid')).removeClass().empty();
        $('.qv-product-main-images').slick('unslick');
        $('.slider-nav').slick('unslick');
//         $.fancybox.defaults.hash = false;
        $('.open_popup_minq').removeClass('active');
        console.log('close');
      },
      'beforeLoad': function () {


      }



    });
  });

});


if(window._swat){
  window._swat.initializeActionButtons(".save-whishlist"); 
}else{ 
  window.SwymCallbacks = window.SwymCallbacks || []; 
  window.SwymCallbacks.push(function(){ window._swat.initializeActionButtons(".save-whishlist"); }); 
} 