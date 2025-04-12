// Animate container in
gsap.from(".glass", { duration: 1, y: 30, opacity: 0, ease: "power3.out" });

function addTask() {
  const taskInput = document.getElementById("taskInput");
  const taskText = taskInput.value.trim();
  if (!taskText) return;

  const li = document.createElement("li");
  li.className = "bg-gray-800 rounded-xl p-4 flex justify-between items-center shadow-md hover:shadow-xl transition-all";

  const span = document.createElement("span");
  span.textContent = taskText;
  span.className = "text-lg cursor-pointer flex-1";
  span.ondblclick = () => {
    span.classList.toggle("line-through");
    span.classList.toggle("text-green-400");
    celebrate();
  };

  const delBtn = document.createElement("button");
  delBtn.innerHTML = "❌";
  delBtn.className = "text-red-400 hover:text-red-600 text-2xl ml-4 transition";
  delBtn.onclick = () => {
    li.remove();
    saveTasks();
  };

  li.appendChild(span);
  li.appendChild(delBtn);
  document.getElementById("taskList").appendChild(li);

  taskInput.value = "";
  saveTasks();
  gsap.from(li, { duration: 0.6, y: 20, opacity: 0, ease: "back.out(1.7)" });
}

function saveTasks() {
  const tasks = [];
  document.querySelectorAll("#taskList li span").forEach(span => {
    tasks.push({ text: span.textContent, done: span.classList.contains("line-through") });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach(t => {
    const li = document.createElement("li");
    li.className = "bg-gray-800 rounded-xl p-4 flex justify-between items-center shadow-md hover:shadow-xl transition-all";

    const span = document.createElement("span");
    span.textContent = t.text;
    span.className = "text-lg cursor-pointer flex-1";
    if (t.done) {
      span.classList.add("line-through", "text-green-400");
    }

    span.ondblclick = () => {
      span.classList.toggle("line-through");
      span.classList.toggle("text-green-400");
      celebrate();
      saveTasks();
    };

    const delBtn = document.createElement("button");
    delBtn.innerHTML = "❌";
    delBtn.className = "text-red-400 hover:text-red-600 text-2xl ml-4 transition";
    delBtn.onclick = () => {
      li.remove();
      saveTasks();
    };

    li.appendChild(span);
    li.appendChild(delBtn);
    document.getElementById("taskList").appendChild(li);
  });
}

function celebrate() {
  const confetti = document.createElement("div");
  confetti.className = "absolute w-3 h-3 rounded-full bg-green-400 z-50";
  confetti.style.top = Math.random() * window.innerHeight + "px";
  confetti.style.left = Math.random() * window.innerWidth + "px";
  document.body.appendChild(confetti);
  gsap.to(confetti, {
    duration: 1,
    y: "+=100",
    opacity: 0,
    scale: 0,
    ease: "power1.out",
    onComplete: () => confetti.remove()
  });
}

loadTasks();
