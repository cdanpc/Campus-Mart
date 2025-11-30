import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiSettings, FiMail, FiPhone, FiCalendar, FiStar, FiDollarSign, FiChevronRight, FiHeart } from 'react-icons/fi';
import ListItemPanel from '../../components/common/ListItemPanel';
import EditProfileModal from '../../components/common/EditProfileModal';
import ReceiptModal from '../../components/common/ReceiptModal';
import RatingModal from '../../components/common/RatingModal';
import ReviewsModal from '../../components/common/ReviewsModal';
import './ProfilePage.css';

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState('listings'); // 'listings' or 'orders'
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [isReceiptOpen, setIsReceiptOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isRatingOpen, setIsRatingOpen] = useState(false);
  const [orderToRate, setOrderToRate] = useState(null);
  const [isReviewsModalOpen, setIsReviewsModalOpen] = useState(false);

  // Mock user data from ERD profiles table
  const currentUser = {
    profile_id: 1,
    first_name: 'John',
    last_name: 'Doe Rizal',
    email: 'johndoe.rizal@cit.edu',
    phone_number: '09XXXXXXXXX',
    instagram_handle: '@john.doe.profile',
    created_at: '2024-05-01T00:00:00Z',
    seller_rating: 4.8,
    total_reviews: 12
  };

  // Mock seller reviews from ERD reviews table (reviews FOR this seller)
  const sellerReviews = [
    {
      review_id: 1,
      reviewer_profile_id: 2,
      reviewed_profile_id: 1, // Current user
      product_id: 1,
      rating: 5.0,
      review_text: 'Excellent seller! Very responsive and the item was exactly as described. Smooth transaction.',
      reviewer_name: 'Jane Smith',
      created_at: '2025-10-20T14:30:00Z'
    },
    {
      review_id: 2,
      reviewer_profile_id: 3,
      reviewed_profile_id: 1, // Current user
      product_id: 2,
      rating: 4.5,
      review_text: 'Great communication and fast meetup. Item was in perfect condition. Highly recommend!',
      reviewer_name: 'Bob Brown',
      created_at: '2025-10-15T09:20:00Z'
    },
    {
      review_id: 3,
      reviewer_profile_id: 4,
      reviewed_profile_id: 1, // Current user
      product_id: 4,
      rating: 5.0,
      review_text: 'Professional and trustworthy seller. Item quality exceeded expectations.',
      reviewer_name: 'Alice Johnson',
      created_at: '2025-09-28T16:45:00Z'
    }
  ];

  // Mock active listings from ERD products table
  const activeListings = [
    {
      product_id: 1,
      name: 'Rolex Datejust 36mm men',
      price: 50000.00,
      is_available: true,
      like_count: 15,
      status: 'Active',
      image: 'https://placehold.co/40x40/1f2937/ffffff?text=Watch',
      trade_only: false
    },
    {
      product_id: 2,
      name: 'Calculus Textbook 8th Ed.',
      price: 1800.00,
      is_available: true,
      like_count: 8,
      status: 'Pending',
      image: 'https://placehold.co/40x40/1e40af/ffffff?text=Book',
      trade_only: false
    },
    {
      product_id: 3,
      name: 'Mini Fridge (Black)',
      price: null,
      is_available: false,
      like_count: 25,
      status: 'Inactive',
      image: 'https://placehold.co/40x40/d97706/ffffff?text=Fridge',
      trade_only: true
    }
  ];

  // Mock orders from ERD orders table
  const recentOrders = [
    {
      order_id: 'CM00123',
      buyer_profile_id: 1,
      seller_profile_id: 2,
      product_id: 2,
      product_name: 'Calculus Textbook 8th Ed.',
      seller_name: 'Jane Smith',
      total_amount: 1800.00,
      order_date: '2025-10-15T14:30:00Z',
      status: 'completed',
      type: 'purchase',
      image: 'https://placehold.co/64x64/1e40af/ffffff?text=Book',
      payment_method: 'gcash',
      pickup_location: 'CIT University Library',
      contact_number: '09123456789',
      notes: 'Please bring original receipt.',
      buyer: {
        profile_id: 1,
        first_name: 'John',
        last_name: 'Doe Rizal',
        email: 'johndoe.rizal@cit.edu',
        phone_number: '09XXXXXXXXX',
        instagram_handle: '@john.doe.profile'
      },
      seller: {
        profile_id: 2,
        first_name: 'Jane',
        last_name: 'Smith',
        email: 'jane.smith@cit.edu',
        phone_number: '09123456780',
        instagram_handle: '@jane.smith'
      },
      product: {
        product_id: 2,
        name: 'Calculus Textbook 8th Ed.',
        description: 'Brand new condition, with solution manual included',
        price: 1800.00,
        image: 'https://placehold.co/200x200/1e40af/ffffff?text=Book',
        category: 'Books & Educational',
        brand_type: 'Pearson',
        condition: 'Like New',
        stock: 1,
        seller_profile_id: 2
      }
    },
    {
      order_id: 'CM00001',
      buyer_profile_id: 3,
      seller_profile_id: 1,
      product_id: 4,
      product_name: 'Nintendo Switch Lite',
      buyer_name: 'Bob Brown',
      total_amount: 10500.00,
      order_date: '2025-11-10T14:30:00Z',
      status: 'pending_pickup',
      type: 'sale',
      image: 'https://placehold.co/64x64/10b981/ffffff?text=Switch',
      payment_method: 'cash',
      pickup_location: 'CIT University Main Gate',
      contact_number: '09123456789',
      notes: 'Please message me when ready.',
      buyer: {
        profile_id: 3,
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
      }
    }
  ];

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<FiStar key={`full-${i}`} className="star star--filled" />);
    }
    if (hasHalfStar) {
      stars.push(<FiStar key="half" className="star star--half" />);
    }
    while (stars.length < 5) {
      stars.push(<FiStar key={`empty-${stars.length}`} className="star star--empty" />);
    }
    return stars;
  };

  const getInitials = (firstName, lastName) => {
    return `${firstName[0]}${lastName[0]}`;
  };

  const handleEdit = (product) => {
    // Create full product data structure for editing
    const fullProductData = {
      ...product,
      description: `Sample description for ${product.name}`,
      brand_type: 'Sample Brand',
      condition: 'Excellent',
      stock: 1,
      contact_info: currentUser.phone_number,
      category_id: 1
    };
    setEditingProduct(fullProductData);
    setIsPanelOpen(true);
  };

  const handlePanelClose = () => {
    setIsPanelOpen(false);
    setEditingProduct(null);
  };

  const handleDelete = (productId) => {
    if (window.confirm('Are you sure you want to delete this listing?')) {
      console.log('Delete product:', productId);
      // TODO: API call to delete
    }
  };

  const handleViewReceipt = (order) => {
    setSelectedOrder(order);
    setIsReceiptOpen(true);
  };

  const handleRateProduct = (order) => {
    setOrderToRate(order);
    setIsRatingOpen(true);
  };

  const handleSubmitRating = (ratingData) => {
    console.log('Rating submitted:', ratingData);
    // TODO: API call to save rating
    // POST /api/reviews with ratingData
  };

  return (
    <div className="profile-page">
      <div className="container">
        <h1 className="profile-page__title">My Dashboard</h1>

        <div className="profile-grid">
          
          {/* Left Column: Profile & Stats */}
          <aside className="profile-sidebar">
            
            {/* Profile Card */}
            <section className="profile-card">
              <div className="profile-card__avatar">
                {getInitials(currentUser.first_name, currentUser.last_name)}
              </div>
                    <h2 className="profile-card__name">
                      {currentUser.first_name} {currentUser.last_name}
                    </h2>
                    <p className="profile-card__handle">{currentUser.instagram_handle}</p>

                    <button 
                      className="profile-card__edit-btn"
                      onClick={() => setIsEditProfileOpen(true)}
                    >
                      <FiSettings className="btn-icon" />
                      Edit Profile
                    </button>              <div className="profile-card__info">
                <div className="info-item">
                  <FiMail className="info-icon" />
                  <span>{currentUser.email}</span>
                </div>
                <div className="info-item">
                  <FiPhone className="info-icon" />
                  <span>{currentUser.phone_number}</span>
                </div>
                <div className="info-item">
                  <FiCalendar className="info-icon" />
                  <span>Joined: {formatDate(currentUser.created_at)}</span>
                </div>
              </div>
            </section>

            {/* Seller Rating Card */}
            <section className="rating-card">
              <h3 className="rating-card__title">Seller Rating</h3>
              <div className="rating-card__score">
                <FiStar className="rating-star" />
                <span className="rating-value">{currentUser.seller_rating}</span>
                <span className="rating-max">/ 5.0</span>
              </div>
              <p className="rating-card__reviews">
                Based on {currentUser.total_reviews} seller reviews.
              </p>
              
              {/* Seller Reviews List */}
              <div className="seller-reviews-list">
                {sellerReviews.slice(0, 3).map((review) => (
                  <div key={review.review_id} className="seller-review-item">
                    <div className="seller-review-header">
                      <div className="seller-review-stars">
                        {renderStars(review.rating)}
                      </div>
                      <span className="seller-review-date">{formatDate(review.created_at)}</span>
                    </div>
                    <p className="seller-review-text">{review.review_text}</p>
                    <p className="seller-review-author">- {review.reviewer_name}</p>
                  </div>
                ))}
              </div>

              {currentUser.total_reviews > 3 && (
                <button 
                  className="rating-card__link"
                  onClick={() => setIsReviewsModalOpen(true)}
                >
                  View All {currentUser.total_reviews} Reviews
                </button>
              )}
            </section>

          </aside>

          {/* Right Column: Listings & Orders */}
          <main className="profile-content">
            
            {/* Tab Navigation */}
            <div className="tabs">
              <button
                className={`tab ${activeTab === 'listings' ? 'tab--active' : ''}`}
                onClick={() => setActiveTab('listings')}
              >
                My Active Listings ({activeListings.length})
              </button>
              <button
                className={`tab ${activeTab === 'orders' ? 'tab--active' : ''}`}
                onClick={() => setActiveTab('orders')}
              >
                <FiDollarSign className="tab-icon" />
                Orders & Transactions
              </button>
            </div>

            {/* Listings Content */}
            {activeTab === 'listings' && (
              <section className="content-section">
                <h2 className="content-section__title">Active Items for Sale</h2>
                
                <div className="listings-table-container">
                  <table className="listings-table">
                    <thead>
                      <tr>
                        <th>Item</th>
                        <th>Price/Trade</th>
                        <th>Likes</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {activeListings.map((product) => (
                        <tr key={product.product_id}>
                          <td>
                            <div className="product-cell">
                              <img
                                src={product.image}
                                alt={product.name}
                                className="product-image"
                              />
                              <span>{product.name}</span>
                            </div>
                          </td>
                          <td className="price-cell">
                            {product.trade_only ? (
                              <span className="trade-only-badge">Trade Only</span>
                            ) : (
                              <span className="price-value">
                                ₱{product.price.toLocaleString('en-PH', { minimumFractionDigits: 2 })}
                              </span>
                            )}
                          </td>
                          <td className="likes-cell">
                            <FiHeart className="like-icon" />
                            {product.like_count}
                          </td>
                          <td>
                            <span className={`status-badge status-badge--${product.status.toLowerCase()}`}>
                              {product.status}
                            </span>
                          </td>
                          <td className="actions-cell">
                            <button
                              onClick={() => handleEdit(product)}
                              className="action-link action-link--edit"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDelete(product.product_id)}
                              className="action-link action-link--delete"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            )}

            {/* Orders Content */}
            {activeTab === 'orders' && (
              <section className="content-section">
                <h2 className="content-section__title">Recent Transactions</h2>
                
                <div className="orders-list">
                  {recentOrders.map((order) => (
                    <div key={order.order_id} className="order-card">
                      <div className="order-card__header">
                        <div>
                          <p className="order-id">
                            {order.type === 'purchase' ? 'Purchase' : 'Sale'} #{order.order_id}
                          </p>
                          <p className="order-date">Date: {order.order_date}</p>
                        </div>
                        <span className={`status-badge status-badge--${order.status.toLowerCase().replace(' ', '-')}`}>
                          {order.status}
                        </span>
                      </div>

                      <div className="order-card__body">
                        <img
                          src={order.image}
                          alt={order.product_name}
                          className="order-image"
                        />
                        <div className="order-details">
                          <p className="order-product">{order.product_name}</p>
                          <p className="order-user">
                            {order.type === 'purchase' 
                              ? `Sold by: ${order.seller_name}` 
                              : `Buyer: ${order.buyer_name}`}
                          </p>
                        </div>
                        <div className="order-actions">
                          <p className="order-price">
                            ₱{order.total_amount.toLocaleString('en-PH', { minimumFractionDigits: 2 })}
                          </p>
                          {order.type === 'purchase' ? (
                            <div className="order-buttons">
                              <button 
                                onClick={() => handleViewReceipt(order)}
                                className="order-link order-link-button"
                              >
                                View Receipt
                              </button>
                              {order.status === 'completed' && (
                                <button 
                                  onClick={() => handleRateProduct(order)}
                                  className="order-link order-link-button rate-button"
                                >
                                  <FiStar className="rate-icon" />
                                  Rate Product
                                </button>
                              )}
                            </div>
                          ) : (
                            <Link to={`/order/${order.order_id}`} className="order-link">
                              Manage Sale
                            </Link>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Temporarily disabled - View All Orders link */}
                  {/* <div className="view-all">
                    <Link to="/orders/history" className="view-all-link">
                      View Full Transaction History
                      <FiChevronRight className="chevron-icon" />
                    </Link>
                  </div> */}
                </div>
              </section>
            )}

          </main>

        </div>
      </div>

      {/* Edit Item Panel */}
      <ListItemPanel 
        isOpen={isPanelOpen}
        onClose={handlePanelClose}
        productData={editingProduct}
      />

      {/* Edit Profile Modal */}
      <EditProfileModal
        isOpen={isEditProfileOpen}
        onClose={() => setIsEditProfileOpen(false)}
        userData={currentUser}
      />

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

      <ReviewsModal
        isOpen={isReviewsModalOpen}
        onClose={() => setIsReviewsModalOpen(false)}
        reviews={sellerReviews}
        sellerRating={currentUser.seller_rating}
        totalReviews={currentUser.total_reviews}
        sellerName={`${currentUser.first_name} ${currentUser.last_name}`}
      />
    </div>
  );
}
