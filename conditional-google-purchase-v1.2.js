var id = "AW-1111111"
var label = "43623dsaf23654"
var divider = "/"
var purchaseInfo = id+divider+label

var paidUser = true


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

  if (window.location.pathname.includes("orders") === true && paidUser === true) {
  console.log("Google Ads - [paidUser] Purchase Event Triggered");
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', purchaseInfo, {'allow_enhanced_conversions': true});


  gtag('event', 'conversion', {
      'send_to': purchaseInfo,
      'value': Shopify.checkout.total_price,
      'currency': Shopify.checkout.currency,
      'transaction_id': Shopify.checkout.order_id
  });

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

