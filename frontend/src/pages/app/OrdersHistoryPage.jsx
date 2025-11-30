import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiChevronLeft, FiPackage, FiClock, FiCheckCircle, FiXCircle, FiTruck, FiFilter, FiFileText, FiStar } from 'react-icons/fi';
import ReceiptModal from '../../components/common/ReceiptModal';
import RatingModal from '../../components/common/RatingModal';
import './OrdersHistoryPage.css';

export default function OrdersHistoryPage() {
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isReceiptOpen, setIsReceiptOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isRatingOpen, setIsRatingOpen] = useState(false);
  const [orderToRate, setOrderToRate] = useState(null);

  // Mock orders data from ERD orders table
  const allOrders = [
    {
      order_id: 1,
      buyer_profile_id: 1,
      seller_profile_id: 2,
      product_id: 1,
      product: {
        name: 'Rolex Datejust 36mm men',
        image: 'https://placehold.co/80x80/1f2937/ffffff?text=Watch',
        price: 50000.00
      },
      seller: {
        first_name: 'Anita',
        last_name: 'Max Win',
        email: 'anitamax.win@cit.edu',
        phone_number: '09XXXXXXXXX'
      },
      buyer: {
        first_name: 'John',
        last_name: 'Doe',
        email: 'johndoe@cit.edu',
        phone_number: '09YYYYYYYYY'
      },
      quantity: 1,
      total_price: 50000.00,
      status: 'completed',
      pickup_location: 'CIT-U Main Gate',
      payment_method: 'cash_on_delivery',
      order_date: '2025-10-15T10:30:00Z',
      created_at: '2025-10-15T10:30:00Z',
      updated_at: '2025-10-20T14:00:00Z'
    },
    {
      order_id: 2,
      buyer_profile_id: 1,
      seller_profile_id: 3,
      product_id: 5,
      product: {
        name: 'Canon EOS R6 Camera',
        image: 'https://placehold.co/80x80/1e40af/ffffff?text=Camera',
        price: 85000.00
      },
      seller: {
        first_name: 'Bob',
        last_name: 'Smith',
        email: 'bob.smith@cit.edu',
        phone_number: '09XXXXXXXXX'
      },
      buyer: {
        first_name: 'John',
        last_name: 'Doe',
        email: 'johndoe@cit.edu',
        phone_number: '09YYYYYYYYY'
      },
      quantity: 1,
      total_price: 85000.00,
      status: 'pending_pickup',
      pickup_location: 'CIT-U Library',
      payment_method: 'gcash',
      order_date: '2025-11-20T09:15:00Z',
      created_at: '2025-11-20T09:15:00Z',
      updated_at: '2025-11-20T09:15:00Z'
    },
    {
      order_id: 3,
      buyer_profile_id: 1,
      seller_profile_id: 4,
      product_id: 6,
      product: {
        name: 'Apple MacBook Pro 14"',
        image: 'https://placehold.co/80x80/059669/ffffff?text=Laptop',
        price: 95000.00
      },
      seller: {
        first_name: 'Jane',
        last_name: 'Doe',
        email: 'jane.doe@cit.edu',
        phone_number: '09XXXXXXXXX'
      },
      buyer: {
        first_name: 'John',
        last_name: 'Doe',
        email: 'johndoe@cit.edu',
        phone_number: '09YYYYYYYYY'
      },
      quantity: 1,
      total_price: 95000.00,
      status: 'processing',
      pickup_location: 'CIT-U Canteen',
      payment_method: 'cash_on_delivery',
      order_date: '2025-11-28T16:45:00Z',
      created_at: '2025-11-28T16:45:00Z',
      updated_at: '2025-11-28T16:45:00Z'
    },
    {
      order_id: 4,
      buyer_profile_id: 1,
      seller_profile_id: 5,
      product_id: 8,
      product: {
        name: 'Calculus Textbook 8th Ed.',
        image: 'https://placehold.co/80x80/3b82f6/ffffff?text=Book',
        price: 1800.00
      },
      seller: {
        first_name: 'Alice',
        last_name: 'Johnson',
        email: 'alice.j@cit.edu',
        phone_number: '09XXXXXXXXX'
      },
      buyer: {
        first_name: 'John',
        last_name: 'Doe',
        email: 'johndoe@cit.edu',
        phone_number: '09YYYYYYYYY'
      },
      quantity: 2,
      total_price: 3600.00,
      status: 'cancelled',
      pickup_location: 'CIT-U Gym',
      payment_method: 'cash_on_delivery',
      order_date: '2025-09-05T11:20:00Z',
      created_at: '2025-09-05T11:20:00Z',
      updated_at: '2025-09-06T08:30:00Z'
    },
    {
      order_id: 5,
      buyer_profile_id: 1,
      seller_profile_id: 2,
      product_id: 10,
      product: {
        name: 'Nintendo Switch Lite',
        image: 'https://placehold.co/80x80/10b981/ffffff?text=Gaming',
        price: 12000.00
      },
      seller: {
        first_name: 'Anita',
        last_name: 'Max Win',
        email: 'anitamax.win@cit.edu',
        phone_number: '09XXXXXXXXX'
      },
      buyer: {
        first_name: 'John',
        last_name: 'Doe',
        email: 'johndoe@cit.edu',
        phone_number: '09YYYYYYYYY'
      },
      quantity: 1,
      total_price: 12000.00,
      status: 'completed',
      pickup_location: 'CIT-U Main Gate',
      payment_method: 'gcash',
      order_date: '2025-08-22T13:10:00Z',
      created_at: '2025-08-22T13:10:00Z',
      updated_at: '2025-08-25T10:00:00Z',
      updated_at: '2025-08-25T10:00:00Z'
    }
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <FiCheckCircle className="status-icon status-icon--completed" />;
      case 'processing':
        return <FiClock className="status-icon status-icon--processing" />;
      case 'pending_pickup':
        return <FiTruck className="status-icon status-icon--pending" />;
      case 'cancelled':
        return <FiXCircle className="status-icon status-icon--cancelled" />;
      default:
        return <FiPackage className="status-icon" />;
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'completed':
        return 'Completed';
      case 'processing':
        return 'Processing';
      case 'pending_pickup':
        return 'Pending Pickup';
      case 'cancelled':
        return 'Cancelled';
      default:
        return status;
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'completed':
        return 'status-badge--completed';
      case 'processing':
        return 'status-badge--processing';
      case 'pending_pickup':
        return 'status-badge--pending';
      case 'cancelled':
        return 'status-badge--cancelled';
      default:
        return '';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleViewReceipt = (e, order) => {
    e.preventDefault();
    e.stopPropagation();
    setSelectedOrder(order);
    setIsReceiptOpen(true);
  };

  const handleRateProduct = (e, order) => {
    e.preventDefault();
    e.stopPropagation();
    setOrderToRate(order);
    setIsRatingOpen(true);
  };

  const handleSubmitRating = (ratingData) => {
    console.log('Rating submitted:', ratingData);
    // TODO: Send to backend API
    alert('Thank you for your rating!');
  };

  const filteredOrders = allOrders.filter(order => {
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    const matchesSearch = order.product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         `${order.seller.first_name} ${order.seller.last_name}`.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="orders-history-page">
      <div className="container">
        {/* Header */}
        <div className="orders-history-header">
          <Link to="/profile" className="back-link">
            <FiChevronLeft className="back-link__icon" />
            <span>Back to Profile</span>
          </Link>

          <h1 className="page-title">Order History</h1>
          <p className="page-subtitle">View and track all your orders</p>
        </div>

        {/* Filters */}
        <div className="orders-filters">
          <div className="search-box">
            <input
              type="text"
              placeholder="Search by product or seller..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
          </div>

          <div className="filter-buttons">
            <button
              className={`filter-btn ${statusFilter === 'all' ? 'filter-btn--active' : ''}`}
              onClick={() => setStatusFilter('all')}
            >
              All Orders
            </button>
            <button
              className={`filter-btn ${statusFilter === 'completed' ? 'filter-btn--active' : ''}`}
              onClick={() => setStatusFilter('completed')}
            >
              Completed
            </button>
            <button
              className={`filter-btn ${statusFilter === 'processing' ? 'filter-btn--active' : ''}`}
              onClick={() => setStatusFilter('processing')}
            >
              Processing
            </button>
            <button
              className={`filter-btn ${statusFilter === 'pending_pickup' ? 'filter-btn--active' : ''}`}
              onClick={() => setStatusFilter('pending_pickup')}
            >
              Pending
            </button>
            <button
              className={`filter-btn ${statusFilter === 'cancelled' ? 'filter-btn--active' : ''}`}
              onClick={() => setStatusFilter('cancelled')}
            >
              Cancelled
            </button>
          </div>
        </div>

        {/* Orders List */}
        <div className="orders-list">
          {filteredOrders.length === 0 ? (
            <div className="empty-state">
              <FiPackage className="empty-state__icon" />
              <h3 className="empty-state__title">No orders found</h3>
              <p className="empty-state__text">
                {searchQuery 
                  ? 'Try adjusting your search or filters' 
                  : 'You haven\'t placed any orders yet'}
              </p>
              <Link to="/dashboard" className="btn btn--primary">
                Browse Marketplace
              </Link>
            </div>
          ) : (
            filteredOrders.map(order => (
              <div key={order.order_id} className="order-card">
                <Link
                  to={`/order/${order.order_id}`}
                  className="order-card__link"
                >
                  <div className="order-card__image">
                    <img src={order.product.image} alt={order.product.name} />
                  </div>

                  <div className="order-card__content">
                    <div className="order-card__header">
                      <div className="order-card__info">
                        <h3 className="order-card__title">{order.product.name}</h3>
                        <p className="order-card__seller">
                          Seller: {order.seller.first_name} {order.seller.last_name}
                        </p>
                        <p className="order-card__date">{formatDate(order.created_at)}</p>
                      </div>

                      <div className="order-card__status">
                        {getStatusIcon(order.status)}
                        <span className={`status-badge ${getStatusClass(order.status)}`}>
                          {getStatusText(order.status)}
                        </span>
                      </div>
                    </div>

                    <div className="order-card__footer">
                      <div className="order-card__details">
                        <span className="order-detail">
                          Order #{order.order_id}
                        </span>
                        <span className="order-detail">
                          Qty: {order.quantity}
                        </span>
                        <span className="order-detail">
                          {order.payment_method === 'cash_on_delivery' ? 'COD' : 'GCash'}
                        </span>
                      </div>

                      <div className="order-card__price">
                        ₱{order.total_price.toLocaleString('en-PH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </div>
                    </div>
                  </div>
                </Link>

                {/* Action Buttons - Inside Card */}
                {order.status === 'completed' && (
                  <div className="order-card__actions">
                    <button
                      className="action-btn action-btn--secondary"
                      onClick={(e) => handleViewReceipt(e, order)}
                    >
                      <FiFileText className="action-btn__icon" />
                      View Receipt
                    </button>
                    <button
                      className="action-btn action-btn--primary"
                      onClick={(e) => handleRateProduct(e, order)}
                    >
                      <FiStar className="action-btn__icon" />
                      Rate Product
                    </button>
                  </div>
                )}
              </div>
            ))
          )}
        </div>

        {/* Summary */}
        {filteredOrders.length > 0 && (
          <div className="orders-summary">
            <div className="summary-card">
              <div className="summary-item">
                <span className="summary-label">Total Orders</span>
                <span className="summary-value">{filteredOrders.length}</span>
              </div>
              <div className="summary-item">
                <span className="summary-label">Total Spent</span>
                <span className="summary-value">
                  ₱{filteredOrders.reduce((sum, order) => sum + order.total_price, 0).toLocaleString('en-PH', { minimumFractionDigits: 2 })}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Modals */}
      <ReceiptModal 
        isOpen={isReceiptOpen} 
        onClose={() => setIsReceiptOpen(false)} 
        orderData={selectedOrder}
      />

      <RatingModal 
        isOpen={isRatingOpen} 
        onClose={() => setIsRatingOpen(false)} 
        orderData={orderToRate}
        onSubmit={handleSubmitRating}
      />
    </div>
  );
}
