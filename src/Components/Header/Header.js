import React from 'react';
import { Link } from 'react-router-dom';
import '../Header/Header.css'

const Header = () => {
    return (
        <section className="row header-section">

            <div className="col-md-6">
                <h1 className="site-title">Easy Rides</h1>
            </div>

            <div className="col-md-6">
                <nav>
                    <Link to="/home">Home</Link>
                    <Link to="/destination">Destination</Link>
                    <Link to="/pick">Pick</Link>
                    <Link to="/summary">Summary</Link>
                    <Link to="/contact">Contact</Link>
                    <Link to="/login" className="login-button">Login</Link>
                </nav>
            </div>

        </section>

    );
};

export default Header;