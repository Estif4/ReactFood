export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10">
      <div className="container mx-auto px-6 sm:px-12 lg:px-24">
        {/* Footer Top */}
        <div className="flex flex-wrap justify-between items-start space-y-8 sm:space-y-0">
          {/* About Section */}
          <div className="w-full sm:w-1/3 lg:w-1/4">
            <h3 className="text-lg font-semibold text-white mb-4">
              About FoodieHub
            </h3>
            <p className="text-sm">
              FoodieHub is your premier destination for delicious food, curated
              menus, and exceptional dining experiences. Discover your next
              favorite dish with us!
            </p>
          </div>

          {/* Quick Links */}
          <div className="w-full sm:w-1/3 lg:w-1/4">
            <h3 className="text-lg font-semibold text-white mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-yellow-400">
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-yellow-400">
                  Menu
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-yellow-400">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-yellow-400">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="w-full sm:w-1/3 lg:w-1/4">
            <h3 className="text-lg font-semibold text-white mb-4">
              Contact Us
            </h3>
            <ul className="space-y-2">
              <li>
                <span>Email: </span>
                <a
                  href="mailto:support@foodiehub.com"
                  className="hover:text-yellow-400">
                  support@foodiehub.com
                </a>
              </li>
              <li>
                <span>Phone: </span>
                <a href="tel:+1234567890" className="hover:text-yellow-400">
                  +1 234 567 890
                </a>
              </li>
              <li>
                <span>Location: </span>
                <p>123 Food Street, Culinary City</p>
              </li>
            </ul>
          </div>

          {/* Social Media Links */}
          <div className="w-full sm:w-1/3 lg:w-1/4">
            <h3 className="text-lg font-semibold text-white mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a
                href="#"
                aria-label="Facebook"
                className="hover:text-yellow-400">
                <i className="fab fa-facebook-f"></i> Facebook
              </a>
              <a
                href="#"
                aria-label="Twitter"
                className="hover:text-yellow-400">
                <i className="fab fa-twitter"></i> Twitter
              </a>
              <a
                href="#"
                aria-label="Instagram"
                className="hover:text-yellow-400">
                <i className="fab fa-instagram"></i> Instagram
              </a>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-gray-700 mt-8 pt-6 text-center">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} FoodieHub. All rights reserved. |
            Designed with ❤️ by FoodieHub Team
          </p>
        </div>
      </div>
    </footer>
  );
}
