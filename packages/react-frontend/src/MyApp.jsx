// src/MyApp.jsx
import React, { useState } from "react";
import Table from "./Table";
import Form from "./Form";

function MyApp() {
  const [characters, setCharacters] = useState([]); // empty state :contentReference[oaicite:3]{index=3}

  function removeCharacter(index) {
    const updated = characters.filter((_, i) => i !== index);
    setCharacters(updated);
  }

  function updateList(person) {
    setCharacters([...characters, person]);
  }

  return (
    <div className="container">
      <Form handleSubmit={updateList} /> {/* pass function as prop :contentReference[oaicite:4]{index=4} */}
      <Table characterData={characters} removeCharacter={removeCharacter} />
    </div>
  );
}

export default MyApp;
