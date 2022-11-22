import { useEffect, useState } from "react";

export function MenuItem(props) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");

  useEffect(() => {
    setName(props.d.name);
    setPrice(props.d.price);
    setDescription(props.d.description);
    setType(props.d.type);
  }, []);
  return (
    <div className={"editform"}>
      <form>
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
      <button className={"button"}>Delete</button>
    </div>
  );
}
