// src/Table.jsx

function TableHeader() {
  return (
    <thead>
      <tr>
        <th>ID</th>
        <th>Name</th>
        <th>Job</th>
        <th>Remove</th>
      </tr>
    </thead>
  );
}

function TableBody({ characterData = [], removeCharacter }) {
  const rows = characterData.map((row, index) => {
    const id = row?.id ?? String(index);

    return (
      <tr key={id}>
        <td>{row?.id ?? "(no id)"}</td>
        <td>{row?.name ?? ""}</td>
        <td>{row?.job ?? ""}</td>
        <td>
          <button
            type="button"
            onClick={() => removeCharacter(row.id)}
            disabled={!row?.id}
          >
            Delete
          </button>
        </td>
      </tr>
    );
  });

  return <tbody>{rows}</tbody>;
}

export default function Table(props) {
  return (
    <table>
      <TableHeader />
      <TableBody
        characterData={props.characterData}
        removeCharacter={props.removeCharacter}
      />
    </table>
  );
}
