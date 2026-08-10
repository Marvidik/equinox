import styles from "./page.module.css";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TradingViewTicker from "@/components/TradingViewTicker";
import TradingViewChart from "@/components/TradingViewChart";
import AboutPlatform from "@/components/AboutPlatform";
import InvestmentJourney from "@/components/InvestmentJourney";
import Pricing from "@/components/Pricing";
import Team from "@/components/Team";
import Testimonials from "@/components/Testimonials";
import ClientRecognition from "@/components/ClientRecognition";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import LiveActivityToast from "@/components/LiveActivityToast";
import WhyChooseUs from "@/components/WhyChooseUs";

export default function Home() {
  return (
    <div className={styles.page}>
      <Navbar />
      <main className={styles.main}>
        <Hero />
        <TradingViewTicker />
        <AboutPlatform />
        <WhyChooseUs />
        <InvestmentJourney />
        <TradingViewChart />
        <Pricing />
        <Team />
        <Testimonials />
        <ClientRecognition />
        <FAQ />
      </main>
      <Footer />
      <LiveActivityToast />
    </div>
  );
}
