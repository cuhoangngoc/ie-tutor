import Link from 'next/link';

const GradientBtn = ({ href, text, color }) => {
  const colorVariants = {
    pink: 'from-pink-500 to-yellow-500',
    blue: 'from-cyan-500 to-blue-500',
  };

  return (
    <Link
      href={href}
      className={`bg-gradient-to-r ${colorVariants[color]} flex items-center gap-2 rounded-sm p-4 text-xl font-bold text-white transition-all duration-200 hover:scale-105 hover:shadow-2xl`}
    >
      {text}
    </Link>
  );
};

export default GradientBtn;
