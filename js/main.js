document.addEventListener("DOMContentLoaded", function () {
   const bookButton = document.getElementById("bookButton");
   const bookingDate = document.getElementById("bookingDate");
   const bookingMessage = document.getElementById("bookingMessage");
   const submitReview = document.getElementById("submitReview");
   const reviewText = document.getElementById("reviewText");
   const reviewsList = document.getElementById("reviewsList");
   const phone = document.getElementById('phone').value;
   const checkIn = document.getElementById('check-in').value;
   const checkOut = document.getElementById('check-out').value;

   submitReview.addEventListener("click", function () {
       if (reviewText.value.trim() !== "") {
           const newReview = document.createElement("li");
           newReview.textContent = reviewText.value;
           reviewsList.appendChild(newReview);
           reviewText.value = "";
       }
   });
});

let bookedPeriods = [];

function submitBooking() {
   
   const name = document.getElementById('name').value;
   const phone = document.getElementById('phone').value;
   const checkIn = document.getElementById('check-in').value;
   const checkOut = document.getElementById('check-out').value;

    if (!name || !phone || !checkIn || !checkOut) {
        alert("Пожалуйста, заполните все поля.");
        return;
    }

    // Проверка на занятые даты
    if (isPeriodBooked(checkIn, checkOut)) {
        alert("Выбранные даты уже забронированы. Пожалуйста, выберите другие.");
        return;
    }

    // Бронирование периода
    bookPeriod(checkIn, checkOut);

    alert("Бронирование успешно выполнено!\n\nИмя: " + name + "\nТелефон: " + phone + "\nЗаезд: " + checkIn + "\nВыезд: " + checkOut);
    
    // Очистка полей ввода
    document.getElementById('name').value = "";
    document.getElementById('phone').value = "";
    document.getElementById('check-in').value = "";
    document.getElementById('check-out').value = "";
    
    updateAvailablePeriods();
}

function isPeriodBooked(start, end) {
    const startDate = new Date(start);
    const endDate = new Date(end);
    
    for (let period of bookedPeriods) {
        let periodStart = new Date(period.start);
        let periodEnd = new Date(period.end);
        
        if (!(endDate < periodStart || startDate > periodEnd)) {
            return true; // Пересечение диапазонов
        }
    }
    return false;
}

function bookPeriod(start, end) {
    bookedPeriods.push({ start, end });
}

function updateAvailablePeriods() {
    bookedPeriods.sort((a, b) => new Date(a.start) - new Date(b.start));
    let availablePeriods = [];
    let today = new Date().toISOString().split('T')[0];
    
    if (bookedPeriods.length === 0) {
        availablePeriods.push(`С ${today} - ∞`);
    } else {
        let lastEnd = today;
        
        for (let period of bookedPeriods) {
            if (lastEnd < period.start) {
                availablePeriods.push(`С ${lastEnd} до ${period.start}`);
            }
            lastEnd = period.end;
        }
        
        availablePeriods.push(`С ${lastEnd} - ∞`);
    }
    
    document.getElementById('available-periods').innerText = "Свободные периоды: " + availablePeriods.join(', ');
}


document.addEventListener("DOMContentLoaded", function(){
   document.getElementById("burger").addEventListener("click", function(){
    document.querySelector("header").classList.toggle("open")
   })
 })