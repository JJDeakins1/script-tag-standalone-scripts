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

var script = document.createElement('script')
script.type = "text/javascript"
script.text = "window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag(\"js\",new Date);gtag(\"config\",\"${conversionId}\");"
document.head.appendChild(script);

var script = document.createElement('script')
script.type = "text/javascript"
script.src = "https://www.googletagmanager.com/gtag/js?id=${conversionId}"
document.head.appendChild(script);
    
   })
  

