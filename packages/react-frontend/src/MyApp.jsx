import { useEffect, useState } from "react";
import Table from "./Table";
import Form from "./Form";

const API = "http://localhost:3000";

function MyApp() {
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    fetch(`${API}/users`)
      .then((res) => res.json())
      .then((data) => setCharacters(data.users_list))
      .catch((err) => console.log(err));
  }, []);

  function removeCharacter(index) {
    const updated = characters.filter((_, i) => i !== index);
    setCharacters(updated);
  }

  function updateList(person) {
    setCharacters([...characters, person]);
  }

  return (
    <div className="container">
      <Form handleSubmit={updateList} />
      <Table characterData={characters} removeCharacter={removeCharacter} />
    </div>
  );
}

export default MyApp;
