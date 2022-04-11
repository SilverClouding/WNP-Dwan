var boostPFSIntegrationTemplate = {
     compileTemplate: {
       reviews: "var itemReviewHtml = '<div class=\"grid-view-item__reviews\"><div class=\"yotpo bottomLine\" data-appkey=\"bGAjARPaxbvztboVE5IS7Bu4v0ev4iydj4CNJsFa\" data-domain=\"' + Utils.escape(boostPFSConfig.shop.domain) + '\" data-product-id=\"' + data.id + '\" data-product-models=\"' + data.id + '\" data-name=\"' + data.title + '\" data-url=\"{{itemUrl}}\" data-description=\"{{itemDescription}}\" data-bread-crumbs=\"{{itemTags}}\"></div></div>'; itemHtml = itemHtml.replace(/{{itemReviews}}/g, itemReviewHtml); var itemDescription = data.description ? data.description : ''; itemDescription = itemDescription.substr(0, itemDescription.indexOf('##highlights##')); itemHtml = itemHtml.replace(/{{itemDescription}}/g, itemDescription); itemHtml = itemHtml.replace(/{{itemTags}}/g, Utils.escape(data.tags.join(';')));itemHtml = itemHtml.replace(/{{itemUrl}}/g, Utils.buildProductItemUrl(data))"
     },
     call3rdFunction: {
       reviews: "if (typeof Yotpo !== 'undefined') {  var api = new Yotpo.API(yotpo);  api.refreshWidgets();}"
     }
   };