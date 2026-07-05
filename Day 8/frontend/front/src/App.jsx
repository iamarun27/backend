import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [notes, setNotes] = useState([]);
  console.log("Hello integration");
  function fetchNotes() {
    axios.get("https://backend-0au0.onrender.com/api/notes").then((res) => {
      setNotes(res.data.notes);
    });
  }
  useEffect(() => {
    fetchNotes();
  }, []);

  function handleSubmit(e) {
    e.preventDefault();

    const { title, description } = e.target.elements;
    console.log(title.value, description.value);
    axios
      .post("https://backend-0au0.onrender.com/api/notes", {
        title: title.value,
        description: description.value,
      })
      .then((res) => {
        console.log(res.data);
        fetchNotes();

        // input field empty krne k liye

        e.target.reset();
      });
  }

  function handleDeleteNote(noteId) {
    console.log(noteId);
    axios
      .delete("https://backend-0au0.onrender.com/api/notes/" + noteId)
      .then((res) => {
        console.log(res.data);
        fetchNotes();
      });
  }

  // function handleUpdateNote(noteId) {
  //   console.log(noteId);
  //   axios
  //     .patch("http://localhost:3000/api/notes/" + noteId, {
  //       title: title,
  //       description: description,
  //     })
  //     .then((res) => {
  //       console.log(res.data);
  //       fetchNotes();
  //     });
  // }

  function handleUpdateNote(note) {
    const newTitle = prompt("Enter new title", note.title);
    const newDescription = prompt("Enter new description", note.description);

    axios
      .patch("https://backend-0au0.onrender.com/api/notes/" + note._id, {
        title: newTitle,
        description: newDescription,
      })
      .then((res) => {
        console.log(res.data);
        fetchNotes();
      });
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="note-create-form">
        <input required type="text" name="title" placeholder="userName" />
        <input
          required
          type="text"
          name="description"
          placeholder="userDescription"
        />
        <button>Create Note</button>
      </form>
      <div className="notes">
        {notes.map((note, idx) => {
          return (
            <div key={idx} className="note">
              <h1>{note.title}</h1>
              <p>{note.description}</p>
              <button
                onClick={() => {
                  handleDeleteNote(note._id);
                }}
              >
                Delete
              </button>

              <button
                onClick={() => {
                  handleUpdateNote(note);
                }}
              >
                Update
              </button>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default App;
