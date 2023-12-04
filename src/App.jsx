import "./App.css";
import { Route, Routes } from "react-router-dom";
import Signin from "./pages/signin";
import Dashboard from "./pages/dashboard";
import Layout from "./components/layout";
import Product from "./pages/product";
import Sales from "./pages/sales";
import Customer from "./pages/customer";
import Invoice from "./pages/invoices";
import Signup from "./pages/signup";
import User from "./pages/user";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Signin />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route
          path="/dashboard"
          element={
            <Layout>
              <Dashboard />
            </Layout>
          }
        ></Route>
        <Route
          path="/product"
          element={
            <Layout>
              <Product />
            </Layout>
          }
        ></Route>
        <Route
          path="/sales"
          element={
            <Layout>
              <Sales />
            </Layout>
          }
        ></Route>
        <Route
          path="/customer"
          element={
            <Layout>
              <Customer />
            </Layout>
          }
        ></Route>
        <Route
          path="/invoice"
          element={
            <Layout>
              <Invoice />
            </Layout>
          }
        ></Route>
        <Route
          path="/user"
          element={
            <Layout>
              <User />
            </Layout>
          }
        ></Route>
        {/* <Route path="/dashboard" element={<Layout />}></Route> */}
      </Routes>
    </>
  );
}

export default App;
