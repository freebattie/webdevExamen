import { useEffect, useState } from "react";

export function Dish(props) {
  const [number, setNumber] = useState();
  let nextId = number;
  useEffect(() => {
    setNumber(props.val);
    const old = [...props.orders];
    old[0] = null;
    props.setOrders(old);
  }, []);
  async function handelAddToList() {
    setNumber((perv) => perv + 1);
    nextId++;
    setNumber(nextId);
    const item = {
      id: props.d.id,
      name: props.d.name,
      description: props.d.description,

      type: props.d.type,
      price: props.d.price,
      size: nextId,
    };
    const old = [...props.orders];
    old[props.index] = item;
    props.setOrders(old);
  }
  async function handelRemoveToList() {
    if (number > 0) {
      nextId--;
      setNumber(nextId);
      const item = {
        id: props.d.id,
        name: props.d.name,
        price: props.d.price,
        size: nextId,
      };
      const old = [...props.orders];
      old[props.d.id] = item;
      props.setOrders(old);
    }
  }

  return (
    <div className={"dish"}>
      <div>name :{props.d.name}</div>
      <div>price:{props.d.price}Nok</div>
      <div>description:{props.d.description}</div>

      <div>type Dish :{props.d.type}</div>
      <div>order :{number}</div>
      <button className={"button"} onClick={() => handelAddToList()}>
        add
      </button>
      <footer>
        <button className={"button"} onClick={() => handelRemoveToList()}>
          remove
        </button>
      </footer>
    </div>
  );
}
