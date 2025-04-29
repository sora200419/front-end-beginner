var btc  = document.getElementById("bitcoin");
var eth  = document.getElementById("ethereum");
var doge = document.getElementById("dogecoin");

// set up the AJAX call
var settings = {
  async:      true,
  crossDomain:true,
  url:        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin,ethereum,dogecoin",
  method:     "GET"
};

// fetch once the DOM is ready
$(function(){
  $.ajax(settings)
    .done(function(response) {
      // response is an array of coin objects
      function priceFor(id) {
        const coin = response.find(c => c.id === id);
        return coin ? coin.current_price.toLocaleString("en-US", { style: "currency", currency: "USD" }) 
                    : "N/A";
      }

      btc.innerText  = priceFor("bitcoin");
      eth.innerText  = priceFor("ethereum");
      doge.innerText = priceFor("dogecoin");
    })
    .fail(function(err) {
      console.error("Error fetching coin prices:", err);
    });
});
