import { useContext } from "react";
import { Appcontext } from "../lib/appcontext.jsx";
import { useLoader } from "../lib/useLoading.jsx";
import { ErrorMsg } from "./errormsg.jsx";
import { useNavigate } from "react-router-dom";
import { LogOut } from "../Components/logout";

export function MyOrders() {
  const { listOrders } = useContext(Appcontext);
  const navigate = useNavigate();
  const { loading, error, data, reload } = useLoader(
    async () => await listOrders()
  );

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <ErrorMsg error={error} />;
  }
  return (
    <div className={"orders"}>
      <div className={"ordersheader"}>
        <h1>ORDER FOR USER: </h1>
        <button className={"button"} onClick={() => navigate("/")}>
          back
        </button>
        <LogOut />
      </div>
      {data.map((o) => {
        return (
          <div key={o.id} className={"order"}>
            <div>name: {o.id}</div>
            <div>date: {o.date}</div>
            <div>time: {o.time}</div>
            <div>location: {o.location}</div>

            {o.orders.map((i, index) => {
              return (
                <div key={index} className={"items"}>
                  <div>name: {i.name}</div>
                  <div>price: {i.price}</div>
                  <div>how many: {i.size}</div>
                </div>
              );
            })}
            <div>total: {o.total}</div>
          </div>
        );
      })}
    </div>
  );
}
