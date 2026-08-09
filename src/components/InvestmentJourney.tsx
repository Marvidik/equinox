import Image from 'next/image';
import styles from './InvestmentJourney.module.css';

const steps = [
  {
    number: "1",
    time: "2-3 minutes",
    tag: "QUICK & SECURE SETUP",
    title: "Account Registration",
    description: "Begin your investment journey with our streamlined registration process. Complete KYC verification and gain access to institutional-grade opportunities.",
    image: "/images/team4.jpg",
    features: ["Identity Verification", "Bank Account Linking", "Risk Assessment"],
    buttonText: "Get Started →",
    buttonClass: styles.btnGreen
  },
  {
    number: "2",
    time: "Instant",
    tag: "FUND YOUR PORTFOLIO",
    title: "Capital Deployment",
    description: "Deploy capital across diversified investment vehicles including cryptocurrency, forex, real estate, and precious metals through our secure gateway.",
    image: "/images/gifts3.jpg",
    features: ["Multiple Payment Methods", "Instant Processing", "Portfolio Allocation"],
    buttonText: "Get Started →",
    buttonClass: styles.btnOrange
  },
  {
    number: "3",
    time: "Real-time",
    tag: "SEAMLESS WITHDRAWALS",
    title: "Profit Distribution",
    description: "Access your returns through our automated withdrawal system. Enjoy instant payouts with comprehensive transaction tracking and tax documentation.",
    image: "/images/new2.jpg",
    features: ["Instant Withdrawals", "Tax Documentation", "Multiple Currencies"],
    buttonText: "Get Started →",
    buttonClass: styles.btnPurple
  }
];

export default function InvestmentJourney() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.badge}>INVESTMENT PROCESS</span>
          <h2 className={styles.title}>Start Your Investment Journey</h2>
          <p className={styles.subtitle}>
            Experience our streamlined three-step process designed for both novice and sophisticated investors seeking premium returns.
          </p>
        </div>

        <div className={styles.grid}>
          {steps.map((step, index) => (
            <div key={index} className={styles.card}>
              <div className={styles.imageContainer}>
                <Image src={step.image} alt={step.title} fill className={styles.img} />
                <div className={styles.numberBadge}>{step.number}</div>
                <div className={styles.timeBadge}>⏱ {step.time}</div>
              </div>
              <div className={styles.content}>
                <div className={styles.tag}>{step.tag}</div>
                <h3 className={styles.cardTitle}>{step.title}</h3>
                <p className={styles.cardDescription}>{step.description}</p>
                <ul className={styles.featureList}>
                  {step.features.map((feature, idx) => (
                    <li key={idx}>✓ {feature}</li>
                  ))}
                </ul>
                <button className={`${styles.button} ${step.buttonClass}`}>
                  {step.buttonText}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
