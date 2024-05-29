import React, { useEffect, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import compare from "../images/compare.svg";
import wishlistIcon from "../images/wishlist.svg";
import userIcon from "../images/user.svg";
import cartIcon from "../images/cart.svg";
import menu from "../images/menu.svg";
import { useSelector, useDispatch } from "react-redux";
import { getCart, getWishlist } from "../features/products/productSlice";
import axios from "axios";
import { base_url } from "../utils/axiosConfig";
const Header = () => {
  const [categories,setCategories] = useState([])
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const cartState = useSelector((state) => state?.product?.cart) || [];
  const wishlistState =
    useSelector((state) => state?.product?.getWishlist) || [];

  const [totalCart, setTotalCart] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        await dispatch(getCart());
        await dispatch(getWishlist());

      }
    };

    fetchData();
  }, []);


  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${base_url}category/`);
        // Do something with response
        console.log(response.data);
        setCategories(response.data);

      } catch (error) {
        console.error(error);
      }
    };
  
    fetchCategories();
  }, []);

  useEffect(() => {
    if (cartState && cartState?.length > 0) {
      let totPrice = 0;
      for (let i = 0; i < cartState?.length; i++) {
        totPrice += Number(cartState[i]?.product_total);
      }
      setTotalCart(totPrice);
    }
  }, [cartState]);

  let cartLength = 0;
  if (cartState && Array.isArray(cartState)) {
    cartLength = cartState.length;
  }

  return (
    <>
      {/* <header className="header-top-strip py-3">
        <div className="container-xxl">
          <div className="row">
            <div className="col-6">
              <p className="text-white mb-0">
                Free Shipping Over Rs 5000 & Free Returns
              </p>
            </div>
            <div className="col-6">
              <p className="text-end text-white mb-0">
                Hotline:
                <a className="text-white" href="tel:+91 8264954234">
                  +78 xxx xxxx
                </a>
              </p>
            </div>
          </div>
        </div>
      </header> */}
      <header className="header-upper py-3 pt-4">
        <div className="container-xxl">
          <div className="row align-items-center">
            <div className="col-3">
              <h2>
                <Link to={"/"} className="text-white">
                  Nisha Fashion
                </Link>
              </h2>
            </div>
            <div className="col-4">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control py-2"
                  placeholder="Search Product Here..."
                  aria-label="Search Product Here..."
                  aria-describedby="basic-addon2"
                />
                <span className="input-group-text p-3" id="basic-addon2">
                  <BsSearch className="fs-7" />
                </span>
              </div>
            </div>
            <div className="col-5">
              <div className="header-upper-links d-flex align-items-center gap-3 justify-content-end">
        
                <div>
                  {!user ? (
                    <Link
                      to="/login"
                      className="d-flex align-items-center gap-10 text-white"
                    >
                      <img src={wishlistIcon} alt="wishlist" />
                    </Link>
                  ) : (
                    <Link
                      to="/wishlist"
                      className="d-flex align-items-center gap-10 text-white"
                    >
                      <img src={wishlistIcon} alt="wishlist" />
                      {/* <span className="badge bg-white text-dark">
                        {wishlistState.length}
                      </span> */}
                    </Link>
                  )}

                  {/* Login */}
                </div>
                <div>

                  <div className="dropdown">
                    <button
                      className="btn btn-secondary dropdown-toggle bg-transparent border-0 gap-15 d-flex align-items-center"
                      type="button"
                      id="dropdownMenuButton1"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <img src={userIcon} alt="user" />
                    </button>
                    <ul
                      className="dropdown-menu"
                      aria-labelledby="dropdownMenuButton1"
                    >
                    {user !== null ? (<>
                      <li>
                        <Link className="dropdown-item  text-dark" to="/profile">
                          My Account
                        </Link>
                      </li>
                        <li>
                          <Link
                            to="/order"
                            className=" dropdown-item  align-items-center text-dark"
                          >
                        
                            My Orders
                          </Link>
                        </li>
                        <li>
                          <button
                            to="/logout"
                            className=" dropdown-item  align-items-center text-dark "
                            onClick={() => {
                              // Remove the user and tokens from local storage
                              localStorage.removeItem('user');
                              localStorage.removeItem('token');
                          
                              // Refresh the page
                              window.location.reload();
                            }}
                          >
                        
                            Log Out
                          </button>
                        </li>
                        </>
                      ) : (
                        <li>
                          <Link
                            to="/login"
                            className=" dropdown-item  align-items-center text-dark"
                          >
                            {/* <p className="mb-0">
                      Log in <br /> My Account
                    </p> */}
                            Login
                          </Link>
                        </li>
                      )}
                    </ul>
                  </div>
                </div>

                {/* Cart */}
                <div>
                  {!user ? (
                    <Link
                      to="/login"
                      className="d-flex align-items-center gap-10 text-white"
                    >
                      <img src={cartIcon} alt="cart" />
                      {/* <div className="d-flex flex-column gap-10">
                        <span className="badge bg-white text-dark">0</span>
                        <p className="mb-0">Rs 500</p>
                      </div> */}
                    </Link>
                  ) : (
                    <Link
                      to="/cart"
                      className="d-flex align-items-center gap-10 text-white"
                    >
                      <img src={cartIcon} alt="cart" />
                      <div className="d-flex flex-column gap-10">
                        <span className="badge bg-white text-dark">
                          {cartLength}
                        </span>
                        <p className="mb-0">Rs {totalCart}</p>
                      </div>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <header className="header-bottom py-3">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <div className="menu-bottom d-flex align-items-center gap-30">
                <div>
                  <div className="dropdown">
                    <button
                      className="btn btn-secondary dropdown-toggle bg-transparent border-0 gap-15 d-flex align-items-center"
                      type="button"
                      id="dropdownMenuButton1"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <img src={menu} alt="" />
                      <span className="me-5 d-inline-block">
                        Shop Categories
                      </span>
                    </button>
                    <ul
                      className="dropdown-menu"
                      aria-labelledby="dropdownMenuButton1"
                    >
                      {(categories.length !== 0) && categories.map((category, index) => (
                        <li key={index}>
                          <Link
                            className="dropdown-item text-white"
                            to={`/category/${category.cat_id}`}
                          >
                            {category.cat_name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                      {/* <li>
                        <Link className="dropdown-item text-white" to="">
                          Action
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item text-white" to="">
                          Another action
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item text-white" to="">
                          Something else here
                        </Link>
                      </li>
                    </ul> */}
                  </div>
                </div>
                <div className="menu-links">
                  <div className="d-flex align-items-center gap-15 ">
                    <NavLink to="/">Home</NavLink>
                    <NavLink to="/product">Our Store</NavLink>
                    <NavLink to="/contact">Contact</NavLink>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;

// import React from "react";
// import { NavLink, Link } from "react-router-dom";
// import { BsSearch } from "react-icons/bs";

// function Header() {
//   return (
//     <>
//       <header className="header-top-strip py-3">
//         <div className="container-xxl">
//           <div className="row">
//             <div className="col-6">
//               <p className="text-white mb-0">
//                 Free Shipping Over Rs.5000 & Free Returns
//               </p>
//             </div>
//             <div className="col-6">
//               <p className="text-end text-white mb-0">
//                 Hotline:
//                 <a className="text-white" href="tel:+923000000000">
//                   +92 300 0000000
//                 </a>
//               </p>
//             </div>
//           </div>
//         </div>
//       </header>
//       <header className="header-upper py-3">
//         <div className="container-xxl">
//           <div className="row">
//             <div className="col-3">
//               <h2>
//                 <Link className="text-white">Nisha Fashion</Link>
//               </h2>
//             </div>
//             <div className="col-4">
//               <div className="input-group ">
//                 <input
//                   type="text"
//                   className="form-control py-2"
//                   placeholder="Search Product..."
//                   aria-label="Search Product"
//                   aria-describedby="basic-addon2"
//                 />
//                 <span className="input-group-text p-3" id="basic-addon2">
//                   <BsSearch className="fs-6 " />
//                 </span>
//               </div>
//             </div>
//             <div className="col-5">
//               <div className="header-upper-links d-flex justify-content-between align-items-center">
//                 <div>
//                   <Link className="d-flex align-items-center gap-10 text-white">
//                     <img src="images/compare.svg" alt="compare" />
//                     <p className="mb-0">
//                       Compare <br />
//                       Products
//                     </p>
//                   </Link>
//                 </div>
//                 <div>
//                   <Link className="d-flex align-items-center gap-10 text-white">
//                     <img src="images/wishlist.svg" alt="wishlist" />
//                     <p className="mb-0">
//                       Favourite <br />
//                       Wishlist
//                     </p>
//                   </Link>
//                 </div>
//                 <div>
//                   <Link className="d-flex align-items-center gap-10 text-white">
//                     <img src="images/user.svg" alt="user" />
//                     <p className="mb-0">
//                       Login <br />
//                       My Account
//                     </p>
//                   </Link>
//                 </div>
//                 <div>
//                   <Link className="d-flex align-items-center gap-10 text-white">
//                     <img src="images/cart.svg" alt="cart" />
//                     <div className="dflex-column gap-10">
//                       <span className="badge bg-white text-dark">0</span>
//                       <p className="mb-0">$ 500</p>
//                     </div>
//                   </Link>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </header>
//       <header className="header-bottom py-3">
//         <div className="container-xxl">
//           <div className="row">
//             <div className="col-12">
//               <div className="menu-bottom d-flex align-items-center gap-30">
//                 <div>
//                   <div className="dropdown">
//                     <button
//                       className="btn btn-secondary dropdown-toggle bg-transparent border-0 gap-15 d-flex align-items-center"
//                       type="button"
//                       id="dropdownMenuButton1"
//                       data-bs-toggle="dropdown"
//                       aria-expanded="false"
//                     >
//                       <img src="images/menu.svg" alt="menu" />
//                       <span className="me-5 d-inline-block">
//                         Shop Categories
//                       </span>
//                     </button>
//                     <ul
//                       className="dropdown-menu"
//                       aria-labelledby="dropdownMenuButton1"
//                     >
//                       <li>
//                         <Link className="dropdown-item text-white" to="/">
//                           Action
//                         </Link>
//                       </li>
//                       <li>
//                         <Link className="dropdown-item text-white" to="/">
//                           Another action
//                         </Link>
//                       </li>
//                       <li>
//                         <Link className="dropdown-item text-white" to="/">
//                           Something else here
//                         </Link>
//                       </li>
//                     </ul>
//                   </div>
//                 </div>
//                 Name
//                 <div className="menu-links">
//                   <div className="d-flex align-items-center gap-15">
//                     <NavLink to="/">Home</NavLink>
//                     <NavLink to="/">Our Store</NavLink>
//                     <NavLink to="/">Blogs</NavLink>
//                     <NavLink to="/contact">Contact</NavLink>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </header>
//     </>
//   );
// }

// export default Header;
