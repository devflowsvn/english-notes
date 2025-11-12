import { ReactNode } from "react";
import Navbar from "./_components/navbar";
import Footer from "./_components/footer";

const MainLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="w-full min-h-svh flex flex-col">
      <Navbar />
      <div className="w-full h-[calc(100vh-100px)] flex items-center justify-center ">
        <div className="container mx-auto p-5 flex items-center justify-center">
          {children}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;
