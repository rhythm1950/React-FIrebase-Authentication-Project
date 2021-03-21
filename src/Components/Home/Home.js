import React from 'react';
import { useHistory } from 'react-router';
import '../Home/Home.css'

const Home = () => {

  const history = useHistory();
  const loginHandler = () => {
    history.push('/destination')
  }

  return (
    <section className="row container-fluid vehicles-card">

      <div className="col-md-3">
        <div className="card">
          <img src="https://i.ibb.co/xjQbQZc/download-13.jpg" alt="" />
          <h4 className="vehicle-name">Bike</h4>
          <button onClick={loginHandler} className="btn btn-primary">Select</button>
        </div>
      </div>

      <div className="col-md-3">
        <div className="card">
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8PutnQdQ2-U8tPJirnK4P7i6kalqP3cLRcw&usqp=CAU" alt="" />
          <h4 className="vehicle-name">Car</h4>
          <button onClick={loginHandler} className="btn btn-primary">Select</button>
        </div>
      </div>

      <div className="col-md-3">
        <div className="card">
          <img src="https://i.ibb.co/n1ZQ927/image.jpg" alt="" />
          <h4 className="vehicle-name">Bus</h4>
          <button onClick={loginHandler} className="btn btn-primary">Select</button>
        </div>
      </div>

      <div className="col-md-3">
        <div className="card">
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsRSuX-h1DrQVZZEaKvFhcRK3PK4yJHF3oRw&usqp=CAU" alt="" />
          <h4 className="vehicle-name">Train</h4>
          <button onClick={loginHandler} className="btn btn-primary">Select</button>
        </div>
      </div>

    </section>
  );
};

export default Home;