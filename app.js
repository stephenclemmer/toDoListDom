function handleFormSubmit(event) {
  event.preventDefault(); // Prevent the default form submission behavior

  // Get form values
  const noteTitle = document.getElementById("noteTitle").value;
  const noteContent = document.getElementById("noteContent").value;

  // Create a new note object
  const noteObject = {
    title: noteTitle,
    content: noteContent,
  };

  // Display the note on the page
  displayNote(noteObject);

  // Reset form fields
  document.getElementById("noteTitle").value = "";
  document.getElementById("noteContent").value = "";
}

function displayNote(note) {
  // Create elements for the note display
  const noteDiv = document.createElement("div");
  const titleElement = document.createElement("h2");
  const contentElement = document.createElement("p");
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  const editButton = document.createElement("button");
  editButton.textContent = "Edit";
  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";

  // Set content for elements
  titleElement.textContent = note.title;
  contentElement.textContent = note.content;

  // Handle checkbox to apply strikethrough effect
  checkbox.addEventListener("change", function () {
    if (checkbox.checked) {
      titleElement.style.textDecoration = "line-through";
      contentElement.style.textDecoration = "line-through";
    } else {
      titleElement.style.textDecoration = "none";
      contentElement.style.textDecoration = "none";
    }
  });

  // Handle delete button to remove the note
  deleteButton.addEventListener("click", function () {
    noteDiv.remove();
  });

  // Handle edit button to edit the note
  editButton.addEventListener("click", function () {
    createEditForm(note, noteDiv);
  });

  // Append elements to the note container
  noteDiv.appendChild(titleElement);
  noteDiv.appendChild(contentElement);
  noteDiv.appendChild(checkbox);
  noteDiv.appendChild(editButton);
  noteDiv.appendChild(deleteButton);
  document.getElementById("notesContainer").appendChild(noteDiv);
}

function createEditForm(note, noteDiv) {
  const editForm = document.createElement("form");
  const titleInput = document.createElement("input");
  const contentInput = document.createElement("textarea");
  const saveButton = document.createElement("button");
  saveButton.textContent = "Save";

  titleInput.value = note.title;
  contentInput.value = note.content;

  editForm.appendChild(titleInput);
  editForm.appendChild(contentInput);
  editForm.appendChild(saveButton);
  noteDiv.appendChild(editForm);

  saveButton.addEventListener("click", function (event) {
    event.preventDefault();
    note.title = titleInput.value;
    note.content = contentInput.value;
    updateNoteDisplay(note, noteDiv);
    editForm.remove();
  });
}

function updateNoteDisplay(note, noteDiv) {
  const titleElement = noteDiv.querySelector("h2");
  const contentElement = noteDiv.querySelector("p");
  titleElement.textContent = note.title;
  contentElement.textContent = note.content;
}
