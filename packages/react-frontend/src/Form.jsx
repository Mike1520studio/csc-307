// src/Form.jsx
import React, { useState } from "react";

function Form(props) {
  const [person, setPerson] = useState({
    name: "",
    job: "",
  });

  function handleChange(event) {
    const { name, value } = event.target;
    setPerson({ ...person, [name]: value });
  }

  function submitForm() {
    props.handleSubmit(person); // call parent function :contentReference[oaicite:7]{index=7}
    setPerson({ name: "", job: "" }); // clear form :contentReference[oaicite:8]{index=8}
  }

  return (
    <form>
      <label htmlFor="name">Name</label>
      <input
        id="name"
        name="name"
        type="text"
        value={person.name}
        onChange={handleChange}
      />

      <label htmlFor="job">Job</label>
      <input
        id="job"
        name="job"
        type="text"
        value={person.job}
        onChange={handleChange}
      />

      <input type="button" value="Submit" onClick={submitForm} /> {/* :contentReference[oaicite:9]{index=9} */}
    </form>
  );
}

export default Form;
