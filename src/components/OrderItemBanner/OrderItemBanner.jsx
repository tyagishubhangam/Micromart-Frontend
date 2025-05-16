import "./OrderItemBanner.css";

const OrderItemBanner = ({ order }) => {
  const { orderId, orderDate, orderStatus, orderItems } = order;

  const formattedDate = new Date(orderDate).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  return (
    <div className="order-item-banner">
      <div className="order-row">
        <span className="label">Order ID:</span>
        <span>{orderId}</span>
      </div>
      <div className="order-row">
        <span className="label">Order Date:</span>
        <span>{formattedDate}</span>
      </div>
      <div className="order-row">
        <span className="label">Order Status:</span>
        <span className={`order-status ${orderStatus.toLowerCase()}`}>{orderStatus}</span>
      </div>
      <div className="order-row">
        <span className="label">Number of Items:</span>
        <span>{orderItems.length}</span>
      </div>
    </div>
  );
};

export { OrderItemBanner };
