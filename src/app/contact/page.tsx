import styles from "./page.module.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import ContactForm from "@/components/ContactForm";

export default function Contact() {
  return (
    <div className={styles.page}>
      <Navbar />
      <main className={styles.main}>
        <PageHero 
          title="Contact Us"
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Contact" }
          ]}
        />
        <ContactForm />
      </main>
      <Footer />
    </div>
  );
}
