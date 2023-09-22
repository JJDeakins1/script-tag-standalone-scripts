var a = fbq;
var b = "track";
var c = "Purchase";
var d = Shopify.checkout;

if (window.location.pathname.includes("orders") === false) {
  console.log("Purchase event triggered");
  a(b, c, { currency: d.currency, value: d.total_price });
} else {
  console.log("Page Path contains Orders");
}

