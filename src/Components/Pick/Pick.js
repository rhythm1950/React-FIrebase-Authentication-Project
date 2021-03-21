import React from 'react';
import './Pick.css'

const Pick = () => {
    return (
        <div>
            <div className="row container-fluid pick-div">
                <div className="col-md-5 mb-4 pick-form-div">
                    <h4 className="mb-4">Enter Your Destination Here</h4>
                    <form action="">
                        <input type="text" name="pick from" label="Pick From" placeholder="Pick From" /><br />
                        <input type="text" name="pick to" label="Pick To" placeholder="Pick To" /><br />
                        <input type="submit" value="Search" />
                    </form>
                </div>
                <div className="col-md-7 map-div">
                    <img src="https://assets.website-files.com/5e832e12eb7ca02ee9064d42/5f7db426b676b95755fb2844_Group%20805.jpg" alt="" />
                </div>
            </div>
        </div>
    );
};

export default Pick;