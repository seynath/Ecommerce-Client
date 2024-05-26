import React from 'react';
import heroImg from '../images/hero2.jpeg'

const Hero = () => {
  return (
    <div style={{height: '90vh', backgroundImage: `url(${heroImg})`, backgroundSize: 'cover', backgroundPosition: 'center'}} className="position-relative w-100">
      <div style={{top: 0, right: 0, bottom: 0, left: 0, backgroundColor: 'rgba(0,0,0,.2)'}} className="position-absolute text-white d-flex flex-column align-items-start justify-content-center">
        <div className="container">
          <div className="col-md-6">
            <span style={{color: '#313131'}} className="text-uppercase">Latest Technology</span>
            <h1 style={{color: '#ffffff'}} className="mb-4 mt-2 display-4 font-weight-bold">Find Your Perfect Mobile Match with Our <span style={{color: '#FEBD68'}}>Wide Selection of Products</span></h1>
            <p style={{color: '#e2e2e2'}}>Our mobile shop offers a wide range of products from the world's leading brands, including Apple, Samsung, and Huawei. Whether you're looking for a new smartphone, tablet, or smartwatch, we have the perfect device for you.</p>
            <div className="mt-5">
              <a href="#" style={{borderRadius: '30px', backgroundColor: '#FEBD68'}} className="btn px-5 py-3 text-dark mt-3 mt-sm-0">Shop Now</a>
            </div>
          </div>
        </div>
      </div>
      <a href="https://componentity.com" target="_blank" className="block">
        <img src="http://codenawis.com/componentity/wp-content/uploads/2020/08/logo-componentity-%E2%80%93-9.png" width="120px" className="d-block mx-auto my-5"/>
      </a>
    </div>
  );
};

export default Hero;
