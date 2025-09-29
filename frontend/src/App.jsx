import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Mainroutes from "./routes/Mainroutes";

const App = () => {
  return (
    <div className="text-white w-full max-w-[2000px]">
      <Navbar />
      <Mainroutes />
      <Footer />
    </div>
  );
};

export default App;
