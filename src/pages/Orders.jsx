import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { assets } from '../assets/assets';
import { currency } from '../App';

const Orders = () => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [orders, setOrders] = useState([]);

  const getOrders = async () => {
    try {
      const response = await fetch(`${backendUrl}/order/list`, {
        credentials: 'include',
        method: 'POST',
      });
      const data = await response.json();
      setOrders(data);
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const statusHandler = async(event , orderId) => {
    try {
      const response = await fetch(backendUrl + '/order/status' , {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ orderId , status:event.target.value })
      })
      const data = await response.json()
      if(data === 'Status Updated'){
        getOrders();
      }
    } catch (error) {
      console.log(error)
      toast.error(data.message)
    }
  }

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <div>
      <h3>All Orders</h3>
      <div>
        {orders.map((order, index) => (
  <div
    className="grid sm:grid-cols-[50px_1fr_1fr_150px] gap-4 border border-gray-200 rounded-md p-5 my-4 text-sm text-gray-800"
    key={index}
  >
    <img src={assets.parcel_icon} alt="parcel_icon" className="w-10 h-10 self-start" />

    {/* Order Items */}
    <div>
      {order.items.map((item, index) => (
        <p key={index}>
          {item.name} x{item.quantity} <span className="text-gray-500">({item.size})</span>
        </p>
      ))}
      <p className="mt-2 font-medium">
        {order.address.firstName + " " + order.address.lastName}
      </p>
      <p className="text-xs text-gray-500">
        {order.address.street}, {order.address.city}, {order.address.state}, {order.address.country}, {order.address.zipcode}
      </p>
      <p className="text-xs text-gray-500">{order.address.phone}</p>
    </div>

    {/* Payment Details */}
    <div>
      <p>Items: {order.items.length}</p>
      <p>Method: {order.paymentMethod}</p>
      <p>Payment: {order.payment ? 'Done' : 'Pending'}</p>
      <p>Date: {new Date(order.date).toLocaleDateString()}</p>
      <p className="mt-2 font-semibold">{currency}{order.amount}</p>
    </div>

    {/* Status Dropdown */}
    <div className="flex flex-col justify-between">
      <label className="mb-1 font-medium">Status:</label>
      <select onChange={(event) => statusHandler(event , order._id)} value={order.status} className="border border-gray-300 rounded px-2 py-1">
        <option value="Ordered Placed">Ordered Placed</option>
        <option value="Packing">Packing</option>
        <option value="Shipped">Shipped</option>
        <option value="Out For delivery">Out For delivery</option>
        <option value="Delivered">Delivered</option>
      </select>
    </div>
  </div>
))}

      </div>
    </div>
  );
};

export default Orders;