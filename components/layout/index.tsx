// components/Layout.tsx
import { ReactNode } from "react";
import Header from "../navbar";
import { CustomCursor } from "../custom-cursor";
import ScrollToTop from "../ScrollToTop";
import Footer from "../footer";
interface LayoutProps {
  children: ReactNode;
  showHeader?: boolean;
}

const Layout = ({ children, showHeader = true }: LayoutProps) => {
  return (
    <>
      {showHeader && <Header />}
      {children}
      {showHeader && <ScrollToTop />}
      {showHeader && <Footer />}
      <CustomCursor />
    </>
  );
};

export default Layout;
