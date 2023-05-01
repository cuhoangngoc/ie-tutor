import Layout from '../../components/Layout/Layout';

Contact.title = 'Contact';
Contact.description = 'This is the contact page';

export default function Contact() {
  return (
    <Layout>
      <section className="mt-[2rem] py-6 dark:bg-gray-800 dark:text-gray-50">
        <div className="mx-auto grid max-w-6xl grid-cols-1 px-6 md:grid-cols-2 md:divide-x lg:px-8">
          {/* Contact info */}
          <div className="py-6 md:px-6 md:py-0">
            <h1 className="text-4xl font-bold">Get in touch</h1>
            <p className="pb-4 pt-2">
              Fill in the form to start a conversation
            </p>
            <div className="space-y-4">
              <p className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="mr-2 h-5 w-5 sm:mr-6"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <span>Fake address, 9999 City</span>
              </p>
              <p className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="mr-2 h-5 w-5 sm:mr-6"
                >
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"></path>
                </svg>
                <span>123456789</span>
              </p>
              <p className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="mr-2 h-5 w-5 sm:mr-6"
                >
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
                </svg>
                <span>contact@business.com</span>
              </p>
            </div>
          </div>

          {/* Contact form */}
          <form
            className="ng-untouched ng-pristine ng-valid flex flex-col space-y-6 py-6 md:px-6 md:py-0"
            data-form-type="other"
          >
            <label className="block">
              <span className="mb-1">Full name</span>
              <input
                type="text"
                placeholder="Leroy Jenkins"
                className="block w-full rounded-md shadow-sm focus:ring focus:ring-violet-400 focus:ring-opacity-75 dark:bg-gray-800"
                data-form-type="name"
                required
              />
            </label>
            <label className="block">
              <span className="mb-1">Email address</span>
              <input
                type="email"
                placeholder="leroy@jenkins.com"
                className="block w-full rounded-md shadow-sm focus:ring focus:ring-violet-400 focus:ring-opacity-75 dark:bg-gray-800"
                data-form-type="email"
                required
              />
            </label>
            <label className="block">
              <span className="mb-1">Message</span>
              <textarea
                required
                rows="3"
                className="block w-full rounded-md focus:ring focus:ring-violet-400 focus:ring-opacity-75 dark:bg-gray-800"
              ></textarea>
            </label>
            <button
              type="button"
              className="self-center rounded bg-indigo-400 px-8 py-3 text-lg transition-all duration-200 hover:ring hover:ring-violet-400 focus:ring focus:ring-violet-400 focus:ring-opacity-75 dark:bg-violet-400 dark:text-gray-900"
              data-form-type="action"
            >
              Submit
            </button>
          </form>
        </div>
      </section>

      <section className="container mx-auto my-20">
        <h1 className="mb-10 text-center text-4xl">
          <strong>Where to find us?</strong>
        </h1>
        <iframe
          className="h-96 w-full"
          src="https://www.google.com/maps/embed/v1/place?q=University+of+Information+Technology+VNU-HCM,+Đường+Hàn+Thuyên,+khu+phố+6+P,+Linh+Trung,+Thủ+Đức,+Ho+Chi+Minh+City,+Vietnam&key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8"
        ></iframe>
      </section>
    </Layout>
  );
}
