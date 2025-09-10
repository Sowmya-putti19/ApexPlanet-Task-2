// =========================
// Form Validation
// =========================
const form = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");

form.addEventListener("submit", function (e) {
  e.preventDefault();
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;

  if (!name || !email || !password) {
    formMessage.textContent = "❌ All fields are required!";
    formMessage.style.color = "red";
  } else if (!/^[^ ]+@[^ ]+\.[a-z]{2,3}$/.test(email)) {
    formMessage.textContent = "❌ Invalid email format!";
    formMessage.style.color = "red";
  } else {
    formMessage.textContent = "✅ Form submitted successfully!";
    formMessage.style.color = "green";
    form.reset();
  }
});

// =========================
// To-Do List with localStorage
// =========================
const addTaskBtn = document.getElementById("addTaskBtn");
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  taskList.innerHTML = "";
  tasks.forEach((task) => {
    createTaskElement(task.text, task.completed);
  });
}
// =========================
// Dark Mode Toggle
// =========================
const darkModeToggle = document.getElementById("darkModeToggle");

// Load saved mode
if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark");
  darkModeToggle.textContent = "☀️ Light Mode";
}

darkModeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");

  if (document.body.classList.contains("dark")) {
    darkModeToggle.textContent = "☀️ Light Mode";
    localStorage.setItem("theme", "dark");
  } else {
    darkModeToggle.textContent = "🌙 Dark Mode";
    localStorage.setItem("theme", "light");
  }
});

function saveTasks() {
  const tasks = [];
  document.querySelectorAll("#taskList li").forEach((li) => {
    tasks.push({
      text: li.querySelector("span").textContent,
      completed: li.classList.contains("completed"),
    });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function createTaskElement(taskText, completed = false) {
  const li = document.createElement("li");

  const span = document.createElement("span");
  span.textContent = taskText;
  if (completed) li.classList.add("completed");

  span.addEventListener("click", () => {
    li.classList.toggle("completed");
    saveTasks();
  });

  const delBtn = document.createElement("button");
  delBtn.textContent = "Delete";
  delBtn.onclick = () => {
    li.remove();
    saveTasks();
  };

  li.appendChild(span);
  li.appendChild(delBtn);
  taskList.appendChild(li);
}

addTaskBtn.addEventListener("click", () => {
  const taskText = taskInput.value.trim();
  if (taskText === "") return;
  createTaskElement(taskText);
  saveTasks();
  taskInput.value = "";
});

// Load tasks on page load
loadTasks();

// =========================
// Image Gallery with localStorage
// =========================
const galleryContainer = document.getElementById("galleryContainer");
const imageUpload = document.getElementById("imageUpload");

function loadGallery() {
  const images = JSON.parse(localStorage.getItem("gallery")) || [];
  galleryContainer.innerHTML = "";
  images.forEach((src) => {
    createImageElement(src);
  });
}

function saveGallery() {
  const images = [];
  galleryContainer.querySelectorAll("img").forEach((img) => {
    images.push(img.src);
  });
  localStorage.setItem("gallery", JSON.stringify(images));
}

function createImageElement(src) {
  const img = document.createElement("img");
  img.src = src;

  img.addEventListener("dblclick", () => {
    img.remove();
    saveGallery();
  });

  galleryContainer.appendChild(img);
}

imageUpload.addEventListener("change", (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      createImageElement(e.target.result);
      saveGallery();
    };
    reader.readAsDataURL(file);
  }
});

// Load gallery on page load
loadGallery();