import styles from "./page.module.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import AboutStats from "@/components/AboutStats";
import ProductRoadmap from "@/components/ProductRoadmap";
import SupportTeam from "@/components/SupportTeam";
import Team from "@/components/Team";

export default function About() {
  return (
    <div className={styles.page}>
      <Navbar />
      <main className={styles.main}>
        <PageHero 
          title="About Us"
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "About" }
          ]}
        />
        <AboutStats />
        <ProductRoadmap />
        <Team />
        <SupportTeam />
      </main>
      <Footer />
    </div>
  );
}
