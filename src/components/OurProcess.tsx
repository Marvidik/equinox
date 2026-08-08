import React from 'react';
import Image from 'next/image';
import styles from './OurProcess.module.css';

const steps = [
  {
    num: '01',
    title: 'Create Account',
    desc: 'Sign up in minutes with our streamlined onboarding — just your name, email, and password.',
    image: '/images/chart1.jpg',
  },
  {
    num: '02',
    title: 'Login Securely',
    desc: 'Access your personal dashboard with secure, encrypted authentication.',
    image: '/images/new1.jpg',
  },
  {
    num: '03',
    title: 'Deposit Funds',
    desc: 'Fund your account easily through our supported payment methods.',
    image: '/images/chart3.jpg',
  },
  {
    num: '04',
    title: 'Enter the Market',
    desc: 'Explore and select from a wide range of investment opportunities and assets.',
    image: '/images/chart4.jpg',
  },
  {
    num: '05',
    title: 'Start Trading',
    desc: 'Execute trades with precision using real-time data, AI insights, and expert guidance.',
    image: '/images/chart2.jpg',
  },
  {
    num: '06',
    title: 'Withdraw Profits',
    desc: 'Enjoy fast, secure, and seamless withdrawals of your earnings anytime.',
    image: '/images/new2.jpg',
  },
];

export default function OurProcess() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.badge}>Our Process</div>
          <h2 className={styles.title}>
            Simple steps to <span className={styles.highlight}>start trading</span>
          </h2>
          <p className={styles.subtitle}>
            From sign-up to profit withdrawal — we made every step effortless.
          </p>
        </div>

        <div className={styles.grid}>
          {steps.map((step, index) => (
            <div key={index} className={styles.card}>
              <div className={styles.imageWrapper}>
                <Image
                  src={step.image}
                  alt={step.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  style={{ objectFit: 'cover' }}
                />
                <div className={styles.imageOverlay} />
                <span className={styles.stepNum}>{step.num}</span>
              </div>
              <div className={styles.cardBody}>
                <h3 className={styles.cardTitle}>{step.title}</h3>
                <p className={styles.cardDesc}>{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
