import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

const ContactPage = () => {
  return (
    <div className="flex mt-10 flex-col items-center px-6 py-12 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Contact Me</h1>
      <div className="flex space-x-12 mb-12">
        <div className="flex flex-col items-center space-y-4">
          <FaPhoneAlt className="text-4xl text-blue-500" />
          <div className="text-center">
            <h3 className="text-xl font-semibold text-gray-700">Phone</h3>
            <p className="text-gray-500">+880 1766627499</p>
          </div>
        </div>
        <div className="flex flex-col items-center space-y-4">
          <FaEnvelope className="text-4xl text-blue-500" />
          <div className="text-center">
            <h3 className="text-xl font-semibold text-gray-700">Email</h3>
            <p className="text-gray-500">hasanmahadihm99@gmail.com</p>
          </div>
        </div>
        <div className="flex flex-col items-center space-y-4">
          <FaMapMarkerAlt className="text-4xl text-blue-500" />
          <div className="text-center">
            <h3 className="text-xl font-semibold text-gray-700">Location</h3>
            <p className="text-gray-500">Dhaka, Bangladesh</p>
          </div>
        </div>
      </div>

      <form className="w-full max-w-lg">
        <h3 className="text-2xl font-semibold text-gray-800 mb-6">
          Get in Touch
        </h3>
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Your Name"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Your Email"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="message"
            className="block text-sm font-medium text-gray-700"
          >
            Message
          </label>
          <textarea
            id="message"
            name="message"
            placeholder="Your Message"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 h-32"
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition"
        >
          Send Message
        </button>
      </form>
    </div>
  );
};

export default ContactPage;
