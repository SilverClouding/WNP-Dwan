var boostPFS = new BoostPFS();
boostPFS.init(); 
if (typeof boostPFSConfig != 'undefined'
	&& typeof boostPFSConfig.general != 'undefined' 
	&& typeof boostPFSConfig.general.isInitFilter != 'undefined'
	&& typeof boostPFSThemeConfig != 'undefined'
	&& boostPFSConfig.general.isInitFilter === true) {
	boostPFS.initFilter(); console.log('boost-pfs-init.js 1');
} 
BoostPFS.jQ(window).on('load', function(){
	boostPFS.initSearchBox();
	boostPFS.initAnalytics();
//   window._swat.initializeActionButtons('#main-collection-product-grid', '.swym-button');
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
  console.log('boost-pfs-init.js');
  
});