import { useContext, useEffect, useState } from "react";
import { Appcontext } from "../lib/appcontext.jsx";
import { useNavigate } from "react-router-dom";
import { LogOut } from "../Components/logout";

export function MenuItemAdd(props) {
  const { addDish } = useContext(Appcontext);
  const { removeDish } = useContext(Appcontext);
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");
  const navigate = useNavigate();

  async function handelSubmit(e) {
    e.preventDefault();
    const dish = {
      _id: id,
      id: id,
      name,
      price,

      description,
      type,
    };
    try {
      await addDish(dish);

      navigate("/");
    } catch (e) {
      props.setError(e);
      navigate("/error");
    }
  }

  async function handelBackClick(e) {
    navigate("/editmenu");
  }
  async function handelHomeClick(e) {
    navigate("..");
  }
  return (
    <div className={"editform"}>
      <form onSubmit={handelSubmit}>
        <div className={"editItem"}>
          <label>
            name:
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
          <label>
            price:
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </label>
          <label>
            description:
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </label>
          <label>
            type:
            <input
              type="text"
              value={type}
              onChange={(e) => setType(e.target.value)}
            />
          </label>
        </div>
        <button className={"button"}>save</button>
      </form>
      <button className={"button"} onClick={(e) => handelBackClick(e)}>
        back
      </button>
      <button className={"button"} onClick={(e) => handelHomeClick(e)}>
        home
      </button>
      <LogOut />
    </div>
  );
}
