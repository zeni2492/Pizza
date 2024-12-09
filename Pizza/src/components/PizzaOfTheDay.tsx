import { useEffect, useState } from "react";
import { TPizza } from "../pages/Home";
export function PizzaOfTheDay() {
    const [PizzaOfTheDay, setPizzaOfTheDay] = useState<TPizza>();
    const [isLoading, setIsLoading] = useState(true);

    const intl = new Intl.NumberFormat("ru-RU", {
        style: "currency",
        currency: "USD",
    });
    const getPizzaOfTheDay = async () => {
        const res = await fetch("/api/pizza-of-the-day");
        const pizza = await res.json();
        setPizzaOfTheDay(pizza);
        setIsLoading(false);
    };

    useEffect(() => {
        getPizzaOfTheDay();
    }, []);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <div className="pizzaOfTheDay">
                <h2>{PizzaOfTheDay?.name}</h2>
                <p>{PizzaOfTheDay?.description}</p>
                <img
                    className="pizzaOfTheDay__image"
                    src={PizzaOfTheDay?.image}
                    alt={PizzaOfTheDay?.name}
                />

                <p>{intl.format(PizzaOfTheDay!.sizes.M)}</p>
            </div>
        </div>
    );
}
