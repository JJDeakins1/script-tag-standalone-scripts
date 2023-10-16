var conversionId;
var shop = Shopify.shop
var url = "https://shopify-extention--development.gadget.app/googleData?shopifyShop="
var getURL = url+shop

fetch(getURL)
  .then(res => res.json())
  .then(data => {
    body = data;
   })
  .then(() => {
  conversionId = body.googleAdsDataRecords[0].conversionId
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments)}
  gtag('js', new Date());

  gtag('config', conversionId);
   })
  

