import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  createBooking,
  createPaymentIntent,
  confirmPayment,
} from "./services/api.js";

// --- Layout and Navigation ---
const Nav = () => (
  <nav className="bg-[#0077B6] text-white p-4 flex justify-between items-center shadow-md">
    <h1 className="font-playfair text-2xl">LeisureHub</h1>
    <div className="space-x-4">
      <Link to="/" className="hover:underline">Home</Link>
      <Link to="/adventure" className="hover:underline">Adventure</Link>
      <Link to="/dog-walking" className="hover:underline">Dog Walking</Link>
      <Link to="/street-food" className="hover:underline">Street Food</Link>
      <Link to="/fitness" className="hover:underline">Fitness</Link>
      <Link to="/odd-jobs" className="hover:underline">Odd Jobs</Link>
      <Link to="/shop" className="hover:underline">Shop</Link>
    </div>
  </nav>
);

// --- Home ---
const Home = () => (
  <section className="text-center p-8">
    <motion.h2
      className="text-4xl font-playfair mb-4 text-[#0077B6]"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      Discover Your Next Coastal Adventure
    </motion.h2>
    <p className="max-w-2xl mx-auto text-lg text-slate-700">
      From adventure travel to dog walking and local street food, LeisureHub brings your city’s best experiences together.
    </p>
  </section>
);

// --- Adventure Travel ---
const AdventureTravel = () => (
  <section className="p-8 text-center">
    <h2 className="text-3xl font-playfair text-[#0077B6] mb-4">
      Coastal Adventures
    </h2>
    <p className="text-slate-700">
      Explore beaches, cliffs, and sea kayaking tours for all levels.
    </p>
  </section>
);

// --- Dog Walking ---
const DogWalking = () => (
  <section className="p-8 text-center">
    <h2 className="text-3xl font-playfair text-[#0077B6] mb-4">
      Dog Walking Services
    </h2>
    <p className="text-slate-700">
      Certified walkers ready to take your pup on safe and fun coastal walks.
    </p>
  </section>
);

// --- Street Food ---
const StreetFood = () => (
  <section className="p-8 text-center">
    <h2 className="text-3xl font-playfair text-[#0077B6] mb-4">
      Street Food Delights
    </h2>
    <p className="text-slate-700">
      Taste your way through food trucks and pop-ups by the shore.
    </p>
  </section>
);

// --- Fitness ---
const Fitness = () => (
  <section className="p-8 text-center">
    <h2 className="text-3xl font-playfair text-[#0077B6] mb-4">
      Personal Fitness
    </h2>
    <p className="text-slate-700">
      Train with coastal personal trainers and enjoy yoga, bootcamps, and surf fitness.
    </p>
  </section>
);

// --- Odd Jobs ---
const OddJobs = () => (
  <section className="p-8 text-center">
    <h2 className="text-3xl font-playfair text-[#0077B6] mb-4">
      Odd Jobs & Local Help
    </h2>
    <p className="text-slate-700">
      Find trusted locals to help with repairs, painting, or errands.
    </p>
  </section>
);

// --- Shop ---
const Shop = () => {
  const [cart, setCart] = useState([]);
  const [status, setStatus] = useState("");

  const products = [
    { id: 1, name: "Surfboard Rental", price: 25 },
    { id: 2, name: "Dog Walking Pass", price: 15 },
    { id: 3, name: "Street Food Voucher", price: 10 },
  ];

  const addToCart = (item) => setCart((prev) => [...prev, item]);

  const handleCheckout = async () => {
    setStatus("Processing booking...");
    const booking = await createBooking({ cart });
    setStatus("Creating payment intent...");
    const paymentIntent = await createPaymentIntent({
      amount: cart.reduce((sum, i) => sum + i.price, 0),
    });
    await confirmPayment({ clientSecret: paymentIntent.clientSecret });
    setStatus(`✅ Booking ${booking.bookingId} complete!`);
    setCart([]);
  };

  return (
    <section className="p-8 text-center">
      <h2 className="text-3xl font-playfair text-[#0077B6] mb-4">Shop</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {products.map((p) => (
          <motion.div
            key={p.id}
            className="border p-4 rounded-xl shadow hover:shadow-lg transition"
            whileHover={{ scale: 1.05 }}
          >
            <h3 className="text-xl font-semibold">{p.name}</h3>
            <p className="text-slate-700 mb-2">${p.price}</p>
            <button
              onClick={() => addToCart(p)}
              className="bg-[#0077B6] text-white px-4 py-2 rounded-xl"
            >
              Add to Cart
            </button>
          </motion.div>
        ))}
      </div>

      <div className="mt-8 border-t pt-4">
        <h3 className="text-2xl font-playfair mb-2">Cart</h3>
        {cart.length === 0 ? (
          <p>No items in cart.</p>
        ) : (
          <>
            <ul className="mb-4">
              {cart.map((item, i) => (
                <li key={i} className="text-slate-700">
                  {item.name} - ${item.price}
                </li>
              ))}
            </ul>
            <button
              onClick={handleCheckout}
              className="bg-green-600 text-white px-4 py-2 rounded-xl"
            >
              Checkout
            </button>
          </>
        )}
        {status && <p className="mt-4 text-slate-600">{status}</p>}
      </div>
    </section>
  );
};

// --- Main App ---
export default function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Nav />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/adventure" element={<AdventureTravel />} />
            <Route path="/dog-walking" element={<DogWalking />} />
            <Route path="/street-food" element={<StreetFood />} />
            <Route path="/fitness" element={<Fitness />} />
            <Route path="/odd-jobs" element={<OddJobs />} />
            <Route path="/shop" element={<Shop />} />
          </Routes>
        </main>
        <footer className="bg-slate-800 text-white text-center p-4 text-sm">
          © {new Date().getFullYear()} LeisureHub — All Rights Reserved
        </footer>
      </div>
    </Router>
  );
}
