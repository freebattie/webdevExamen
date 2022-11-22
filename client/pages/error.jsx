export function Error(props) {
  return (
    <div style={{ border: "1px solid red", background: "Pink" }}>
      An error occurred: {props.error.toString()}
    </div>
  );
}
