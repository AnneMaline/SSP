const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {/* Info Section */}
          <div>
            <h3 className="text-lg font-bold mb-4">Info</h3>
            <ul className="space-y-2">
              <li>
                <a href="/about" className="hover:underline">
                  About Us
                </a>
              </li>
              <li>
                <a href="/privacy" className="hover:underline">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="/terms" className="hover:underline">
                  Terms & Conditions
                </a>
              </li>
            </ul>
          </div>

          {/* Organization Section */}
          <div>
            <h3 className="text-lg font-bold mb-4">Organization</h3>
            <ul className="space-y-2">
              <li>
                <a href="/team" className="hover:underline">
                  Our Team
                </a>
              </li>
              <li>
                <a href="/careers" className="hover:underline">
                  Careers
                </a>
              </li>
              <li>
                <a href="/news" className="hover:underline">
                  Latest News
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Information Section */}
          <div>
            <h3 className="text-lg font-bold mb-4">Contact</h3>
            <ul className="space-y-2">
              <li>
                <a href="mailto:info@example.com" className="hover:underline">
                  info@example.com
                </a>
              </li>
              <li>
                <a href="tel:+1234567890" className="hover:underline">
                  +123 456 7890
                </a>
              </li>
              <li>
                <a
                  href="https://www.example.com/contact"
                  className="hover:underline"
                >
                  Contact Form
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-10 text-center text-sm">
          <p>&copy; 2024 Your Organization. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
