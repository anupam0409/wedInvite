import React, { useState, useEffect } from 'react';
import { Heart, Clock, Mail, Smile, Feather, Flame, GlassWater } from 'lucide-react';
import confetti from 'canvas-confetti';
import couplePhoto from './assets/rohini_and_anurag.png'; // Update path if using public folder

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
          box-shadow: 0 10px 20px rgba(0,0,0,0.08) !important;
        }

        .event-card:hover .event-icon {
          animation: pulseGlow 1s ease-in-out infinite;
        }
      `}</style>

      {/* Tap to Reveal Envelope Section */}
      {!isOpen && (
        <div style={styles.envelopeScreen}>
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
      <div style={{ ...styles.container, opacity: isOpen ? 1 : 0, transition: 'opacity 0.8s ease-in-out', display: isOpen ? 'block' : 'none' }}>
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
              <h3>Thank You!</h3>
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
                  <option value="yes">Joyfully Accepts</option>
                  <option value="no">Regretfully Declines</option>
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
  pageWrapper: { backgroundColor: '#f4f0ea', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' },
  envelopeScreen: { display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', width: '100%', padding: '20px' },
  envelopeCard: {
    background: '#fffdfa',
    border: '2px dashed #c5a059',
    borderRadius: '12px',
    padding: '50px 30px',
    maxWidth: '450px',
    width: '100%',
    textAlign: 'center',
    boxShadow: '0 10px 30px rgba(0,0,0,0.06)',
    position: 'relative'
  },
  stamp: { marginBottom: '20px' },
  envelopeSubtext: { letterSpacing: '2px', fontSize: '0.75rem', color: '#8c7b6c', marginBottom: '10px' },
  envelopeTitle: { fontSize: '2.5rem', fontWeight: '300', color: '#2c3e50', marginBottom: '30px', fontFamily: 'serif' },
  revealButton: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#5a6b5c',
    color: '#fff',
    border: 'none',
    padding: '14px 28px',
    borderRadius: '30px',
    fontSize: '1rem',
    cursor: 'pointer',
    boxShadow: '0 4px 12px rgba(90, 107, 92, 0.25)'
  },
  container: { fontFamily: 'Georgia, serif', backgroundColor: '#fffdfa', color: '#2c3e50', width: '100%', textAlign: 'center' },
  hero: { padding: '80px 20px 40px', backgroundColor: '#f4f0ea' },
  subHeading: { letterSpacing: '2px', fontSize: '0.85rem', color: '#7a6e65', textTransform: 'uppercase' },
  parentsHeading: { fontSize: '0.95rem', color: '#685d54', fontFamily: 'Georgia, serif' },
  title: { fontSize: '3.5rem', margin: '15px 0', fontWeight: '300', color: '#2c3e50', fontFamily: 'Georgia, serif' },
  dateBadge: { display: 'inline-block', borderTop: '1px solid #c5a059', borderBottom: '1px solid #c5a059', padding: '8px 20px', letterSpacing: '2px', fontSize: '0.9rem', color: '#8c6d31' },
  imageContainer: { maxWidth: '500px', margin: '0 auto', padding: '0 20px' },
  coupleImage: { width: '100%', height: 'auto', borderRadius: '12px', boxShadow: '0 6px 20px rgba(0,0,0,0.08)' },
  section: { padding: '60px 20px', maxWidth: '950px', margin: '0 auto' },
  quoteHeading: { fontSize: '1.4rem', fontWeight: '300', color: '#5a6b5c', fontStyle: 'italic', marginBottom: '15px' },
  sectionTitle: { fontSize: '2.2rem', marginBottom: '35px', fontWeight: '300', color: '#2c3e50' },
  timerGrid: { display: 'flex', justifyContent: 'center', gap: '15px', flexWrap: 'wrap', marginTop: '25px' },
  timerCard: { background: '#f4f0ea', padding: '15px 20px', borderRadius: '8px', boxShadow: '0 2px 6px rgba(0,0,0,0.03)', minWidth: '75px' },
  timerValue: { display: 'block', fontSize: '1.8rem', fontWeight: 'bold', color: '#5a6b5c', fontFamily: 'sans-serif' },
  timerLabel: { fontSize: '0.65rem', color: '#888', letterSpacing: '1px' },
  cardGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))', gap: '20px' },
  card: { background: '#fff', padding: '30px 20px', borderRadius: '10px', border: '1px solid #efe8de', boxShadow: '0 4px 12px rgba(0,0,0,0.03)', textAlign: 'center' },
  iconWrapper: { background: '#f4f0ea', width: '56px', height: '56px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 15px' },
  cardTitle: { fontSize: '1.25rem', marginBottom: '10px', color: '#2c3e50', fontWeight: '400' },
  quoteText: { fontSize: '0.85rem', fontStyle: 'italic', color: '#7a6e65', marginBottom: '15px', minHeight: '36px' },
  venueText: { fontWeight: 'bold', color: '#5a6b5c', marginTop: '5px' },
  subtext: { color: '#888', fontSize: '0.8rem', marginTop: '2px' },
  form: { background: '#f4f0ea', padding: '35px', borderRadius: '10px', textAlign: 'left', maxWidth: '550px', margin: '0 auto' },
  field: { marginBottom: '18px' },
  label: { fontSize: '0.9rem', color: '#555', display: 'block', marginBottom: '5px' },
  input: { width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid #dcd3c8', marginTop: '2px', boxSizing: 'border-box', fontFamily: 'sans-serif' },
  button: { width: '100%', padding: '12px', background: '#5a6b5c', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '1rem', fontFamily: 'sans-serif' },
  successMessage: { background: '#f4f0ea', padding: '30px', borderRadius: '10px', maxWidth: '550px', margin: '0 auto' }
};