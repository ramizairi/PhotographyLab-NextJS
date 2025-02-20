import Contact from "../../components/Contact";
import Layout from "../../components/layout";
import { Metadata } from "next";
import Map from "../../components/Map";
export const metadata: Metadata = {
  title: "Contact Us",
  description: "This is Contact Page for HECFA Website",
  // other metadata
};

const ContactPage = () => {
  return (
    <>
      <Layout>
        <Contact />
        <Map />
      </Layout>
    </>
  );
};

export default ContactPage;
