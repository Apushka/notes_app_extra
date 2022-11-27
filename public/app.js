document.addEventListener("click", (e) => {
  let li = e.target.closest("li");

  if (e.target.dataset.type === "remove") {
    const id = e.target.dataset.id;
    remove(id).then(() => {
      e.target.closest("li").remove();
    });
  }
  if (e.target.dataset.type === "update") {
    li.classList.add("edit");
  }
  if (e.target.dataset.type === "cancel") {
    const title = li.querySelector(".title").textContent.trim();
    li.querySelector(".titleEdit").value = title;
    li.classList.remove("edit");
  }
  if (e.target.dataset.type === "save") {
    const id = e.target.dataset.id;
    const newTitle = li.querySelector(".titleEdit").value.trim();
    update(id, newTitle);
    li.querySelector(".title").textContent = newTitle;
    li.classList.remove("edit");
  }
});

async function remove(id) {
  await fetch(`/${id}`, {
    method: "DELETE",
  });
}

async function update(id, title) {
  await fetch(`/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title }),
  });
}
