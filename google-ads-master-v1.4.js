var body
var conversionId
var conversionLabel
var divider = "/"
var purchaseInfo
var paidUser

var shop = window.Shopify.Checkout.apiHost
var url = "https://shopify-extention--development.gadget.app/googleData?shopifyShop="
var getURL = url+shop
var subDataUrl = "https://shopify-extention--development.gadget.app/subscriptionData?shopifyShop="+shop

fetch(getURL)
  .then(res => res.json())
  .then(data => {
    body = data;
   })
  .then(() => {
    conversionId = body.googleAdsDataRecords[0].conversionId
    conversionLabel = body.googleAdsDataRecords[0].conversionLabel;
    purchaseInfo = conversionId+divider+conversionLabel

    // create gtag script
    var script = document.createElement('script')
    script.type = "text/javascript"
    script.src = `https://www.googletagmanager.com/gtag/js?id=${conversionId}`
    document.head.appendChild(script);

    // create gtag script p2
    var script = document.createElement('script')
    script.type = "text/javascript"
    script.text = `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag(\"js\",new Date);gtag(\"config\",\"${conversionId}\");`
    document.head.appendChild(script);

    // determine if user is paid
    return fetch(subDataUrl).then(res => res.json()).then(data => {body = data}).then(() => {
      try {
        paidUser = body.subscriptionData[0].status
        if (paidUser === "ACTIVE") {
         console.log("USER SUBSCRIPTION ACTIVE" ) 
         paidUser = true
        } else {
         console.log("NO SUBSCRIPTION " ) 
         paidUser = false
        }
      } catch (err) {
        console.log("no active sub")
        paidUser = false
      }
      }).then(() => {console.log(paidUser)})
   }).then(() => {
    if (window.location.pathname.includes("orders") === false && paidUser === false) {
      console.log("Google Ads - Purchase Event Triggered");
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', purchaseInfo);
    
    
      gtag('event', 'conversion', {
          'send_to': purchaseInfo,
          'value': Shopify.checkout.total_price,
          'currency': Shopify.checkout.currency,
          'transaction_id': Shopify.checkout.order_id
      });
    
    } else {
      console.log("Page Path contains Orders - 1");
    }
      if (window.location.pathname.includes("orders") === false && paidUser === true) {
      console.log("Google Ads - [paidUser] Purchase Event Triggered");
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', purchaseInfo, {'allow_enhanced_conversions':true}); 
  
      gtag('event', 'conversion', {
          'send_to': purchaseInfo,
          'value': Shopify.checkout.total_price,
          'currency': Shopify.checkout.currency,
          'transaction_id': Shopify.checkout.order_id
      });
    
      // Enhanced conversions need to be enabled to see the hashed data in the Google Tag Assistant & the Network Tab
    
      gtag('set', 'user_data', {
        "email": Shopify.checkout.email,
        "phone_number": Shopify.checkout.phone,
        "address": {
        "first_name": Shopify.checkout.shipping_address.first_name,
        "last_name": Shopify.checkout.shipping_address.last_name,
        "street": Shopify.checkout.shipping_address.address1,
        "city":Shopify.checkout.shipping_address.city,
        "region": Shopify.checkout.shipping_address.province,
        "postal_code": Shopify.checkout.shipping_address.zip,
        "country": Shopify.checkout.shipping_address.country_code
        }
        });
    
    } else {
      console.log("Page Path contains Orders - 2");
    }
   })
