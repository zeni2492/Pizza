export async function getPastOrders(pages: number) {
    const res = await fetch(`/api/past-orders?page=${pages}`);
    const data = await res.json();
    return data;
}
