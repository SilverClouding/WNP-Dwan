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
  $(document).on('click','.mega_parent',function(e){
    e.preventDefault();
    $(this).siblings().removeClass('active');
    $(this).toggleClass('active');
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
      if(days > 2){
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
    $(".error-fields").text("Please fill the filds");
  });
  
  
});