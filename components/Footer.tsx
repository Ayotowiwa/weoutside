import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-blue-600 border-t border-blue-700 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand Section */}
          <div>
            <h3 className="text-2xl font-bold text-white mb-2">WeOutside</h3>
            <p className="text-blue-100 text-sm">
              Discover amazing outdoor events and places around you.
            </p>
          </div>

          {/* Explore */}
          <div>
            <h4 className="font-bold text-white mb-4">Explore</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-blue-100 hover:text-white text-sm transition-colors">
                  Events
                </Link>
              </li>
              <li>
                <Link href="/" className="text-blue-100 hover:text-white text-sm transition-colors">
                  Places
                </Link>
              </li>
              <li>
                <Link href="/" className="text-blue-100 hover:text-white text-sm transition-colors">
                  Categories
                </Link>
              </li>
              <li>
                <Link href="/" className="text-blue-100 hover:text-white text-sm transition-colors">
                  Popular Now
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-bold text-white mb-4">Support</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-blue-100 hover:text-white text-sm transition-colors">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/" className="text-blue-100 hover:text-white text-sm transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/" className="text-blue-100 hover:text-white text-sm transition-colors">
                  Safety
                </Link>
              </li>
              <li>
                <Link href="/" className="text-blue-100 hover:text-white text-sm transition-colors">
                  Feedback
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-bold text-white mb-4">Company</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-blue-100 hover:text-white text-sm transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/" className="text-blue-100 hover:text-white text-sm transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/" className="text-blue-100 hover:text-white text-sm transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/" className="text-blue-100 hover:text-white text-sm transition-colors">
                  Press
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-blue-500 py-8">
          {/* Social Links */}
          <div className="flex gap-4 mb-6">
            <a
              href="#"
              className="text-blue-100 hover:text-white text-sm font-medium transition-colors"
            >
              Facebook
            </a>
            <a
              href="#"
              className="text-blue-100 hover:text-white text-sm font-medium transition-colors"
            >
              Instagram
            </a>
            <a
              href="#"
              className="text-blue-100 hover:text-white text-sm font-medium transition-colors"
            >
              Twitter
            </a>
            <a
              href="#"
              className="text-blue-100 hover:text-white text-sm font-medium transition-colors"
            >
              LinkedIn
            </a>
          </div>

          {/* Copyright & Legal */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-blue-100">
            <p>&copy; 2026 WeOutside. All rights reserved.</p>
            <div className="flex gap-4">
              <Link href="/" className="hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="/" className="hover:text-white transition-colors">
                Terms of Service
              </Link>
              <Link href="/" className="hover:text-white transition-colors">
                Cookie Settings
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
