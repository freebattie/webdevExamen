import { useNavigate } from "react-router-dom";

export function ErrorUser() {
  const navigate = useNavigate();
  return (
    <div>
      <center>
        <div
          className={"error"}
          style={{ border: "1px solid red", background: "Pink" }}
        >
          <div>user exsist</div>
          <div>
            <button className={"button"} onClick={(e) => navigate("/")}>
              back
            </button>{" "}
            <button className={"button"} onClick={(e) => navigate("/login")}>
              login
            </button>
          </div>
        </div>
      </center>
    </div>
  );
}
