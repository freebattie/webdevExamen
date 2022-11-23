export function ErrorMsg(props) {
  return (
    <center>
      <div
        className={"error"}
        style={{ border: "1px solid red", background: "Pink" }}
      >
        An error occurred: {props.error.toString()}
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
  );
}
