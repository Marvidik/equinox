'use client';

import { useState } from 'react';
import styles from './FAQ.module.css';

const faqData = [
  {
    question: 'What Are The Benefits Of Online Trading?',
    answer:
      "Online trading's primary advantages are that it allows you to manage your trades at your convenience, serves as an extra source of income, and provides access to global markets 24/7.",
  },
  {
    question: 'How To Create A Trading Account?',
    answer:
      'Creating a trading account is simple. Visit our platform, click on "Get Started," fill in your personal details, verify your identity, and fund your account to begin trading.',
  },
  {
    question: 'What Are The Disadvantages Of Online Trading?',
    answer:
      'Online trading carries risks including market volatility, potential for loss, emotional decision-making, and the need for continuous learning. Proper risk management is essential.',
  },
  {
    question: 'What Are The Benefits Of Online Trading?',
    answer:
      'Manage your trades at your convenience, it serves as an extra source of income, and you won\'t need to commute. Access global markets from anywhere in the world.',
  },
  {
    question: 'Is Online Trading Safe?',
    answer:
      'Online trading is safe when done through regulated and reputable platforms like Equinox Global Assets. We use advanced encryption, two-factor authentication, and segregated client funds.',
  },
  {
    question: 'Which App Is Best For Online Trading?',
    answer:
      'The best app depends on your needs. Equinox Global Assets offers a comprehensive platform with real-time data, advanced charting tools, and seamless execution across all devices.',
  },
  {
    question: 'Which App Is Best For Online Trading?',
    answer:
      'For beginners, look for apps with educational resources and demo accounts. For advanced traders, prioritize platforms with technical analysis tools and fast execution speeds.',
  },
  {
    question: 'What Is Online Trading, And How Does It Work?',
    answer:
      'Online trading involves buying and selling financial assets through internet-based platforms. You open a position based on market analysis and close it to realize profits or losses.',
  },
  {
    question: 'What Is Online Trading, And How Does It Work?',
    answer:
      'It works by connecting you to global exchanges through a broker platform. You can trade stocks, forex, crypto, and commodities with just a few clicks from your device.',
  },
  {
    question: 'How To Create A Trading Account?',
    answer:
      'Sign up on our website, complete the KYC verification process, choose your account type, make an initial deposit, and you\'re ready to start trading within minutes.',
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className={styles.section} id="faq">
      <div className={styles.container}>
        <h2 className={styles.heading}>
          Most Common <span>FAQ</span>
        </h2>

        <div className={styles.grid}>
          {faqData.map((item, index) => (
            <div
              key={index}
              className={`${styles.item} ${openIndex === index ? styles.itemActive : ''}`}
              onClick={() => toggle(index)}
            >
              <div className={styles.question}>
                <span className={styles.questionText}>{item.question}</span>
                <span className={styles.icon}>
                  {openIndex === index ? '−' : '+'}
                </span>
              </div>
              <div
                className={`${styles.answer} ${openIndex === index ? styles.answerOpen : ''}`}
              >
                <p className={styles.answerContent}>{item.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
