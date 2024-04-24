import { React, useState, useEffect } from "react";

import { Link } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import watch from "../images/watch.jpg";
import Container from "../components/Container";
import * as yup from "yup";
import { useFormik } from "formik";
import Meta from "../components/Meta";

const Checkout = () => {
  const [isBillingSame, setIsBillingSame] = useState(false);

  const schema = yup.object().shape({
    firstName: yup.string().min(3).required("First name is required"),
    lastName: yup.string().min(3).required("Last name is required"),
    email: yup
      .string()
      .email("Invalid email address")
      .required("Email is required"),
    mobile: yup.number().min(10).required("Mobile number is required"),

    shippingAptNo: yup.string(),
    shippingAddress: yup.string().required("Shipping address is required"),
    shippingCity: yup.string().required("City is required"),
    shippingState: yup.string().required("State is required"),
    shippingZipcode: yup.number().required("Zipcode is required"),
    shippingCountry: yup.string().required("Country is required"),

    billingAptNo: yup.string(),
    billingAddress: yup.string().required("Billing address is required"),
    billingCity: yup.string().required("City is required"),
    billingState: yup.string().required("State is required"),
    billingZipcode: yup.number().required("Zipcode is required"),
    billingCountry: yup.string().required("Country is required"),

    // payment methods enum , how i handle?

    paymenrMethod: yup.string().required("Payment method is required"),
    message: yup.string(),
  });

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      mobile: "",
      shippingAptNo: "",
      shippingAddress: "",
      shippingCity: "",
      shippingState: "",
      shippingZipcode: "",
      shippingCountry: "",
      billingAptNo: "",
      billingAddress: "",
      billingCity: "",
      billingState: "",
      billingZipcode: "",
      billingCountry: "",
      paymenrMethod: "",
      message: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      console.log(values);
      alert(values);
    },
  });

  const syncBillingAddress = () => {
    if (isBillingSame) {
      if (!formik.values.billingAptNo) {
        formik.setFieldValue("billingAptNo", formik.values.shippingAptNo);
      }
      if (!formik.values.billingAddress) {
        formik.setFieldValue("billingAddress", formik.values.shippingAddress);
      }
      if (!formik.values.billingCity) {
        formik.setFieldValue("billingCity", formik.values.shippingCity);
      }
      if (!formik.values.billingState) {
        formik.setFieldValue("billingState", formik.values.shippingState);
      }
      if (!formik.values.billingZipcode) {
        formik.setFieldValue("billingZipcode", formik.values.shippingZipcode);
      }
      if (!formik.values.billingCountry) {
        formik.setFieldValue("billingCountry", formik.values.shippingCountry);
      }
    } else {
      formik.setFieldValue("billingAptNo", "");
      formik.setFieldValue("billingAddress", "");
      formik.setFieldValue("billingCity", "");
      formik.setFieldValue("billingState", "");
      formik.setFieldValue("billingZipcode", "");
      formik.setFieldValue("billingCountry", "");
    }
  };
  

  useEffect(() => {
    syncBillingAddress();
  }, [isBillingSame, formik.values]);

  return (
    <>
      <Meta title={"Checkout"} />
      <Container class1="checkout-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-7">
            <div className="checkout-left-data">
              <h3 className="website-name">Checkout</h3>
              <nav
                style={{ "--bs-breadcrumb-divider": ">" }}
                aria-label="breadcrumb"
              >
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link className="text-dark total-price" to="/cart">
                      Cart
                    </Link>
                  </li>
                  &nbsp;/ &nbsp;
                  <li
                    className="breadcrumb-ite total-price active"
                    aria-current="page"
                  >
                    Information
                  </li>
                  &nbsp;/ &nbsp;
                  <li className="breadcrumb-item total-price active">
                    Shipping
                  </li>
                  &nbsp;/ &nbsp;
                  <li
                    className="breadcrumb-item total-price active"
                    aria-current="page"
                  >
                    Payment
                  </li>
                </ol>
              </nav>
              <h4 className="title total">Contact Information</h4>
              <p className="user-details total"></p>

              {/* ----------------------------------Shipping Form-------------------------------- */}
              <form
                action=""
                className="d-flex gap-15 flex-wrap justify-content-between"
                onSubmit={formik.handleSubmit}
              >
                <h4 className="mb-3 w-100">Shipping Details</h4>
                <div className="flex-grow-1">
                  <input
                    type="text"
                    placeholder="First Name"
                    className="form-control"
                    name="firstName"
                    value={formik.values.firstName}
                    onChange={formik.handleChange("firstName")}
                    onBlur={formik.handleBlur("firstName")}
                  />
                  <div className="error">
                    {formik.touched.firstName && formik.errors.firstName}
                  </div>
                </div>

                <div className="flex-grow-1">
                  <input
                    type="text"
                    placeholder="Last Name"
                    className="form-control"
                    name="lastName"
                    onChange={formik.handleChange("lastName")}
                    onBlur={formik.handleBlur("lastName")}
                    value={formik.values.lastName}
                  />
                  <div className="error">
                    {formik.touched.lastName && formik.errors.lastName}
                  </div>
                </div>

                <div className="flex-grow-1">
                  <input
                    type="text"
                    placeholder="Mobile No"
                    className="form-control"
                    name="mobile"
                    value={formik.values.mobile}
                    onChange={formik.handleChange("mobile")}
                    onBlur={formik.handleBlur("mobile")}
                  />
                  <div className="error">
                    {formik.touched.mobile && formik.errors.mobile}
                  </div>
                </div>

                <div className="flex-grow-1">
                  <input
                    type="text"
                    placeholder="Email"
                    className="form-control"
                    name="email"
                    onChange={formik.handleChange("email")}
                    onBlur={formik.handleBlur("email")}
                    value={formik.values.email}
                  />
                  <div className="error">
                    {formik.touched.email && formik.errors.email}
                  </div>
                </div>

                <div className="w-100">
                  <input
                    name="shippingAptNo"
                    type="text"
                    placeholder="Apartment, Suite ,etc"
                    className="form-control"
                    value={formik.values.shippingAptNo}
                    onChange={formik.handleChange("shippingAptNo")}
                    onBlur={formik.handleBlur("shippingAptNo")}
                  />
                  <div className="error">
                    {formik.touched.shippingAptNo &&
                      formik.errors.shippingAptNo}
                  </div>
                </div>

                <div className="w-100">
                  <input
                    type="text"
                    name="shippingAddress"
                    placeholder="Shipping Address"
                    className="form-control"
                    value={formik.values.shippingAddress}
                    onChange={formik.handleChange("shippingAddress")}
                    onBlur={formik.handleBlur("shippingAddress")}
                  />
                  <div className="error">
                    {formik.touched.shippingAddress &&
                      formik.errors.shippingAddress}
                  </div>
                </div>

                <div className="flex-grow-1">
                  <input
                    type="text"
                    name="shippingCity"
                    placeholder="Shipping City"
                    className="form-control"
                    value={formik.values.shippingCity}
                    onChange={formik.handleChange("shippingCity")}
                    onBlur={formik.handleBlur("shippingCity")}
                  />
                  <div className="error">
                    {formik.touched.shippingCity && formik.errors.shippingCity}
                  </div>
                </div>

                <div className="flex-grow-1">
                  <select
                    name="shippingState"
                    className="form-control form-select"
                    id=""
                    value={formik.values.shippingState}
                    onChange={formik.handleChange("shippingState")}
                    onBlur={formik.handleBlur("shippingState")}
                  >
                    <option value="" selected disabled>
                      Select State
                    </option>
                  </select>
                  <div className="error">
                    {formik.touched.shippingState &&
                      formik.errors.shippingState}
                  </div>
                </div>

                <div className="flex-grow-1">
                  <input
                    type="text"
                    name="shippingZipcode"
                    placeholder="Zipcode"
                    className="form-control"
                    value={formik.values.shippingZipcode}
                    onChange={formik.handleChange("shippingZipcode")}
                    onBlur={formik.handleBlur("shippingZipcode")}
                  />
                  <div className="error">
                    {formik.touched.shippingZipcode &&
                      formik.errors.shippingZipcode}
                  </div>
                </div>

                <div className="w-100">
                  <select
                    name="shippingCountry"
                    className="form-control form-select"
                    id=""
                    value={formik.values.shippingCountry}
                    onChange={formik.handleChange("shippingCountry")}
                    onBlur={formik.handleBlur("shippingCountry")}
                  >
                    <option value="" selected disabled>
                      Select Country
                    </option>
                  </select>
                  <div className="error">
                    {formik.touched.shippingCountry &&
                      formik.errors.shippingCountry}
                  </div>
                </div>

                {/* Billing Details */}
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id="flexCheckDefault"
                    checked={isBillingSame}
                    onChange={() => {
                      setIsBillingSame(!isBillingSame);
                      syncBillingAddress();
                    }}
                  />

                  <label
                    className="form-check-label"
                    htmlFor="flexCheckDefault"
                  >
                    Billing address same as shipping address
                  </label>
                </div>

                <div
                  className="billing-address-inputs w-100"
                  style={{ display: isBillingSame ? "none" : "block" }}
                >
                  {/* billing address inputs here */}

                  <h4 className="mb-3 w-100">Billing Details</h4>

                  <div className="w-100">
                    <input
                      name="billingAptNo"
                      type="text"
                      placeholder="Apartment, Suite ,etc"
                      className="form-control"
                      value={formik.values.billingAptNo}
                      onChange={formik.handleChange("billingAptNo")}
                      onBlur={formik.handleBlur("billingAptNo")}
                    />
                    <div className="error">
                      {formik.touched.billingAptNo &&
                        formik.errors.billingAptNo}
                    </div>
                  </div>

                  <div className="w-100">
                    <input
                      type="text"
                      name="billingAddress"
                      placeholder="Billing Address"
                      className="form-control"
                      value={formik.values.billingAddress}
                      onChange={formik.handleChange("billingAddress")}
                      onBlur={formik.handleBlur("billingAddress")}
                    />
                    <div className="error">
                      {formik.touched.billingAddress &&
                        formik.errors.billingAddress}
                    </div>
                  </div>

                  <div className="flex-grow-1">
                    <input
                      type="text"
                      name="billingCity"
                      placeholder="Billing City"
                      className="form-control"
                      value={formik.values.billingCity}
                      onChange={formik.handleChange("billingCity")}
                      onBlur={formik.handleBlur("billingCity")}
                    />
                    <div className="error">
                      {formik.touched.billingCity && formik.errors.billingCity}
                    </div>
                  </div>

                  <div className="flex-grow-1">
                    <select
                      name="billingState"
                      className="form-control form-select"
                      id=""
                      value={formik.values.billingState}
                      onChange={formik.handleChange("billingState")}
                      onBlur={formik.handleBlur("billingState")}
                    >
                      <option value="" selected disabled>
                        Select State
                      </option>
                    </select>
                    <div className="error">
                      {formik.touched.billingState &&
                        formik.errors.billingState}
                    </div>
                  </div>

                  <div className="flex-grow-1">
                    <input
                      type="text"
                      name="billingZipcode"
                      placeholder="Zipcode"
                      className="form-control"
                      value={formik.values.billingZipcode}
                      onChange={formik.handleChange("billingZipcode")}
                      onBlur={formik.handleBlur("billingZipcode")}
                    />
                    <div className="error">
                      {formik.touched.billingZipcode &&
                        formik.errors.billingZipcode}
                    </div>
                  </div>

                  <div className="w-100">
                    <select
                      name="billingCountry"
                      className="form-control form-select"
                      id=""
                      value={formik.values.billingCountry}
                      onChange={formik.handleChange("billingCountry")}
                      onBlur={formik.handleBlur("billingCountry")}
                    >
                      <option value="" selected disabled>
                        Select Country
                      </option>
                    </select>
                    <div className="error">
                      {formik.touched.billingCountry &&
                        formik.errors.billingCountry}
                    </div>
                  </div>
                </div>
                <button className="button" type="submit">
                    Contibilling
                  </button>
              </form>

              {/* End of the Form */}

              <div className="w-100 py-2">
                <div className="d-flex justify-content-between align-items-center">
                  <Link to="/cart" className="text-dark">
                    <BiArrowBack className="me-2" />
                    Return to Cart
                  </Link>
                  <Link to="/cart" className="button" type="submit">
                    Contibilling
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="col-5">
            <div className="border-bottom py-4">
              <div className="d-flex gap-10 mb-2 align-align-items-center">
                <div className="w-75 d-flex gap-10">
                  <div className="w-25 position-relative">
                    <span
                      style={{ top: "-10px", right: "2px" }}
                      className="badge bg-secondary text-white rounded-circle p-2 position-absolute"
                    >
                      1
                    </span>
                    <img className="img-fluid" src={watch} alt="product" />
                  </div>
                  <div>
                    <h5 className="total-price">gfdhgf</h5>
                    <p className="total-price">s / #agfgfd</p>
                  </div>
                </div>
                <div className="flex-grow-1">
                  <h5 className="total">Rs 100</h5>
                </div>
              </div>
            </div>
            <div className="border-bottom py-4">
              <div className="d-flex justify-content-between align-items-center">
                <p className="total">Subtotal</p>
                <p className="total-price">Rs 10000</p>
              </div>
              <div className="d-flex justify-content-between align-items-center">
                <p className="mb-0 total">Shipping</p>
                <p className="mb-0 total-price">Rs 10000</p>
              </div>
            </div>
            <div className="d-flex justify-content-between align-items-center border-bootom py-4">
              <h4 className="total">Total</h4>
              <h5 className="total-price">Rs 10000</h5>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Checkout;
