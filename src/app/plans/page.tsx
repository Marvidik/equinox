import styles from "./page.module.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import Pricing from "@/components/Pricing";
import FAQ from "@/components/FAQ";

export default function Plans() {
  return (
    <div className={styles.page}>
      <Navbar />
      <main className={styles.main}>
        <PageHero 
          title="Investment Plans"
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Plans" }
          ]}
        />
        <Pricing />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}
