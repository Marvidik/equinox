'use client';
import React from 'react';
import styles from './ContactForm.module.css';

export default function ContactForm() {
  return (
    <div className={styles.contactWrapper}>
      
      {/* Section 1: Multiple Ways to Connect */}
      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <div className={styles.badge}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22 16.92V20.01C22.0003 20.2796 21.897 20.5392 21.7107 20.735C21.5244 20.9309 21.2679 21.0494 21 21.07C16.9632 20.6125 13.1555 19.1678 9.94002 16.88C7.00067 14.832 4.60416 12.1887 2.94002 9.15001C2.69744 8.76176 2.5802 8.30799 2.60002 7.84001V4.92001C2.5999 4.65581 2.70275 4.39891 2.89069 4.20914C3.07863 4.01937 3.33967 3.91262 3.60002 3.92001H7.60002C7.81768 3.91492 8.02985 3.9892 8.1963 4.12921C8.36275 4.26922 8.47195 4.46545 8.50002 4.68001C8.55294 5.96024 8.82586 7.21415 9.30002 8.39001C9.39075 8.61869 9.38711 8.87229 9.29002 9.09001C9.19293 9.30773 9.00947 9.4716 8.78002 9.56001L7.50002 10.84C8.92244 13.3444 10.8524 15.3524 13.17 16.83L14.45 15.55C14.6384 15.3624 14.9024 15.2599 15.19 15.2601C15.4776 15.2603 15.7414 15.3632 15.93 15.55C17.1059 16.0242 18.3598 16.2971 19.64 16.35C19.8546 16.3781 20.0508 16.4873 20.1908 16.6537C20.3308 16.8202 20.4051 17.0323 20.4 17.25V16.92Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span>Get in Touch</span>
            </div>
            <h2 className={styles.title}>Multiple Ways to <span className={styles.highlight}>Connect</span></h2>
            <p className={styles.subtitle}>Choose your preferred method of communication. Our expert team is ready to assist you.</p>
          </div>

          <div className={styles.cardsGrid}>
            {/* Email Card */}
            <div className={styles.contactCard}>
              <div className={`${styles.iconWrapper} ${styles.greenIcon}`}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 8L10.8906 13.2604C11.5624 13.7083 12.4376 13.7083 13.1094 13.2604L21 8M5 19H19C20.1046 19 21 18.1046 21 17V7C21 5.89543 20.1046 5 19 5H5C3.89543 5 3 5.89543 3 7V17C3 18.1046 3.89543 19 5 19Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 className={styles.cardTitle}>Email Support</h3>
              <p className={styles.cardDesc}>Professional assistance via email with detailed responses.</p>
              <div className={styles.cardActionAreaGreen}>
                <span className={styles.cardValue}>support@equinoxassets.com</span>
              </div>
              <div className={styles.cardFooter}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 13L9 17L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                <span>Response within 24 hours</span>
              </div>
            </div>

            {/* Live Chat Card */}
            <div className={`${styles.contactCard} ${styles.highlightCard}`}>
              <div className={`${styles.iconWrapper} ${styles.orangeIcon}`}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8 12H8.01M12 12H12.01M16 12H16.01M21 12C21 16.4183 16.9706 20 12 20C10.4607 20 9.01172 19.6565 7.73426 19.0553C7.35515 18.877 6.92425 18.8184 6.51654 18.8927L3.99971 19.3512C3.44755 19.4518 2.95159 18.9558 3.05215 18.4037L3.51065 15.8868C3.58498 15.4791 3.52632 15.0482 3.34807 14.6691C2.74681 13.3917 2.40332 11.9427 2.40332 10.4033C2.40332 5.985 6.43273 2.40332 11.4033 2.40332C16.3739 2.40332 20.4033 5.985 20.4033 10.4033Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 className={styles.cardTitle}>Live Chat</h3>
              <p className={styles.cardDesc}>Instant support with real-time assistance from our experts.</p>
              <div className={styles.cardActionAreaOrange}>
                <span className={styles.cardValue}>24/7 Available</span>
              </div>
              <div className={styles.cardFooterOrange}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 13L9 17L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                <span>Always online for you →</span>
              </div>
            </div>

            {/* Phone Card */}
            <div className={styles.contactCard}>
              <div className={`${styles.iconWrapper} ${styles.blueIcon}`}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22 16.92V20.01C22.0003 20.2796 21.897 20.5392 21.7107 20.735C21.5244 20.9309 21.2679 21.0494 21 21.07C16.9632 20.6125 13.1555 19.1678 9.94002 16.88C7.00067 14.832 4.60416 12.1887 2.94002 9.15001C2.69744 8.76176 2.5802 8.30799 2.60002 7.84001V4.92001C2.5999 4.65581 2.70275 4.39891 2.89069 4.20914C3.07863 4.01937 3.33967 3.91262 3.60002 3.92001H7.60002C7.81768 3.91492 8.02985 3.9892 8.1963 4.12921C8.36275 4.26922 8.47195 4.46545 8.50002 4.68001C8.55294 5.96024 8.82586 7.21415 9.30002 8.39001C9.39075 8.61869 9.38711 8.87229 9.29002 9.09001C9.19293 9.30773 9.00947 9.4716 8.78002 9.56001L7.50002 10.84C8.92244 13.3444 10.8524 15.3524 13.17 16.83L14.45 15.55C14.6384 15.3624 14.9024 15.2599 15.19 15.2601C15.4776 15.2603 15.7414 15.3632 15.93 15.55C17.1059 16.0242 18.3598 16.2971 19.64 16.35C19.8546 16.3781 20.0508 16.4873 20.1908 16.6537C20.3308 16.8202 20.4051 17.0323 20.4 17.25V16.92Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 className={styles.cardTitle}>Phone Support</h3>
              <p className={styles.cardDesc}>Direct voice communication with our professional team.</p>
              <div className={styles.cardActionAreaGrey}>
                <span className={styles.cardValue}>+1 (240) 457 2508</span>
              </div>
              <div className={styles.cardFooterGrey}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/><path d="M12 6V12L16 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                <span>Mon-Fri: 9AM - 6PM EST</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Visit Our Office (Split Layout) */}
      <section className={styles.officeSection}>
        <div className={styles.container}>
          <div className={styles.officeLayout}>
            <div className={styles.officeInfo}>
              <div className={styles.badgeGrey}>
                <span>🏢 Corporate Headquarters</span>
              </div>
              <h2 className={styles.titleLeft}>Visit Our New York Office</h2>
              <p className={styles.officeDesc}>
                Located in the heart of New York, our corporate headquarters serves as the center of our global investment operations.
              </p>
              <div className={styles.locationCards}>
                <div className={styles.locCard}>
                  <div className={styles.locIcon}>📍</div>
                  <div className={styles.locText}>
                    <span className={styles.locLabel}>City</span>
                    <span className={styles.locValue}>New York</span>
                  </div>
                </div>
                <div className={styles.locCard}>
                  <div className={styles.locIcon}>🗺️</div>
                  <div className={styles.locText}>
                    <span className={styles.locLabel}>State</span>
                    <span className={styles.locValue}>New York, USA</span>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.officeMap}>
              {/* Map Placeholder Graphic */}
              <div className={styles.mapContainer}>
                <div className={styles.mapPlaceholder}>
                  <img src="/images/chart3.jpg" alt="Map View" className={styles.mapImg} />
                  <div className={styles.mapOverlay}>
                    <div className={styles.mapPin}>
                      <span className={styles.pinDot}></span>
                      <div className={styles.pinCard}>
                        <strong>Equinox Assets</strong>
                        <span>Corporate Office</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Send Us a Message (Form) */}
      <section className={styles.formSection}>
        <div className={styles.containerSmall}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.title}>Send Us a Message</h2>
            <p className={styles.subtitle}>Have a specific question or need personalized assistance? Our expert team is ready to help you with professional guidance.</p>
          </div>

          <div className={styles.formContainer}>
            <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
              <div className={styles.inputGroup}>
                <label htmlFor="fullName">Full Name *</label>
                <div className={styles.inputWrapper}>
                  <span className={styles.inputIcon}>👤</span>
                  <input type="text" id="fullName" placeholder="Enter your full name" />
                </div>
              </div>

              <div className={styles.inputGroup}>
                <label htmlFor="email">Email Address *</label>
                <div className={styles.inputWrapper}>
                  <span className={styles.inputIcon}>✉️</span>
                  <input type="email" id="email" placeholder="Enter your email address" />
                </div>
              </div>

              <div className={styles.inputGroup}>
                <label htmlFor="message">Message *</label>
                <textarea id="message" rows={5} placeholder="Tell us how we can help you..."></textarea>
              </div>

              <button type="submit" className={styles.submitBtn}>Submit Message</button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
