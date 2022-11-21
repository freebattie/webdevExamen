import { useLoader } from "../lib/useLoading.jsx";
import { fetchJSON } from "../lib/http.js";

export function EditUsers() {
  const { loading, error, data, reload } = useLoader(
    async () => await fetchJSON("/api/role")
  );
  if (error) {
    return (
      <div style={{ border: "1px solid red", background: "Pink" }}>
        An error occurred: {error.toString()}
      </div>
    );
  }
  if (loading) {
    return <h1>Loading...</h1>;
  } else {
    return (
      <div>
        {data.map((u) => {
          return (
            <form>
              <div>username: {u.username}</div>
              <div>name: {u.name}</div>
              <div>role: {u.role}</div>
            </form>
          );
        })}
      </div>
    );
  }
}
