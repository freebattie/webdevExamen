import { useContext } from "react";
import { Appcontext } from "../lib/appcontext.jsx";
import { useLoader } from "../lib/useLoading.jsx";
import { ErrorMsg } from "./errormsg.jsx";
import { MenuItem } from "./menuitem.jsx";
import { useNavigate } from "react-router-dom";

export function EditMenu({ setError }) {
  const { listDishes } = useContext(Appcontext);
  const navigate = useNavigate();
  const { loading, error, data, reload } = useLoader(
    async () => await listDishes()
  );
  console.log(data);
  if (error) {
    return <ErrorMsg error={error} />;
  }
  if (loading) {
    return <h1>Loading....</h1>;
  }

  function handelClick() {
    navigate("/addmenu");
  }

  return (
    <div className={"itemsToEdit"}>
      {data.map((d) => {
        return (
          <div>
            <MenuItem d={d} setError={setError} />
          </div>
        );
      })}
      <button className={"button"} onClick={() => handelClick()}>
        Add Item
      </button>
    </div>
  );
}
