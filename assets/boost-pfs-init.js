var boostPFS = new BoostPFS();
boostPFS.init(); 
if (typeof boostPFSConfig != 'undefined'
	&& typeof boostPFSConfig.general != 'undefined' 
	&& typeof boostPFSConfig.general.isInitFilter != 'undefined'
	&& typeof boostPFSThemeConfig != 'undefined'
	&& boostPFSConfig.general.isInitFilter === true) {
	boostPFS.initFilter(); 
} 
BoostPFS.jQ(window).on('load', function(){
	boostPFS.initSearchBox();
	boostPFS.initAnalytics();
//   window._swat.initializeActionButtons('#main-collection-product-grid', '.swym-button');

  console.log('boost-pfs-init.js');
  
});