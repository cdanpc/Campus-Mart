import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FiChevronLeft, FiHeart, FiEye, FiMessageSquare, FiRefreshCw, FiTag, FiPackage, FiCheckCircle, FiBarChart2, FiUser, FiMail, FiPhone, FiStar } from 'react-icons/fi';
import { FaInstagram } from 'react-icons/fa';
import TradeOfferModal from '../components/common/TradeOfferModal';
import ContactSellerModal from '../components/common/ContactSellerModal';
import PlaceOrderModal from '../components/common/PlaceOrderModal';
import './ProductDetailPage.css';

export default function ProductDetailPage() {
  const { id } = useParams();
  const [selectedImage, setSelectedImage] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [isTradeModalOpen, setIsTradeModalOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isPlaceOrderOpen, setIsPlaceOrderOpen] = useState(false);

  // Mock product data matching ERD structure
  const product = {
    id: Number(id),
    name: 'Rolex Datejust 36mm men',
    description: 'Selling a classic Rolex Datejust 36mm, perfect for a professional look. The watch is an elegant piece introduced in 1945, known for its timeless design. This specific model is pre-owned but maintained in excellent condition, with minor wear visible only under close inspection. All mechanisms function perfectly. Comes with original box and papers. Ideal for trading with high-value electronics or selling for quick cash before graduation.',
    price: 50000.00,
    brand_type: 'Rolex Datejust 36mm',
    contact_info: 'Available for meetup on campus or COD within CIT-U',
    is_available: true,
    view_count: 245,
    like_count: 58,
    created_at: '2025-11-15T10:30:00Z',
    category: {
      id: 1,
      name: 'Apparel & Watch'
    },
    seller: {
      id: 1,
      first_name: 'Anita',
      last_name: 'Max Win',
      email: 'anitamax.win@cit.edu',
      phone_number: '09XXXXXXXXX',
      instagram_handle: '@anitamax.winl',
      created_at: '2024-05-01T00:00:00Z'
    },
    images: [
      {
        id: 1,
        url: 'https://placehold.co/1000x750/f0f4ff/3b82f6?text=Rolex+Datejust+36mm+Watch',
        is_primary: true
      },
      {
        id: 2,
        url: 'https://placehold.co/1000x750/d1d5db/374151?text=View+2',
        is_primary: false
      },
      {
        id: 3,
        url: 'https://placehold.co/1000x750/e5e7eb/374151?text=View+3',
        is_primary: false
      }
    ],
    reviews: [
      {
        id: 1,
        rating: 4.5,
        comment: 'Item was exactly as described and seller was quick to respond. Highly recommend.',
        reviewer_name: 'Jane S.',
        created_at: '2025-09-20T14:20:00Z'
      },
      {
        id: 2,
        rating: 4.0,
        comment: 'Smooth handover process. Product condition was accurately represented.',
        reviewer_name: 'Robert P.',
        created_at: '2025-09-15T09:15:00Z'
      }
    ],
    condition: 'Excellent (Minor wear)',
    stock: 1
  };

  // Calculate product average rating from reviews
  const productAverageRating = product.reviews.length > 0
    ? parseFloat((product.reviews.reduce((sum, review) => sum + review.rating, 0) / product.reviews.length).toFixed(1))
    : 0;

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

  return (
    <div className="product-detail">
      {/* Back Navigation */}
      <div className="container">
        <Link to="/dashboard" className="back-link">
          <FiChevronLeft className="back-link__icon" />
          <span>Back to Marketplace</span>
        </Link>
      </div>

      {/* Product Details Grid */}
      <div className="container">
        <div className="product-detail__grid">
          
          {/* Left Column: Images & Description */}
          <div className="product-detail__main">
            
            {/* Image Gallery */}
            <section className="image-gallery">
              <div className="image-gallery__main">
                <img 
                  src={product.images[selectedImage].url} 
                  alt={`${product.name} - View ${selectedImage + 1}`}
                  className="image-gallery__image"
                />
              </div>
              <div className="image-gallery__thumbnails">
                {product.images.map((image, index) => (
                  <img
                    key={image.id}
                    src={image.url}
                    alt={`Thumbnail ${index + 1}`}
                    className={`thumbnail ${selectedImage === index ? 'thumbnail--active' : ''}`}
                    onClick={() => setSelectedImage(index)}
                  />
                ))}
              </div>
            </section>

            {/* Product Details */}
            <section className="product-details-card">
              <h2 className="product-details-title">Product Details</h2>
              
              <p className="product-details-description">{product.description}</p>
              
              <div className="product-details-specs">
                <div className="spec-item-row">
                  <FiTag className="spec-icon spec-icon-purple" />
                  <span className="spec-label">Category:</span>
                  <span className="spec-value">{product.category.name}</span>
                </div>
                
                <div className="spec-item-row">
                  <FiPackage className="spec-icon spec-icon-purple" />
                  <span className="spec-label">Brand/Model:</span>
                  <span className="spec-value">{product.brand_type}</span>
                </div>
                
                <div className="spec-item-row">
                  <FiCheckCircle className="spec-icon spec-icon-green" />
                  <span className="spec-label">Condition:</span>
                  <span className="spec-value">{product.condition}</span>
                </div>
                
                <div className="spec-item-row">
                  <FiBarChart2 className="spec-icon spec-icon-blue" />
                  <span className="spec-label">Stock:</span>
                  <span className="spec-value">{product.stock} item available</span>
                </div>
              </div>
            </section>

            {/* Reviews Section */}
            <section className="reviews">
              <h2 className="reviews__title">
                Product Reviews ({productAverageRating}/5.0 - {product.reviews.length} Reviews)
              </h2>
              
              <div className="reviews__list">
                {product.reviews.map(review => (
                  <div key={review.id} className="review">
                    <div className="review__header">
                      <div className="review__stars">
                        {renderStars(review.rating)}
                      </div>
                      <p className="review__date">{formatDate(review.created_at)}</p>
                    </div>
                    <p className="review__comment">{review.comment}</p>
                    <p className="review__reviewer">Reviewer: {review.reviewer_name}</p>
                  </div>
                ))}
              </div>

              {product.reviews.length > 2 && (
                <div className="reviews__load-more">
                  <button className="btn-load-more">Load More Reviews</button>
                </div>
              )}
            </section>

          </div>

          {/* Right Column: Actions & Seller Info */}
          <div className="product-detail__sidebar">
            
            {/* Product Action Card */}
            <div className="product-card-sticky">
              <div className="product-action">
                <h1 className="product-action__name">{product.name}</h1>
                
                <div className="product-action__header">
                  <p className="product-action__price">₱{product.price.toLocaleString('en-PH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                  <span className="product-action__category">{product.category.name}</span>
                </div>

                <div className="product-action__buttons">
                  <button 
                    className="btn btn--primary"
                    onClick={() => setIsPlaceOrderOpen(true)}
                  >
                    <FiPackage className="btn__icon" />
                    Buy Now
                  </button>
                  <button 
                    className="btn btn--secondary"
                    onClick={() => setIsContactModalOpen(true)}
                  >
                    <FiMessageSquare className="btn__icon" />
                    Contact Seller
                  </button>
                  <button 
                    className="btn btn--accent"
                    onClick={() => setIsTradeModalOpen(true)}
                  >
                    <FiRefreshCw className="btn__icon" />
                    Make a Trade Offer
                  </button>
                </div>

                <div className="product-action__stats">
                  <div className="stat">
                    <FiEye className="stat__icon" />
                    <span>{product.view_count} Views</span>
                  </div>
                  <button 
                    className={`stat stat--like ${isLiked ? 'stat--liked' : ''}`}
                    onClick={() => setIsLiked(!isLiked)}
                  >
                    <FiHeart className={`stat__icon ${isLiked ? 'stat__icon--filled' : ''}`} />
                    <span>{isLiked ? product.like_count + 1 : product.like_count} Likes</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Seller Information Card */}
            <div className="seller-card">
              <h2 className="seller-card__title">Seller Details</h2>
              
              <div className="seller-card__content">
                <div className="seller-card__name">
                  <FiUser className="seller-card__icon" />
                  <Link to={`/seller/${product.seller.id}`} className="seller-card__link">
                    {product.seller.first_name} {product.seller.last_name}
                  </Link>
                </div>
                
                <div className="seller-card__contacts">
                  <div className="contact">
                    <FiMail className="contact__icon" />
                    <span>{product.seller.email}</span>
                  </div>
                  <div className="contact">
                    <FiPhone className="contact__icon" />
                    <span>{product.seller.phone_number}</span>
                  </div>
                  <div className="contact">
                    <FaInstagram className="contact__icon" />
                    <span>{product.seller.instagram_handle}</span>
                  </div>
                </div>
                
                <p className="seller-card__member-since">
                  Member since: {formatDate(product.seller.created_at)}
                </p>
              </div>
            </div>

          </div>

        </div>
      </div>

      <TradeOfferModal 
        isOpen={isTradeModalOpen} 
        onClose={() => setIsTradeModalOpen(false)} 
        product={product}
      />

      <ContactSellerModal 
        isOpen={isContactModalOpen} 
        onClose={() => setIsContactModalOpen(false)} 
        product={product}
        seller={product.seller}
      />

      <PlaceOrderModal 
        isOpen={isPlaceOrderOpen} 
        onClose={() => setIsPlaceOrderOpen(false)} 
        product={product}
        seller={product.seller}
      />
    </div>
  );
}
