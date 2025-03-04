document.addEventListener("DOMContentLoaded", function () {
   const bookButton = document.getElementById("bookButton");
   const bookingDate = document.getElementById("bookingDate");
   const bookingMessage = document.getElementById("bookingMessage");
   const submitReview = document.getElementById("submitReview");
   const reviewText = document.getElementById("reviewText");
   const reviewsList = document.getElementById("reviewsList");

   bookButton.addEventListener("click", function () {
       if (bookingDate.value) {
           bookingMessage.textContent = "Вы забронировали дату: " + bookingDate.value;
           bookingMessage.style.color = "green";
       } else {
           bookingMessage.textContent = "Выберите дату для бронирования!";
           bookingMessage.style.color = "red";
       }
   });

   submitReview.addEventListener("click", function () {
       if (reviewText.value.trim() !== "") {
           const newReview = document.createElement("li");
           newReview.textContent = reviewText.value;
           reviewsList.appendChild(newReview);
           reviewText.value = "";
       }
   });
});
