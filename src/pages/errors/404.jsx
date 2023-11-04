import React from "react";
import { NavLink } from "react-router-dom";
import rocket from "../../assets/rocket.svg";
import moon from "../../assets/moon.svg";
import earth from "../../assets/earth.svg";
import astronaut from "../../assets/astronaut.svg";
import notfound from "../../assets/404.svg";
import NavBar from "../../layouts/navbar/Navbar";
export default function NotFound() {
  return (
    <div className="overflow-hidden">
      <div className="bg-purple overflow-hidden">
        <div className="z-50">
          <NavBar />
        </div>
        <div className="stars">
          <div className="">
            <div className="absolute left-2/4 top-2/4 -translate-x-2/4  -translate-y-2/4 flex flex-col justify-center items-center space-y-6 central-body z-50">
              <img className="image-404" src={notfound} width="300px" />
              <NavLink to="/" className="btn-go-home">
                <div className=" text-orange-200 rounded-full sm:px-10 px-4 py-2 border-2 border-orange-200 hover:bg-orange-300 hover:text-black transition-all duration-150 font-semibold">
                  GO BACK HOME
                </div>
              </NavLink>
            </div>
          </div>
          <div className="objects z-0">
            <img
              className="object_rocket absolute bottom-0 mb-2 ml-2"
              src={rocket}
              width="40px"
            />
            <div className="earth-moon z-0">
              <img
                className="object_earth absolute left-48 top-32"
                src={earth}
                width="100px"
              />
              <img
                className="object_moon absolute left-64 top-16"
                src={moon}
                width="80px"
              />
            </div>
            <div className="box_astronaut">
              <img className="object_astronaut" src={astronaut} width="140px" />
            </div>
          </div>
          <div className="glowing_stars">
            <div className="star">
              <div className="star">
                <div className="star">
                  <div className="star">
                    <div className="star"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
