import { useState } from "react";

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
    <footer className="bg-[#1E4D3B] text-white py-16">
      <div className="container px-6 mx-auto">
        <div className="flex flex-col items-center justify-between pb-12 mb-12 border-b md:flex-row border-white/10">
          <div className="max-w-md mb-8 text-center md:text-left md:mb-0">
            <p className="font-serif text-2xl">
              Tham gia Verdant Glow Circle để nhận ưu đãi độc quyền.
            </p>
          </div>
          <div className="flex w-full max-w-md p-1 bg-white rounded-full md:w-auto">
            <input
              type="email"
              placeholder="Email của bạn"
              className="flex-grow px-6 py-3 text-gray-800 border-none rounded-l-full outline-none focus:ring-0"
            />
            <button className="bg-[#1E4D3B] px-8 py-3 rounded-full font-bold uppercase text-xs tracking-widest hover:bg-[#15382B] transition-colors">
              Đăng ký
            </button>
          </div>
        </div>
        <div className="text-center text-xs text-gray-400 uppercase tracking-[0.2em]">
          © 2026 Verdant Glow. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
