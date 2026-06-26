import styles from "./page.module.css";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TradingViewTicker from "@/components/TradingViewTicker";
import AboutCompany from "@/components/AboutCompany";
import ContextualIntelligence from "@/components/ContextualIntelligence";
import MeetCompany from "@/components/MeetCompany";
import TradingViewChart from "@/components/TradingViewChart";
import Pricing from "@/components/Pricing";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import Team from "@/components/Team";

export default function Home() {
  return (
    <div className={styles.page}>
      <div className={styles.glowEffect}></div>
      <div className={styles.gridBackground}></div>
      <Navbar />
      <main className={styles.main}>
        <Hero />
        <TradingViewTicker />
        <AboutCompany />
        <ContextualIntelligence />
        <MeetCompany />
        <TradingViewChart />
        <Pricing />
        <Team />
        <Testimonials />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}
