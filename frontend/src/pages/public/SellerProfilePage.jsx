import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FiChevronLeft, FiMail, FiPhone, FiStar, FiCalendar, FiMessageSquare } from 'react-icons/fi';
import { FaInstagram } from 'react-icons/fa';
import ContactSellerModal from '../../components/common/ContactSellerModal';
import SellerRatingModal from '../../components/common/SellerRatingModal';
import './SellerProfilePage.css';

export default function SellerProfilePage() {
  const { sellerId } = useParams();
  const [activeTab, setActiveTab] = useState('listings');
  const [sortBy, setSortBy] = useState('recent');
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isRatingModalOpen, setIsRatingModalOpen] = useState(false);

  // Mock seller data from ERD profiles table
  const seller = {
    profile_id: Number(sellerId),
    first_name: 'Anita',
    last_name: 'Max Win',
    email: 'anitamax.win@cit.edu',
    phone_number: '09XXXXXXXXX',
    instagram_handle: '@anitamax.winl',
    created_at: '2024-05-01T00:00:00Z',
    seller_rating: 4.8,
    total_reviews: 12
  };

  // Mock active listings from ERD products table
  const sellerListings = [
    {
      product_id: 1,
      name: 'Rolex Datejust 36mm men',
      price: 50000.00,
      category: 'Apparel & Watch',
      image: 'https://placehold.co/300x300/1f2937/ffffff?text=Watch',
      like_count: 15,
      view_count: 245,
      is_available: true
    },
    {
      product_id: 5,
      name: 'Canon EOS R6 Camera',
      price: 85000.00,
      category: 'Electronics',
      image: 'https://placehold.co/300x300/1e40af/ffffff?text=Camera',
      like_count: 28,
      view_count: 310,
      is_available: true
    },
    {
      product_id: 6,
      name: 'Apple MacBook Pro 14"',
      price: 95000.00,
      category: 'Electronics',
      image: 'https://placehold.co/300x300/059669/ffffff?text=Laptop',
      like_count: 42,
      view_count: 520,
      is_available: true
    }
  ];

  // Mock seller reviews from ERD reviews table
  const sellerReviews = [
    {
      review_id: 1,
      reviewer_profile_id: 2,
      reviewed_profile_id: seller.profile_id,
      product_id: 1,
      rating: 5.0,
      review_text: 'Excellent seller! Very responsive and the item was exactly as described. Smooth transaction.',
      reviewer_name: 'Jane Smith',
      created_at: '2025-10-20T14:30:00Z'
    },
    {
      review_id: 2,
      reviewer_profile_id: 3,
      reviewed_profile_id: seller.profile_id,
      product_id: 5,
      rating: 4.5,
      review_text: 'Great communication and fast meetup. Item was in perfect condition. Highly recommend!',
      reviewer_name: 'Bob Brown',
      created_at: '2025-10-15T09:20:00Z'
    },
    {
      review_id: 3,
      reviewer_profile_id: 4,
      reviewed_profile_id: seller.profile_id,
      product_id: 6,
      rating: 5.0,
      review_text: 'Professional and trustworthy seller. Item quality exceeded expectations.',
      reviewer_name: 'Alice Johnson',
      created_at: '2025-09-28T16:45:00Z'
    },
    {
      review_id: 4,
      reviewer_profile_id: 5,
      reviewed_profile_id: seller.profile_id,
      product_id: 1,
      rating: 4.0,
      review_text: 'Good seller, item as described. Pickup was smooth and convenient.',
      reviewer_name: 'Mike Davis',
      created_at: '2025-09-10T11:15:00Z'
    }
  ];

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  const getInitials = (firstName, lastName) => {
    return `${firstName[0]}${lastName[0]}`;
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

  const sortReviews = (reviewsList) => {
    const sorted = [...reviewsList];
    switch (sortBy) {
      case 'recent':
        return sorted.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
      case 'highest':
        return sorted.sort((a, b) => b.rating - a.rating);
      case 'lowest':
        return sorted.sort((a, b) => a.rating - b.rating);
      default:
        return sorted;
    }
  };

  const sortedReviews = sortReviews(sellerReviews);

  const handleSubmitRating = (ratingData) => {
    console.log('Seller rating submitted:', ratingData);
    // TODO: Send to backend API
    alert('Thank you for rating this seller!');
  };

  return (
    <div className="seller-profile-page">
      <div className="container">
        {/* Back Navigation */}
        <Link to="/dashboard" className="back-link">
          <FiChevronLeft className="back-link__icon" />
          <span>Back to Marketplace</span>
        </Link>

        {/* Seller Header */}
        <div className="seller-profile-header">
          <div className="seller-profile-avatar">
            {getInitials(seller.first_name, seller.last_name)}
          </div>
          
          <div className="seller-profile-info">
            <h1 className="seller-profile-name">
              {seller.first_name} {seller.last_name}
            </h1>
            
            <div className="seller-profile-rating">
              <div className="rating-stars">
                {renderStars(seller.seller_rating)}
              </div>
              <span className="rating-text">
                {seller.seller_rating}/5.0 · {seller.total_reviews} reviews
              </span>
            </div>

            <div className="seller-profile-contacts">
              <div className="contact-item">
                <FiMail className="contact-icon" />
                <span>{seller.email}</span>
              </div>
              <div className="contact-item">
                <FiPhone className="contact-icon" />
                <span>{seller.phone_number}</span>
              </div>
              <div className="contact-item">
                <FaInstagram className="contact-icon" />
                <span>{seller.instagram_handle}</span>
              </div>
              <div className="contact-item">
                <FiCalendar className="contact-icon" />
                <span>Member since {formatDate(seller.created_at)}</span>
              </div>
            </div>

            <div className="seller-profile-actions">
              <button 
                className="btn btn--primary contact-seller-btn"
                onClick={() => setIsContactModalOpen(true)}
              >
                <FiMessageSquare className="btn__icon" />
                Contact Seller
              </button>
              <button 
                className="btn btn--accent"
                onClick={() => setIsRatingModalOpen(true)}
              >
                <FiStar className="btn__icon" />
                Rate Seller
              </button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="seller-profile-tabs">
          <button
            className={`tab ${activeTab === 'listings' ? 'tab--active' : ''}`}
            onClick={() => setActiveTab('listings')}
          >
            Active Listings ({sellerListings.length})
          </button>
          <button
            className={`tab ${activeTab === 'reviews' ? 'tab--active' : ''}`}
            onClick={() => setActiveTab('reviews')}
          >
            Reviews ({seller.total_reviews})
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === 'listings' && (
          <div className="seller-listings-grid">
            {sellerListings.length > 0 ? (
              sellerListings.map((product) => (
                <Link 
                  key={product.product_id}
                  to={`/product/${product.product_id}`}
                  className="product-card"
                >
                  <div className="product-card__image-wrapper">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="product-card__image"
                    />
                  </div>
                  <div className="product-card__content">
                    <h3 className="product-card__name">{product.name}</h3>
                    <p className="product-card__category">{product.category}</p>
                    <p className="product-card__price">
                      ₱{product.price.toLocaleString('en-PH', { minimumFractionDigits: 2 })}
                    </p>
                    <div className="product-card__stats">
                      <span>❤️ {product.like_count}</span>
                      <span>👁️ {product.view_count}</span>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <div className="empty-state">
                <p>No active listings at the moment</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'reviews' && (
          <div className="seller-reviews-section">
            {/* Sort Controls */}
            <div className="reviews-sort-controls">
              <label htmlFor="sort-reviews" className="sort-label">Sort by:</label>
              <select 
                id="sort-reviews"
                className="sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="recent">Most Recent</option>
                <option value="highest">Highest Rated</option>
                <option value="lowest">Lowest Rated</option>
              </select>
            </div>

            {/* Reviews List */}
            <div className="reviews-list">
              {sortedReviews.length > 0 ? (
                sortedReviews.map((review) => (
                  <div key={review.review_id} className="review-card">
                    <div className="review-card__header">
                      <div className="review-author">
                        <div className="review-avatar">
                          {review.reviewer_name.charAt(0)}
                        </div>
                        <div>
                          <p className="review-author-name">{review.reviewer_name}</p>
                          <p className="review-date">{formatDate(review.created_at)}</p>
                        </div>
                      </div>
                      <div className="review-rating">
                        {renderStars(review.rating)}
                      </div>
                    </div>
                    <p className="review-text">{review.review_text}</p>
                  </div>
                ))
              ) : (
                <div className="empty-state">
                  <p>No reviews yet</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      <ContactSellerModal 
        isOpen={isContactModalOpen} 
        onClose={() => setIsContactModalOpen(false)} 
        product={{ name: 'General Inquiry' }}
        seller={seller}
      />

      <SellerRatingModal
        isOpen={isRatingModalOpen}
        onClose={() => setIsRatingModalOpen(false)}
        seller={seller}
        onSubmit={handleSubmitRating}
      />
    </div>
  );
}
