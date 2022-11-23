import { useContext, useState } from "react";
import { Appcontext } from "../lib/appcontext.jsx";
import { useNavigate } from "react-router-dom";
import { useLoader } from "../lib/useLoading.jsx";
import { ErrorMsg } from "./errormsg.jsx";
import { Dish } from "./dish.jsx";
import { addGivenOrder } from "../lib/addgivenorder.jsx";

export function Dishes({ setError }) {
  const { listDishes } = useContext(Appcontext);
  const [orders, setOrders] = useState([{ price: 0, size: 0 }]);
  const [time, setTime] = useState("08:00");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const navigate = useNavigate();
  const { loading, error, data, reload } = useLoader(
    async () => await listDishes()
  );
  const { addOrder } = useContext(Appcontext);

  async function handelAddOrder(e) {
    e.preventDefault();

    const val = [...orders];
    console.log(val);
    let max = 0;
    val.forEach((e) => {
      if (e != null) {
        max += e.price * e.size;
      } else {
      }
    });

    const newOrder = {
      location,
      date: date.length < 1 ? today : date,
      time,
      orders,
      total: max,
    };
    await addGivenOrder(newOrder, setError, navigate, addOrder);
  }
  if (error) {
    return <ErrorMsg error={error} />;
  }
  if (loading) {
    return <h1>Loading....</h1>;
  }
  function getDate() {
    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth() + 1; //January is 0!
    let yyyy = today.getFullYear();

    if (dd < 10) {
      dd = "0" + dd;
    }

    if (mm < 10) {
      mm = "0" + mm;
    }

    return yyyy + "-" + mm + "-" + dd;
  }

  let today = getDate();

  return (
    <center>
      <div className={"menuheader"}>DISHES:</div>
      <div className={"menu"}>
        {data.map((d, index) => {
          return (
            <Dish
              key={d.id}
              d={d}
              setOrders={setOrders}
              orders={orders}
              val={0}
              index={index}
            />
          );
        })}
      </div>
      <form onSubmit={(e) => handelAddOrder(e)}>
        <div>
          <label>
            Location:
            <input
              className={"input"}
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </label>
          <label>
            date:
            <input
              className={"input"}
              type="date"
              value={date}
              min={today}
              onChange={(e) => setDate(e.target.value)}
            />
          </label>
          <label>
            time:
            <input
              className={"input"}
              type="time"
              value={time}
              min={"08:00"}
              max={"21:00"}
              onChange={(e) => setTime(e.target.value)}
            />
          </label>
        </div>
        <button data-testid={"button"} className={"button"}>
          Order
        </button>
      </form>
    </center>
  );
}
