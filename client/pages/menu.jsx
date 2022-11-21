import { useContext, useEffect, useState } from "react";
import { Appcontext } from "../lib/appcontext.jsx";

export const dishes = [
  {
    id: 0,
    name: "dish1",
    price: 190,
    description: "something something",
    vegan: false,
    type: "pizza",
  },
  {
    id: 1,
    name: "dish2",
    price: 210,
    description: "something something",
    vegan: false,
    type: "pizza",
  },
  {
    id: 2,
    name: "dish3",
    price: 110,
    description: "something something",
    vegan: true,
    type: "sandwich",
  },
  {
    id: 3,
    name: "dish4",
    price: 190,
    description: "something something",
    vegan: false,
    type: "pizza",
  },
  {
    id: 4,
    name: "dish5",
    price: 210,
    description: "something something",
    vegan: false,
    type: "pizza",
  },
  {
    id: 5,
    name: "dish6",
    price: 110,
    description: "something something",
    vegan: true,
    type: "sandwich",
  },
];

export function Dish(props) {
  const [number, setNumber] = useState();
  let nextId = number;
  useEffect(() => {
    setNumber(props.val);
  }, []);
  async function handelAddToList() {
    setNumber((perv) => perv + 1);
    nextId++;
    setNumber(nextId);
    const item = {
      id: props.d.id,
      name: props.d.name,
      size: nextId,
    };
    const old = [...props.orders];
    old[props.d.id] = item;
    props.setOrders(old);
  }
  async function handelRemoveToList() {
    if (number > 0) {
      nextId--;
      setNumber(nextId);
      const item = {
        id: props.d.id,
        name: props.d.name,
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
      <div>vegan: :{props.d.vegan}</div>
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

export function Dishes() {
  const [orders, setOrders] = useState([]);
  const { addOrder } = useContext(Appcontext);
  console.log(orders);
  async function handelAddOrder() {
    await addOrder(orders);
  }

  return (
    <center>
      <div className={"menuheader"}>DISHES:</div>
      <div className={"menu"}>
        {dishes.map((d) => {
          return (
            <Dish
              key={d.id}
              d={d}
              setOrders={setOrders}
              orders={orders}
              val={0}
            />
          );
        })}
      </div>
      <button onClick={() => handelAddOrder()}>Order</button>
    </center>
  );
}
