export function LogOut(props) {
  return (
    <button
      className={"button"}
      onClick={async () => {
        await fetch("/api/login", {
          method: "delete",
        });
        props.reload();
      }}
    >
      Logout
    </button>
  );
}
