import { useEffect, useState } from "react";
import Table from "./Table";
import Form from "./Form";

const API = "http://localhost:3000";

function MyApp() {
  const [characters, setCharacters] = useState([]);

  // GET users on load
  useEffect(() => {
    fetch(`${API}/users`)
      .then((res) => res.json())
      .then((data) => setCharacters(data.users_list))
      .catch((err) => console.log(err));
  }, []);

  // DELETE user by id
function removeCharacter(id) {
  fetch(`${API}/users/${id}`, { method: "DELETE" })
    .then(async (res) => {
      if (res.status === 204) {
        setCharacters((prev) => prev.filter((c) => c.id !== id));
        return;
      }
      // If backend returns error JSON
      const data = await res.json().catch(() => ({}));
      throw new Error(data.error || `Delete failed (${res.status})`);
    })
    .catch((err) => console.log(err));
}


  // POST user
  function updateList(person) {
    fetch(`${API}/users`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(person),
    })
      .then((res) => {
        if (res.status !== 201) throw new Error("Expected 201 Created");
        return res.json();
      })
      .then((createdUser) => setCharacters([...characters, createdUser]))
      .catch((err) => console.log(err));
  }

  return (
    <div className="container">
      <Form handleSubmit={updateList} />
      <Table characterData={characters} removeCharacter={removeCharacter} />
    </div>
  );
}

export default MyApp;
