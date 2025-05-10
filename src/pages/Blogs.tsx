/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from 'react';
import {
  FiSearch,
  FiCalendar,
  FiUser,
  FiBook,
  FiArrowRight,
  FiChevronDown,
} from 'react-icons/fi';
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

export default function BookBlogPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [filteredArticles, setFilteredArticles] = useState<Article[]>([]);
  const [displayedArticles, setDisplayedArticles] = useState<Article[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);

  const categories = [
    { id: 'all', name: 'All Articles', tag: 'books' },
    { id: 'reviews', name: 'Book Reviews', tag: 'bookreview' },
    {
      id: 'recommendations',
      name: 'Recommendations',
      tag: 'bookrecommendations',
    },
    { id: 'authors', name: 'Author Spotlights', tag: 'authors' },
    { id: 'industry', name: 'Publishing News', tag: 'publishing' },
  ];

  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: true,
      mirror: false,
    });
  }, []);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setIsLoading(true);
        const activeTag =
          categories.find((cat) => cat.id === activeCategory)?.tag || 'books';
        const url = `https://dev.to/api/articles?per_page=30&tag=${activeTag}`;

        const response = await fetch(url);
        const data = await response.json();

        const formattedArticles = data.map((article: any) => ({
          id: article.id,
          title: article.title,
          description: article.description,
          cover_image:
            article.cover_image ||
            'https://images.unsplash.com/photo-1544947950-fa07a98d237f',
          url: article.url,
          readable_publish_date: article.readable_publish_date,
          user: { name: article.user.name },
          tag_list: article.tag_list,
        }));

        setArticles(formattedArticles);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching articles:', error);
        setIsLoading(false);
      }
    };

    fetchArticles();
  }, [activeCategory]);

  useEffect(() => {
    let results = articles;

    if (searchTerm) {
      results = results.filter(
        (article) =>
          article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          article.description
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          article.tag_list.some((tag) =>
            tag.toLowerCase().includes(searchTerm.toLowerCase()),
          ),
      );
    }

    setFilteredArticles(results);
    setDisplayedArticles(showAll ? results : results.slice(0, 8));
  }, [searchTerm, articles, showAll]);

  const toggleShowAll = () => setShowAll(!showAll);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-green-500 text-white py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-green-600 to-green-500 opacity-90"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div 
            className="max-w-3xl mx-auto text-center"
            data-aos="fade-up"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Discover Literary Treasures
            </h1>
            <p className="text-xl md:text-2xl font-light">
              Your curated collection of book reviews, author insights, and publishing news
            </p>
          </div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-6 max-w-6xl">
          <div 
            className="flex flex-col md:flex-row gap-6 items-center justify-between mb-8"
            data-aos="fade-up"
          >
            <div className="relative w-full md:w-96">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search book articles..."
                className="pl-10 pr-4 py-3 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex flex-wrap gap-2 justify-center">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => {
                    setActiveCategory(category.id);
                    setShowAll(false);
                    setSearchTerm('');
                  }}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${activeCategory === category.id ? 'bg-green-500 text-white shadow-md' : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'}`}
                  data-aos="zoom-in"
                  data-aos-delay={categories.indexOf(category) * 100}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-12">
        <div className="container mx-auto px-6 max-w-7xl">
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, index) => (
                <div
                  key={index}
                  className="bg-gray-50 rounded-2xl overflow-hidden animate-pulse"
                  data-aos="fade-up"
                  data-aos-delay={index * 100}
                >
                  <div className="h-48 bg-gray-200"></div>
                  <div className="p-6">
                    <div className="h-6 bg-gray-200 rounded mb-4 w-3/4"></div>
                    <div className="h-4 bg-gray-200 rounded mb-2 w-full"></div>
                    <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                    <div className="flex justify-between mt-6">
                      <div className="h-4 bg-gray-200 rounded w-24"></div>
                      <div className="h-4 bg-gray-200 rounded w-24"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : filteredArticles.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {displayedArticles.map((article, index) => (
                  <article
                    key={article.id}
                    className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100"
                    data-aos="fade-up"
                    data-aos-delay={(index % 3) * 100}
                  >
                    <div className="relative h-56 overflow-hidden">
                      <img
                        src={article.cover_image}
                        alt={article.title}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                      />
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                        <div className="flex flex-wrap gap-2">
                          {article.tag_list.slice(0, 2).map((tag) => (
                            <span
                              key={tag}
                              className="px-3 py-1 bg-green-500 text-white text-xs font-medium rounded-full"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2">
                        {article.title}
                      </h3>
                      <p className="text-gray-600 mb-4 line-clamp-3">
                        {article.description.replace(/<[^>]*>?/gm, '')}
                      </p>
                      <div className="flex items-center justify-between text-sm text-gray-500 border-t pt-4">
                        <div className="flex items-center">
                          <FiUser className="mr-2 text-green-500" />
                          <span>{article.user.name}</span>
                        </div>
                        <div className="flex items-center">
                          <FiCalendar className="mr-2 text-green-500" />
                          <span>{article.readable_publish_date}</span>
                        </div>
                      </div>
                      <a
                        href={article.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-4 inline-flex items-center text-green-600 hover:text-green-800 font-medium group"
                      >
                        Read article
                        <FiArrowRight className="ml-2 transition-transform group-hover:translate-x-1" />
                      </a>
                    </div>
                  </article>
                ))}
              </div>
              {filteredArticles.length > 8 && (
                <div className="text-center mt-12" data-aos="fade-up">
                  <button
                    onClick={toggleShowAll}
                    className="inline-flex items-center px-6 py-3 bg-white text-green-600 border border-green-600 rounded-lg hover:bg-green-50 transition-colors font-medium"
                  >
                    {showAll ? 'Show Less Articles' : 'Load More Articles'}
                    <FiChevronDown
                      className={`ml-2 transition-transform ${showAll ? 'rotate-180' : ''}`}
                    />
                  </button>
                </div>
              )}
            </>
          ) : (
            <div 
              className="text-center py-16 bg-gray-50 rounded-xl"
              data-aos="fade-in"
            >
              <FiBook className="mx-auto text-5xl text-green-500 mb-4" />
              <h3 className="text-2xl font-semibold text-gray-800 mb-3">
                No articles found
              </h3>
              <p className="text-gray-600 max-w-md mx-auto">
                Try adjusting your search query or select a different category
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-16 bg-green-50">
        <div
          className="container mx-auto px-6 max-w-4xl text-center"
          data-aos="zoom-in"
        >
          <div className="bg-white p-8 md:p-10 rounded-xl shadow-sm">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3">
              Never Miss a Book Update
            </h2>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Subscribe to our monthly newsletter for the latest in literary news and curated reading lists
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-grow px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500"
              />
              <button className="bg-green-500 hover:bg-green-600 text-white font-medium px-6 py-3 rounded-lg transition-colors shadow-md hover:shadow-lg">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}