interface PromoCardProps {
  title: string;
  description: string;
  image: string;
  ctaText?: string;
}

export default function PromoCard({
  title,
  description,
  image,
  ctaText = "Learn More",
}: PromoCardProps) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-8">
      <div className="relative rounded-lg overflow-hidden h-48">
        {/* Background Image */}
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40"></div>

        {/* Content */}
        <div className="absolute inset-0 flex flex-col justify-center px-6 sm:px-8">
          <h3 className="text-2xl sm:text-3xl font-bold text-white mb-1">
            {title}
          </h3>
          <p className="text-gray-100 mb-4 max-w-md text-sm sm:text-base">
            {description}
          </p>
          <button className="w-fit px-4 py-2 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors text-sm">
            {ctaText}
          </button>
        </div>
      </div>
    </div>
  );
}
