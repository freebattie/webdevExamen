import { useContext, useEffect, useState } from "react";
import { Appcontext } from "../lib/appcontext.jsx";
import { useNavigate } from "react-router-dom";

export function MenuItem(props) {
  const { updateDish } = useContext(Appcontext);
  const { removeDish } = useContext(Appcontext);
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [price, setPrice] = useState(0);

  const [description, setDescription] = useState("");
  const [type, setType] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setName(props.d.name);
    setId(props.d._id);
    setPrice(props.d.price);

    setDescription(props.d.description);
    setType(props.d.type);
  }, []);

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
      await updateDish(dish);

      navigate("/");
    } catch (e) {
      props.setError(e);
      navigate("/error");
    }

    console.log("something");
  }

  async function handelClick(e) {
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
      await removeDish(dish);
      navigate("/");
    } catch (e) {
      props.setError(e);
      navigate("/error");
    }
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
            description:
            <input
              type="text"
              value={type}
              onChange={(e) => setType(e.target.value)}
            />
          </label>
        </div>
        <button className={"button"}>save</button>
      </form>
      <button className={"button"} onClick={(e) => handelClick(e)}>
        Delete
      </button>
    </div>
  );
}
