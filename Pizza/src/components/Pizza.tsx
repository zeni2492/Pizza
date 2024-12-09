type PizzaProps = {
    name: string;
    description: string;
    image: string;
};

export const Pizza = (props: PizzaProps) => {
    return (
        <div className="pizza">
            <h2>{props.name}</h2>
            <p>{props.description}</p>
            <img className="pizza__image" src={props.image} alt={props.name} />
        </div>
    );
};
