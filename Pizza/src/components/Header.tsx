import { Link } from "react-router";

export const Header = () => {
    return (
        <div className="header">
            <Link to={"/about"}>About</Link>
            <Link to={"/"}>Home</Link>
            <Link to={"/history"}>History</Link>
        </div>
    );
};
