// Get references to page elements
var $foodName = $("#food-name");
var $ingredients = $("#ingredients");
var $directions = $("#directions");
var $region = $("#region");
var $video= $("#video");
var $submitBtn = $("#submit");

// Ingredients 
var API = {
  saveRecipe: function (example) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/recipes",
      data: JSON.stringify(example)
    });
  }
};

