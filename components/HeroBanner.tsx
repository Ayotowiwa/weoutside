interface HeroBannerProps {
  title: string;
  subtitle: string;
  image: string;
  ctaText?: string;
}

export default function HeroBanner({
  title,
  subtitle,
  image,
  ctaText = "Explore",
}: HeroBannerProps) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-8">
      <div className="relative rounded-xl overflow-hidden h-80">
        {/* Background Image */}
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-linear-to-r from-black/60 to-transparent"></div>

        {/* Content */}
        <div className="absolute inset-0 flex flex-col justify-center pl-8 sm:pl-12">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-2">
            {title}
          </h2>
          <p className="text-lg sm:text-xl text-gray-100 mb-6 max-w-md">
            {subtitle}
          </p>
          <button className="w-fit px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors">
            {ctaText}
          </button>
        </div>
      </div>
    </div>
  );
}
