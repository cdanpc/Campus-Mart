import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { FiArrowLeft, FiUser, FiPhone, FiMail, FiPackage, FiMessageSquare, FiCheck, FiX, FiClock } from 'react-icons/fi';
import Button from '../../components/common/Button';
import './OrderDetailsPage.css';

export default function OrderDetailsPage() {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [orderStatus, setOrderStatus] = useState('pending_pickup');

  // Mock order data from ERD orders table
  const orderData = {
    order_id: orderId,
    buyer_profile_id: 2,
    seller_profile_id: 1,
    product_id: 4,
    total_amount: 10500.00,
    order_date: '2025-11-10T14:30:00Z',
    status: orderStatus,
    payment_method: 'cash',
    pickup_location: 'CIT University Main Gate',
    contact_number: '09123456789',
    notes: 'Please message me when ready. I\'ll be free after 3PM.',
    buyer: {
      profile_id: 2,
      first_name: 'Bob',
      last_name: 'Brown',
      email: 'bob.brown@cit.edu',
      phone_number: '09123456789',
      instagram_handle: '@bob.brown'
    },
    seller: {
      profile_id: 1,
      first_name: 'John',
      last_name: 'Doe Rizal',
      email: 'johndoe.rizal@cit.edu',
      phone_number: '09XXXXXXXXX',
      instagram_handle: '@john.doe.profile'
    },
    product: {
      product_id: 4,
      name: 'Nintendo Switch Lite',
      description: 'Excellent condition, barely used',
      price: 10500.00,
      image: 'https://placehold.co/200x200/10b981/ffffff?text=Switch',
      category: 'Electronics',
      brand_type: 'Nintendo',
      condition: 'Excellent',
      stock: 1,
      seller_profile_id: 1
    },
    timeline: [
      { status: 'ordered', label: 'Order Placed', completed: true, date: '2025-11-10 14:30' },
      { status: 'confirmed', label: 'Confirmed', completed: true, date: '2025-11-10 15:00' },
      { status: 'ready', label: 'Ready for Pickup', completed: orderStatus !== 'pending_pickup', date: orderStatus !== 'pending_pickup' ? '2025-11-11 10:00' : null },
      { status: 'completed', label: 'Completed', completed: orderStatus === 'completed', date: orderStatus === 'completed' ? '2025-11-11 16:00' : null }
    ]
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status) => {
    const colors = {
      pending_pickup: 'warning',
      ready: 'info',
      completed: 'success',
      cancelled: 'error'
    };
    return colors[status] || 'default';
  };

  const getStatusLabel = (status) => {
    const labels = {
      pending_pickup: 'Pending Pickup',
      ready: 'Ready for Pickup',
      completed: 'Completed',
      cancelled: 'Cancelled'
    };
    return labels[status] || status;
  };

  const handleMarkReady = () => {
    setOrderStatus('ready');
    console.log('Order marked as ready:', orderId);
    // TODO: API call to update order status
  };

  const handleMarkCompleted = () => {
    if (window.confirm('Mark this order as completed? This action cannot be undone.')) {
      setOrderStatus('completed');
      console.log('Order completed:', orderId);
      // TODO: API call to update order status
    }
  };

  const handleCancelOrder = () => {
    if (window.confirm('Are you sure you want to cancel this order? This action cannot be undone.')) {
      setOrderStatus('cancelled');
      console.log('Order cancelled:', orderId);
      // TODO: API call to cancel order
    }
  };

  const handleMessageBuyer = () => {
    navigate(`/messages?user=${orderData.buyer_profile_id}`);
  };

  return (
    <div className="order-details-page">
      <div className="container">
        {/* Back Button */}
        <button className="back-button" onClick={() => navigate('/profile')}>
          <FiArrowLeft />
          <span>Back to Dashboard</span>
        </button>

        {/* Page Header */}
        <div className="order-header">
          <div>
            <h1 className="order-title">Order #{orderData.order_id}</h1>
            <p className="order-date">Placed on {formatDate(orderData.order_date)}</p>
          </div>
          <span className={`order-status-badge order-status-badge--${getStatusColor(orderData.status)}`}>
            {getStatusLabel(orderData.status)}
          </span>
        </div>

        <div className="order-grid">
          
          {/* Left Column: Order Info */}
          <div className="order-main">
            
            {/* Buyer Information Card */}
            <section className="info-card">
              <h2 className="info-card__title">
                <FiUser className="title-icon" />
                Buyer Information
              </h2>
              <div className="info-card__content">
                <div className="buyer-avatar">
                  {orderData.buyer.first_name[0]}{orderData.buyer.last_name[0]}
                </div>
                <div className="buyer-details">
                  <h3 className="buyer-name">
                    {orderData.buyer.first_name} {orderData.buyer.last_name}
                  </h3>
                  <div className="contact-info">
                    <div className="contact-item">
                      <FiPhone className="contact-icon" />
                      <span>{orderData.buyer.phone_number}</span>
                    </div>
                    <div className="contact-item">
                      <FiMail className="contact-icon" />
                      <span>{orderData.buyer.email}</span>
                    </div>
                    <div className="contact-item">
                      <FiMessageSquare className="contact-icon" />
                      <span>{orderData.buyer.instagram_handle}</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Product Information Card */}
            <section className="info-card">
              <h2 className="info-card__title">
                <FiPackage className="title-icon" />
                Product Details
              </h2>
              <div className="product-info">
                <img src={orderData.product.image} alt={orderData.product.name} className="product-image-large" />
                <div className="product-details">
                  <h3 className="product-name">{orderData.product.name}</h3>
                  <p className="product-category">{orderData.product.category}</p>
                  <p className="product-description">{orderData.product.description}</p>
                  <p className="product-price">₱{orderData.total_amount.toLocaleString('en-PH', { minimumFractionDigits: 2 })}</p>
                </div>
              </div>
            </section>

            {/* Order Timeline */}
            <section className="info-card">
              <h2 className="info-card__title">
                <FiClock className="title-icon" />
                Order Timeline
              </h2>
              <div className="timeline">
                {orderData.timeline.map((step, index) => (
                  <div key={step.status} className={`timeline-step ${step.completed ? 'timeline-step--completed' : ''}`}>
                    <div className="timeline-marker">
                      {step.completed ? <FiCheck /> : <div className="timeline-dot"></div>}
                    </div>
                    {index < orderData.timeline.length - 1 && (
                      <div className={`timeline-line ${step.completed ? 'timeline-line--completed' : ''}`}></div>
                    )}
                    <div className="timeline-content">
                      <h4 className="timeline-label">{step.label}</h4>
                      {step.date && <p className="timeline-date">{step.date}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Right Column: Actions & Summary */}
          <aside className="order-sidebar">
            
            {/* Order Summary Card */}
            <section className="summary-card">
              <h3 className="summary-card__title">Order Summary</h3>
              <div className="summary-item">
                <span className="summary-label">Payment Method:</span>
                <span className="summary-value">{orderData.payment_method}</span>
              </div>
              <div className="summary-item">
                <span className="summary-label">Pickup Location:</span>
                <span className="summary-value">{orderData.pickup_location}</span>
              </div>
              <div className="summary-item">
                <span className="summary-label">Contact Number:</span>
                <span className="summary-value">{orderData.contact_number}</span>
              </div>
              {orderData.notes && (
                <div className="summary-item summary-item--notes">
                  <span className="summary-label">Notes from Buyer:</span>
                  <span className="summary-value">{orderData.notes}</span>
                </div>
              )}
              <div className="summary-divider"></div>
              <div className="summary-item summary-item--total">
                <span className="summary-label">Total Amount:</span>
                <span className="summary-value summary-value--total">
                  ₱{orderData.total_amount.toLocaleString('en-PH', { minimumFractionDigits: 2 })}
                </span>
              </div>
            </section>

            {/* Actions Card */}
            <section className="actions-card">
              <h3 className="actions-card__title">Actions</h3>
              
              {orderData.status === 'pending_pickup' && (
                <Button variant="primary" fullWidth onClick={handleMarkReady}>
                  <FiCheck className="btn-icon" />
                  Mark as Ready
                </Button>
              )}

              {orderData.status === 'ready' && (
                <Button variant="success" fullWidth onClick={handleMarkCompleted}>
                  <FiCheck className="btn-icon" />
                  Mark as Completed
                </Button>
              )}

              <Button variant="secondary" fullWidth onClick={handleMessageBuyer}>
                <FiMessageSquare className="btn-icon" />
                Message Buyer
              </Button>

              {orderData.status !== 'completed' && orderData.status !== 'cancelled' && (
                <Button variant="danger" fullWidth onClick={handleCancelOrder}>
                  <FiX className="btn-icon" />
                  Cancel Order
                </Button>
              )}

              <Link to={`/product/${orderData.product_id}`}>
                <Button variant="outline" fullWidth>
                  View Product Listing
                </Button>
              </Link>
            </section>

          </aside>

        </div>
      </div>
    </div>
  );
}
