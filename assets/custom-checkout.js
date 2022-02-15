var contryObject = {
    "Singapur": {
//     "South Australia": ["Dunstan", "Mitchell"],
//     "Victoria": ["Altona", "Euroa"]
  }, 
  "Hong Kong": {
    "district": [
      "Kwai Tsing","North",
      "Tuen Mun","Yuen Long",
      "Sham Shui Po","Kwun Tong",
      "Wong Tai Sin","Tai Po",
      "Sha Tin","Islands",
      "Sai Kung","Yau Tsim Mong",
      "Tsuen Wan","Kowloon City",
      "Eastern","Central and Western",
      "Southern","Wan Chai","Hong Kong"
    ]
  },
}
window.onload = function () {
  var countySel = document.getElementById("checkout_shipping_address_country"),
      stateSel = document.getElementById("checkout_shipping_address_province"),
      districtSel = document.getElementById("checkout_shipping_address_city");
  for (var country in contryObject) {
    countySel.options[countySel.options.length] = new Option(country, country);
  }
  var select = document.createElement("select");
  select.name = "checkout[shipping_address][city]";
  select.id = "checkout_shipping_address_city"
  select.className = "field__input field__input--select"
  var district = contryObject[countySel.value]["district"];
  for (const val of district)
  {
    var option = document.createElement("option");
    option.value = val;
    option.text = val.charAt(0).toUpperCase() + val.slice(1);
    select.appendChild(option);
  }
  var label = document.createElement("label");
  label.innerHTML = "Choose your district: "
  label.htmlFor = "checkout_shipping_address_city"
  console.log(label);
  label.className ="field__label field__label--visible";

  document.querySelector('[data-address-field="city"]').classList.add('field--show-floating-label');
  document.querySelector('[data-address-field="city"]').innerHTML = '<div class="field__input-wrapper field__input-wrapper--select" id="city_container"><label class="field__label field__label--visible" for="checkout_shipping_address_city">District</label></div>';
  document.getElementById("city_container").appendChild(select).appendChild(label);


  var svg = `<div class="field__caret shown-if-js">
<svg class="icon-svg icon-svg--color-adaptive-lighter icon-svg--size-10 field__caret-svg" role="presentation" aria-hidden="true" focusable="false"> <use xlink:href="#caret-down"></use> </svg>
</div>`;
  $("#city_container").append( `<div class="field__caret shown-if-js">
<svg class="icon-svg icon-svg--color-adaptive-lighter icon-svg--size-10 field__caret-svg" role="presentation" aria-hidden="true" focusable="false"> <use xlink:href="#caret-down"></use> </svg>
</div>` );

}