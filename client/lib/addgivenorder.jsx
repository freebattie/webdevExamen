export async function addGivenOrder(newOrder, setError, navigate, addOrder) {
  if (newOrder.orders.length < 1) {
    setError("No items in list");
    navigate("/error");
  } else {
    try {
      const test = await addOrder(newOrder);

      navigate("/Myorders");
    } catch (e) {
      setError(e);
      navigate("/error");
    }
  }
}
