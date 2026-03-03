import { useParams } from "react-router-dom";
import { newsArticles } from "../../data/newsData";

export default function News() {
  const { slug } = useParams();

  // Tìm bài viết có slug khớp với URL
  const article = newsArticles.find((item) => item.slug === slug);

  if (!article) {
    return <div className="py-20 text-center">Bài viết không tồn tại!</div>;
  }

  return (
    <main className="min-h-screen pb-20">
      {/* Banner bài viết */}
      <div className="relative h-[50vh] w-full">
        <img
          src={article.image}
          className="object-cover w-full h-full"
          alt={article.title}
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black/40">
          <h1 className="px-4 font-serif text-4xl font-bold text-center text-white md:text-6xl">
            {article.title}
          </h1>
        </div>
      </div>

      {/* Nội dung chi tiết */}
      <div className="max-w-5xl px-6 mx-auto mt-12">
        <div className="flex items-center gap-4 mb-8">
          <span className="px-3 py-1 text-sm text-white bg-green-700">
            {article.category}
          </span>
        </div>

        {/* <p className="mb-6 text-xl font-medium leading-relaxed text-gray-800">
          {article.excerpt}
        </p> */}

        <div
          className="leading-8 prose text-gray-700"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />
      </div>
    </main>
  );
}
