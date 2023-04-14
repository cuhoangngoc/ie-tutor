import Link from 'next/link';

const NotFoundPage = () => (
  <section className="bg-white dark:bg-gray-900">
    <div className="mx-auto max-w-screen-xl px-4 py-8 lg:px-6 lg:py-16">
      <div className="mx-auto max-w-screen-sm text-center">
        <h1 className="mb-4 text-7xl font-extrabold tracking-tight text-error dark:text-info lg:text-9xl">
          404
        </h1>
        <p className="mb-4 text-3xl font-bold tracking-tight text-gray-900 dark:text-white md:text-4xl">
          Something&rsquo;s missing.
        </p>
        <p className="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">
          Sorry, we can&rsquo;t find that page. You&rsquo;ll find lots to
          explore on the home page.
        </p>
        <Link
          href="/"
          className="my-4 inline-flex rounded-lg bg-neutral px-5 py-2.5 text-center text-sm font-medium text-white hover:opacity-80"
        >
          Back to Homepage
        </Link>
      </div>
    </div>
  </section>
);

export default NotFoundPage;
