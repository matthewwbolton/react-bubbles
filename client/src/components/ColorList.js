import React, { useState } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors }) => {
  console.log(colors);
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  const [colorToAdd, setColorToAdd] = useState(initialColor);
  // const [mouseDownColor, setMouseDownColor] = useState();

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = e => {
    e.preventDefault();
    // Make a put request to save your updated color
    // think about where will you get the id from...
    // where is is saved right now?
    axiosWithAuth()
      .put(`/api/colors/${colorToEdit.id}`, colorToEdit)
      .then(res => {
        console.log("This is PUT RES", res);
        updateColors(
          [res.data].concat(colors.filter(color => color.id !== colorToEdit.id))
        );
        // push('/bubblepage');
      })
      .catch(err => console.log("This is PUT ERR", err.message));
  };

  const deleteColor = color => {
    // make a delete request to delete this color
    const colorToDelete = color.id;
    axiosWithAuth()
      .delete(`/api/colors/${colorToDelete}`)
      .then(res => {
        console.log("This is .DELETE RES", res);
        console.log("%cThis is COLORS", "color: orange", colors);
        updateColors(colors.filter(elem => elem.id !== colorToDelete));
      })
      .catch(err => console.log(err.message));
  };

  const addColor = color => {
    axiosWithAuth()
      .post("api/colors", colorToAdd)
      .then(res => {
        console.log(res);
      })
      .catch(err => console.log(err.message));
  };

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span
                className="delete"
                onClick={e => {
                  e.stopPropagation();
                  deleteColor(color);
                }}
              >
                x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      <br></br>
      <form onSubmit={addColor}>
        <legend>add color</legend>
        <label>
          color name:
          <input
            onChange={e =>
              setColorToAdd({ ...colorToAdd, color: e.target.value })
            }
            value={colorToAdd.color}
          />
        </label>
        <label>
          hex code:
          <input
            onChange={e =>
              setColorToAdd({
                ...colorToAdd,
                code: { hex: e.target.value }
              })
            }
            value={colorToAdd.code.hex}
          />
        </label>
        <div className="button-row">
          <button type="submit">add new color</button>
        </div>
      </form>
      <div />
      {/* stretch - build another form here to add a color */}
    </div>
  );
};

export default ColorList;
