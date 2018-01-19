// submit
document.getElementById("loan-form").addEventListener("submit", function(e){
    //hide results
    document.getElementById("results").style.display = "none";
    
    //show loader
    document.getElementById("loading").style.display = "block";
    setTimeout(calculateResults, 1500);
    
    e.preventDefault();
});

// Calculate results function
function calculateResults(){
    console.log("Calculating...");
    // UI Variables:
    const amount = document.getElementById("amount");
    const interest = document.getElementById("interest");
    const years = document.getElementById("years");
    const monthlyPayment= document.getElementById("monthly-payment");
    const totalPayment= document.getElementById("total-payment");
    const totalInterest = document.getElementById("total-interest");
    
    const principal = parseFloat(amount.value);
    const calculatedInterest = parseFloat(interest.value) / 100 /12;
    const calculatedPayments = parseFloat(years.value) * 12;
    
    //compute monthly payments
    const x = Math.pow(1 + calculatedInterest, calculatedPayments);
    const monthly = (principal*x*calculatedInterest)/(x-1);
    
    if(isFinite(monthly)){
        monthlyPayment.value = monthly.toFixed(2);
        totalPayment.value = (monthly * calculatedPayments).toFixed(2);
        totalInterest.value = ((monthly * calculatedPayments) - principal).toFixed(2);
        //show results
        document.getElementById("results").style.display = "block";
        //hide loader
        document.getElementById("loading").style.display = "none";
    } else {
        showError("Please check the numbers and try again");
        console.log("Error");
        //hide loader
        document.getElementById("loading").style.display = "none";
        //show results
        document.getElementById("results").style.display = "none";
    }
}
//Error message
function showError(error){
    //create a div
    const errorDiv = document.createElement("div");

    //get element
    const card = document.querySelector(".card");
    const heading = document.querySelector(".heading");

    //add class
    errorDiv.className = "alert alert-danger";

    //create text node and append div
    errorDiv.appendChild(document.createTextNode(error));

    //Insert error above heading
    card.insertBefore(errorDiv, heading);

    //clear error after 3 secs.
    setTimeout(clearError, 3000);
}
//clear error function
function clearError(){
    document.querySelector(".alert").remove();
}