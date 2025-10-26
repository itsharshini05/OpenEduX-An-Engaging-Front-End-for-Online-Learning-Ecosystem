// Save selected course
function enroll(courseName) {
  localStorage.setItem("selectedCourse", courseName);
  window.location.href = "register.html";
}

// Save student details
document.getElementById("registerForm")?.addEventListener("submit", function(e) {
  e.preventDefault();
  const student = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    phone: document.getElementById("phone").value,
    course: localStorage.getItem("selectedCourse")
  };
  localStorage.setItem("student", JSON.stringify(student));
  window.location.href = "payment.html";
});

// Payment simulation
if (window.location.pathname.includes("payment.html")) {
  document.getElementById("courseName").textContent = localStorage.getItem("selectedCourse");
}

function completePayment() {
  localStorage.setItem("paymentStatus", "success");
  window.location.href = "dashboard.html";
}

// Dashboard setup
if (window.location.pathname.includes("dashboard.html")) {
  const student = JSON.parse(localStorage.getItem("student"));
  document.getElementById("studentName").textContent = student.name;
  document.getElementById("enrolledCourse").textContent = student.course;

  // Daily classes
  const classes = [
    "Introduction to " + student.course,
    "Core Concepts",
    "Hands-on Session",
    "Case Study",
    "Project Work"
  ];

  const classList = document.getElementById("classList");
  classes.forEach((c, i) => {
    let li = document.createElement("li");
    li.innerHTML = `${c} <button onclick="markComplete(${i})">Complete</button>`;
    classList.appendChild(li);
  });

  // Load progress
  const progress = JSON.parse(localStorage.getItem("progress")) || [];
  progress.forEach(i => {
    classList.children[i].innerHTML = classes[i] + " ✅";
  });

  // Assessment
  document.getElementById("assessmentStatus").textContent =
    localStorage.getItem("assessmentDone") ? "✅ Completed" : "Not Completed";
}

// Mark class complete
function markComplete(index) {
  let progress = JSON.parse(localStorage.getItem("progress")) || [];
  if (!progress.includes(index)) {
    progress.push(index);
    localStorage.setItem("progress", JSON.stringify(progress));
    location.reload();
  }
}

// Complete assessment
function completeAssessment() {
  localStorage.setItem("assessmentDone", true);
  document.getElementById("assessmentStatus").textContent = "✅ Completed";
}
