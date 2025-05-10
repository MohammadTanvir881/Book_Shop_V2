import { useGetProductsQuery } from '@/redux/features/auth/authApi';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';

type Category = {
  name: string;
  image: string;
  count: number;
};

const CategorySection = () => {
  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: 'ease-out-quad',
      once: true
    });
  }, []);

  const { data: allProductsData } = useGetProductsQuery({});
  const allProducts = allProductsData?.result || [];

  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const requiredCategories = [
      'Fiction',
      'Science',
      'SelfDevelopment',
      'Poetry',
      'Religious',
    ];

    const categoryMap = new Map<string, Category>();

    requiredCategories.forEach((cat) => {
      categoryMap.set(cat, {
        name: cat,
        image: '',
        count: 0,
      });
    });

    allProducts.forEach((product: any) => {
      if (requiredCategories.includes(product.category)) {
        const existing = categoryMap.get(product.category);
        if (existing) {
          categoryMap.set(product.category, {
            ...existing,
            count: existing.count + 1,
            image: existing.image || product.image,
          });
        }
      }
    });

    const sortedCategories = Array.from(categoryMap.values()).sort((a, b) =>
      a.name.localeCompare(b.name),
    );

    setCategories(sortedCategories);
  }, [allProducts]);

  const categoryImages: Record<string, string> = {
    Fiction: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    Science: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    SelfDevelopment: 'https://img.freepik.com/free-photo/improvement-summary-personal-development-workflow_53876-125155.jpg',
    Poetry: 'https://images.unsplash.com/photo-1425421669292-0c3da3b8f529?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    Religious: 'https://images.unsplash.com/photo-1534536281715-e28d76689b4d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
  };

  return (
    <section className="py-16 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16" data-aos="fade-up">
          <span className="inline-block px-4 py-1 text-sm font-medium text-green-600 bg-green-100 rounded-full dark:bg-green-900 dark:text-green-200 mb-4">
            Book Categories
          </span>
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Explore Our Collection
          </h2>
          <div className="w-16 h-1 bg-green-500 mx-auto mb-6"></div>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Discover books that match your interests across our diverse categories
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
          {categories.map((category, index) => (
            <div
              key={category.name}
              className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <Link
                to={{
                  pathname: '/allbooks',
                  search: `?category=${encodeURIComponent(category.name)}`,
                }}
                className="block h-full"
              >
                <div className="aspect-square bg-gray-100 dark:bg-gray-700 overflow-hidden">
                  <img
                    src={category.image || categoryImages[category.name]}
                    alt={category.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex flex-col justify-end p-5">
                  <h3 className="text-white font-bold text-lg sm:text-xl">
                    {category.name}
                  </h3>
                  <p className="text-green-300 text-sm font-medium">
                    {category.count} {category.count === 1 ? 'book' : 'books'}
                  </p>
                </div>
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-green-400/30 transition-all duration-300 rounded-xl pointer-events-none" />
              </Link>
            </div>
          ))}
        </div>

        <div className="text-center mt-10 mb-6" data-aos="fade-up" data-aos-delay="300">
          <Link
            to="/allbooks"
            className="inline-flex items-center px-6 py-3 border-2 border-green-600 text-green-600 dark:border-green-400 dark:text-green-400 font-medium rounded-lg hover:bg-green-600 hover:text-white dark:hover:bg-green-700 transition-all duration-300 hover:shadow-md group"
          >
            Browse All Categories
            <svg
              className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CategorySection;