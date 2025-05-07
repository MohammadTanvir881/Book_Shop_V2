/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from 'react';
import { FiBook, FiArrowRight } from 'react-icons/fi';
import AOS from 'aos';
import 'aos/dist/aos.css';

type Article = {
  id: number;
  title: string;
  description: string;
  cover_image: string;
  url: string;
  readable_publish_date: string;
  user: {
    name: string;
  };
  tag_list: string[];
};

export default function BlogSection() {
  const [featuredArticles, setFeaturedArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: true,
    });
  }, []);

  useEffect(() => {
    const fetchFeaturedArticles = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('https://dev.to/api/articles?per_page=4&tag=books');
        const data = await response.json();

        const formattedArticles = data.map((article: any) => ({
          id: article.id,
          title: article.title,
          description: article.description,
          cover_image: article.cover_image || '/default-book-cover.jpg',
          url: `/blogs/${article.id}`,
          readable_publish_date: article.readable_publish_date,
          user: { name: article.user.name },
          tag_list: article.tag_list.slice(0, 2),
        }));

        setFeaturedArticles(formattedArticles);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching articles:', error);
        setIsLoading(false);
      }
    };

    fetchFeaturedArticles();
  }, []);

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4" data-aos="fade-up">
            Latest From Our Blog
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto" data-aos="fade-up" data-aos-delay="100">
            Discover book reviews, author interviews, and reading recommendations
          </p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[...Array(4)].map((_, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <div className="h-48 bg-gray-200"></div>
                <div className="p-6">
                  <div className="h-6 bg-gray-200 rounded mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredArticles.map((article, index) => (
              <article
                key={article.id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={article.cover_image}
                    alt={article.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-gray-900 to-transparent p-4">
                    <div className="flex flex-wrap gap-2">
                      {article.tag_list.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 bg-gray-800 bg-opacity-60 text-white text-xs rounded-full backdrop-blur-sm"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2">
                    {article.title}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {article.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">
                      {article.readable_publish_date}
                    </span>
                    
                    <a
                      href={article.url}
                      className="inline-flex items-center text-gray-800 hover:text-gray-900 font-medium group"
                    >
                      Read more
                      <FiArrowRight className="ml-1 transition-transform group-hover:translate-x-1" />
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        <div className="text-center mt-12" data-aos="fade-up">
            
          <a
            href="/blogs"
            className="inline-flex items-center px-6 py-3 border border-gray-800 text-gray-800 rounded-lg hover:bg-gray-800 hover:text-white transition-colors duration-300"
          >
            View All Articles
            <FiArrowRight className="ml-2" />
          </a>
        </div>
      </div>
    </section>
  );
}