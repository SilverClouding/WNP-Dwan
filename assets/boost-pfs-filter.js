// Fix the confict suggestion search in Debut theme
if (typeof theme !== 'undefined' && theme.hasOwnProperty('settings')) theme.settings.predictiveSearchEnabled = false;
// Override Settings
var boostPFSFilterConfig = {
	general: {
		limit: boostPFSConfig.custom.products_per_page,
		loadProductFirst: true,
		numberFilterTree: 2,
		filterTreeMobileStyle: 'style2'
	},
};

(function () {
	var onSale = false,
		soldOut = false,
        
		priceVaries = false,
		images = [],
		boostPFSRangeWidths = [165, 360, 533, 720, 940, 1066];


	BoostPFS.inject(this);

	/************************** CUSTOMIZE DATA BEFORE BUILDING PRODUCT ITEM **************************/
	function prepareShopifyData(data) {
		// Displaying price base on the policy of Shopify, have to multiple by 100
		soldOut = !data.available; // Check a product is out of stock
		onSale = data.compare_at_price_min > data.price_min; // Check a product is on sale
		priceVaries = data.price_min != data.price_max; // Check a product has many prices
      
    
      
      
		// Convert images to array
		images = data.images_info;
		// Get First Variant (selected_or_first_available_variant)
		firstVariant = data['variants'][0];
		if (Utils.getParam('variant') !== null && Utils.getParam('variant') != '') {
			var paramVariant = data.variants.filter(function (e) {
				return e.id == Utils.getParam('variant');
			});
			if (typeof paramVariant[0] !== 'undefined') firstVariant = paramVariant[0];
		} else {
			for (var i = 0; i < data['variants'].length; i++) {
				if (data['variants'][i].available) {
					firstVariant = data['variants'][i];
					break;
				}
			}
		}
		return data;
	}

	/************************** END CUSTOMIZE DATA BEFORE BUILDING PRODUCT ITEM **************************/
	/************************** BUILD PRODUCT LIST **************************/
	// Build Product Grid Item
	ProductGridItem.prototype.compileTemplate = function (data) {
		if (!data) data = this.data;
		// Customize API data to get the Shopify data
		data = prepareShopifyData(data);

		// Get Template
		var itemHtml = boostPFSTemplate.productGridItemHtml; 
//       console.log(data);
		// Add Custom class
		var soldOutClass = soldOut ? boostPFSTemplate.soldOutClass : '';
		var saleClass = onSale ? boostPFSTemplate.saleClass : '';

		itemHtml = itemHtml.replace(/{{soldOutClass}}/g, soldOutClass);

		itemHtml = itemHtml.replace(/{{saleClass}}/g, saleClass);

		// Add Card product class
		itemHtml = itemHtml.replace(/{{cardProductClass}}/g, buildCardProductClass());
		// Add sold out Label
		itemHtml = itemHtml.replace(/{{itemSoldOut}}/g, buildSoldOutLabel());
      
  
    
		// Add sale Label
		itemHtml = itemHtml.replace(/{{itemSale}}/g, buildSaleLabel(data));
    
      
		// Add Images
		itemHtml = itemHtml.replace(/{{itemImages}}/g, buildImages(data));
		// Add Price
		itemHtml = itemHtml.replace(/{{itemPrice}}/g, buildPrice(data));

       itemHtml = itemHtml.replace(/{{itemWishlist}}/g, addtowishlist_heart_icon(data));
       itemHtml = itemHtml.replace(/{{addtowishlist_btn}}/g, addtowishlist_btn(data));
      
		// Add Review
		if (typeof Integration === 'undefined' ||
			(typeof Integration != 'undefined' &&
				typeof Integration.hascompileTemplate == 'function' &&
				!Integration.hascompileTemplate('reviews'))) {
			itemHtml = itemHtml.replace(/{{itemReviews}}/g, buildReview(data));
		}

      //min_qty_indicator
      itemHtml = itemHtml.replace(/{{min_qty_indicator}}/g, min_qty_indicator(data));
		// Add Vendor
		itemHtml = itemHtml.replace(/{{itemVendor}}/g, buildVendor(data));

		// Add main attribute (Always put at the end of this function)
		itemHtml = itemHtml.replace(/{{itemId}}/g, data.id);
		itemHtml = itemHtml.replace(/{{itemTitle}}/g, data.title);
		itemHtml = itemHtml.replace(/{{itemHandle}}/g, data.handle);
		itemHtml = itemHtml.replace(/{{itemVendorLabel}}/g, data.vendor);
		itemHtml = itemHtml.replace(/{{itemUrl}}/g, Utils.buildProductItemUrl(data));
		return itemHtml;
	};

	/************************** END BUILD PRODUCT LIST **************************/
	/************************** BUILD PRODUCT ITEM ELEMENTS **************************/
	function buildImages(data) {
		var html = '',
			aspectRatio = '',
			rangeWidths = boostPFSRangeWidths,
			paddingBottom = 100;

		var dataSrcSet = '',
			imgAlt = data.title,
			flipImageSrcSet = '';

		var activeSwapImage = !Utils.isMobile() && images.length > 1 &&
			boostPFSThemeConfig.custom.hasOwnProperty('show_secondary_image') &&
			boostPFSThemeConfig.custom.show_secondary_image == true;

		for (var i = 0; i < rangeWidths.length; i++) {
			dataSrcSet += Utils.getFeaturedImage(images, rangeWidths[i] + 'x') + ' ' + rangeWidths[i] + 'w';

			if (activeSwapImage) {
				flipImageSrcSet += Utils.optimizeImage(images[1]['src'], rangeWidths[i] + 'x') + ' ' + rangeWidths[i] + 'w';
			}

			if (i < rangeWidths.length - 1) {
				dataSrcSet += ', ';

				if (activeSwapImage) {
					flipImageSrcSet += ', ';
				}
			}
		}

      
		if (images.length > 0) {
			aspectRatio = images[0]['width'] / images[0]['height'];
			paddingBottom = 1 / aspectRatio * 100;

			html += '<div';
			if (boostPFSThemeConfig.custom.hasOwnProperty('add_image_padding') &&
				boostPFSThemeConfig.custom.add_image_padding === true) {
				html += ' class="card__media-full-spacer"';
			}
			html += '>';
			html += '<div class="media media--transparent media--';
			if (boostPFSThemeConfig.custom.hasOwnProperty('media_size')) {
				html += boostPFSThemeConfig.custom.media_size;
			}
			html += ' media--hover-effect"';
			if (boostPFSThemeConfig.custom.hasOwnProperty('media_size') &&
				boostPFSThemeConfig.custom.media_size == 'adapt' &&
				images.length > 0) {
				html += ' style="padding-bottom: ' + paddingBottom + '%"';
			}
			html += '>'
			html += '<img class="motion-reduce"' +
				'loading="lazy"' +
				'srcset="' + dataSrcSet + '" ' +
				'height="' + images[0].height + '" ' +
				'width="' + images[0].width + '" ' +
				'sizes="(min-width: 1100px) 535px, (min-width: 750px) calc((100vw - 130px) / 2), calc((100vw - 50px) / 2)"' +
				'src="' + Utils.optimizeImage(images[0].src, '533x') + '" ' +
				'alt="' + imgAlt + '" />';

			if (activeSwapImage) {
				html += '<img class="motion-reduce"' +
				'loading="lazy"' +
				'srcset="' + flipImageSrcSet + '" ' +
				'height="' + images[1].height + '" ' +
				'width="' + images[1].width + '" ' +
				'sizes="(min-width: 1100px) 535px, (min-width: 750px) calc((100vw - 130px) / 2), calc((100vw - 50px) / 2)"' +
				'src="' + Utils.optimizeImage(images[1].src, '533x') + '" ' +
				'alt="' + imgAlt + '" />';
			}
			html += '</div>';
			html += '</div>';
		} else {
			html += '<div class="card__content"><h2 class="card__text h2">' + data.title  + '</h2></div>'
		}
		return html;
	}

    function min_qty_indicator(product){
        var html = '';
        var data_tagArray = product.tags;
        data_tagArray.forEach(function(v,i){
          if(v.indexOf("min-qty:")> -1){
            var qtyTagArray = v.split(":");
            html = ` <p>Minimum quantity of ${qtyTagArray[1]} <span class="popup_minq"><a href="#one" class="fancybox"><svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M7.49968 0C3.3581 0 0 3.3581 0 7.49968C0 11.6413 3.3581 15 7.49968 15C11.6413 15 15 11.6413 15 7.49968C15 3.3581 11.6413 0 7.49968 0ZM9.06095 11.6235C8.67492 11.7759 8.36762 11.8914 8.13714 11.9714C7.9073 12.0514 7.64 12.0914 7.33587 12.0914C6.86857 12.0914 6.50476 11.9771 6.24571 11.7492C5.98667 11.5213 5.85778 11.2324 5.85778 10.8813C5.85778 10.7448 5.8673 10.6051 5.88635 10.4629C5.90603 10.3206 5.93714 10.1606 5.97968 9.98095L6.46286 8.27429C6.5054 8.11048 6.54222 7.95492 6.57143 7.81016C6.60064 7.66413 6.6146 7.53016 6.6146 7.40825C6.6146 7.19111 6.56952 7.03873 6.48 6.95302C6.38921 6.8673 6.21841 6.8254 5.96381 6.8254C5.83937 6.8254 5.71111 6.84381 5.57968 6.88254C5.44952 6.92254 5.33651 6.95873 5.24381 6.99429L5.37143 6.46857C5.68762 6.33968 5.99048 6.22921 6.27937 6.13778C6.56825 6.04508 6.84127 5.99937 7.09841 5.99937C7.56254 5.99937 7.92064 6.11238 8.1727 6.33587C8.42349 6.56 8.54984 6.85143 8.54984 7.20952C8.54984 7.28381 8.54095 7.4146 8.52381 7.60127C8.50667 7.78857 8.47429 7.95937 8.4273 8.11619L7.94667 9.81778C7.9073 9.95429 7.87238 10.1105 7.84064 10.2851C7.80952 10.4597 7.79429 10.593 7.79429 10.6825C7.79429 10.9086 7.84444 11.0629 7.94603 11.1448C8.04635 11.2267 8.22222 11.2679 8.47111 11.2679C8.58857 11.2679 8.72 11.247 8.86857 11.2063C9.01587 11.1657 9.12254 11.1295 9.18984 11.0984L9.06095 11.6235ZM8.97587 4.71683C8.75175 4.92508 8.4819 5.02921 8.16635 5.02921C7.85143 5.02921 7.57968 4.92508 7.35365 4.71683C7.12889 4.50857 7.01524 4.25524 7.01524 3.95937C7.01524 3.66413 7.12952 3.41016 7.35365 3.2C7.57968 2.98921 7.85143 2.88444 8.16635 2.88444C8.4819 2.88444 8.75238 2.98921 8.97587 3.2C9.2 3.41016 9.31238 3.66413 9.31238 3.95937C9.31238 4.25587 9.2 4.50857 8.97587 4.71683Z" fill="#44444D"/>
                      </svg>
                      </a></span>
                      </p>`
          }
        });
        return html;
      }

	function buildCardProductClass() {
		var html = '';
		if (!images || (images && images.length === 0)) {
			html = 'card--text-only card--soft';
		} else if(boostPFSThemeConfig.custom.hasOwnProperty('show_image_outline') && boostPFSThemeConfig.custom.show_image_outline){
      html = 'card--outline';
    }
		return html;
	}

	function buildVendor(data) {
		var html = '';
		if (boostPFSThemeConfig.custom.hasOwnProperty('show_vendor') &&
			boostPFSThemeConfig.custom.show_vendor === true) {
			html = boostPFSTemplate.vendorHtml;
		}
		return html;
	}
  
  	function addtowishlist_btn(data) { 

    /* Swym integration */
var itemWishlistHtml = '<button class="swym-button swym-add-to-wishlist-view-product product_{{itemId}}" data-swaction="addToWishlist"  data-product-id="' + JSON.stringify(data.id) + '">Add to wishlist</button>';
    
    
    return itemWishlistHtml;
  }
  
  	function addtowishlist_heart_icon(data) { 
  var itemWishlistHtml_heart = '<button class="swym-button swym-add-to-wishlist-view-product product_{{itemId}}" data-swaction="addToWishlist"  data-product-id="' + JSON.stringify(data.id) + '"></button>';
    return itemWishlistHtml_heart;
  }
  
	function buildPrice(data) {
		var html = '';
		var noComparePrice = data.price_varies === false && data.compare_at_price_varies;
		var priceAmount = boostPFSConfig.custom.currency_code_enabled ? Utils.formatMoney(data.price_min, 'money_with_currency') : Utils.formatMoney(data.price_min);
		var compareAtPrice = boostPFSConfig.custom.currency_code_enabled ? Utils.formatMoney(data.compare_at_price_min, 'money_with_currency') : Utils.formatMoney(data.compare_at_price_min);
		var moneyPrice = priceVaries ? boostPFSConfig.label.from_price_html.replace(/{{ price }}/, priceAmount)
			: priceAmount;
		var unitPriceClass = !data.available || typeof data?.selected_or_first_available_variant?.unit_price_measurement === 'undefined' ? 'hidden' : ''
		html = `<div class="price ${soldOut ? 'price--sold-out' : ''} ${onSale ? 'price--on-sale' : ''}${noComparePrice ? 'price--no-compare' : ''}">
					<div>
						<div class="price__regular">
							<span class="visually-hidden visually-hidden--inline">
								${boostPFSConfig.label.regular_price}
							</span>
							<span class="price-item price-item--regular">
								${moneyPrice}
							</span>
						</div>
						<div class="price__sale">
							<span class="visually-hidden visually-hidden--inline">
								${boostPFSConfig.label.regular_price}
							</span>
							<span>
								<s class="price-item price-item--regular">
									${compareAtPrice}
								</s>
							</span>
							<span class="visually-hidden visually-hidden--inline">${boostPFSConfig.label.sale_price}</span>
							<span class="price-item price-item--sale price-item--last">
								${moneyPrice}
							</span>
						</div>
						<small class="unit-price caption ${unitPriceClass}">
							<span class="visually-hidden">${boostPFSConfig.label.unit_price}</span>
							<span class="price-item price-item--last">
								<span>${Utils.formatMoney(data.selected_or_first_available_variant && data.selected_or_first_available_variant.unit_price)}</span>
								<span aria-hidden="true">/</span>
								<span class="visually-hidden">&nbsp;${boostPFSConfig.label.unit_price_separator}&nbsp;</span>
							</span>
					  </small>
					</div>
				</div>`
		return html;
	}

	function buildSoldOutLabel() {
		// Build Sold out label
		var soldOutLabel = '';
		if (boostPFSThemeConfig.custom.hasOwnProperty('sold_out_badge_color_scheme') && soldOut) {
			soldOutLabel = boostPFSTemplate.soldOutLabelHtml.replace(/{{soldOutBadgeClass}}/g, boostPFSThemeConfig.custom.sold_out_badge_color_scheme);
		}
		return soldOutLabel;
	}
	
  	function buildSaleLabel(data) {
        
        //       newtag
        var data_tagArray = data.tags;
        var NewTag = false;
//         console.log(data_tagArray);
        data_tagArray.forEach(function(v,i){
          if(v == 'New'){
            NewTag = true;
//               console.log(v+"-"+i);
          }

        });

        // Build Sale label
        var saleLabel = '';
//         console.log(NewTag);
        if(NewTag){
          saleLabel=`<span class="badge badge--bottom-left color-${boostPFSThemeConfig.custom.sale_badge_color_scheme} new-btn">${boostPFSThemeConfig.label.new_badge}</span>`;
        }else{
          if (boostPFSThemeConfig.custom.hasOwnProperty('sale_badge_color_scheme') && onSale && !soldOut) {
            saleLabel = boostPFSTemplate.saleLabelHtml.replace(/{{saleBadgeClass}}/g, boostPFSThemeConfig.custom.sale_badge_color_scheme);
          }
        }
        
        return saleLabel;
      }

	function buildReview(data) {
		var html = '';
		if (boostPFSThemeConfig.custom.hasOwnProperty('show_product_review') &&
			boostPFSThemeConfig.custom.show_product_review == true && Utils.getProductMetafield(data, 'reviews', 'rating') !== null) {
			var ratingObj = JSON.parse(Utils.getProductMetafield(data, 'reviews', 'rating'));
      var rating_decimal = 0;
      var decimal = parseFloat(ratingObj.value.rating);
      if (decimal >=0.3 && decimal <= 0.7) {
        rating_decimal = 0.5;
      } else if (decimal > 0.7) {
        rating_decimal = 1;
      }
          
          
      html = `<div class="rating" role="img" aria-label="${boostPFSConfig.label.star_reviews_info.replace('{{ rating_value }}', ratingObj.value).replace('{{ rating_max }}', ratingObj.value.scale_max)}">
                <span aria-hidden="true" class="rating-star color-icon-${boostPFSConfig.custom.accent_icons}" style="--rating: ${Math.round(ratingObj.value.rating)}; --rating-max: ${ratingObj.value.scale_max}; --rating-decimal: ${rating_decimal};"></span>
              </div>
              <p class="rating-text caption">
                <span aria-hidden="true">${ratingObj.value} / ${ratingObj.value.scale_max}</span>
              </p>
              <p class="rating-count caption">
                <span aria-hidden="true">(${Utils.getProductMetafield(data, 'reviews', 'rating_count')})</span>
                <span class="visually-hidden">${Utils.getProductMetafield(data, 'reviews', 'rating_count')} ${boostPFSConfig.label.total_reviews}</span>
              </p>

 <div class="ruk_rating_snippet" data-sku="${ data.handle };${ data.variants[0].sku };${ data.variants[0].id }"></div>
      
`;
		}
		return html;
	}

	/************************** END BUILD PRODUCT ITEM ELEMENTS **************************/
	/************************** BUILD TOOLBAR **************************/
	// Build Pagination
	ProductPaginationDefault.prototype.compileTemplate = function (totalProduct) {
		if (!totalProduct) totalProduct = this.totalProduct;
		// Get page info
		var currentPage = parseInt(Globals.queryParams.page);
		var totalPage = Math.ceil(totalProduct / Globals.queryParams.limit);
		// If it has only one page, clear Pagination
		if (totalPage <= 1) {
			return '';
		}

		var paginationHtml = boostPFSTemplate.paginateHtml;
		// Build Previous
		var previousHtml = (currentPage > 1) ? boostPFSTemplate.previousActiveHtml : '';
		previousHtml = previousHtml.replace(/{{itemUrl}}/g, Utils.buildToolbarLink('page', currentPage, currentPage - 1));
		paginationHtml = paginationHtml.replace(/{{previous}}/g, previousHtml);
		// Build Next
		var nextHtml = (currentPage < totalPage) ? boostPFSTemplate.nextActiveHtml : '';
		nextHtml = nextHtml.replace(/{{itemUrl}}/g, Utils.buildToolbarLink('page', currentPage, currentPage + 1));
		paginationHtml = paginationHtml.replace(/{{next}}/g, nextHtml);
		// Create page items array
		var beforeCurrentPageArr = [];
		for (var iBefore = currentPage - 1; iBefore > currentPage - 3 && iBefore > 0; iBefore--) {
			beforeCurrentPageArr.unshift(iBefore);
		}
		if (currentPage - 4 > 0) {
			beforeCurrentPageArr.unshift('...');
		}
		if (currentPage - 4 >= 0) {
			beforeCurrentPageArr.unshift(1);
		}
		beforeCurrentPageArr.push(currentPage);
		var afterCurrentPageArr = [];
		for (var iAfter = currentPage + 1; iAfter < currentPage + 3 && iAfter <= totalPage; iAfter++) {
			afterCurrentPageArr.push(iAfter);
		}
		if (currentPage + 3 < totalPage) {
			afterCurrentPageArr.push('...');
		}
		if (currentPage + 3 <= totalPage) {
			afterCurrentPageArr.push(totalPage);
		}
		// Build page items
		var pageItemsHtml = '';
		var pageArr = beforeCurrentPageArr.concat(afterCurrentPageArr);
		for (var iPage = 0; iPage < pageArr.length; iPage++) {
			if (pageArr[iPage] == '...') {
				pageItemsHtml += boostPFSTemplate.pageItemRemainHtml;
			} else {
				pageItemsHtml += (pageArr[iPage] == currentPage) ? boostPFSTemplate.pageItemSelectedHtml : boostPFSTemplate.pageItemHtml;
			}
			pageItemsHtml = pageItemsHtml.replace(/{{itemTitle}}/g, pageArr[iPage]);
			pageItemsHtml = pageItemsHtml.replace(/{{itemUrl}}/g, Utils.buildToolbarLink('page', currentPage, pageArr[iPage]));
		}
		paginationHtml = paginationHtml.replace(/{{pageItems}}/g, pageItemsHtml);
		return paginationHtml;
	};

	// Build Sorting
	ProductSorting.prototype.compileTemplate = function () {
		var html = '';
		if (boostPFSTemplate.hasOwnProperty('sortingHtml')) {
			var sortingArr = Utils.getSortingList();
			if (sortingArr) {
				var paramSort = Globals.queryParams.sort || '';
				// Build content
				var sortingItemsHtml = '';
				for (var k in sortingArr) {
					var isSelected = ''
					if(paramSort == k) {
						isSelected = 'selected="selected"'
					}
					sortingItemsHtml += '<option value="' + k + '"' + isSelected + '>' + sortingArr[k] + '</option>';
				}
				html = boostPFSTemplate.sortingHtml.replace(/{{sortingItems}}/g, sortingItemsHtml);
			}
		}
		return html;
	};

	ProductSorting.prototype.render = function () {
		jQ(Selector.topSorting).html(this.compileTemplate());

		if (jQ('.boost-pfs-filter-custom-sorting').hasClass('boost-pfs-filter-sort-active')) {
			jQ('.boost-pfs-filter-custom-sorting').toggleClass('boost-pfs-filter-sort-active');
		}

		var labelSort = '';
		var paramSort = Globals.queryParams.sort || '';
		var sortingList = Utils.getSortingList();
		if (paramSort.length > 0 && sortingList && sortingList[paramSort]) {
			labelSort = sortingList[paramSort];
		} else {
			labelSort = Labels.sorting_heading;
		}

		jQ('.boost-pfs-filter-custom-sorting button span span').text(labelSort);
	}

	// Build Sorting event
	ProductSorting.prototype.bindEvents = function() {
		jQ(Selector.topSorting + ' .facet-filters__sort').change(function(e) {
			e.preventDefault();
			FilterApi.setParam('sort', jQ(this).val());
			FilterApi.setParam('page', 1);
			FilterApi.applyFilter('sort');
		});
	};

  // Add additional feature for product list, used commonly in customizing product list
	ProductList.prototype.afterRender = function(data) {
		if (!data) data = this.data;
      /** Start Swym integration **/
      window.SwymCallbacks = window.SwymCallbacks || [];
      window.SwymCallbacks.push(function(swat) { 
        // Wrap with callback for loading without additional checks
        var products = [];
        data.forEach(function(product) {
          var image_src = Utils.getFeaturedImage(product.images_info);
          var productCopy = product;
          productCopy.featured_image = image_src;
          productCopy.price = product.price_min; // Sometimes I need to multiply the price with 100
          productCopy.compare_at_price = product.compare_at_price_min; // Sometimes I need to multiply the price with 100
          products.push(productCopy);
        });
        swat.mapShopifyProducts(products); // Product mapped data to swym layer
        swat.initializeActionButtons('.boost-pfs-filter-products'); // Buttons can now be initialized
      });
      /** End Swym integration **/
      
      document.querySelector('.boost-pfs-quickview-btn').onclick = function changeContent(event) {

        console.log('boost qv click'); 
        setTimeout(function(){
          document.querySelector('.boost-pfs-quickview-wrapper.fancybox-inner .qv-product-main-images').classList.add('class-by-click');

		 
           jQuery('.boost-pfs-quickview-wrapper.fancybox-inner .qv-product-main-images').on('init', function(event, slick){
             console.log("initialized")
           }); 
            jQuery('.boost-pfs-quickview-wrapper.fancybox-inner .qv-product-main-images').slick({
              dots: false,
              arrows: true,
              respondTo: 'min',
              useTransform: false,
              asNavFor: '.boost-pfs-quickview-wrapper.fancybox-inner  .slider-nav'
            });

          jQuery('.boost-pfs-quickview-wrapper.fancybox-inner  .slider-nav').on('init', function(event, slick){
             console.log("initialized")
           });
            jQuery('.boost-pfs-quickview-wrapper.fancybox-inner  .slider-nav').slick({
              slidesToShow: 4,
              slidesToScroll: 1,
              asNavFor: '.boost-pfs-quickview-wrapper.fancybox-inner .qv-product-main-images',
              dots: false,
              centerMode: false,
              focusOnSelect: true,
              arrows: false,
            });
         
 jQuery('.boost-pfs-quickview-wrapper.fancybox-inner .qv-product-main-images').slick('setPosition');
          
//           var $slider = $('.boost-pfs-quickview-wrapper.fancybox-inner .qv-product-main-images').on('init', function(slick) {
//             $('.boost-pfs-quickview-wrapper.fancybox-inner .qv-product-main-images').fadeIn(1000);
//           }).slick({
//             slidesToShow: 1,
//             slidesToScroll: 1,
//             arrows: true,
//             autoplay: true,
//             lazyLoad: 'ondemand',
//             autoplaySpeed: 3000,
//             asNavFor: '.slider-nav'
//           });

//           var $slider2 = $('.boost-pfs-quickview-wrapper.fancybox-inner  .slider-nav').on('init', function(slick) {
//             $('.boost-pfs-quickview-wrapper.fancybox-inner  .slider-nav').fadeIn(1000);
//           }).slick({
//             slidesToShow: 4,
//             slidesToScroll: 1,
//             lazyLoad: 'ondemand',
//             asNavFor: '.qv-product-main-images',
//             dots: false,
//             centerMode: false,
//             focusOnSelect: true
//           });
          
          
 window._swat.initializeActionButtons('.qv-product-options_html', '.swym-button');
        }, 3000); //wait for atleast  3 seconds before console logging
      }
      
	}

	// Build Additional Elements
	Filter.prototype.afterRender = function(data, eventType) {
		if (!data) data = this.data;
		jQ('.boost-pfs-filter-total-product').html(data.total_product + ' products');
	};

	/************************** END BUILD TOOLBAR **************************/
})();
