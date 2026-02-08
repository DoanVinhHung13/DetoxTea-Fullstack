import { Button } from "@mui/material";
import { ShoppingCart, Sparkles } from "lucide-react";
import { useState } from "react";

const QUIZ_DATA = {
  label: "TÌM KIẾM HƯƠNG VỊ HOÀN HẢO",
  question: "Hôm nay bạn cần gì?",
  subtitle: "Chọn cảm giác bạn muốn tìm, Yên gợi ý loại trà phù hợp.",
  answers: [
    {
      id: "energetic",
      icon: "⚡",
      title: "Cần sự tỉnh táo",
      description: "Cần năng lượng để bắt đầu một ngày dài mới hoặc tỉnh táo",
      product: {
        id: 1,
        name: "Trà Matcha Nhật Bản",
        image: "/green-tea-matcha-powder.jpg",
        price: "350.000đ",
        description:
          "Được thu hoạch thủ công tại vùng núi cao, mang đến hương vị thanh tao, tinh tế. Trà vị ngọt tác, giúp thư thân sống khỏe suốt cả ngày.",
        badge: "GIỚI Ý HOÀN HẢO",
      },
    },
    {
      id: "relaxed",
      title: "Muốn được thư giãn",
      icon: "🌼",
      description: "Trà thảo mộc giúp thư giãn tinh thần sau ngày dài mệt mỏi",
      product: {
        id: 2,
        name: "Trà Oolong Đặc Biệt Tứ Quý",
        image: "/oolong-tea-leaves.jpg",
        price: "350.000đ",
        description:
          "Được thu hoạch thủ công tại vùng núi cao, mang đến hương vị thanh tao, tinh tế. Trà vị ngọt tác, giúp thư thân sống khỏe suốt cả ngày.",
        badge: "GIỚI Ý HOÀN HẢO",
      },
    },
    {
      id: "balanced",
      icon: "✨",
      title: "Tìm hương vị mới",
      description:
        "Khám phá những loại trà độc đáo với hương vị đặc biệt thơm ngon mới lạ",
      product: {
        id: 3,
        name: "Trà Hoa Cúc Hữu Cơ",
        image: "/chamomile-flowers-herbal-tea.jpg",
        price: "350.000đ",
        description:
          "Được thu hoạch thủ công tại vùng núi cao, mang đến hương vị thanh tao, tinh tế. Trà vị ngọt tác, giúp thư thân sống khỏe suốt cả ngày.",
        badge: "GIỚI Ý HOÀN HẢO",
      },
    },
  ],
};

export default function TeaQuiz() {
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  const handleAnswerSelect = (answerId) => {
    setSelectedAnswer(answerId);
  };

  const selectedProduct = selectedAnswer
    ? QUIZ_DATA.answers.find((a) => a.id === selectedAnswer)?.product
    : null;

  const handleReset = () => {
    setSelectedAnswer(null);
  };

  return (
    <section className="max-w-6xl px-4 py-16 mx-auto md:pb-20 bg-cream">
      <div className="max-w-5xl mx-auto">
        {/* Quiz Question Section */}
        <div
          className={`text-center mb-12 transition-all duration-500 ${selectedAnswer ? "opacity-0 h-0 overflow-hidden" : "opacity-100"}`}
        >
          <p className="text-xs font-semibold text-green-600 uppercase tracking-[0.2em] mb-3">
            {QUIZ_DATA.label}
          </p>
          <h2 className="mb-4 font-serif text-3xl font-bold text-gray-900 md:text-5xl">
            {QUIZ_DATA.question}
          </h2>
          <p className="max-w-2xl mx-auto text-sm text-gray-600">
            {QUIZ_DATA.subtitle}
          </p>
        </div>

        {/* Answer Cards Grid */}
        <div
          className={`grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 transition-all duration-500 ${selectedAnswer ? "opacity-0 h-0 overflow-hidden" : "opacity-100"}`}
        >
          {QUIZ_DATA.answers.map((answer) => (
            <button
              key={answer.id}
              onClick={() => handleAnswerSelect(answer.id)}
              className="relative overflow-hidden transition-all duration-300 shadow-md bg-cream group rounded-2xl hover:shadow-xl hover:-translate-y-2"
            >
              {/* Content */}
              <div className="p-6 text-left">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl">{answer.icon}</span>
                  <h3 className="text-lg font-bold text-gray-900">
                    {answer.title}
                  </h3>
                </div>
                <p className="text-sm leading-relaxed text-gray-600">
                  {answer.description}
                </p>
              </div>
            </button>
          ))}
        </div>

        {/* Result Section */}
        {selectedAnswer && selectedProduct && (
          <div className="animate-fadeIn">
            {/* Result Header */}
            <div className="mb-8 text-center">
              <div className="inline-block px-4 py-2 mb-4 bg-green-100 rounded-full">
                <p className="text-xs font-semibold tracking-wide text-green-700 uppercase">
                  Món quà tuyệt vời dành cho bạn:
                </p>
              </div>
            </div>

            {/* Product Card */}
            <div className="grid grid-cols-1 gap-8 overflow-hidden bg-white border border-gray-100 shadow-xl md:grid-cols-2 rounded-2xl">
              {/* Left - Product Info */}
              <div className="flex flex-col justify-center p-8 md:p-12">
                <div className="inline-block px-3 py-1 mb-4 bg-green-100 rounded-full w-fit">
                  <p className="flex items-center gap-1 text-xs font-semibold tracking-wide text-green-700 uppercase">
                    <Sparkles className="w-3 h-3" />
                    {selectedProduct.badge}
                  </p>
                </div>

                <h3 className="mb-4 font-serif text-3xl font-bold leading-tight text-gray-900 md:text-4xl">
                  {selectedProduct.name}
                </h3>

                <p className="mb-6 text-sm leading-relaxed text-gray-600">
                  {selectedProduct.description}
                </p>

                <div className="mb-8 text-3xl font-bold text-green-600">
                  {selectedProduct.price}
                </div>

                <div className="flex flex-col gap-4 sm:flex-row">
                  <Button
                    size="lg"
                    className="flex items-center justify-center gap-2 px-8 py-6 font-semibold text-white bg-green-600 rounded-full shadow-lg hover:bg-green-700"
                  >
                    <ShoppingCart className="w-5 h-5" />
                    Thêm vào giỏ hàng
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={handleReset}
                    className="px-8 py-6 font-medium text-gray-700 border-2 border-gray-300 rounded-full hover:bg-gray-50"
                  >
                    Xem chi tiết
                  </Button>
                </div>
              </div>

              {/* Right - Product Image */}
              <div className="relative h-80 md:h-full bg-gradient-to-br from-gray-900 to-gray-800">
                <img
                  src={selectedProduct.image || "/placeholder.svg"}
                  alt={selectedProduct.name}
                  className="object-cover w-full h-full"
                />
              </div>
            </div>

            {/* Reset Button */}
            <div className="mt-8 text-center">
              <button
                onClick={handleReset}
                className="text-sm text-gray-600 underline hover:text-gray-900 underline-offset-4"
              >
                ← Quay lại chọn lại
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
