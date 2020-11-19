import React from 'react'
import { Link, withRouter } from "react-router-dom";

const NavLogo = () => {
    return (
        <div>
            <Link to="/" className="nav__link nav__link--logo">Logo</Link>
        </div>
    )
}

export default withRouter(NavLogo)
