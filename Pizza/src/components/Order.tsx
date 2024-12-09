import { TPizza } from "../pages/Home";

type PizzaProps = {
    cart: { pizza: TPizza; size: "S" | "M" | "L" }[];
};

const intl = new Intl.NumberFormat("ru-RU", {
    style: "currency",
    currency: "USD",
});

export function Order({ cart }: PizzaProps) {
    return (
        <div className="orderContainer">
            <h2>Order</h2>
            <div className="order">
                {cart.map((pizza) => (
                    <div key={pizza.pizza.id}>
                        <h2>{pizza.pizza.name}</h2>
                        <p>{pizza.pizza.description}</p>
                        <p>{intl.format(pizza.pizza.sizes[pizza.size])}</p>
                    </div>
                ))}
            </div>
            <button>
                Your bill is{" "}
                {intl.format(
                    cart.reduce(
                        (total, pizza) => total + pizza.pizza.sizes[pizza.size],
                        0
                    )
                )}
            </button>
        </div>
    );
}
