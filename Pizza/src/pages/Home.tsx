import { useEffect, useState } from "react";
import { Pizza } from "../components/Pizza";
import { PizzaOfTheDay } from "../components/PizzaOfTheDay";
import { Order } from "../components/Order";

export type TPizza = {
    id: string;
    name: string;
    category: string;
    description: string;
    image: string;
    sizes: {
        S: number;
        M: number;
        L: number;
    };
};

const intl = new Intl.NumberFormat("ru-RU", {
    style: "currency",
    currency: "USD",
});

export function Home() {
    const [PizzaTypes, setPizzaTypes] = useState<TPizza[]>([]);
    const [PizzaType, setPizzaType] = useState<string>("pepperoni");
    const [PizzaSize, setPizzaSize] = useState<"S" | "M" | "L">("M");
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [cart, setCart] = useState<
        { pizza: TPizza; size: "S" | "M" | "L" }[]
    >([]);

    async function fetchPizzaTypes() {
        const pizzasRes = await fetch("/api/pizzas");
        const pizzaJson = await pizzasRes.json();
        setPizzaTypes(pizzaJson);
        setIsLoading(false);
    }

    function addToCart(pizza: TPizza) {
        if (cart.length === 0) {
            setCart([{ pizza, size: PizzaSize }]);
        } else {
            setCart((prevCart) => [...prevCart, { pizza, size: PizzaSize }]);
        }
        console.log(cart);
    }

    useEffect(() => {
        fetchPizzaTypes();
    }, []);

    let selectPizza: TPizza | undefined;
    let price: string | number | undefined;

    if (!isLoading) {
        selectPizza = PizzaTypes.find((p) => p.id === PizzaType);
        price = intl.format(
            selectPizza?.sizes ? selectPizza.sizes[PizzaSize] : 0
        );
    } else {
        return <div>Loading...</div>;
    }

    return (
        <div className="home">
            <div className="PizzaContainer">
                <div className="PizzaContainer__pizzaOfTheDay">
                    <PizzaOfTheDay />
                </div>
                <div className="PizzaContainer__pizza">
                    <select
                        onChange={(e) => setPizzaType(e.target.value)}
                        name="pizza"
                        id=""
                    >
                        {PizzaTypes.map((p) => (
                            <option key={p.id} value={p.id}>
                                {p.name}
                            </option>
                        ))}
                    </select>

                    <div>
                        <span>
                            <input
                                onChange={() => setPizzaSize("S")}
                                type="radio"
                                name="pizza-size"
                                value={"S"}
                                checked={PizzaSize === "S"}
                                id="pizza-s"
                            />
                            <label htmlFor="pizza-s">Small</label>
                        </span>
                        <span>
                            <input
                                onChange={() => setPizzaSize("M")}
                                type="radio"
                                name="pizza-size"
                                value={"M"}
                                checked={PizzaSize === "M"}
                                id="pizza-m"
                            />
                            <label htmlFor="pizza-m">Medium</label>
                        </span>
                        <span>
                            <input
                                onChange={() => setPizzaSize("L")}
                                type="radio"
                                name="pizza-size"
                                value={"L"}
                                checked={PizzaSize === "L"}
                                id="pizza-l"
                            />
                            <label htmlFor="pizza-l">Large</label>
                        </span>
                    </div>
                    {selectPizza && (
                        <Pizza
                            name={selectPizza.name}
                            description={selectPizza.description}
                            image={selectPizza.image}
                        />
                    )}
                    <p>{price}</p>

                    <button onClick={() => addToCart(selectPizza!)}>
                        Add to cart
                    </button>
                </div>
                <div className="PizzaContainer__order">
                    <Order cart={cart} />
                </div>
            </div>
        </div>
    );
}
