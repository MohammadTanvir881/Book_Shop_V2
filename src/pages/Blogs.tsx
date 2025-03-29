import AOS from 'aos';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

const blogs = [
  {
    title: 'The Art of Reading',
    description:
      'Discover how reading books can transform your perspective and creativity.',
    img: 'https://images.unsplash.com/photo-1556740749-887f6717d7e4',
    date: 'March 10, 2025',
  },
  {
    title: 'Best Fiction Books of 2025',
    description:
      'A curated list of the most captivating fiction books this year.',
    img: 'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=600',
    date: 'March 8, 2025',
  },
  {
    title: 'Productivity Hacks for Book Lovers',
    description:
      'How to manage time effectively and read more books in a busy schedule.',
    img: 'https://images.pexels.com/photos/6636122/pexels-photo-6636122.jpeg?auto=compress&cs=tinysrgb&w=600',
    date: 'March 5, 2025',
  },
  {
    title: 'Classic Literature You Must Read',
    description:
      'Explore timeless classics that everyone should experience at least once.',
    img: 'https://images.pexels.com/photos/19975716/pexels-photo-19975716/free-photo-of-fingers-on-open-book.jpeg?auto=compress&cs=tinysrgb&w=600',
    date: 'March 3, 2025',
  },
  {
    title: 'How to Write a Book Review',
    description:
      'Tips and techniques for writing engaging and insightful book reviews.',
    img: 'https://images.pexels.com/photos/5527531/pexels-photo-5527531.jpeg?auto=compress&cs=tinysrgb&w=600',
    date: 'March 1, 2025',
  },
  {
    title: 'The Science Behind Reading',
    description:
      'Learn how reading impacts brain development and cognitive skills.',
    img: 'https://media.istockphoto.com/id/1336651648/photo/close-up-of-a-young-person-studying-science-topic-about-robotics-at-home-student-is-working.jpg?s=2048x2048&w=is&k=20&c=gR1gti0EQCvqwyzd9lUDUSUjIkon2cRhDsmneILRZs8=',
    date: 'February 28, 2025',
  },
  {
    title: 'Must-Read Self-Help Books',
    description:
      'A selection of self-help books that can guide you toward success and happiness.',
    img: 'https://images.pexels.com/photos/731510/pexels-photo-731510.jpeg?auto=compress&cs=tinysrgb&w=600',
    date: 'February 25, 2025',
  },
  {
    title: 'Exploring Different Book Genres',
    description:
      'Dive into various book genres and find what suits your taste best.',
    img: 'https://images.pexels.com/photos/6981060/pexels-photo-6981060.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    date: 'February 22, 2025',
  },
  {
    title: 'Building a Personal Library',
    description:
      'Steps to curate and organize your own personal book collection.',
    img: 'https://images.pexels.com/photos/6550411/pexels-photo-6550411.jpeg?auto=compress&cs=tinysrgb&w=600',
    date: 'February 20, 2025',
  },
];

const Blogs = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div className="mt-6">
      <div className="grid grid-cols-1 sm:grid-cols-2  md:grid-cols-3 gap-6 px-6 sm:px-10 md:px-20 lg:px-40 py-10 md:py-20">
        <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
          Reading Our Letest Blogs...!
          <h4 className="text-lg pt-8">
            Your one-stop online destination for books of all genres. Whether
            you're a passionate reader, a student, or looking for the perfect
            gift, we have something for everyone.
          </h4>
        </h1>
        {blogs.map((blog, index) => (
          <div
            data-aos="flip-left"
            data-aos-easing="ease-out-cubic"
            data-aos-duration="2000"
            key={index}
            className="bg-white shadow-md
             rounded-lg overflow-hidden transform transition-all
              duration-300 hover:scale-105 hover:shadow-xl w-full sm:w-[90%] mx-auto"
          >
            <img
              src={blog.img}
              alt={blog.title}
              className="w-full h-40 sm:h-36 object-cover"
            />
            <div className="p-4">
              <p className="text-xs text-gray-500">{blog.date}</p>
              <h2 className="text-md font-semibold text-gray-800 mt-1">
                {blog.title}
              </h2>
              <p className="text-gray-600 mt-1 text-xs">{blog.description}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center items-center pt-10 pb-10 ">
        <Link to="/">
          <button
            className="bg-blue-700 hover:bg-blue-700 text-white font-bold 
  py-2 px-4 border border-blue-700 rounded"
          >
            Back To Home
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Blogs;
