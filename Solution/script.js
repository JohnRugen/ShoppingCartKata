/*  Shopping Cart Kata

## The Task

You are implementing a simple checkout system, there are four products available, each with a price per unit. 
Some products have a special price when bought in certain quantities (e.g. 3 of product A costs 140, not 150). 
Implement a checkout system that allows items to be “scanned” via their Item Code, and returns the sub total when queried. 

## Dataset

| Item Code |	Unit Price | Special Price |
|:---------:|:----------:|:-------------:|
|     A	    |     50	   |    3 for 140  |
|     B     |   	35	   |    2 for 60   |
|     C     |   	25	   |               |
|     D     |   	12	   |               |

*/

// Nested objecet containing all current products
var Products = {
    a: {
        ItemCode: "A", // The item code 'scanned' to add to the users cart
        UnitPrice: 50, // The items price
        hasOffer: 1 // The offer associated with this product, if there is one.
    },
    b: {
        ItemCode: "B",
        UnitPrice: 35,
        hasOffer: 2
    },
    c: {
        ItemCode: "C",
        UnitPrice: 25,
        hasOffer: null // In this case, there isn't an offer associated with this product
    },
    d: {
        ItemCode: "D",
        UnitPrice: 12,
        hasOffer: null
    }
};

// A collection of offers that can be expanded / changed without effecting logic
var currentOffers = {
    1: {
        AffectedProduct: "A", // The affected product
        AmountRequired: 3, // How many required products to get the special price
        SpecialPrice: 140, // In this case, 3 for 140
        Savings: 10 // The user saves 10
    },
    2: {
        AffectedProduct: "B",
        AmountRequired: 2,
        SpecialPrice: 60,
        Savings: 10
    }
};

var usersCart = []; // The users cart, items will be added to this whilst shopping
var totalCost = 0; // How much the user will have to pay for these products
var totalSaved = 0; // How much the user will save due to offers.

// A user prompt, storing their response into userInput
var userInput = prompt("Enter a products item code (a/b/c/d) to add it to your shopping cart. Type 'Checkout' when finished.");



// Until the user types Checkout, allow them to add products
while (userInput !== "Checkout") {
    if (Products[userInput]) // if the user entered a correct products item code
    {
        usersCart.push(Products[userInput]); // Push the product to the users cart
    }
    else { // remind the user of the current item codes, and their options
        console.log("Not a valid response, enter a products item code (a/b/c/d) to add it to the cart or type 'Checkout' to finish.");
    }
    var userInput = prompt("Enter a products item code (a/b/c/d) to add it to your shopping cart. Type 'Checkout' when finished.");
}

// The user has exited the while loop, indicating they want to checkout
userCheckout(usersCart);



// This function adds the total cost of all items, then checks for offers and adjusts the final price. Passing in usersCart as usersData
function userCheckout(usersData) {
    var offerCounter = 0; // Counts how many products with offers on are in the users cart.

    // Loop over all items within the users cart
    for(var i = 0; i < usersData.length; i ++)
    {
        totalCost += usersData[i].UnitPrice; // Adjust price accordingly
    }


    // Loop over each of the current offers, allowed for more offers to be added.
    for(var i = 1; i < Object.keys(currentOffers).length + 1; i++)
    {
        offerCounter = 0; // Reset the counter
        for(var x = 0; x < usersData.length; x++)  // Loop through all products in the users cart
        {
            if(usersData[x].ItemCode == currentOffers[i].AffectedProduct) // If an item has an offer that can affect it
            {
                offerCounter++; // increase counter
                if(offerCounter >= currentOffers[i].AmountRequired) // if the counter has reached the amount required for savings to take place
                {
                    totalSaved += currentOffers[i].Savings; // Add savings to var
                    totalCost -= currentOffers[i].Savings; // deduct savings from total
                    offerCounter = 0; // reset counter
                }
            }
        }
    }
}

console.log("The total is: " + totalCost + ". You have saved: " + totalSaved);