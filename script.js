document.addEventListener("DOMContentLoaded", function () {
    const billInput = document.getElementById("billAmount");
    const peopleInput = document.getElementById("peopleCount");
    const tipButtons = document.querySelectorAll(".tip-btn");
    const customTipInput = document.getElementById("customTip");
    const tipAmountDisplay = document.getElementById("tipAmount");
    const totalAmountDisplay = document.getElementById("totalAmount");
    const resetButton = document.getElementById("resetBtn");
  
    let selectedTip = 15; // Default tip percentage
  
    // Function to calculate and update the tip & total per person
    function calculateTip() {
      const bill = parseFloat(billInput.value) || 0;
      const people = parseInt(peopleInput.value) || 1;
      const tipPercentage = selectedTip / 100;
  
      if (people < 1) {
        peopleInput.value = 1; // Prevent division by zero
      }
  
      const tipAmount = (bill * tipPercentage) / people;
      const totalAmount = (bill / people) + tipAmount;
  
      tipAmountDisplay.textContent = `$${tipAmount.toFixed(2)}`;
      totalAmountDisplay.textContent = `$${totalAmount.toFixed(2)}`;
    }
  
    // Event listener for tip buttons
    tipButtons.forEach((button) => {
      button.addEventListener("click", function () {
        // Remove 'selected' class from all buttons
        tipButtons.forEach((btn) => btn.classList.remove("selected"));
  
        // Add 'selected' class to clicked button
        this.classList.add("selected");
  
        // Get selected tip value and recalculate
        selectedTip = parseInt(this.getAttribute("data-tip"));
        customTipInput.value = ""; // Clear custom tip input
        calculateTip();
      });
    });
  
    // Event listener for custom tip input
    customTipInput.addEventListener("input", function () {
      selectedTip = parseFloat(customTipInput.value) || 0;
  
      // Remove selected class from tip buttons
      tipButtons.forEach((btn) => btn.classList.remove("selected"));
  
      calculateTip();
    });
  
    // Event listener for bill and people input
    billInput.addEventListener("input", calculateTip);
    peopleInput.addEventListener("input", calculateTip);
  
    // Reset button functionality
    resetButton.addEventListener("click", function () {
      billInput.value = "";
      peopleInput.value = "1";
      selectedTip = 15;
      tipAmountDisplay.textContent = "$0.00";
      totalAmountDisplay.textContent = "$0.00";
      
      // Remove selected class from tip buttons and reset default
      tipButtons.forEach((btn) => btn.classList.remove("selected"));
      tipButtons[2].classList.add("selected"); // Default 15% selected
  
      customTipInput.value = "";
    });
  });
  