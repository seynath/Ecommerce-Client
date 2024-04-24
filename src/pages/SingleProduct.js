import React, { useEffect, useState } from "react";
import ReactStars from "react-rating-stars-component";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import ProductCard from "../components/ProductCard";
import ReactImageZoom from "react-image-zoom";
import Color from "../components/Color";
import { TbGitCompare } from "react-icons/tb";
import { AiOutlineHeart } from "react-icons/ai";
import { Link, useLocation } from "react-router-dom";
import watch from "../images/watch.jpg";
import Container from "../components/Container";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, getCart, getSingleProduct } from "../features/products/productSlice";

const SingleProduct = () => {
  const location = useLocation();
  const getProductId = location.pathname.split("/")[2];

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getSingleProduct(getProductId));
    dispatch(getCart())
    
  }, [dispatch, getProductId]);
  const { singleProduct } = useSelector((state) => state?.product);
  // console.log({ singleProduct });
  
  const initialPrice = singleProduct?.price;
  // console.log(initialPrice);
  
  const [orderedProduct, setorderedProduct] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");
  const [price, setPrice] = useState(0);
  const [cartItems, setCartItems] = useState([]);



  // const handleColorChange = (colorCode) => {
  //   setColor(colorCode);
  //   const selectedSizeColor = singleProduct?.size_color_quantity?.find(
  //     (scq) => scq.color_code === colorCode && scq.size_id === size
  //   );
  //   setPrice(selectedSizeColor?.unit_price || 0);
  // };
  const handleColorChange = (colorCode) => {
    setColor(colorCode);
    const selectedSizeColor = singleProduct?.size_color_quantity?.find(
      (scq) => scq.color_code === colorCode && scq.size_id === size
    );
    setPrice((selectedSizeColor?.unit_price || 0) * quantity);
  };

  // const handleSizeChange = (sizeId) => {
  //   setSize(sizeId);
  //   getSizeQuantity();
  // };

  const handleSizeChange = (sizeId) => {
    setSize(sizeId);
    const selectedSizeColor = singleProduct?.size_color_quantity?.find(
      (scq) => scq.color_code === color && scq.size_id === sizeId
    );
    setPrice((selectedSizeColor?.unit_price || 0) * quantity);
  };

  // const getSizeQuantity = () => {
  //   if (color && size) {
  //     const selectedSizeColor = singleProduct?.size_color_quantity?.find(
  //       (scq) => scq.color_code === color && scq.size_id === size
  //     );

  //     return selectedSizeColor?.quantity || 0;
  //   }

  //   return 0;
  // };

  const getSizeQuantity = () => {
    if (color && size) {
      const selectedSizeColor = singleProduct?.size_color_quantity?.find(
        (scq) => scq.color_code === color && scq.size_id === size
      );
      return selectedSizeColor?.quantity || 0;
    }
    return 0;
  };

  useEffect(() => {
    if (color && size && quantity) {
      const selectedSizeColor = singleProduct?.size_color_quantity?.find(
        (scq) => scq.color_code === color && scq.size_id === size
      );
      setPrice((selectedSizeColor?.unit_price || 0) * quantity);
    }
  }, [color, size, quantity]);

  const uploadCart = () => {
    if (color && size && quantity) {
      const selectedSizeColor = singleProduct?.size_color_quantity?.find(
        (scq) => scq.color_code === color && scq.size_id === size
      );
      console.log(selectedSizeColor);
      console.log(quantity);
      dispatch(addToCart({ size_color_quantity_id: selectedSizeColor.size_color_quantity_id, quantity: parseInt(quantity), product_total: price }));
  
      // if (selectedSizeColor) {
      //   const existingItemIndex = cartItems.findIndex(
      //     (item) => item.size_color_quantity_id === selectedSizeColor.size_color_quantity_id
      //   );
      //   console.log(existingItemIndex);
  
      //   if (existingItemIndex !== -1) {
      //     // Update the quantity of the existing item in the cart
      //     const updatedCartItems = [...cartItems];
      //     updatedCartItems[existingItemIndex].quantity += parseInt(quantity);
      //     setCartItems(updatedCartItems);
      //     console.log(cartItems); 
      //   } else {
      //     // Add the new item to the cart
      //     setCartItems([
      //       ...cartItems,
      //       {
      //         size_color_quantity_id: selectedSizeColor.size_color_quantity_id,
      //         quantity: parseInt(quantity),
      //       },
      //     ]);
      //     console.log(cartItems);
      //   }
  
      //   // You can display a success message or perform any other action here
      //   alert("Item added to cart");
      // } else {
      //   // You can display an error message or perform any other action here
      //   alert("Invalid selection. Please choose a valid color and size.");
      // }
    } else {
      // You can display an error message or perform any other action here
      alert("Please select color, size, and quantity to add the item to the cart.");
    }
  };
  

  // const uniqueSizes = [...new Set(singleProduct?.size_color_quantity?.map(scq => scq.size_name))];

  // const uniqueSizes = [...new Set(singleProduct?.size_color_quantity?.map(scq => ({ size_id: scq.size_id, size_name: scq.size_name })))];

  const uniqueSizes = singleProduct?.size_color_quantity
    ?.map((scq) => ({ size_id: scq.size_id, size_name: scq.size_name }))
    .filter(
      (value, index, self) =>
        index === self.findIndex((t) => t.size_id === value.size_id)
    );

  // console.log(uniqueSizes);

  const props = {
    width: 594,
    height: 600,
    zoomWidth: 600,

    img: singleProduct?.image_link
      ? singleProduct?.image_link
      : "https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?cs=srgb&dl=pexels-fernando-arcos-190819.jpg&fm=jpg",
  };

  const copyToClipboard = (text) => {
    console.log("text", text);
    var textField = document.createElement("textarea");
    textField.innerText = text;
    document.body.appendChild(textField);
    textField.select();
    document.execCommand("copy");
    textField.remove();
  };
  const closeModal = () => {};

  return (
    <>
      <Meta title={"Product Name"} />
      <BreadCrumb title={singleProduct?.p_title} />
      <Container class1="main-product-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-6">
            <div className="main-product-image">
              <div>
                <ReactImageZoom {...props} />
              </div>
            </div>
            <div className="other-product-images d-flex flex-wrap gap-15">
              {singleProduct?.images?.map((image, index) => (
                <div key={index}>
                  <img src={image.image_link} className="img-fluid" alt="" />
                </div>
              ))}
              {/* <div>
                <img
                  src="https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?cs=srgb&dl=pexels-fernando-arcos-190819.jpg&fm=jpg"
                  className="img-fluid"
                  alt=""
                />
              </div> */}
            </div>
          </div>
          <div className="col-6">
            <div className="main-product-details">
              <div className="border-bottom">
                <h3 className="title">{singleProduct?.p_title}</h3>
              </div>
              <div className="border-bottom py-3">
                {price === 0 ? (
                  <p className="price">Rs {singleProduct?.price}</p>
                ) : (
                  <p className="price">Rs {price.toFixed(2)}</p>
                )}
                <div className="d-flex align-items-center gap-10">
                  <ReactStars
                    count={5}
                    size={24}
                    value={Number(singleProduct?.total_rating)}
                    edit={false}
                    activeColor="#ffd700"
                  />
                  <p className="mb-0 t-review">( 2 Reviews )</p>
                </div>
                <a className="review-btn" href="#review">
                  Write a Review
                </a>
              </div>
              <div className=" py-3">
                {/* <div className="d-flex gap-10 align-items-center my-2">
                  <h3 className="product-heading">Type :</h3>
                  <p className="product-data">Watch</p>
                </div> */}
                <div className="d-flex gap-10 align-items-center my-2">
                  <h3 className="product-heading">Brand :</h3>
                  <p className="product-data">{singleProduct?.brand}</p>
                </div>
                <div className="d-flex gap-10 align-items-center my-2">
                  <h3 className="product-heading">Category :</h3>
                  <p className="product-data">{singleProduct?.cat_name}</p>
                </div>
                {/* <div className="d-flex gap-10 align-items-center my-2">
                  <h3 className="product-heading">Tags :</h3>
                  <p className="product-data">Watch</p>
                </div> */}
                <div className="d-flex gap-10 align-items-center my-2">
                  <h3 className="product-heading">Availablity :</h3>
                  <p className="product-data">{getSizeQuantity()} Items Left</p>
                </div>
                <div className="d-flex gap-10 flex-column mt-2 mb-3">
                  <h3 className="product-heading">Size :</h3>
                  <div className="d-flex flex-wrap gap-15">

                    {/* {uniqueSizes?.map((scq) => (
                      <span
                        key={scq.size_color_quantity_id}
                        style={{ cursor: "pointer" }}
                        className={`badge border border-1 text-dark border-secondary ${
                          scq.size_id === parseInt(size) ? "bg-danger" : ""
                        }`}
                        onClick={() => handleSizeChange(scq.size_id)}
                      >
                        {scq.size_name}
                      </span>
                    ))} */}

                    {uniqueSizes?.map((scq) => (
                      <span
                        key={scq.size_id}
                        style={{ cursor: "pointer" }}
                        className={`badge border border-1 text-dark border-secondary ${
                          scq.size_id === parseInt(size) ? "bg-danger" : ""
                        }`}
                        onClick={() => handleSizeChange(scq.size_id)}
                      >
                        {scq.size_name}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="d-flex gap-10 flex-column mt-2 mb-3">
                  <h3 className="product-heading">Color :</h3>

                  <Color
                    sizeColorQuantity={singleProduct?.size_color_quantity}
                    onColorChange={handleColorChange}
                    selectedColor={color}
                  />
                </div>
                <div className="d-flex align-items-center gap-15 flex-row mt-2 mb-3">
                  <h3 className="product-heading">Quantity :</h3>
                  <div className="">
                    <input
                      type="number"
                      name=""
                      min={1}
                      max={getSizeQuantity()}
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                      className="form-control"
                      style={{ width: "70px" }}
                      id=""
                    />
                  </div>
                  <div className="d-flex align-items-center gap-30 ms-5">
                    <button
                      className="button border-0"
                      data-bs-toggle="modal"
                      data-bs-target="#staticBackdrop"
                      type="button"
                      onClick={()=>{uploadCart()}}
                    >
                      Add to Cart
                    </button>
                    <button className="button signup">Buy It Now</button>
                  </div>
                </div>
                <div className="d-flex align-items-center gap-15">
                  {/* <div>
                    <a href="##">
                      <TbGitCompare className="fs-5 me-2" /> Add to Compare
                    </a>
                  </div> */}
                  <div>
                    <a href="##">
                      <AiOutlineHeart className="fs-5 me-2" /> Add to Wishlist
                    </a>
                  </div>
                </div>
                <div className="d-flex gap-10 flex-column  my-3">
                  <h3 className="product-heading">Shipping & Returns :</h3>
                  <p className="product-data">
                    Free shipping and returns available on all orders! <br /> We
                    ship all Worldwide orders within
                    <b> 5-10 business days!</b>
                  </p>
                </div>
                {/* <div className="d-flex gap-10 align-items-center my-3">
                  <h3 className="product-heading">Product Link:</h3>
                  <a
                    // href="javascript:void(0);"
                    href="https://example.com"
                    onClick={() => {
                      copyToClipboard(
                        "https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?cs=srgb&dl=pexels-fernando-arcos-190819.jpg&fm=jpg"
                      );
                    }}
                  >
                    Copy Product Link
                  </a>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </Container>
      <Container class1="description-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <h4>Description</h4>
            <div className="bg-white p-3">
              <p
              // dangerouslySetInnerHTML={{ __html: productState?.p_description }}
              >
                {singleProduct?.p_description}
              </p>
            </div>
          </div>
        </div>
      </Container>

      {/* ---------------------------------------------------------------------------- */}

      <Container class1="reviews-wrapper home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <h3 id="review">Reviews</h3>
            <div className="review-inner-wrapper">
              <div className="review-head d-flex justify-content-between align-items-end">
                <div>
                  <h4 className="mb-2">Customer Reviews</h4>
                  <div className="d-flex align-items-center gap-10">
                    <ReactStars
                      count={5}
                      size={24}
                      value={4}
                      edit={false}
                      activeColor="#ffd700"
                    />
                    <p className="mb-0">Based on 2 Reviews</p>
                  </div>
                </div>
                {orderedProduct && (
                  <div>
                    <a
                      className="text-dark text-decoration-underline"
                      href="###"
                    >
                      Write a Review
                    </a>
                  </div>
                )}
              </div>
              <div className="review-form py-4">
                <h4>Write a Review</h4>
                <form action="" className="d-flex flex-column gap-15">
                  <div>
                    <ReactStars
                      count={5}
                      size={24}
                      value={4}
                      edit={true}
                      activeColor="#ffd700"
                    />
                  </div>
                  <div>
                    <textarea
                      name=""
                      id=""
                      className="w-100 form-control"
                      cols="30"
                      rows="4"
                      placeholder="Comments"
                    ></textarea>
                  </div>
                  <div className="d-flex justify-content-end">
                    <button className="button border-0">Submit Review</button>
                  </div>
                </form>
              </div>
              <div className="reviews mt-4">
                <div className="review">
                  <div className="d-flex gap-10 align-items-center">
                    <h6 className="mb-0">XYZ</h6>
                    <ReactStars
                      count={5}
                      size={24}
                      value={4}
                      edit={false}
                      activeColor="#ffd700"
                    />
                  </div>
                  <p className="mt-3">
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                    Consectetur fugit ut excepturi quos. Id reprehenderit
                    voluptatem placeat consequatur suscipit ex. Accusamus dolore
                    quisquam deserunt voluptate, sit magni perspiciatis quas
                    iste?
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
      <Container class1="popular-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <h3 className="section-heading">Our Popular Products</h3>
          </div>
        </div>
        <div className="row">
          {/* <ProductCard /> */}
        </div>
      </Container>

      <div
        className="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered ">
          <div className="modal-content">
            <div className="modal-header py-0 border-0">
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body py-0">
              <div className="d-flex align-items-center">
                <div className="flex-grow-1 w-50">
                  <img src={singleProduct?.image_link} className="img-fluid " alt="product imgae" />
                </div>
                <div className="d-flex flex-column flex-grow-1 w-50 px-3">
                  <h6 className="mb-3">{singleProduct?.p_title}</h6>
                  <p className="mb-1">Quantity: {quantity}</p>
                  <p className="mb-1">Color: {color}</p>
                  <p className="mb-1">Size: {size}</p>
                </div>
              </div>
            </div>
            <div className="modal-footer border-0 py-0 justify-content-center gap-30">
              <button type="button" className="button" data-bs-dismiss="modal">
                View My Cart
              </button>
              <button type="button" className="button signup">
                Checkout
              </button>
            </div>
            <div className="d-flex justify-content-center py-3">
              <Link
                className="text-dark"
                to="/product"
                onClick={() => {
                  closeModal();
                }}
              >
                Continue To Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleProduct;

// import React, { useEffect, useState } from "react";
// import ReactStars from "react-rating-stars-component";
// import BreadCrumb from "../components/BreadCrumb";
// import Meta from "../components/Meta";
// import ProductCard from "../components/ProductCard";
// import ReactImageZoom from "react-image-zoom";
// import Color from "../components/Color";
// import { TbGitCompare } from "react-icons/tb";
// import { AiOutlineHeart } from "react-icons/ai";
// import { Link, useLocation } from "react-router-dom";
// import watch from "../images/watch.jpg";
// import Container from "../components/Container";
// import { useDispatch, useSelector } from "react-redux";
// import { getSingleProduct } from "../features/products/productSlice";

// const SingleProduct = () => {
//   const location = useLocation();
//   const getProductId = location.pathname.split("/")[2];
//   const [productState] = useSelector(
//     (state) => state?.product?.singleProduct?.product || []
//   );

//   const dispatch = useDispatch();
//   useEffect(() => {
//     dispatch(getSingleProduct(getProductId));
//   }, [dispatch, getProductId]);

//   console.log(productState);
//   // const product = productState[0];
//   // console.log(product);
//   // const {p_id, p_title, price, quantity, }

//   const [quantity, setQuantity] = useState(1);
//   const [color, setColor] = useState("");
//   const [size, setSize] = useState("");

//   const props = {
//     width: 594,
//     height: 600,
//     zoomWidth: 600,

//     img: productState?.image_link ? productState?.image_link : "https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?cs=srgb&dl=pexels-fernando-arcos-190819.jpg&fm=jpg",
//   };

//   const [orderedProduct, setorderedProduct] = useState(true);
//   const copyToClipboard = (text) => {
//     console.log("text", text);
//     var textField = document.createElement("textarea");
//     textField.innerText = text;
//     document.body.appendChild(textField);
//     textField.select();
//     document.execCommand("copy");
//     textField.remove();
//   };
//   const closeModal = () => {};

//   return (
//     <>
//       <Meta title={"Product Name"} />
//       <BreadCrumb title={productState?.p_title} />
//       <Container class1="main-product-wrapper py-5 home-wrapper-2">
//         <div className="row">
//           <div className="col-6">
//             <div className="main-product-image">
//               <div>
//                 <ReactImageZoom {...props} />
//               </div>
//             </div>
//             <div className="other-product-images d-flex flex-wrap gap-15">
//               {
//                 productState?.images?.map((image,index) => (
//                   <div key={index}>
//                     <img
//                       src={image.image_link}
//                       className="img-fluid"
//                       alt=""
//                     />
//                   </div>
//                 ))
//               }
//               {/* <div>
//                 <img
//                   src="https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?cs=srgb&dl=pexels-fernando-arcos-190819.jpg&fm=jpg"
//                   className="img-fluid"
//                   alt=""
//                 />
//               </div> */}

//             </div>
//           </div>
//           <div className="col-6">
//             <div className="main-product-details">
//               <div className="border-bottom">
//                 <h3 className="title">{productState?.p_title}</h3>
//               </div>
//               <div className="border-bottom py-3">
//                 <p className="price">Rs {productState?.price}</p>
//                 <div className="d-flex align-items-center gap-10">
//                   <ReactStars
//                     count={5}
//                     size={24}
//                     value={Number(productState?.total_rating)}
//                     edit={false}
//                     activeColor="#ffd700"
//                   />
//                   <p className="mb-0 t-review">( 2 Reviews )</p>
//                 </div>
//                 <a className="review-btn" href="#review">
//                   Write a Review
//                 </a>
//               </div>
//               <div className=" py-3">
//                 {/* <div className="d-flex gap-10 align-items-center my-2">
//                   <h3 className="product-heading">Type :</h3>
//                   <p className="product-data">Watch</p>
//                 </div> */}
//                 <div className="d-flex gap-10 align-items-center my-2">
//                   <h3 className="product-heading">Brand :</h3>
//                   <p className="product-data">{productState?.brand}</p>
//                 </div>
//                 <div className="d-flex gap-10 align-items-center my-2">
//                   <h3 className="product-heading">Category :</h3>
//                   <p className="product-data">{productState?.cat_name}</p>
//                 </div>
//                 {/* <div className="d-flex gap-10 align-items-center my-2">
//                   <h3 className="product-heading">Tags :</h3>
//                   <p className="product-data">Watch</p>
//                 </div> */}
//                 <div className="d-flex gap-10 align-items-center my-2">
//                   <h3 className="product-heading">Availablity :</h3>
//                   <p className="product-data">
//                     {productState?.quantity} Items Left
//                   </p>
//                 </div>
//                 <div className="d-flex gap-10 flex-column mt-2 mb-3">
//                   <h3 className="product-heading">Size :</h3>
//                   <div className="d-flex flex-wrap gap-15">
//                     {productState?.sizes.map((size) => (
//                       <span
//                         key={size.size_id}
//                         className="badge border border-1 bg-white text-dark border-secondary"
//                       >
//                         {size.size_name}
//                       </span>
//                     ))}
//                   </div>
//                 </div>
//                 <div className="d-flex gap-10 flex-column mt-2 mb-3">
//                   <h3 className="product-heading">Color :</h3>

//                       <Color color={productState?.colors} />

//                 </div>
//                 <div className="d-flex align-items-center gap-15 flex-row mt-2 mb-3">
//                   <h3 className="product-heading">Quantity :</h3>
//                   <div className="">
//                     <input
//                       type="number"
//                       name=""
//                       min={1}
//                       max={10}
//                       className="form-control"
//                       style={{ width: "70px" }}
//                       id=""
//                     />
//                   </div>
//                   <div className="d-flex align-items-center gap-30 ms-5">
//                     <button
//                       className="button border-0"
//                       data-bs-toggle="modal"
//                       data-bs-target="#staticBackdrop"
//                       type="button"
//                     >
//                       Add to Cart
//                     </button>
//                     <button className="button signup">Buy It Now</button>
//                   </div>
//                 </div>
//                 <div className="d-flex align-items-center gap-15">
//                   {/* <div>
//                     <a href="##">
//                       <TbGitCompare className="fs-5 me-2" /> Add to Compare
//                     </a>
//                   </div> */}
//                   <div>
//                     <a href="##">
//                       <AiOutlineHeart className="fs-5 me-2" /> Add to Wishlist
//                     </a>
//                   </div>
//                 </div>
//                 <div className="d-flex gap-10 flex-column  my-3">
//                   <h3 className="product-heading">Shipping & Returns :</h3>
//                   <p className="product-data">
//                     Free shipping and returns available on all orders! <br /> We
//                     ship all Worldwide orders within
//                     <b> 5-10 business days!</b>
//                   </p>
//                 </div>
//                 {/* <div className="d-flex gap-10 align-items-center my-3">
//                   <h3 className="product-heading">Product Link:</h3>
//                   <a
//                     // href="javascript:void(0);"
//                     href="https://example.com"
//                     onClick={() => {
//                       copyToClipboard(
//                         "https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?cs=srgb&dl=pexels-fernando-arcos-190819.jpg&fm=jpg"
//                       );
//                     }}
//                   >
//                     Copy Product Link
//                   </a>
//                 </div> */}
//               </div>
//             </div>
//           </div>
//         </div>
//       </Container>
//       <Container class1="description-wrapper py-5 home-wrapper-2">
//         <div className="row">
//           <div className="col-12">
//             <h4>Description</h4>
//             <div className="bg-white p-3">
//               <p
//               // dangerouslySetInnerHTML={{ __html: productState?.p_description }}
//               >
//                 {productState?.p_description}
//               </p>
//             </div>
//           </div>
//         </div>
//       </Container>
//       <Container class1="reviews-wrapper home-wrapper-2">
//         <div className="row">
//           <div className="col-12">
//             <h3 id="review">Reviews</h3>
//             <div className="review-inner-wrapper">
//               <div className="review-head d-flex justify-content-between align-items-end">
//                 <div>
//                   <h4 className="mb-2">Customer Reviews</h4>
//                   <div className="d-flex align-items-center gap-10">
//                     <ReactStars
//                       count={5}
//                       size={24}
//                       value={4}
//                       edit={false}
//                       activeColor="#ffd700"
//                     />
//                     <p className="mb-0">Based on 2 Reviews</p>
//                   </div>
//                 </div>
//                 {orderedProduct && (
//                   <div>
//                     <a
//                       className="text-dark text-decoration-underline"
//                       href="###"
//                     >
//                       Write a Review
//                     </a>
//                   </div>
//                 )}
//               </div>
//               <div className="review-form py-4">
//                 <h4>Write a Review</h4>
//                 <form action="" className="d-flex flex-column gap-15">
//                   <div>
//                     <ReactStars
//                       count={5}
//                       size={24}
//                       value={4}
//                       edit={true}
//                       activeColor="#ffd700"
//                     />
//                   </div>
//                   <div>
//                     <textarea
//                       name=""
//                       id=""
//                       className="w-100 form-control"
//                       cols="30"
//                       rows="4"
//                       placeholder="Comments"
//                     ></textarea>
//                   </div>
//                   <div className="d-flex justify-content-end">
//                     <button className="button border-0">Submit Review</button>
//                   </div>
//                 </form>
//               </div>
//               <div className="reviews mt-4">
//                 <div className="review">
//                   <div className="d-flex gap-10 align-items-center">
//                     <h6 className="mb-0">Navdeep</h6>
//                     <ReactStars
//                       count={5}
//                       size={24}
//                       value={4}
//                       edit={false}
//                       activeColor="#ffd700"
//                     />
//                   </div>
//                   <p className="mt-3">
//                     Lorem ipsum dolor sit amet consectetur, adipisicing elit.
//                     Consectetur fugit ut excepturi quos. Id reprehenderit
//                     voluptatem placeat consequatur suscipit ex. Accusamus dolore
//                     quisquam deserunt voluptate, sit magni perspiciatis quas
//                     iste?
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </Container>
//       <Container class1="popular-wrapper py-5 home-wrapper-2">
//         <div className="row">
//           <div className="col-12">
//             <h3 className="section-heading">Our Popular Products</h3>
//           </div>
//         </div>
//         <div className="row">
//           <ProductCard />
//         </div>
//       </Container>

//       <div
//         className="modal fade"
//         id="staticBackdrop"
//         data-bs-backdrop="static"
//         data-bs-keyboard="false"
//         tabIndex="-1"
//         aria-labelledby="staticBackdropLabel"
//         aria-hidden="true"
//       >
//         <div className="modal-dialog modal-dialog-centered ">
//           <div className="modal-content">
//             <div className="modal-header py-0 border-0">
//               <button
//                 type="button"
//                 className="btn-close"
//                 data-bs-dismiss="modal"
//                 aria-label="Close"
//               ></button>
//             </div>
//             <div className="modal-body py-0">
//               <div className="d-flex align-items-center">
//                 <div className="flex-grow-1 w-50">
//                   <img src={watch} className="img-fluid" alt="product imgae" />
//                 </div>
//                 <div className="d-flex flex-column flex-grow-1 w-50">
//                   <h6 className="mb-3">Apple Watch</h6>
//                   <p className="mb-1">Quantity: asgfd</p>
//                   <p className="mb-1">Color: asgfd</p>
//                   <p className="mb-1">Size: asgfd</p>
//                 </div>
//               </div>
//             </div>
//             <div className="modal-footer border-0 py-0 justify-content-center gap-30">
//               <button type="button" className="button" data-bs-dismiss="modal">
//                 View My Cart
//               </button>
//               <button type="button" className="button signup">
//                 Checkout
//               </button>
//             </div>
//             <div className="d-flex justify-content-center py-3">
//               <Link
//                 className="text-dark"
//                 to="/product"
//                 onClick={() => {
//                   closeModal();
//                 }}
//               >
//                 Continue To Shopping
//               </Link>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default SingleProduct;
