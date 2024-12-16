import React from "react";
import { Link } from "react-router-dom";
import { Code, BookOpen } from "lucide-react";

const SimpleNavbar = () => {
  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <Code className="h-6 w-6 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">
                Web Code Editor
              </span>
            </Link>
          </div>

          <div className="flex items-center space-x-6">
            <Link
              to="/tutorial"
              className="flex items-center space-x-1 text-gray-600 hover:text-blue-600"
            >
              <BookOpen className="h-5 w-5" />
              <span>Öğreticiler</span>
            </Link>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-gray-600 hover:text-blue-600"
            >
              GitHub
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default SimpleNavbar;
