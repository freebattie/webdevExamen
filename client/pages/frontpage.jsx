import { useLoader } from "../lib/useLoading.jsx";
import { fetchJSON } from "../lib/http.js";
import { Link } from "react-router-dom";
import { LoginLinks } from "../Components/loginlinks.jsx";
import { useState } from "react";

const dishes = [
  {
    name: "dish1",
    price: 190,
    description: "something something",
    vegan: false,
    type: "pizza",
  },
  {
    name: "dish2",
    price: 210,
    description: "something something",
    vegan: false,
    type: "pizza",
  },
  {
    name: "dish3",
    price: 110,
    description: "something something",
    vegan: true,
    type: "sandwich",
  },
  {
    name: "dish1",
    price: 190,
    description: "something something",
    vegan: false,
    type: "pizza",
  },
  {
    name: "dish2",
    price: 210,
    description: "something something",
    vegan: false,
    type: "pizza",
  },
  {
    name: "dish3",
    price: 110,
    description: "something something",
    vegan: true,
    type: "sandwich",
  },
];

function Dish(props) {
  const [number, setNumber] = useState(0);
  return (
    <div className={"dish"}>
      <div>name :{props.d.name}</div>
      <div>price:{props.d.price}Nok</div>
      <div>description:{props.d.description}</div>
      <div>vegan: :{props.d.vegan}</div>
      <div>type Dish :{props.d.type}</div>
      <div>order :{number}</div>
      <button
        className={"button"}
        onClick={() => setNumber((prev) => prev + 1)}
      >
        add
      </button>
    </div>
  );
}

function Dishes() {
  return (
    <center>
      <div className={"menuheader"}>DISHES:</div>
      <div className={"menu"}>
        {dishes.map((d) => {
          return <Dish d={d} />;
        })}
      </div>
    </center>
  );
}

export function FrontPage() {
  const { loading, error, data, reload } = useLoader(
    async () => await fetchJSON("/api/login")
  );
  const user = data;

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return (
      <div style={{ border: "1px solid red", background: "Pink" }}>
        An error occurred: {error.toString()}
      </div>
    );
  }

  return (
    <div>
      <h1>Modern Snack</h1>
      {user ? (
        <div>
          Name: {user.name} username: ({user.username}) role:({user.role})
          <button
            onClick={async () => {
              await fetch("/api/login", {
                method: "delete",
              });
              reload();
            }}
          >
            Logout
          </button>
          <div>
            <Link to={"/edit"}>edit users</Link>
          </div>
        </div>
      ) : (
        <div>
          <LoginLinks />
          <Dishes />
        </div>
      )}
    </div>
  );
}
