fbq('track', 'Purchase', {currency: Shopify.checkout.currency, value: Shopify.checkout.total_price});

console.log("Purchase event triggered")
console.log(Shopify.checkout.total_price)

