import { useState, useEffect } from "react";
import "./index.css";

function App() {
  const [workshopDate, setWorkshopDate] = useState("");
  const [webinarDate, setWebinarDate] = useState("");
  const [currentReview, setCurrentReview] = useState(0);

  // Cart State
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [checkoutForm, setCheckoutForm] = useState({ name: '', email: '' });
  const [isProcessing, setIsProcessing] = useState(false);
  const [bookedItems, setBookedItems] = useState([]);

  const reviews = [
    { text: "The training was very beneficial. I learnt so much and implemented the learnings to create my very own tiny patch of forest in my city. Thank you for the guidance.", author: "Shreya Pareek" },
    { text: "Absolutely loved the detailed training. It gave me all the tools I needed to start rewilding my backyard. Highly recommended!", author: "Amit Sharma" },
    { text: "The in-depth knowledge provided by the team is unparalleled. An eye-opening experience that changed how I see nature.", author: "Priya Desai" }
  ];

  const nextReview = () => setCurrentReview((prev) => (prev + 1) % reviews.length);
  const prevReview = () => setCurrentReview((prev) => (prev - 1 + reviews.length) % reviews.length);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentReview((prev) => (prev + 1) % reviews.length);
    }, 5000); 
    return () => clearInterval(timer);
  }, [reviews.length]);

  const handleBook = (item, price) => {
    setCartItems([...cartItems, { name: item, price }]);
    setIsCartOpen(true);
  };

  const removeFromCart = (index) => {
    const newCart = [...cartItems];
    newCart.splice(index, 1);
    setCartItems(newCart);
  };

  const totalAmount = cartItems.reduce((sum, item) => sum + item.price, 0);

  const handleCheckout = async (e) => {
    e.preventDefault();
    if (cartItems.length === 0) return alert('Cart is empty!');
    if (!checkoutForm.name || !checkoutForm.email) return alert('Please fill in your details.');
    
    setIsProcessing(true);
    
    try {
      const response = await fetch('https://afforestt-demo.onrender.com/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customer: checkoutForm,
          cart: cartItems,
          total: totalAmount
        })
      });
      
      const data = await response.json();
      
      if (data.success) {
        alert('Payment successful! Order ID: ' + data.orderId);
        
        // Add all items in the cart to the bookedItems array
        const newlyBooked = cartItems.map(item => item.name);
        setBookedItems(prev => [...prev, ...newlyBooked]);
        
        setCartItems([]);
        setIsCartOpen(false);
        setCheckoutForm({ name: '', email: '' });
      } else {
        alert('Payment failed: ' + data.error);
      }
    } catch (error) {
      alert('Error connecting to payment gateway.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <>
      <header>
        <div className="container header-content">
          <div className="logo">Afforestt</div>
          <nav className="nav-links">
            <a href="#trainings">Trainings</a>
            <a href="#workshop">Workshop</a>
            <a href="#webinar">Webinar</a>
            <button className="nav-cart-btn" onClick={() => setIsCartOpen(true)}>
              Cart ({cartItems.length})
            </button>
          </nav>
        </div>
      </header>

      <main>
        <section className="page-header container">
          <h1>Trainings</h1>
          <p>Simple, easy to navigate and use. Choose the training that fits your journey to create your own tiny forest.</p>
        </section>

        <section id="trainings" className="container">
          <h2 className="section-title">Online Trainings</h2>
          <div className="products-grid">
            <div className="product-card">
              <img src="https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=600&q=80" alt="Crash Course" className="product-image" />
              <div className="product-content">
                <h3 className="product-title">Crash Course</h3>
                <div className="product-meta">2 hour long</div>
                <p className="product-desc">Basics and implementation of Miyawaki Method.</p>
                <div className="product-price">Rs 3,500</div>
                <button 
                  className="btn-primary" 
                  style={{ marginTop: '15px', opacity: bookedItems.includes("Crash Course") ? 0.5 : 1 }} 
                  disabled={bookedItems.includes("Crash Course")}
                  onClick={() => handleBook("Crash Course", 3500)}
                >
                  {bookedItems.includes("Crash Course") ? "Booked" : "Book Now"}
                </button>
              </div>
            </div>

            <div className="product-card">
              <img src="https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&w=600&q=80" alt="Detailed Training" className="product-image" />
              <div className="product-content">
                <h3 className="product-title">Detailed Training</h3>
                <div className="product-meta">4 hour long</div>
                <p className="product-desc">A deeper training experience to understand the methodology.</p>
                <div className="product-price">Rs 5,500</div>
                <button 
                  className="btn-primary" 
                  style={{ marginTop: '15px', opacity: bookedItems.includes("Detailed Training") ? 0.5 : 1 }} 
                  disabled={bookedItems.includes("Detailed Training")}
                  onClick={() => handleBook("Detailed Training", 5500)}
                >
                  {bookedItems.includes("Detailed Training") ? "Booked" : "Book Now"}
                </button>
              </div>
            </div>

            <div className="product-card">
              <img src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=600&q=80" alt="In-depth Training" className="product-image" />
              <div className="product-content">
                <h3 className="product-title">In-depth Training</h3>
                <div className="product-meta">8 hour long spread over 2 days</div>
                <p className="product-desc">Know everything about the Method through an immersive learning experience.</p>
                <div className="product-price">Rs 9,999</div>
                <button 
                  className="btn-primary" 
                  style={{ marginTop: '15px', opacity: bookedItems.includes("In-depth Training") ? 0.5 : 1 }} 
                  disabled={bookedItems.includes("In-depth Training")}
                  onClick={() => handleBook("In-depth Training", 9999)}
                >
                  {bookedItems.includes("In-depth Training") ? "Booked" : "Book Now"}
                </button>
              </div>
            </div>
          </div>
        </section>

        <section id="workshop" className="container">
          <h2 className="section-title">Offline Workshops</h2>
          <div className="workshop-section">
            <div className="workshop-content">
              <h3 className="workshop-title">5-Day In-Person Training</h3>
              <p className="product-desc" style={{ marginBottom: '20px' }}>Join us for an immersive 5-day physical workshop. Food, accommodation, and comprehensive training are included in the fees.</p>
              <div className="date-picker">
                <label>Select a date of your choice:</label>
                <input type="date" value={workshopDate} onChange={(e) => setWorkshopDate(e.target.value)} style={{ padding: '10px', border: '1px solid #e2e8f0', borderRadius: '6px', width: '100%' }} />
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', minWidth: '250px' }}>
              <span className="price-tag">Rs 1,00,000</span>
              <button 
                className="btn-primary" 
                style={{ width: '100%', padding: '15px', opacity: workshopDate && bookedItems.includes(`Offline Workshop on ${workshopDate}`) ? 0.5 : 1 }} 
                disabled={workshopDate && bookedItems.includes(`Offline Workshop on ${workshopDate}`)}
                onClick={() => {
                  if(!workshopDate) { alert('Please select a date'); return; }
                  handleBook(`Offline Workshop on ${workshopDate}`, 100000);
                }}
              >
                {workshopDate && bookedItems.includes(`Offline Workshop on ${workshopDate}`) ? "Booked" : "Book Workshop"}
              </button>
            </div>
          </div>
        </section>

        <section id="webinar" className="container">
          <h2 className="section-title">Monthly Webinars</h2>
          <div className="webinar-section">
            <div className="webinar-content">
              <h3 className="webinar-title">Live Q&A and Session</h3>
              <p className="product-desc" style={{ marginBottom: '20px' }}>Example: Next webinar happening on 30th September at 6:30 pm. Limited seats. <br /><br />We offer Training on every Friday evening, so provide options to choose any Friday.</p>
              <div className="date-picker">
                <label>Choose a Friday for your webinar:</label>
                <select value={webinarDate} onChange={(e) => setWebinarDate(e.target.value)}>
                  <option value="">Select a Friday...</option>
                  <option value="Friday, Oct 6">Friday, Oct 6</option>
                  <option value="Friday, Oct 13">Friday, Oct 13</option>
                  <option value="Friday, Oct 20">Friday, Oct 20</option>
                  <option value="Friday, Oct 27">Friday, Oct 27</option>
                </select>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', minWidth: '250px' }}>
              <span className="price-tag">Rs 149 <span style={{ fontSize: '14px', color: '#64748b', fontWeight: 'normal' }}>/ person</span></span>
              <button 
                className="btn-primary" 
                style={{ width: '100%', padding: '15px', opacity: webinarDate && bookedItems.includes(`Webinar on ${webinarDate}`) ? 0.5 : 1 }} 
                disabled={webinarDate && bookedItems.includes(`Webinar on ${webinarDate}`)}
                onClick={() => {
                  if(!webinarDate) { alert('Please select a date'); return; }
                  handleBook(`Webinar on ${webinarDate}`, 149);
                }}
              >
                {webinarDate && bookedItems.includes(`Webinar on ${webinarDate}`) ? "Registered" : "Register for Webinar"}
              </button>
            </div>
          </div>
        </section>

        <section id="testimonials" className="container" style={{ backgroundColor: '#f8fafc', padding: '60px 20px', borderRadius: '8px' }}>
          <h2 className="section-title">Testimonials & Reviews</h2>
          <div className="testimonial-card">
            <div className="quote-icon">"</div>
            <p className="testimonial-text">{reviews[currentReview].text}</p>
            <p className="testimonial-author">- {reviews[currentReview].author}</p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', marginTop: '30px' }}>
              <button onClick={prevReview} style={{ padding: '8px 20px', border: '1px solid #e2e8f0', borderRadius: '6px', background: 'white', cursor: 'pointer', fontSize: '18px' }}>{"<"}</button>
              <button onClick={nextReview} style={{ padding: '8px 20px', border: '1px solid #e2e8f0', borderRadius: '6px', background: 'white', cursor: 'pointer', fontSize: '18px' }}>{">"}</button>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <div className="container">
          <p>© 2026 Afforestt. All rights reserved.</p>
        </div>
      </footer>

      {/* Cart Sidebar Modal */}
      {isCartOpen && (
        <div className="cart-overlay">
          <div className="cart-sidebar">
            <div className="cart-header">
              <h3>Your Cart</h3>
              <button onClick={() => setIsCartOpen(false)} style={{ background: 'none', fontSize: '20px' }}>&times;</button>
            </div>
            
            <div className="cart-items">
              {cartItems.length === 0 ? <p>Your cart is empty.</p> : 
                cartItems.map((item, idx) => (
                  <div key={idx} className="cart-item">
                    <span>{item.name}</span>
                    <div>
                      <span>Rs {item.price}</span>
                      <button onClick={() => removeFromCart(idx)} style={{ marginLeft: '10px', color: 'red', background: 'none' }}>Remove</button>
                    </div>
                  </div>
                ))
              }
            </div>

            <div className="cart-footer">
              <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', fontSize: '18px' }}>
                <span>Total:</span>
                <span>Rs {totalAmount}</span>
              </div>
              
              {cartItems.length > 0 && (
                <form className="checkout-form" onSubmit={handleCheckout}>
                  <input type="text" placeholder="Full Name" value={checkoutForm.name} onChange={e => setCheckoutForm({...checkoutForm, name: e.target.value})} required />
                  <input type="email" placeholder="Email Address" value={checkoutForm.email} onChange={e => setCheckoutForm({...checkoutForm, email: e.target.value})} required />
                  <button type="submit" className="btn-primary" disabled={isProcessing} style={{ marginTop: '10px' }}>
                    {isProcessing ? 'Processing Payment...' : 'Checkout & Pay'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default App;