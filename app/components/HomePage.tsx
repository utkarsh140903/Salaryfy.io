import { motion } from "framer-motion";
import { Link } from "react-router";
import {
  Calculator,
  PieChart,
  BookOpen,
  Shield,
  TrendingUp,
  Users,
  ChevronRight,
  ArrowRight,
} from "lucide-react";
import { Navigation } from "./Navigation";
import { smoothScrollTo } from "../utils/actions";
import { useTheme } from "../contexts/ThemeContext";

export function HomePage() {
  const { theme } = useTheme();
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Skip to main content for accessibility */}
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-20 focus:left-4 bg-blue-600 text-white px-4 py-2 rounded-md z-50">
        Skip to main content
      </a>
      
      {/* Navigation */}
      <Navigation />

      {/* Hero Section */}
      <main id="main-content">
        <section className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
                Master Your{" "}
                <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                  Financial Future
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
                Understand your salary, taxes, and investments with clarity and transparency. 
                Make informed financial decisions with our comprehensive tools and education.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/calculator" className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all transform hover:scale-105 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900">
                  Calculate Your Salary
                  <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
                </Link>
                <button 
                  onClick={() => smoothScrollTo('features')}
                  className="border-2 border-blue-600 dark:border-blue-400 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 px-8 py-4 rounded-lg text-lg font-semibold transition-all text-center focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
                >
                  Explore Features
                </button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-16 bg-white dark:bg-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Everything You Need for Financial Clarity
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Our comprehensive platform provides tools and education to help you understand 
                and optimize your financial situation.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6 hover:shadow-lg dark:hover:shadow-xl transition-shadow"
                >
                  <div className="flex items-center justify-center w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg mb-4">
                    <feature.icon className="h-6 w-6 text-blue-600 dark:text-blue-400" aria-hidden="true" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">{feature.description}</p>
                  <Link 
                    to={feature.link || "/calculator"}
                    className="text-blue-600 dark:text-blue-400 font-medium flex items-center hover:text-blue-700 dark:hover:text-blue-300 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md" 
                    aria-label={`Learn more about ${feature.title}`}
                  >
                    Learn more
                    <ChevronRight className="ml-1 h-4 w-4" aria-hidden="true" />
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-green-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="text-white"
              >
                <div className="text-4xl md:text-5xl font-bold mb-2">
                  {stat.value}
                </div>
                <div className="text-xl opacity-90">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Take Control of Your Finances?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Join thousands who have already started their journey to financial clarity.
            </p>
            <Link 
              to="/calculator"
              className="bg-white hover:bg-gray-100 text-gray-900 px-8 py-4 rounded-lg text-lg font-semibold transition-all transform hover:scale-105 inline-block"
            >
              Start Your Financial Journey
            </Link>
          </motion.div>
        </div>
      </section>

      </main>
      
      {/* Footer */}
      <footer className="bg-white dark:bg-gray-900 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <h3 className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-4">Salaryfy.io</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Empowering individuals with financial clarity through education, 
                tools, and transparency. Make informed decisions about your money.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Tools</h4>
              <ul className="space-y-2">
                <li><Link to="/calculator" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Salary Calculator</Link></li>
                <li><Link to="/tax-info" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Tax Calculator</Link></li>
                <li><Link to="/learn" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Investment Planner</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Learn</h4>
              <ul className="space-y-2">
                <li><Link to="/learn" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Financial Literacy</Link></li>
                <li><Link to="/tax-info" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Tax Guide</Link></li>
                <li><Link to="/learn" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Investment Basics</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-200 dark:border-gray-700 mt-8 pt-8 text-center text-gray-600 dark:text-gray-400">
            <p>&copy; 2025 Salaryfy.io. Built with ❤️ for financial empowerment.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

const features = [
  {
    title: "Salary Calculator",
    description: "Get detailed breakdown of your salary including deductions, taxes, and take-home pay.",
    icon: Calculator,
    link: "/calculator",
  },
  {
    title: "Tax Information",
    description: "Understand tax slabs, deductions, and optimize your tax planning strategies.",
    icon: Shield,
    link: "/tax-info",
  },
  {
    title: "Financial Education",
    description: "Learn about investments, savings, budgeting, and build financial literacy.",
    icon: BookOpen,
    link: "/learn",
  },
  {
    title: "Investment Planning",
    description: "Plan your investments and understand different investment options available.",
    icon: TrendingUp,
    link: "/learn",
  },
  {
    title: "Salary Insights",
    description: "Get insights into salary trends, industry standards, and career growth.",
    icon: PieChart,
    link: "/salary-breakdown",
  },
  {
    title: "Expert Guidance",
    description: "Access curated content and guidance from financial experts and professionals.",
    icon: Users,
    link: "/learn",
  },
];

const stats = [
  { value: "50K+", label: "Users Empowered" },
  { value: "₹10Cr+", label: "Salaries Calculated" },
  { value: "99%", label: "Accuracy Rate" },
];
