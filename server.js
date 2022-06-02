const express = require('express');
const path = require('path');
const fs = require('fs');
const uuid = require('./helpers/uuid');


const PORT = process.env.PORT || 3001;
const app = express();


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'));
});

app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, './public/notes.html'));
});

app.get('/api/notes', (req, res) => {
  fs.readFile("./db/db.json", "utf8", (err, jsonString) => {
    currentNotes = jsonString ? JSON.parse(jsonString) : [];
    res.json(currentNotes);
  })
});

app.get('/api/notes:note_id', (req, res) => {
  if (req.body && req.params.review_id) {
    console.info(`${req.method} request received to get a single a note`);
    const noteId = req.params.note_id;
    for (let i = 0; i < note.length; i++) {
      const currentNote = notes[i];
      if (currentNotes.notes_id === notesId) {
        res.json(currentNote);
        return;
      }
    }
    res.json('Note ID not found');
  }
});


app.post('/api/notes', (req, res) => {
  // Log that a POST request was received
  console.info(`${req.method} request received to add a note`);

  // Destructuring assignment for the items in req.body
  const { title, text } = req.body;

  // If all the required properties are present
  if (title && text) {
    // Variable for the object we will save
    const newNote = {
      title,
      text,
      note_id: uuid(),
    };

    fs.readFile("./db/db.json", "utf8", (err, data) => {

      if (err) {
        console.error(err);
      } else {
        // Convert string into JSON object
        const parsedNotes = JSON.parse(data);

        // Add a new review
        parsedNotes.push(newNote);

        // Write updated reviews back to the file
        fs.writeFile(
          './db/db.json',
          JSON.stringify(parsedNotes, null, 4),
          (writeErr) =>
            writeErr
              ? console.error(writeErr)
              : console.info('Successfully updated reviews!')
        );
      };
    });

    const response = {
      status: "success",
      body: newNote,
    };

    console.log(response);
    res.json(response);
  } else {
    res.json("Error in posting note");
  }
});

app.delete("/api/notes", (req, res) => {
  fs.readFile("./db/db.json", "utf8", (err, data) => {
    console.info(`${req.method} request received to delete a note`);

    // Destructuring assignment for the items in req.body
    const { title, text } = req.body;

    // If all the required properties are present
    if (title && text) {
      // Variable for the object we will delete
      const deleteNote = {
        title,
        text,
        note_id: uuid(),
      };

      fs.readFile("./db/db.json", "utf8", (err, data) => {

        if (err) {
          console.error(err);
        } else {
          // Convert string into JSON object
          const parsedNotes = JSON.parse(data);

          // Add a new review
          parsedNotes.unlink(deleteNote);

          // Write updated reviews back to the file
          fs.deleteFile(
            './db/db.json',
            JSON.stringify(parsedNotes, null, 4),
            (writeErr) =>
              writeErr
                ? console.error(writeErr)
                : console.info('Successfully delete note!')
          );
        }
      });

      const response = {
        status: "success",
        body: deleteNote,
      };

      console.log(response);
      res.json(response);
    } else {
      res.json("Error in posting note");
    }
  })
});


app.listen(PORT, () => {
  console.log(`API server now on port ${PORT}!`);
});
