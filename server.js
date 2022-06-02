const express = require('express');
const path = require('path');
const fs = require('fs');
const { findById } = require('../../../Downloads/11.4(1)/lib/animals');
const { title } = require('process');

const PORT = process.env.PORT || 3001;
const app = express();


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './Develop/public/index.html'));
});

app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, './Develop/public/notes.html'));
});

app.get('/api/notes', (req, res) => {
  res.readFile('./Develop/db/db.json', "utf8", (err, jsonString))
});

app.get('/api/notes/:id', (req, res) => {
  const note = findById(req.params.id, notes)
  if (note) {
    res.json(note);
  } else {
    res.send(404);
  }
});

app.post('/api/notes', (req, res) => {
  // Log that a POST request was received
  console.info(`${req.method} request received to add a note`);

  // Destructuring assignment for the items in req.body
  const { title, text } = req.body;

  // If all the required properties are present
  if (id && title && username) {
    // Variable for the object we will save
    const newNote = {
      id,
      title,
      username,
      note_id: uuid(),
    };

    fs.readFile("./db/db.json", "utf8", (err, jsonString) => {
      // currentReviews = jsonString ? JSON.parse(jsonString) : [];

      if (jsonString) {
        currentNotes = JSON.parse(jsonString);
      } else {
        currentNotes = [];
      }

      currentNotes = [...currentNotes, newNote];

      noteString = JSON.stringify(currentNotes);

      //Write the string to a file
      fs.writeFile(`./db/db.json`, noteString, (err) =>
        err
          ? console.error(err)
          : console.log(`${newNote.title} has been written to JSON file`)
      );
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

app.delete("/notes/:id", (req, res) => {
  const deleteId = req.params.id;
  var newArray = [];

  fs.readFile("./db/db.json", "utf8", (err, data) => {
    if (err) {
      console.log(err);
    } else {
      const db = JSON.parse(data);
      newArray = notes.filter((note) => {
        if (note.id !== deleteId) {
          return true;
        }
      });
      console.log(newArray)
      fs.writeFile(
        path.join(__dirname, "../../db/db.json"),
        JSON.stringify(newArray, null, 2),
        (err) => {
          if (err) throw err;
          else res.status(200);
        }
      );
    }
  });
});


app.listen(PORT, () => {
  console.log(`API server now on port ${PORT}!`);
});
