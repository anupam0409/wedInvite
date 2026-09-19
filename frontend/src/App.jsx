import React, { useState, useEffect } from 'react';
import { Heart, Clock, Mail, Smile, Feather, Flame, GlassWater, Sun } from 'lucide-react';
import confetti from 'canvas-confetti';
import couplePhoto from './assets/rohini_and_anurag.png'; // Update path if using public folder
import ganeshaPic from './assets/ganesha.png';
import homeBg from './assets/heading_home.png';

export default function App() {
  const weddingDate = new Date('2026-11-25T16:00:00');
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  const [submitted, setSubmitted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    attending: 'yes',
    guests: '1',
    dietary: ''
  });

  function calculateTimeLeft() {
    const difference = +weddingDate - +new Date();
    if (difference <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60)
    };
  }

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(calculateTimeLeft()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleOpen = () => {
    setIsOpen(true);
    confetti({ particleCount: 80, spread: 60, origin: { y: 0.5 } });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
  };

  return (
    <div style={styles.pageWrapper}>
      {/* Embedded CSS Animations & Hover Effects */}
      <style>{`
        @keyframes imageAppear {
          0% {
            opacity: 0;
            transform: scale(0.92) translateY(15px);
          }
          100% {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        @keyframes pulseGlow {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.08); }
        }

        .event-card {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .event-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 10px 20px rgba(0,0,0,0.2) !important;
        }

        .event-card:hover .event-icon {
          animation: pulseGlow 1s ease-in-out infinite;
        }
      `}</style>

      {/* Tap to Reveal Envelope Section */}
      {!isOpen && (
        <div style={{
          ...styles.envelopeScreen,
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${homeBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}>
          <div style={styles.envelopeCard}>
            <div style={styles.stamp}>
              <Heart size={28} color="#c5a059" />
            </div>
            <p style={styles.envelopeSubtext}>YOU ARE CORDIALLY INVITED TO THE WEDDING OF</p>
            <h1 style={styles.envelopeTitle}>Rohini & Anurag</h1>
            <button onClick={handleOpen} style={styles.revealButton}>
              <Mail size={18} style={{ marginRight: '8px' }} />
              Open Invitation
            </button>
          </div>
        </div>
      )}

      {/* Main Invitation Content */}
      <div style={{ ...styles.container, backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.65), rgba(0, 0, 0, 0.65)), url(${homeBg})`, opacity: isOpen ? 1 : 0, transition: 'opacity 0.8s ease-in-out', display: isOpen ? 'block' : 'none' }}>

        {/* Ganesha Blessing Block */}
        <div style={styles.ganeshaBlock}>
          <div style={styles.ganeshaIconWrapper}>
            <Sun size={32} color="#f3d596" />
          </div>
          <h2 style={styles.ganeshaHeading}>॥ श्री गणेशाय नमः ॥</h2>
          <img
            src={ganeshaPic}
            alt="Ganesha Picture"
            style={{
              ...styles.ganeshaPic,
              ...(isOpen ? { animation: 'imageAppear 2s cubic-bezier(0.25, 1, 0.5, 1) forwards' } : {})
            }}
          />
          <p style={styles.mantraText}>
            वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ।<br />
            निर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा॥
          </p>
        </div>

        {/* Hero Section */}
        <header style={styles.hero}>
          <p style={styles.subHeading}>WE ARE GETTING MARRIED</p>
          <h2 style={styles.title}>Rohini & Anurag</h2>
          <br />
          <div style={styles.dateBadge}>NOVEMBER 25, 2026</div>
          <br /><br />
          <i style={styles.parentsHeading}>Daughter of Mr. & Mrs. Sharma • Son of Mr. & Mrs. Vishwakarma</i>
          <br /><br />
          <div style={styles.imageContainer}>
            <img
              src={couplePhoto}
              alt="Rohini and Anurag"
              style={{
                ...styles.coupleImage,
                ...(isOpen ? { animation: 'imageAppear 2s cubic-bezier(0.25, 1, 0.5, 1) forwards' } : {})
              }}
            />
          </div>
        </header>

        {/* Countdown Timer */}
        <section style={styles.section}>
          <h3 style={styles.quoteHeading}>A lifetime of togetherness begins with sacred steps.</h3>
          <p style={styles.subHeading}>Counting Down To The Wedding</p>
          <div style={styles.timerGrid}>
            {Object.entries(timeLeft).map(([unit, value]) => (
              <div key={unit} style={styles.timerCard}>
                <span style={styles.timerValue}>{value}</span>
                <span style={styles.timerLabel}>{unit.toUpperCase()}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Event Details */}
        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>Wedding Events & Traditions</h2>
          <div style={styles.cardGrid}>
            {/* Haldi */}
            <div className="event-card" style={styles.card}>
              <div style={styles.iconWrapper}>
                <Smile className="event-icon" size={28} color="#e67e22" />
              </div>
              <h3 style={styles.cardTitle}>Haldi Ceremony</h3>
              <p style={styles.quoteText}>A touch of turmeric for blessings, laughter, and a golden glow.</p>
              <p><strong>Nov 23, 2026 • 10:00 AM</strong></p>
              <p style={styles.venueText}>Kardhana</p>
              <p style={styles.subtext}>Kardhana, Varanasi, Uttar Pradesh</p>
            </div>

            {/* Mehendi */}
            <div className="event-card" style={styles.card}>
              <div style={styles.iconWrapper}>
                <Feather className="event-icon" size={28} color="#27ae60" />
              </div>
              <h3 style={styles.cardTitle}>Mehendi Ceremony</h3>
              <p style={styles.quoteText}>Deep henna stains, woven with love, laughter, and music.</p>
              <p><strong>Nov 24, 2026 • 3:00 PM</strong></p>
              <p style={styles.venueText}>Kardhana</p>
              <p style={styles.subtext}>Kardhana, Varanasi, Uttar Pradesh</p>
            </div>

            {/* Ceremony */}
            <div className="event-card" style={styles.card}>
              <div style={styles.iconWrapper}>
                <Flame className="event-icon" size={28} color="#c0392b" />
              </div>
              <h3 style={styles.cardTitle}>Wedding Ceremony</h3>
              <p style={styles.quoteText}>Two souls, seven vows, and a promise that lasts forever.</p>
              <p><strong>Nov 25, 2026 • 4:00 PM</strong></p>
              <p style={styles.venueText}>Silver Hotel</p>
              <p style={styles.subtext}>Varanasi, Uttar Pradesh</p>
            </div>

            {/* Reception */}
            <div className="event-card" style={styles.card}>
              <div style={styles.iconWrapper}>
                <GlassWater className="event-icon" size={28} color="#8e44ad" />
              </div>
              <h3 style={styles.cardTitle}>Reception</h3>
              <p style={styles.quoteText}>Raise a glass to new beginnings, dancing, and memories.</p>
              <p><strong>Nov 25, 2026 • 6:30 PM</strong></p>
              <p style={styles.venueText}>The Grand Ballroom</p>
              <p style={styles.subtext}>Goa</p>
            </div>
          </div>
        </section>

        {/* RSVP Form */}
        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>RSVP</h2>
          {submitted ? (
            <div style={styles.successMessage}>
              <h3 style={{ color: '#fff' }}>Thank You!</h3>
              <p>We've received your response and can't wait to celebrate with you.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={styles.form}>
              <div style={styles.field}>
                <label style={styles.label}>Full Name</label>
                <input
                  type="text"
                  required
                  style={styles.input}
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div style={styles.field}>
                <label style={styles.label}>Attendance</label>
                <select
                  style={styles.input}
                  value={formData.attending}
                  onChange={(e) => setFormData({ ...formData, attending: e.target.value })}
                >
                  <option value="yes" style={{ color: '#000' }}>Joyfully Accepts</option>
                  <option value="no" style={{ color: '#000' }}>Regretfully Declines</option>
                </select>
              </div>
              <div style={styles.field}>
                <label style={styles.label}>Dietary Restrictions</label>
                <textarea
                  style={styles.input}
                  rows="3"
                  value={formData.dietary}
                  onChange={(e) => setFormData({ ...formData, dietary: e.target.value })}
                />
              </div>
              <button type="submit" style={styles.button}>Send RSVP</button>
            </form>
          )}
        </section>
      </div>
    </div>
  );
}

const styles = {
  pageWrapper: { backgroundColor: '#1a1a1a', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' },
  envelopeScreen: { display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', width: '100%', padding: '20px' },
  envelopeCard: {
    background: 'rgba(20, 20, 20, 0.85)',
    border: '2px dashed #c5a059',
    borderRadius: '12px',
    padding: '50px 30px',
    maxWidth: '450px',
    width: '100%',
    textAlign: 'center',
    boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
    position: 'relative'
  },
  stamp: { marginBottom: '20px' },
  envelopeSubtext: { letterSpacing: '2px', fontSize: '0.75rem', color: '#d4af37', marginBottom: '10px' },
  envelopeTitle: { fontSize: '2.5rem', fontWeight: '300', color: '#ffffff', marginBottom: '30px', fontFamily: 'serif' },
  revealButton: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#c5a059',
    color: '#fff',
    border: 'none',
    padding: '14px 28px',
    borderRadius: '30px',
    fontSize: '1rem',
    cursor: 'pointer',
    boxShadow: '0 4px 12px rgba(197, 160, 89, 0.3)'
  },
  container: { fontFamily: 'Georgia, serif', color: '#ffffff', width: '100%', textAlign: 'center', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' },
  ganeshaBlock: { padding: '40px 20px 20px' },
  ganeshaIconWrapper: { marginBottom: '10px' },
  ganeshaHeading: { fontSize: '1.6rem', color: '#f3d596', fontWeight: 'bold', marginBottom: '10px', fontFamily: 'serif' },
  ganeshaPic: { maxWidth: '140px', height: 'auto', margin: '15px auto', display: 'block', filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.5))' },
  mantraText: { fontSize: '0.95rem', color: '#f0e6d2', fontStyle: 'italic', lineHeight: '1.6' },
  hero: { padding: '50px 20px 40px' },
  subHeading: { letterSpacing: '2px', fontSize: '0.85rem', color: '#f3d596', textTransform: 'uppercase' },
  parentsHeading: { fontSize: '0.95rem', color: '#e0d5c1', fontFamily: 'Georgia, serif' },
  title: { fontSize: '3.5rem', margin: '15px 0', fontWeight: '300', color: '#ffffff', fontFamily: 'Georgia, serif' },
  dateBadge: { display: 'inline-block', borderTop: '1px solid #f3d596', borderBottom: '1px solid #f3d596', padding: '8px 20px', letterSpacing: '2px', fontSize: '0.9rem', color: '#f3d596' },
  imageContainer: { maxWidth: '500px', margin: '0 auto', padding: '0 20px' },
  coupleImage: { width: '100%', height: 'auto', borderRadius: '12px', boxShadow: '0 8px 25px rgba(0,0,0,0.5)', border: '1px solid rgba(243, 213, 150, 0.3)' },
  section: { padding: '60px 20px', maxWidth: '950px', margin: '0 auto' },
  quoteHeading: { fontSize: '1.4rem', fontWeight: '300', color: '#f3d596', fontStyle: 'italic', marginBottom: '15px' },
  sectionTitle: { fontSize: '2.2rem', marginBottom: '35px', fontWeight: '300', color: '#ffffff' },
  timerGrid: { display: 'flex', justifyContent: 'center', gap: '15px', flexWrap: 'wrap', marginTop: '25px' },
  timerCard: { background: 'rgba(30, 30, 30, 0.65)', border: '1px solid rgba(243, 213, 150, 0.2)', padding: '15px 20px', borderRadius: '8px', boxShadow: '0 4px 10px rgba(0,0,0,0.3)', minWidth: '75px' },
  timerValue: { display: 'block', fontSize: '1.8rem', fontWeight: 'bold', color: '#f3d596', fontFamily: 'sans-serif' },
  timerLabel: { fontSize: '0.65rem', color: '#cccccc', letterSpacing: '1px' },
  cardGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))', gap: '20px' },
  card: { background: 'rgba(30, 30, 30, 0.75)', padding: '30px 20px', borderRadius: '10px', border: '1px solid rgba(243, 213, 150, 0.3)', boxShadow: '0 6px 15px rgba(0,0,0,0.4)', textAlign: 'center', color: '#ffffff' },
  iconWrapper: { background: 'rgba(50, 50, 50, 0.8)', width: '56px', height: '56px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 15px' },
  cardTitle: { fontSize: '1.25rem', marginBottom: '10px', color: '#ffffff', fontWeight: '400' },
  quoteText: { fontSize: '0.85rem', fontStyle: 'italic', color: '#e0d5c1', marginBottom: '15px', minHeight: '36px' },
  venueText: { fontWeight: 'bold', color: '#f3d596', marginTop: '5px' },
  subtext: { color: '#cccccc', fontSize: '0.8rem', marginTop: '2px' },
  form: { background: 'rgba(30, 30, 30, 0.75)', border: '1px solid rgba(243, 213, 150, 0.3)', padding: '35px', borderRadius: '10px', textAlign: 'left', maxWidth: '550px', margin: '0 auto', color: '#ffffff' },
  field: { marginBottom: '18px' },
  label: { fontSize: '0.9rem', color: '#f3d596', display: 'block', marginBottom: '5px' },
  input: { width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid rgba(243, 213, 150, 0.4)', background: 'rgba(20, 20, 20, 0.9)', color: '#ffffff', marginTop: '2px', boxSizing: 'border-box', fontFamily: 'sans-serif' },
  button: { width: '100%', padding: '12px', background: '#c5a059', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '1rem', fontFamily: 'sans-serif' },
  successMessage: { background: 'rgba(30, 30, 30, 0.75)', border: '1px solid rgba(243, 213, 150, 0.3)', padding: '30px', borderRadius: '10px', maxWidth: '550px', margin: '0 auto', color: '#ffffff' }
};