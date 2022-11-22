import { useContext } from "react";
import { Appcontext } from "../lib/appcontext.jsx";
import { useLoader } from "../lib/useLoading.jsx";
import { ErrorMsg } from "./errormsg.jsx";
import { MenuItem } from "./itemmenu.jsx";

export function EditMenu() {
  const { listDishes } = useContext(Appcontext);
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
  return (
    <div className={"itemsToEdit"}>
      {data.map((d) => {
        return (
          <div>
            <MenuItem d={d} />
          </div>
        );
      })}
      <button className={"button"}>Add Item</button>
    </div>
  );
}
