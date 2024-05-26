import React, { useState, useEffect } from "react";
import { Table, Modal, Button, Input } from "antd";
import axios from "axios";
import { Link } from "react-router-dom";
import { base_url } from "../utils/axiosConfig";
import { config } from "../utils/axiosConfig";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const [orderProducts, setOrderProducts] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [enquiry, setEnquiry] = useState("");
  const [enquiryHistory, setEnquiryHistory] = useState([]);
  const [order_ID, setOrder_ID] = useState("");

  const handleEnquirySubmit = async (enquiry, order_ID) => {
    try {
      console.log(enquiry, order_ID);
      const response = await axios.post(`${base_url}enquiry/`, {
        enquiry,
        orderId: order_ID,
      });

      if (response) {
        setIsModalVisible(false);
        fetchEnquiryHistory(order_ID);
      } else {
        console.log("Error submitting enquiry");

        // Handle error
      }
    } catch (error) {
      console.log(error);
      // Handle error
    }
  };

  const fetchEnquiryHistory = async (orderId) => {
    try {
      const response = await axios.get(`${base_url}enquiry/${orderId}`);
      console.log(response.data);

      if (response.data) {
        setEnquiryHistory(response.data);
      } else {
        // Handle error
      }
    } catch (error) {
      console.log(error);
      // Handle error
    }
  };

  const columns = [
    {
      title: "Order ID",
      dataIndex: "order_id",
      key: "order_id",
    },
    {
      title: "Payment Method",
      dataIndex: "payment_method",
      key: "payment_method",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Mobile",
      dataIndex: "mobile",
      key: "mobile",
    },
    {
      title: "Order Status",
      dataIndex: "order_status",
      key: "order_status",
    },
    {
      title: "Total Amount",
      dataIndex: "total_amount",
      key: "total_amount",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
    },
    {
      title: "View Ordered Products",
      dataIndex: "view_ordered_products",
      key: "view_ordered_products",
      render: (text, record) => (
        <Button type="primary" onClick={() => showOrderedProducts(record)}>
          View Ordered Products
        </Button>
      ),
    },
  ];
  useEffect(() => {
    getOrders();
  }, []);

  const getOrders = async () => {
    const response = await axios.get(`${base_url}user/get-ordersbyid`, config);
    console.log(response.data);
    setOrders(response.data.orders);
    console.log(orders);
  };

  const getOrderProducts = async (orderId) => {
    const response = await axios.get(
      `${base_url}user/get-order-products/${orderId}`,
      config
    );

    console.log(response.data[0]);
    const productsInOrder = response.data[0];
    setOrderProducts(productsInOrder);
  };

  // const updateOrderStatus = async (orderId, newStatus) => {
  //   await axios.put(
  //     `${base_url}user/order/update-order/${orderId}`,
  //     { status: newStatus },
  //     config
  //   );
  //   getOrders();
  // };

  const showModal = (order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const showOrderedProducts = (order) => {
    setSelectedOrder(order);
    setIsModalOpen2(true);
    getOrderProducts(order.order_id); // pass the order id to fetch ordered products
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

 
  const data1 =
    orders &&
    orders.map((order) => ({
      key: order.order_id,
      order_id: order.order_id,
      payment_method: order.payment_method,
      email: order.email,
      mobile: order.mobile,
      order_status: order.order_status,
      shipping_address: order.shipping_address,
      shipping_apt_no: order.shipping_address,
      shipping_city: order.shipping_city,
      shipping_country: order.shipping_country,
      shipping_state: order.shipping_state,
      shipping_zip: order.shipping_zip,
      total_amount: order.total_amount,

      action: (
        <>
          <Button
            type="primary"
            onClick={() =>
              showModal({
                ...selectedOrder,
                order_id: order.order_id,
                shipping_address: order.shipping_address,
                shipping_city: order.shipping_city,
                shipping_country: order.shipping_country,
                shipping_state: order.shipping_state,
                shipping_zip: order.shipping_zip,
                payment_method: order.payment_method,
                email: order.email,
                mobile: order.mobile,
                total_amount: order.total_amount,
                shipping_apt_no: order.shipping_apt_no,
              })
            }
          >
            View Details
          </Button>

          <Button
            type="primary"
            onClick={async () => {
              setOrder_ID(order.order_id);
              setEnquiry(""); // Reset enquiry when opening the modal

              await fetchEnquiryHistory(order.order_id);
              setIsModalVisible(true);
            }}
          >
            Enquiry
          </Button>
        </>
      ),
      view_ordered_products: (
        <Button type="primary" onClick={() => showOrderedProducts(order)}>
          View Ordered Products
        </Button>
      ),
    }));

  return (
    <div className="px-5 py-2">
      <h3 className="mb-4 title">My Orders</h3>
      <div>{<Table columns={columns} dataSource={data1} />}</div>

      <Modal
        title="Order Details"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        {selectedOrder && (
          <div>
            <p>Order ID: {selectedOrder.order_id}</p>
            <p>Shipping Address: {selectedOrder.shipping_address}</p>
            <p>Shipping Apt No: {selectedOrder.shipping_apt_no}</p>
            <p>Shipping City: {selectedOrder.shipping_city}</p>
            <p>Shipping Country: {selectedOrder.shipping_country}</p>
            <p>Shipping State: {selectedOrder.shipping_state}</p>
            <p>Shipping Zip: {selectedOrder.shipping_zip}</p>
            {/* <p>Order Date: {selectedOrder.date_time}</p> */}
            <p>Payment Method: {selectedOrder.payment_method}</p>
            <p>Email: {selectedOrder.email}</p>
            <p>Mobile: {selectedOrder.mobile}</p>
            {/* Add more details as needed */}
          </div>
        )}
      </Modal>
      <Modal
        title="Ordered Products"
        open={isModalOpen2}
        onOk={() => setIsModalOpen2(false)}
        onCancel={() => setIsModalOpen2(false)}
      >
        {orderProducts && orderProducts.length > 0 && (
          <Table
            columns={[
              {
                title: "Product Name",
                dataIndex: "p_title",
                key: "p_title",
              },
              {
                title: "Price",
                dataIndex: "unit_price",
                key: "unit_price",
              },
              {
                title: "Quantity",
                dataIndex: "quantity",
                key: "quantity",
              },
              {
                title: "Total",
                dataIndex: "total",
                key: "total",
              },
            ]}
            dataSource={orderProducts}
            pagination={false}
          />
        )}
        {orderProducts && orderProducts.length === 0 && (
          <p>No products ordered.</p>
        )}
      </Modal>

      <Modal
        title="Enquiry"
        visible={isModalVisible}
        onOk={() => handleEnquirySubmit(enquiry, order_ID)}
        onCancel={() => setIsModalVisible(false)}
      >
        <Input.TextArea
          value={enquiry}
          onChange={(e) => setEnquiry(e.target.value)}
          placeholder="Write your enquiry here"
        />
        <ul className="">
          {/* Display customer's history about this order here */}

          {enquiryHistory &&
            enquiryHistory.map((enquiry) => (
              <li key={enquiry.enquiry_id}><div className="d-flex justify-content-between" ><span>{enquiry.message} </span><span>|   {enquiry.enquiry_status}</span></div></li>
            ))}
        </ul>
      </Modal>
    </div>
  );
};

export default Orders;
