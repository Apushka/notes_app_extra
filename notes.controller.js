const fs = require("fs/promises");
const path = require("path");
const chalk = require("chalk");

const notesPath = path.join(__dirname, "db.json");

async function addNote(title) {
  const notes = await getNotes();

  const note = {
    title,
    id: Date.now().toString(),
  };

  notes.push(note);
  await fs.writeFile(notesPath, JSON.stringify(notes));
  console.log(chalk.green.inverse("Note was added"));
}

async function removeNote(id) {
  const notes = await getNotes();
  const noteToRemove = notes.find((note) => note.id === id);
  if (!noteToRemove) {
    return console.log(chalk.bgRed(`Note ${id} not found in database`));
  }
  const filteredNotes = notes.filter((note) => note.id !== noteToRemove.id);
  await fs.writeFile(notesPath, JSON.stringify(filteredNotes));
  console.log(chalk.bgBlue(`Note ${id} was successfully removed`));
}

async function updateNote(id, newTitle) {
  const notes = await getNotes();
  const noteToUpdate = notes.find((note) => note.id === id);
  if (!noteToUpdate) {
    return console.log(chalk.bgRed(`Note ${id} not found in database`));
  }
  noteToUpdate.title = newTitle;
  await fs.writeFile(notesPath, JSON.stringify(notes));
  console.log(chalk.bgBlue(`Note ${id} was successfully updated`));
}

async function getNotes() {
  const notes = await fs.readFile(notesPath, { encoding: "utf-8" });
  return Array.isArray(JSON.parse(notes)) ? JSON.parse(notes) : [];
}

async function printNotes() {
  const notes = await getNotes();
  console.log(chalk.bgBlue("Here is the list of notes:"));
  notes.forEach((note) => {
    console.log(chalk.blue(note.id, note.title));
  });
}

module.exports = {
  addNote,
  getNotes,
  removeNote,
  updateNote,
};
