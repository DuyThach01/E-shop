import { Children, Component, useState } from "react";
import Footer from "./components/Layout/Footer";
import Header from "./components/Layout/Header";
import Menuleft from "./components/Layout/Menuleft";
import { Location, useLocation } from "react-router-dom";
import MenuAcc from "./components/Layout/MenuAcc";
import Slide from "./components/productforhome/Slide";
import Slidee from "./components/My_product/Slidee";
import Cart from "./components/My_product/Cart";
import { UserContext } from "./UserContext";
// import context from "react-bootstrap/esm/AccordionContext";

function App(props) {
  let params1 = useLocation();

  // const [y, sety] = useState("");
  function Qtycart(data) {
    localStorage.setItem("cartqty", JSON.stringify(data));
    console.log(data);
  }
  function Qtywish(data1) {
    console.log(data1);
    localStorage.setItem("wishqty", JSON.stringify(data1));
  }

  // viet ham truyen xuong HOME -> DE LAY TONG QTY LEN => context, HEADER VO CONTENXT
  return (
    <UserContext.Provider
      value={{
        Qtycart: Qtycart,
        Qtywish: Qtywish,
      }}
    >
      <Header />
      {params1["pathname"].includes("home") ? <Slide /> : <Slidee />}
      {params1["pathname"].includes("cart") ? (
        <Cart />
      ) : (
        <section>
          <div className="container">
            <div className="row">
              {params1["pathname"].includes("account") ? (
                <MenuAcc />
              ) : (
                <Menuleft />
              )}
              {props.children}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </UserContext.Provider>
  );
}

export default App;
