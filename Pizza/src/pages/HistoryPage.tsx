import { useState, useEffect } from "react";
import { getPastOrders } from "../api/getPastOrders";

type Torder = {
    order_id: number;
    date: string;
    time: string;
};
export function HistoryPage() {
    const [orders, setOrders] = useState<Torder[]>([]);
    const [pages, setPages] = useState(1);
    const [isLoading, setIsLoading] = useState(true);

    async function fetchOrders() {
        setIsLoading(true);
        const orders = await getPastOrders(pages);
        setOrders(orders);
        setIsLoading(false);
    }

    useEffect(() => {
        fetchOrders();
    }, [pages]);

    return (
        <div>
            {isLoading ? (
                <div>Loading...</div>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <td>ID</td>
                            <td>Date</td>
                            <td>Time</td>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order) => (
                            <tr key={order.order_id}>
                                <td>{order.order_id}</td>
                                <td>{order.date}</td>
                                <td>{order.time}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
            <button disabled={pages < 1} onClick={() => setPages(pages - 1)}>
                Back
            </button>

            <button onClick={() => setPages(pages + 1)}>Next</button>
        </div>
    );
}
