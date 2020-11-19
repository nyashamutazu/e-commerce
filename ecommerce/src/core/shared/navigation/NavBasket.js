import React from 'react'
import { Link, withRouter } from "react-router-dom";

const NavBasket = () => {
    return (
        <div>
            <Link to="/basket" className="">Basket</Link>
        </div>
    )
}

export default withRouter(NavBasket)
