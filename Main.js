//* SAAT VE GÜN BİLGİSİNİ ALIP DOM İLE HTML ELEMANLARINA YAZIYORUM
function getCurrentTime() {
  const date = new Date();
  const time = document.getElementById('currentTime');
  const currentDate = document.getElementById('currentDate');
  time.textContent = `TIME: ${date.toLocaleTimeString()}`;
  currentDate.textContent = `DATE: ${date.toLocaleDateString()}`;
}

setInterval(getCurrentTime, 1000);

//! NOT OLAYINI BURDA YAPMAYA BAŞLADIM

//* main.html'deki app idli div elemntini alıyorum.
const notesContainer = document.getElementById("app");
//* main.html deki butona erişim sağlıyorum.
const addNoteButton = notesContainer.querySelector(".addNote");

//* getNote ile bütün notları geziyorum ve main.html'deki ana div'e ekliyorum.
getNotes().forEach((note) => {
  const noteElement = createNoteElement(note.id, note.content);
  notesContainer.insertBefore(noteElement, addNoteButton);
});

//* addNoteButton'a event atıyorum basıldığında addNote fonksiyonunu çağırıyor.
addNoteButton.addEventListener("click", () => addNote());

//* LocalStorage'da kaydettiğim notları getItem ile alıyorum.
function getNotes() {
  return JSON.parse(localStorage.getItem("stickynotesNotes") || "[]");
}

//* LocalStorage'e notularımı kaydediyorum.

function saveNotes(notes) {
  localStorage.setItem("stickynotesNotes", JSON.stringify(notes));
}

//* DOM olaylarını kullanarak container'lar üretiyorum notlarımın ekranda düzgün gözükmesi için.  

function createNoteElement(id, content) {
  //! buttonların ve contentin bulunduğu bir outerContainer oluşturuyorum.
  const outerContainer = document.createElement("div");
  outerContainer.classList.add("outerContainer");

  //! Notumun bulunduğu container'ı oluşturdum.
  const contentContainer = document.createElement("div");
  contentContainer.classList.add("contentContainer");

  //! Notumu yazacağım textArea'yı create ettim.
  const note = document.createElement("textarea");
  note.classList.add("note");
  note.value = content;
  note.placeholder = "Write There...";

  //? Ayrıca nota enter için eventListener ekledim. Entera basınca da otomatik kaydediyorum.
  note.addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
      updateNote(id, note.value);
    }
  });


  //* Renk kontrolü yapıyorum o id'ye sahip notu alıp background rengini onu ayarlıyorum.
  const storedColors = JSON.parse(localStorage.getItem('stickyNotesColors')) || {};
  const storedColor = storedColors[id];
  if (storedColor) {
    note.style.backgroundColor = storedColor;
  }

  //* Butonların düzgün durması için bir div oluşturuyorum.
  const buttonsContainer = document.createElement("div");
  buttonsContainer.classList.add("buttonsContainer");

  //* Delete Button'u oluşturup listener ekliyorum.
  const deleteButton = document.createElement("button");
  deleteButton.textContent = "🚮";
  deleteButton.addEventListener("click", () => {
    deleteNote(id, outerContainer);
  });

  //* Update Button'u oluşturup listener ekliyourm.
  const updateButton = document.createElement("button");
  updateButton.textContent = "✔";
  updateButton.addEventListener("click", () => {
    updateNote(id, note.value);
  });

  //* Change Color Button'u oluşturuyorum ve yine listener ekliyorum.
  const changeColorButton = document.createElement("button");
  changeColorButton.textContent = "🌈";
  changeColorButton.addEventListener("click", () => {
    changeNoteColor(id, note);
  });

  //* Button container'ına appendChild ile oluşturduğum elementleri ekliyorum.
  buttonsContainer.appendChild(deleteButton);
  buttonsContainer.appendChild(updateButton);
  buttonsContainer.appendChild(changeColorButton);

  //* Not metnini ve butonları content container'ına ekliyorum.
  contentContainer.appendChild(note);
  contentContainer.appendChild(buttonsContainer);
  outerContainer.appendChild(contentContainer);
  outerContainer.appendChild(buttonsContainer);

  //* Oluşturduğum outerContainer'ını geri döndürüyoeum.
  return outerContainer;
}


function addNote() {
  const notes = getNotes();
  //* note'un özelliklerini tanımladığım bir nesne oluşturdum.
  const noteObject = {
    //* unique id oluşturmak için time kullandım.
    id: new Date().getTime(),
    content: ""
  };
  //* createNote'u çağırıp oluşturduğum notun idsnin ve content'ini giriyorum.
  const noteElement = createNoteElement(noteObject.id, noteObject.content);
  notesContainer.insertBefore(noteElement, addNoteButton);
  //* notes listeme notlarımı ekliyorum ve save ediyorum.
  notes.push(noteObject);
  saveNotes(notes);

  //* Saat ve tarih bilgisini güncelleyen fonksiyonu çağırıyorum.
  getCurrentTime();
}

function updateNote(id, newContent) {
  const notes = getNotes();
  //* notes listesi üzerinden o id'ye sahip notu alıyorum ve targetNote değişkenine atıyorum.
  const targetNote = notes.filter((note) => note.id == id)[0];
  //* contentini değiştirip geri save ediyorum.
  targetNote.content = newContent;
  saveNotes(notes);
}



function deleteNote(id, element) {
  //* Bütün notların içinde eğer silmek istediğim id'ye sahip notu filter ediyorum ve geri kalan notları 
  //* geri save ediyorum.
  const notes = getNotes().filter((note) => note.id != id);
  saveNotes(notes);
  //* note conteynırındaki o idye sahip notu siliyorum.
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
  //* listenin içinden random bir renk seçiyorum.
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  note.style.backgroundColor = randomColor;

  //* LocalStorage'dan nesnelerin rengini alıyorum.
  const storedColors = JSON.parse(localStorage.getItem('stickyNotesColors')) || {};

  //* o id'ye sahip notun renginini değiştiriyorum
  storedColors[id] = randomColor;

  //* değiştirdiğim rengi de geriye localStorage'e yazıyorum.
  localStorage.setItem('stickyNotesColors', JSON.stringify(storedColors));
}
