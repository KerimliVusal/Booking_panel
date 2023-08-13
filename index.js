
  const services = [
    {
        "id": 1,
        "name": "Oral hygiene",
        "image": "images/service3.png",
        "duration": "1 hour",
        "price": 50.00,
    },
    {
        "id": 2,
        "name": "Implants",
        "image": "images/service2.png",
        "duration": "1 hour 30 minutes",
        "price": 120.00,
    },
    {
        "id": 3,
        "name": "Check up",
        "image": "images/service1.png",
        "duration": "1 hour 12 minutes",
        "price": 140.00,
    }

  ];
  const dates = ["2022-03-04", "2022-03-05", "2022-03-06"];
  const times = [
    {
        "start_time": "09:00",
        "end_time": "09:30"
    },
    {
        "start_time": "09:30",
        "end_time": "10:00"
    }
, {
    "start_time": "09:30",
    "end_time": "11:00"
}
  ];
  

  const staff = [
    {
      "id": 1,
      "name": "Alex Rosetta",
      "email": "alexyrosetta@egmail.com",
      "image": "images/staff1.png",
    },
    {
      "id": 2,
      "name": "Maria July",
      "email": "mariajuly@egmail.com",
      "image": "images/staff2.png",
    }
    // ... (Other data)
  ];
  
  // ... (Other data arrays)
  let refresh=false;
  let currentStage = 1;
  let selectedData = {
    staff:'',
    service:'',
    staff_id: null,
    service_id: null,
    date: null,
    time: null,
    price:null,
    customer: {
      name: "",
      surname: "",
      email: "",
      phone: "",
    },
  };
 const names=['Select Staff','Select Service','Select Date & time','Confirm details']
  function updateConfirmationData() {
    const confirmationStage = document.getElementById("stage-4");
    const confirmationContent = `
      <h2>Confirmation</h2>
      <p>Staff: ${selectedData.staff_id}</p>
      <p>Service: ${selectedData.service_id}</p>
      <p>Date: ${selectedData.date}</p>
      <p>Time: ${selectedData.time}</p>
      <p>Name: ${selectedData.customer.name}</p>
      <p>Surname: ${selectedData.customer.surname}</p>
      <p>Email: ${selectedData.customer.email}</p>
      <p>Phone: ${selectedData.customer.phone}</p>
      <button id="prev-btn">Previous</button>
      <button id="confirm-btn">Confirm Booking</button>
    `;
    confirmationStage.innerHTML = confirmationContent;
  }
  
  function renderStage(stageNumber) {
    const staffContainers = document.querySelectorAll(".staff");
    const serviceContainers = document.querySelectorAll(".service");
    const stepCircles = document.querySelectorAll(".step-number");
    if(refresh==true){
        stepCircles.forEach((stepCircle, index) => {
            if (index < currentStage - 1) {
                stepCircle.classList.add("completed");
            } else {
                stepCircle.classList.remove("completed");
            }
    
            stepCircle.innerHTML = index + 1; // Set the step number
    
            if (index === currentStage - 1) {
                stepCircle.classList.add("active-step");
            } else {
                stepCircle.classList.remove("active-step");
            }
        });
    staffContainers.forEach((staffContainer) => {
        staffContainer.classList.remove("selected");
        if (selectedData.staff_id === staffContainer.dataset.staffId) {
            staffContainer.classList.add("selected");
        }
    });
    serviceContainers.forEach((serviceContainer) => {
        serviceContainer.classList.remove("selected");
        if (selectedData.service_id === serviceContainer.dataset.serviceId) {
            serviceContainer.classList.add("selected");
        }
    });
}
    const modal = document.querySelector(".modal");
    modal.style.display = "none"
    const stages = document.querySelectorAll(".stage");
    stages.forEach((stage) => stage.classList.remove("active"));
    const stepNames = document.querySelectorAll(".stepName");
    stepNames.forEach((stepName, index) => {
        stepName.classList.remove("active-step");
        stepNames[stageNumber - 1].classList.add("active-step");
    });
    stepCircles.forEach((stepCircle) => {
      stepCircle.classList.remove("active-step");
    });
    stepCircles[stageNumber - 1].classList.add("active-step");

    if (stageNumber <= 0) {
      stageNumber = 1;
    } else if (stageNumber > stages.length) {
      stageNumber = stages.length;
    }
  
    currentStage = stageNumber;
    stages[currentStage - 1].classList.add("active");
  
    // Update step circles
  
    updateButtonVisibility();

    if (currentStage === 1) {
        
        staff.forEach((staffData, index) => {
          const staffContainer = document.querySelector(`#stage-1 .staff:nth-child(${index + 1})`);
          const staffImage = staffContainer.querySelector(".staffimage");
          const staffName = staffContainer.querySelector(".staffname");
          const staffEmail = staffContainer.querySelector(".staffemail");
    
          staffImage.style.backgroundImage = `url(${staffData.image})`;
          staffName.textContent = staffData.name;
          staffEmail.textContent = staffData.email;
          staffContainer.addEventListener("click", () => {
            selectedData.staff_id = staffData.id;
            selectedData.staff = staffData.name;
            document.querySelectorAll(".staff").forEach((element) => {
              element.classList.remove("selected");
            });
            staffContainer.classList.add("selected");
            if (modal.style.display === "block") {
                handleNext();
              }
          });
        });
        
      }
      if (currentStage === 2) {
        services.forEach((service, index) => {
          const serviceContainer = document.querySelector(`#stage-2 .service:nth-child(${index + 1})`);
          const serviceImage = serviceContainer.querySelector(".serviceimage");
          const serviceName = serviceContainer.querySelector(".servicename");
          const serviceEmail = serviceContainer.querySelector(".serviceemail");
          const servicecost = serviceContainer.querySelector(".servicecost");

    
          serviceImage.style.backgroundImage = `url(${service.image})`;
          serviceName.textContent = service.name;
          serviceEmail.textContent = service.duration;
          servicecost.textContent = `${service.price}$`;
          serviceContainer.addEventListener("click", () => {
            selectedData.service_id = service.id;
            selectedData.service=service.name
            selectedData.price=service.price
            // Remove green border from all staff elements
            document.querySelectorAll(".service").forEach((element) => {
              element.classList.remove("selected");
            });
            // Add green border to the clicked staff element
            serviceContainer.classList.add("selected");
            if (modal.style.display === "block") {
                // Call handleNext() only if the modal is hidden
                handleNext();
              }
          });
        });
      }
      if (currentStage === 3) {
        
        const dateFlexElement = document.querySelector(`#stage-3 .dateflex`);
        let prevSelectedDateElement = null; // To keep track of previously selected element
        
        times.forEach((time, index) => {
            const dateElement = dateFlexElement.querySelector(`.date${index + 1}`);
    
            dateElement.addEventListener("click", () => {
                selectedData.time = `${time.start_time} - ${time.end_time}`
    
                // Remove the "selectedtimes" class from the previously selected date element
                if (prevSelectedDateElement) {
                    prevSelectedDateElement.classList.remove("selectedtimes");
                }
    
                // Add the "selectedtimes" class to the clicked date element
                dateElement.classList.add("selectedtimes");
                
                // Update the previously selected date element
                prevSelectedDateElement = dateElement;
                
                if (modal.style.display === "block") {
                    // Call handleNext() only if the modal is hidden
                    handleNext();
                }
                
                // Add your code to update the UI or handle other actions here
            });
        });
    }
      if (currentStage === 4){
            const selectedStaffElement = document.querySelector(".selectedstaff");
            const selectedServiceElement = document.querySelector(".selectedservice");
            const selectedDateElement = document.querySelector(".selecteddate");
            const totalElement = document.querySelector(".total");
          
            if (selectedData.staff_id) {
              const selectedStaff = staff.find((staffData) => staffData.id === selectedData.staff_id);
              selectedStaffElement.textContent = selectedStaff ? selectedStaff.name : "";
            } else {
              selectedStaffElement.textContent = "";
            }
          
            if (selectedData.service_id) {
              const selectedService = services.find((serviceData) => serviceData.id === selectedData.service_id);
              selectedServiceElement.textContent = selectedService ? selectedService.name : "";
            } else {
              selectedServiceElement.textContent = "";
            }
          
            selectedDateElement.textContent = selectedData.date ? `${selectedData.date} / ${selectedData.time}` : "";
            totalElement.textContent = selectedData.price ? `$${selectedData.price}` : "";
          
      }
      const serviceName = document.querySelector(".headerName");
      const serviceheader = document.querySelector(".serviceheader");

  serviceName.textContent = names[currentStage - 1];
  }
  
  function handleStepClick(e) {
    const stepNumber = Number(e.target.getAttribute("data-step"));
  }
  
  const stages = document.querySelectorAll(".step");
  const numStages = stages.length;
  function showMessage(message) {
    const modal = document.querySelector(".modal");
    const modalicon = document.querySelector(".modalicon");
    const modalMessage = document.querySelector("#modal-message");
    const modalCloseBtn = document.querySelector(".modal-close-btn");
  
    modalMessage.textContent = message;
    modal.style.display = "block";
  
    modalCloseBtn.addEventListener("click", () => {
      modal.style.display = "none";
    });
  }
  function handleNext() {
    refresh=false;
   
      if (currentStage === 1 && selectedData.staff_id === null) {
        showMessage("Select Staff.");
        return;
      } else if (currentStage === 2 && selectedData.service_id === null) {
        showMessage("Select Service.");
        return;
      } else if (currentStage === 3 && selectedData.time === null) {
        showMessage("Select Date and Time.");
        return;
      }
  
    const stepCircles = document.querySelectorAll(".step-number");
    stepCircles.forEach((stepCircle, index) => {
        if(currentStage ===1){
            stepCircle.classList.add("completed");
        }
      if (index <= currentStage &&index !== currentStage) {
        stepCircle.innerHTML = '<i class="fa-solid fa-check"></i>';
        stepCircle.classList.add("completed");
      } else {
        stepCircle.innerHTML = index + 1;
        stepCircle.classList.remove("completed");
      }

      if (index === currentStage) {
        stepCircle.classList.add("active-step");
      } else {
        stepCircle.classList.remove("active-step");
      }
    });
    const stepNames = document.querySelectorAll(".stepName");
    stepNames.forEach((stepName, index) => {
      if (index <= currentStage &&index !== currentStage) {
        stepName.classList.remove("active-step");
        stepName.classList.add("complete");
      } else {
        stepName.classList.add("active-step");
        stepName.classList.remove("complete");
     
      }
    });
    if (currentStage < numStages ) {
      currentStage++;
      renderStage(currentStage);
    }
  
  }
  function handlePrevious() {
    if (currentStage > 1) {
      currentStage--;
      refresh=false;
      renderStage(currentStage);   
     }
  }
  function showConfirmMessage(message) {
    const confirmmodal = document.querySelector(".confirmmodal");
    const confirmmodalMessage = document.querySelector("#confirmmodal-message");
    const confirmmodalCloseBtn = document.querySelector(".confirmmodal-close-btn");
  
    confirmmodalMessage.textContent = message;
    confirmmodal.style.display = "block";
  
    confirmmodalCloseBtn.addEventListener("click", () => {
      confirmmodal.style.display = "none";
    });
  }
  function handleConfirmBooking() {
        const nameInput = document.querySelector('input[name="name"]');
        const lastNameInput = document.querySelector('input[name="last-name"]');
        const emailInput = document.querySelector('input[name="email"]');
        const phoneInput = document.querySelector('input[name="phone"]');
        const confirmmodalMessage = document.querySelector("#confirmmodal-message");

        if (!nameInput.value || !lastNameInput.value || !emailInput.value || !phoneInput.value) {
            confirmmodalMessage.style.color='#F39C12'
            showConfirmMessage("Please fill in all required fields.");
            return;
          }
          else{
            confirmmodalMessage.style.color='#38CF78'
            showConfirmMessage("Confirmation successfully completed!");

          }
        selectedData.customer.name = nameInput.value;
        selectedData.customer.surname = lastNameInput.value;
        selectedData.customer.email = emailInput.value;
        selectedData.customer.phone = phoneInput.value;
        nameInput.value = '';
        lastNameInput.value = '';
        emailInput.value = '';
        phoneInput.value = '';
        const newdata=selectedData
      console.log(newdata);
        const selectedStaffElement = document.querySelector(".selectedstaff");
        const selectedServiceElement = document.querySelector(".selectedservice");
        selectedStaffElement.textContent = "";
        selectedServiceElement.textContent = "";
        
        // Clear selected date and total
        const selectedDateElement = document.querySelector(".selecteddate");
        const totalElement = document.querySelector(".total");
        selectedDateElement.textContent = "";
        totalElement.textContent = "";
        
        // Clear input values
        nameInput.value = '';
        lastNameInput.value = '';
        emailInput.value = '';
        phoneInput.value = '';      
    
        // Remove active and completed states from step circles and names
        const stepCircles = document.querySelectorAll(".step-number");
        stepCircles.forEach((stepCircle) => {
            stepCircle.classList.remove("active-step", "completed");
        });
    
        const stepNames = document.querySelectorAll(".stepName");
        stepNames.forEach((stepName) => {
            stepName.classList.remove("active-step", "complete");
        });
    
        // Reset currentStage to start from 1
        currentStage = 1;
          refresh = true;
        renderStage(1);
    
  }
  // Update button visibility based on current stage
function updateButtonVisibility() {
    const prevButton = document.getElementById("prev-btn");
    const nextButton = document.getElementById("next-btn");
    const confirmButton = document.getElementById("confirm-btn");

    if (currentStage === 1) {
        prevButton.style.display = "none";
        nextButton.style.display = "block";
        confirmButton.style.display = "none";
    } else if (currentStage === numStages) {
        prevButton.style.display = "block";
        nextButton.style.display = "none";
        confirmButton.style.display = "block";
    } else {
        prevButton.style.display = "block";
        nextButton.style.display = "block";
        confirmButton.style.display = "none";
    }
  }
  
    
  // Add event listeners for navigation buttons
  document.querySelectorAll(".step").forEach((step) => {
    step.addEventListener("click", handleStepClick);
  });
  document.getElementById("next-btn").addEventListener("click", handleNext);
  document.getElementById("prev-btn").addEventListener("click", handlePrevious);
  document.getElementById("confirm-btn").addEventListener("click", handleConfirmBooking);
  let calendar = document.querySelector('.calendar')

  const month_names = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  
  isLeapYear = (year) => {
      return (year % 4 === 0 && year % 100 !== 0 && year % 400 !== 0) || (year % 100 === 0 && year % 400 ===0)
  }
  
  getFebDays = (year) => {
      return isLeapYear(year) ? 29 : 28
  }
  
  generateCalendar = (month, year) => {
  
      let calendar_days = calendar.querySelector('.calendar-days')
      let calendar_header_year = calendar.querySelector('#year')
  
      let days_of_month = [31, getFebDays(year), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
  
      calendar_days.innerHTML = ''
  
      let currDate = new Date()
      if (!month) month = currDate.getMonth()
      if (!year) year = currDate.getFullYear()
  
      let curr_month = `${month_names[month]}`
      month_picker.innerHTML = curr_month
      calendar_header_year.innerHTML = year
  
      // get first day of month
      
      let first_day = new Date(year, month, 1)
  
      for (let i = 0; i <= days_of_month[month] + first_day.getDay() - 1; i++) {
        let day = document.createElement('div');
        if (i >= first_day.getDay()) {
            day.classList.add(`calendar-day-hover`);
            day.innerHTML = i - first_day.getDay() + 1;

            // Add an event listener to handle day selection
            day.addEventListener('click', () => {
                handleDaySelection(year, month, i - first_day.getDay() + 1);
            });

            // ... (previous code)
        }
        calendar_days.appendChild(day);
    }
}
function handleDaySelection(selectedYear, selectedMonth, selectedDay) {
    // Remove previous selection
    document.querySelectorAll('.calendar-day-hover').forEach((day,index) => {
        day.classList.remove('selected-day');
        if(selectedDay===index+1){
            day.classList.add('selected-day');
        }
    });
    const formattedDay = selectedDay < 10 ? `0${selectedDay}` : selectedDay;
    const formattedMonth = (selectedMonth + 1) < 10 ? `0${selectedMonth + 1}` : selectedMonth + 1;

    // Update the selected date
    selectedData.date = `${selectedYear}-${formattedMonth}-${formattedDay}`;
    // Update the UI to show the selected date
    const selectedDateElement = document.querySelector('.chosendate');
    const timeElements = document.querySelectorAll(".selectedTime span[class^='date']");
const selectedTime=document.querySelector('.dateflex')
    if (selectedDateElement) {
        selectedTime.style.visibility='visible'
        selectedDateElement.textContent = selectedData.date; // Update the text content
        timeElements.forEach((timeElement, index) => {
            if (times[index]) {
                timeElement.innerHTML = `<span>${times[index].start_time}</span><span>${times[index].end_time}</span>`;
            } else {
                timeElement.textContent = "";
            }
        });
    }
}
  
  let month_list = calendar.querySelector('.month-list')
  
  month_names.forEach((e, index) => {
      let month = document.createElement('div')
      month.innerHTML = `<div data-month="${index}">${e}</div>`
      month.querySelector('div').onclick = () => {
          month_list.classList.remove('show')
          curr_month.value = index
          generateCalendar(index, curr_year.value)
      }
      month_list.appendChild(month)
  })
  
  let month_picker = calendar.querySelector('#month-picker')
  
  month_picker.onclick = () => {
      month_list.classList.add('show')
  }
  
  let currDate = new Date()
  
  let curr_month = {value: currDate.getMonth()}
  let curr_year = {value: currDate.getFullYear()}
  
  generateCalendar(curr_month.value, curr_year.value)
  
  document.querySelector('#prev-year').onclick = () => {
      --curr_year.value
      generateCalendar(curr_month.value, curr_year.value)
  }
  
  document.querySelector('#next-year').onclick = () => {
      ++curr_year.value
      generateCalendar(curr_month.value, curr_year.value)
  }
  

 
  // Initialize the first stage
  renderStage(currentStage);