import { motion } from "framer-motion";
import { useState } from "react";
import { FaFacebook, FaGithub, FaLinkedin, FaYoutube } from "react-icons/fa";
import { paymentCard } from "../../../assets/images";
import Image from "../../designLayouts/Image";

const Footer = () => {
  const [emailInfo, setEmailInfo] = useState("");
  const [subscription, setSubscription] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  const emailValidation = () => {
    return String(emailInfo)
      .toLocaleLowerCase()
      .match(/^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/);
  };

  const handleSubscription = () => {
    if (emailInfo === "") {
      setErrMsg("Please provide an Email !");
    } else if (!emailValidation(emailInfo)) {
      setErrMsg("Please give a valid Email!");
    } else {
      setSubscription(true);
      setErrMsg("");
      setEmailInfo("");
    }
  };

  return (
    <footer className="bg-[#3C3C3C] text-white py-12 md:py-16">
      <div className="px-4 mx-auto max-w-7xl md:px-8">
        <div className="grid grid-cols-1 gap-12 mb-12 md:grid-cols-2">
          {/* Left Side - Brand & Newsletter */}
          <div className="space-y-6">
            <div>
              <h3 className="mb-1 text-2xl font-bold md:text-3xl">
                More About
              </h3>
              <h3 className="text-2xl font-bold md:text-3xl">eBay</h3>
            </div>
            <p className="text-sm leading-relaxed text-white/70">
              Get newsletter update for upcoming product and best discount for
              all items.
            </p>

            {/* Newsletter Subscription */}
            {subscription ? (
              <motion.p
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="text-base font-semibold text-green-400"
              >
                Subscribed Successfully!
              </motion.p>
            ) : (
              <div className="space-y-3">
                <div className="inline-flex flex-col w-full gap-4 sm:flex-row">
                  <input
                    onChange={(e) => setEmailInfo(e.target.value)}
                    value={emailInfo}
                    type="email"
                    placeholder="Your email"
                    className="flex-1 px-4 py-2.5 bg-transparent border border-white/30 rounded-lg text-sm placeholder:text-white/50 focus:outline-none focus:border-white/50 transition-colors"
                  />
                  <button
                    onClick={handleSubscription}
                    className="px-6 py-2.5 bg-[#E8EFD8] text-[#3C3C3C] rounded-lg text-sm font-medium hover:bg-[#D8DFCA] transition-colors whitespace-nowrap"
                  >
                    Subscribe
                  </button>
                </div>
                {errMsg && (
                  <p className="text-sm font-semibold text-red-400 animate-bounce">
                    {errMsg}
                  </p>
                )}
              </div>
            )}

            {/* Social Media Icons */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://www.youtube.com/@reactjsBD"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center w-9 h-9 text-lg transition-all duration-300 rounded-full bg-white/10 hover:bg-[#E8EFD8] hover:text-[#3C3C3C]"
              >
                <FaYoutube />
              </a>
              <a
                href="https://github.com/noorjsdivs"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center w-9 h-9 text-lg transition-all duration-300 rounded-full bg-white/10 hover:bg-[#E8EFD8] hover:text-[#3C3C3C]"
              >
                <FaGithub />
              </a>
              <a
                href="https://www.facebook.com/Noorlalu143/"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center w-9 h-9 text-lg transition-all duration-300 rounded-full bg-white/10 hover:bg-[#E8EFD8] hover:text-[#3C3C3C]"
              >
                <FaFacebook />
              </a>
              <a
                href="https://www.linkedin.com/in/noor-mohammad-ab2245193/"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center w-9 h-9 text-lg transition-all duration-300 rounded-full bg-white/10 hover:bg-[#E8EFD8] hover:text-[#3C3C3C]"
              >
                <FaLinkedin />
              </a>
            </div>
          </div>

          {/* Right Side - 3 Columns */}
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
            {/* Shop Column */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold">Shop</h4>
              <ul className="space-y-3 text-sm text-white/70">
                <li>
                  <a href="#" className="transition-colors hover:text-white">
                    Accessories
                  </a>
                </li>
                <li>
                  <a href="#" className="transition-colors hover:text-white">
                    Clothes
                  </a>
                </li>
                <li>
                  <a href="#" className="transition-colors hover:text-white">
                    Electronics
                  </a>
                </li>
                <li>
                  <a href="#" className="transition-colors hover:text-white">
                    Home Appliances
                  </a>
                </li>
                <li>
                  <a href="#" className="transition-colors hover:text-white">
                    New Arrivals
                  </a>
                </li>
              </ul>
            </div>

            {/* Your Account Column */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold">Your Account</h4>
              <ul className="space-y-3 text-sm text-white/70">
                <li>
                  <a href="#" className="transition-colors hover:text-white">
                    Profile
                  </a>
                </li>
                <li>
                  <a href="#" className="transition-colors hover:text-white">
                    Orders
                  </a>
                </li>
                <li>
                  <a href="#" className="transition-colors hover:text-white">
                    Addresses
                  </a>
                </li>
                <li>
                  <a href="#" className="transition-colors hover:text-white">
                    Account Details
                  </a>
                </li>
                <li>
                  <a href="#" className="transition-colors hover:text-white">
                    Payment Options
                  </a>
                </li>
              </ul>
            </div>

            {/* Help & Contact Column */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold">Help & Contact</h4>
              <ul className="space-y-3 text-sm text-white/70">
                <li>
                  <a href="#" className="transition-colors hover:text-white">
                    Customer Service
                  </a>
                </li>
                <li>
                  <a href="#" className="transition-colors hover:text-white">
                    Shipping Info
                  </a>
                </li>
                <li>
                  <a href="#" className="transition-colors hover:text-white">
                    Returns
                  </a>
                </li>
                <li>
                  <a href="#" className="transition-colors hover:text-white">
                    FAQ
                  </a>
                </li>
                <li>
                  <a href="#" className="transition-colors hover:text-white">
                    Contact Us
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="flex justify-center mb-8">
          <Image
            className="w-[80%] sm:w-[60%] md:w-[40%] lg:w-[30%] opacity-80"
            imgSrc={paymentCard}
          />
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col items-center justify-between gap-4 pt-8 text-sm border-t border-white/20 md:flex-row text-white/60">
          <p>© 2025 eBay. All rights reserved</p>
          <div className="flex gap-6">
            <a href="#" className="transition-colors hover:text-white">
              Terms & Conditions
            </a>
            <a href="#" className="transition-colors hover:text-white">
              Privacy Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
