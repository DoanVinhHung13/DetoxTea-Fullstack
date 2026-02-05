"use client";

import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import haGiangImg from "../../assets/images/home/doi-che-co-thu-ha-giang.jpg";
import phaTraImg from "../../assets/images/home/nghe-thuat-pha-tra.jpg";
import matchaImg from "../../assets/images/home/matcha-cao-cap.jpeg";

const newsArticles = [
  {
    id: 1,
    category: "Khám phá",
    title: "Hành Trình Khám Phá Những Đồi Chè Cổ Thụ Tại Hà Giang",
    excerpt:
      "Khám phá vẻ đẹp hùng vĩ và hương vị đặc trưng của những búp chè Shan Tuyết hàng trăm năm tuổi giữa mây ngàn Đông Bắc.",
    image: haGiangImg,
    slug: "kham-pha-doi-che-co-thu-ha-giang",
  },
  {
    id: 2,
    category: "Văn hóa",
    title: "Nghệ Thuật Pha Trà: Khơi Nguồn Tinh Hoa Từ Tâm Thức",
    excerpt:
      "Học cách kiểm soát nhiệt độ và thời gian để đánh thức mọi giác quan, mang lại sự bình yên trong từng ngụm trà đậm đà.",
    image: phaTraImg,
    slug: "nghe-thuat-pha-tra-tinh-hoa",
  },
  {
    id: 3,
    category: "Đời sống",
    title: "Matcha Cao Cấp: Xu Hướng Thưởng Thức Trà Hiện Đại",
    excerpt:
      "Sự kết hợp hoàn hảo giữa truyền thống Nhật Bản và phong cách sống mới, mang lại nguồn năng lượng sạch cho tâm trí.",
    image: matchaImg,
    slug: "matcha-cao-cap-xu-huong-hien-dai",
  },
];

export default function NewsSection() {
  return (
    <section className="relative py-20 overflow-hidden bg-cream">
      {/* <div className="px-6 mx-auto mb-16 text-center max-w-7xl lg:px-8">
        <p className="mb-3 text-sm font-medium tracking-widest uppercase text-amber-700">
          Số báo 042 — 2024
        </p>
        <h2 className="font-serif text-4xl font-bold tracking-tight text-gray-900 md:text-5xl">
          Khám phá
        </h2>
      </div> */}

      {/* Full-width grid without gaps */}
      <div className="grid grid-cols-1 md:grid-cols-3">
        {newsArticles.map((article) => (
          <Link
            key={article.id}
            to={`/news/${article.slug}`}
            className="relative block overflow-hidden group aspect-[3/4]"
          >
            {/* Background Image */}
            <div className="absolute inset-0">
              <img
                src={article.image || "/placeholder.svg"}
                alt={article.title}
                className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
              />
              {/* Dark overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20"></div>
            </div>

            {/* Content overlay */}
            <div className="relative flex flex-col justify-end h-full p-8 text-white">
              {/* Category badge */}
              <div className="mb-4">
                <span className="inline-block px-3 py-1 text-xs font-semibold tracking-wide uppercase bg-green-600 rounded-full">
                  {article.category}
                </span>
              </div>

              {/* Title */}
              <h3 className="mb-4 font-serif text-2xl font-bold leading-tight transition-transform duration-300 lg:text-3xl group-hover:translate-x-1">
                {article.title}
              </h3>

              {/* Excerpt */}
              <p className="mb-6 text-sm leading-relaxed text-white/90 line-clamp-2">
                {article.excerpt}
              </p>

              {/* CTA */}
              <div className="flex items-center transition-transform duration-300 group-hover:translate-x-2">
                <span className="text-sm font-semibold tracking-wide uppercase">
                  Xem chi tiết
                </span>
                <ChevronRight className="w-5 h-5 ml-2" />
              </div>
            </div>

            {/* Hover effect overlay */}
            <div className="absolute inset-0 transition-opacity duration-300 opacity-0 bg-gradient-to-t from-green-900/20 to-transparent group-hover:opacity-100"></div>
          </Link>
        ))}
      </div>
    </section>
  );
}
