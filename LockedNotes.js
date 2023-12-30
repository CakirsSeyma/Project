//* SAAT VE GÜN BİLGİSİNİ ALIP DOM İLE HTML ELEMANLARINA YAZIYORUM
function getCurrentTime() {
    const date = new Date();
    const time = document.getElementById('currentTime');
    const currentDate = document.getElementById('currentDate');
    time.textContent = `TIME: ${date.toLocaleTimeString()}`;
    currentDate.textContent = `DATE: ${date.toLocaleDateString()}`;
}

setInterval(getCurrentTime, 1000);



//* main.html'deki app idli div elemntini alıyorum.
const notesContainer = document.getElementById("app");
//* main.html deki butona erişim sağlıyorum.
const addNoteButton = notesContainer.querySelector(".add-note");

//* getNote ile 
getNotes().forEach((note) => {
  const noteElement = createNoteElement(note.id, note.content);
  notesContainer.insertBefore(noteElement, addNoteButton);
});

addNoteButton.addEventListener("click", () => addNote());

function getNotes() {
  return JSON.parse(localStorage.getItem("stickynotes-notes-locked") || "[]");
}

function saveNotes(notes) {
  localStorage.setItem("stickynotes-notes-locked", JSON.stringify(notes));
}
function createNoteElement(id, content) {
    // Ana not konteyneri
    const outerContainer = document.createElement("div");
    outerContainer.classList.add("outer-container");
    
    // Her bir not konteyneri
    const noteContainer = document.createElement("div");
    noteContainer.classList.add("note-container");
  
    // Ana içerik konteyneri
    const contentContainer = document.createElement("div");
    contentContainer.classList.add("content-container");
  
    // Not metni alanı
    const note = document.createElement("textarea");
    note.classList.add("note");
    note.value = content;
    note.placeholder = "Write There...";

    note.addEventListener("keyup", (event) => {
        if (event.key === "Enter") {
            updateNote(id, note.value);
        }
    });
    
  
    // Kaydedilmiş renkleri kontrol etme
    const storedColors = JSON.parse(localStorage.getItem('sticky-notes-colors-locked')) || {};
    const storedColor = storedColors[id];
    if (storedColor) {
      note.style.backgroundColor = storedColor;
    }
  
    // Butonlar konteyneri
    const buttonsContainer = document.createElement("div");
    buttonsContainer.classList.add("buttons-container");
  
    // Delete Button
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "🚮";
    deleteButton.addEventListener("click", () => {
      deleteNote(id, outerContainer);
    });
  
    // Update Button
    const updateButton = document.createElement("button");
    updateButton.textContent = "✔";
    updateButton.addEventListener("click", () => {
      updateNote(id, note.value);
    });
  
    // Change Color Button
    const changeColorButton = document.createElement("button");
    changeColorButton.textContent = "🌈";
    changeColorButton.addEventListener("click", () => {
      changeNoteColor(id, note);
    });
  
    // Butonları butonlar konteynerine ekleme
    buttonsContainer.appendChild(deleteButton);
    buttonsContainer.appendChild(updateButton);
    buttonsContainer.appendChild(changeColorButton);
  
    // Not metnini ve butonları içerik konteynerine ekleme
    contentContainer.appendChild(note);
    contentContainer.appendChild(buttonsContainer);
  
    // İçerik konteynerini not konteynerine ekleme
    noteContainer.appendChild(contentContainer);
  
    // Not konteynerini dış konteynere ekleme
    outerContainer.appendChild(noteContainer);
    outerContainer.appendChild(buttonsContainer)
  
    // Ana not konteynerini döndürme
    return outerContainer;
  }
  

  function addNote() {
    const notes = getNotes();
    const noteObject = {
      id: new Date().getTime(), // Saat ve tarih bilgisini kullanarak benzersiz bir ID oluşturuyoruz
      content: ""
    };
  
    const noteElement = createNoteElement(noteObject.id, noteObject.content);
    notesContainer.insertBefore(noteElement, addNoteButton);
  
    notes.push(noteObject);
    saveNotes(notes);
  
    // Saat ve tarih bilgisini güncelleyen fonksiyonu burada çağırıyoruz
    getCurrentTime();
  }

function updateNote(id, newContent) {
  const notes = getNotes();
  const targetNote = notes.filter((note) => note.id == id)[0];

  targetNote.content = newContent;
  saveNotes(notes);
}



function deleteNote(id, element) {
  const notes = getNotes().filter((note) => note.id != id);

  saveNotes(notes);
  notesContainer.removeChild(element);

}
function changeNoteColor(id, note) {
    const colors = [
        "#f5c7c6", 
        "#f5b9b6", 
        "#f5d9c7", 
        "#f5e6b6", 
        "#d4edda",
        "#c9e1e1"  
    ];
    
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    note.style.backgroundColor = randomColor;

    // localStorage'dan renklerin nesnesini alma veya oluşturma
    const storedColors = JSON.parse(localStorage.getItem('sticky-notes-colors-locked')) || {};

    // İlgili not için renk ataması
    storedColors[id] = randomColor;
    
    // localStorage'a renkleri geri kaydetme
    localStorage.setItem('sticky-notes-colors-locked', JSON.stringify(storedColors));
}
