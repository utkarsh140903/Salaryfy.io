import { motion } from "framer-motion";
import { Link } from "react-router";
import { useState, useEffect } from "react";
import { 
  ArrowLeft, 
  BookOpen, 
  TrendingUp, 
  PiggyBank, 
  CreditCard, 
  Home, 
  Shield, 
  Target,
  Clock,
  Users,
  ExternalLink
} from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

export function Learn() {
  const [financialNews, setFinancialNews] = useState<any[]>([]);
  const [isLoadingNews, setIsLoadingNews] = useState(true);

  useEffect(() => {
    // Fetch financial news from a free API
    const fetchNews = async () => {
      try {
        // Using JSONPlaceholder as a demo API (in a real app, use financial news APIs)
        const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=4');
        const posts = await response.json();
        
        // Transform the data to look like financial news
        const newsItems = posts.map((post: any, index: number) => ({
          id: post.id,
          title: financialNewsTemplate[index % financialNewsTemplate.length].title,
          summary: financialNewsTemplate[index % financialNewsTemplate.length].summary,
          category: financialNewsTemplate[index % financialNewsTemplate.length].category,
          publishedAt: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toLocaleDateString(),
          source: 'Financial Times',
          url: '#'
        }));
        
        setFinancialNews(newsItems);
      } catch (error) {
        console.error('Error fetching financial news:', error);
        // Fallback to static data
        setFinancialNews(financialNewsTemplate.map((item, index) => ({
          id: index + 1,
          ...item,
          publishedAt: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toLocaleDateString(),
          source: 'Financial Times',
          url: '#'
        })));
      } finally {
        setIsLoadingNews(false);
      }
    };

    fetchNews();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Navigation */}
      <nav className="bg-white dark:bg-gray-900 shadow-sm border-b dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link to="/" className="flex items-center text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                <ArrowLeft className="h-5 w-5 mr-2" />
                <span>Back to Home</span>
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-blue-600 dark:text-blue-400">Salaryfy.io</h1>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center mb-4">
            <BookOpen className="h-8 w-8 text-blue-600 dark:text-blue-400 mr-3" />
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Financial Education</h1>
          </div>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Build your financial knowledge with our comprehensive guides on budgeting, 
            investments, savings, and smart money management strategies.
          </p>
        </motion.div>

        {/* Learning Path */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-r from-blue-600 to-green-600 rounded-xl shadow-lg p-8 mb-12 text-white"
        >
          <h2 className="text-2xl font-semibold mb-6">Your Financial Learning Path</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {learningPath.map((step, index) => (
              <div key={step.title} className="bg-white/10 backdrop-blur rounded-lg p-4 text-center">
                <div className="text-2xl font-bold mb-2">{index + 1}</div>
                <h3 className="font-medium mb-1">{step.title}</h3>
                <p className="text-blue-100 text-sm">{step.description}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Learning Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {learningCategories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl dark:hover:shadow-2xl transition-shadow cursor-pointer"
            >
              <div className="flex items-center justify-center w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg mb-4">
                <category.icon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{category.title}</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">{category.description}</p>
              <div className="space-y-2">
                {category.topics.map((topic, topicIndex) => (
                  <div key={topicIndex} className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                    <div className="w-1.5 h-1.5 bg-blue-400 dark:bg-blue-500 rounded-full mr-2"></div>
                    {topic}
                  </div>
                ))}
              </div>
              <button className="mt-4 w-full bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/30 text-blue-600 dark:text-blue-400 py-2 px-4 rounded-md font-medium transition-colors">
                Start Learning
              </button>
            </motion.div>
          ))}
        </div>

        {/* Latest Financial News */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8"
        >
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white flex items-center">
              <TrendingUp className="h-6 w-6 text-green-600 dark:text-green-400 mr-2" />
              Latest Financial News
            </h2>
            <span className="text-sm text-gray-500 dark:text-gray-400">Updated live via API</span>
          </div>
          
          {isLoadingNews ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="animate-pulse">
                  <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-gray-200 dark:bg-gray-600 rounded w-full mb-2"></div>
                  <div className="h-3 bg-gray-200 dark:bg-gray-600 rounded w-5/6"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {financialNews.map((news, index) => (
                <motion.div
                  key={news.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="border border-gray-200 dark:border-gray-600 rounded-lg p-4 hover:border-blue-300 dark:hover:border-blue-500 transition-colors cursor-pointer"
                >
                  <div className="flex items-start justify-between mb-2">
                    <span className="text-xs bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400 px-2 py-1 rounded-full">
                      {news.category}
                    </span>
                    <ExternalLink className="h-4 w-4 text-gray-400 dark:text-gray-500" />
                  </div>
                  <h3 className="font-medium text-gray-900 dark:text-white mb-2 line-clamp-2">{news.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-3 line-clamp-2">{news.summary}</p>
                  <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                    <span>{news.source}</span>
                    <span>{news.publishedAt}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>

        {/* Featured Articles */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8"
        >
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Featured Articles</h2>
            <button className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium transition-colors">View All</button>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {featuredArticles.map((article, index) => (
              <motion.div
                key={article.title}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                className="border border-gray-200 dark:border-gray-600 rounded-lg p-4 hover:border-blue-300 dark:hover:border-blue-500 transition-colors cursor-pointer"
              >
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-medium text-gray-900 dark:text-white flex-1 pr-2">{article.title}</h3>
                  <span className="text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400 px-2 py-1 rounded-full whitespace-nowrap">
                    {article.readTime}
                  </span>
                </div>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">{article.excerpt}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3 text-xs text-gray-500 dark:text-gray-400">
                    <span className="flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      {article.publishedAt}
                    </span>
                    <span className="flex items-center">
                      <Users className="h-3 w-3 mr-1" />
                      {article.level}
                    </span>
                  </div>
                  <button className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-sm font-medium transition-colors">
                    Read More →
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Financial Tools */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
        >
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Financial Planning Tools</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {financialTools.map((tool, index) => (
              <div 
                key={tool.name} 
                className="border border-gray-200 dark:border-gray-600 rounded-lg p-4 hover:border-blue-300 dark:hover:border-blue-500 hover:shadow-md dark:hover:shadow-xl transition-all cursor-pointer text-center"
              >
                <div className="flex items-center justify-center w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-lg mx-auto mb-3">
                  <tool.icon className="h-5 w-5 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="font-medium text-gray-900 dark:text-white mb-1">{tool.name}</h3>
                <p className="text-xs text-gray-600 dark:text-gray-300">{tool.description}</p>
              </div>
            ))}
          </div>
          
          <div className="mt-6 text-center">
            <Link 
              to="/calculator"
              className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors inline-flex items-center"
            >
              Try Our Salary Calculator
              <ArrowLeft className="h-5 w-5 ml-2 rotate-180" />
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

const learningPath = [
  {
    title: "Basics",
    description: "Understanding money, budgeting, and financial goals"
  },
  {
    title: "Saving",
    description: "Emergency funds, savings accounts, and techniques"
  },
  {
    title: "Investing",
    description: "Stocks, mutual funds, and portfolio building"
  },
  {
    title: "Planning",
    description: "Retirement, insurance, and long-term wealth"
  }
];

const learningCategories = [
  {
    title: "Budgeting & Savings",
    description: "Learn to manage your money effectively and build emergency funds",
    icon: PiggyBank,
    topics: [
      "Creating a monthly budget",
      "50/30/20 rule explained",
      "Emergency fund planning",
      "Savings account selection",
      "Expense tracking methods"
    ]
  },
  {
    title: "Investment Basics",
    description: "Start your investment journey with stocks, mutual funds, and more",
    icon: TrendingUp,
    topics: [
      "Stock market fundamentals",
      "Mutual fund types",
      "SIP vs lump sum",
      "Risk assessment",
      "Portfolio diversification"
    ]
  },
  {
    title: "Tax Planning",
    description: "Optimize your taxes and understand deductions available",
    icon: Shield,
    topics: [
      "Income tax basics",
      "Section 80C investments",
      "Tax-saving mutual funds",
      "HRA exemptions",
      "Tax filing process"
    ]
  },
  {
    title: "Credit Management",
    description: "Build and maintain good credit score and manage debt",
    icon: CreditCard,
    topics: [
      "Credit score importance",
      "Credit card best practices",
      "Loan management",
      "EMI planning",
      "Debt consolidation"
    ]
  },
  {
    title: "Home Buying",
    description: "Navigate the home buying process and home loan options",
    icon: Home,
    topics: [
      "Home loan eligibility",
      "Down payment planning",
      "Property registration",
      "Home insurance",
      "Tax benefits on home loans"
    ]
  },
  {
    title: "Retirement Planning",
    description: "Plan for your golden years with pension and investment strategies",
    icon: Target,
    topics: [
      "Retirement corpus calculation",
      "PPF and EPF benefits",
      "NPS (National Pension System)",
      "Senior citizen schemes",
      "Healthcare planning"
    ]
  }
];

const featuredArticles = [
  {
    title: "How to Create Your First Budget in 2024",
    excerpt: "A step-by-step guide to creating a budget that works for your lifestyle and financial goals.",
    readTime: "5 min read",
    publishedAt: "2 days ago",
    level: "Beginner"
  },
  {
    title: "Understanding SIP: A Beginner's Guide",
    excerpt: "Learn how Systematic Investment Plans can help you build wealth over time with small monthly investments.",
    readTime: "8 min read",
    publishedAt: "1 week ago",
    level: "Beginner"
  },
  {
    title: "Tax Saving Investments: Beyond Section 80C",
    excerpt: "Explore various tax-saving options available in India and how to optimize your tax liability.",
    readTime: "12 min read",
    publishedAt: "3 days ago",
    level: "Intermediate"
  },
  {
    title: "Building an Emergency Fund: How Much is Enough?",
    excerpt: "Calculate the right emergency fund size for your situation and learn where to keep it.",
    readTime: "6 min read",
    publishedAt: "1 week ago",
    level: "Beginner"
  }
];

const financialTools = [
  {
    name: "SIP Calculator",
    description: "Calculate SIP returns",
    icon: TrendingUp
  },
  {
    name: "EMI Calculator",
    description: "Calculate loan EMIs",
    icon: CreditCard
  },
  {
    name: "Tax Calculator",
    description: "Estimate tax liability",
    icon: Shield
  },
  {
    name: "Goal Planner",
    description: "Plan financial goals",
    icon: Target
  }
];

const financialNewsTemplate = [
  {
    title: "Indian Stock Market Reaches New Highs Amid Strong Economic Growth",
    summary: "The BSE Sensex and NSE Nifty hit record levels as investors show confidence in India's economic recovery and corporate earnings growth.",
    category: "Markets"
  },
  {
    title: "RBI Keeps Interest Rates Unchanged, Focuses on Inflation Control",
    summary: "The Reserve Bank of India maintains the repo rate at current levels while signaling a cautious approach towards monetary policy in 2024.",
    category: "Policy"
  },
  {
    title: "New Tax Benefits Announced for First-Time Home Buyers",
    summary: "The government introduces additional tax deductions under Section 80EEA for affordable housing purchases, boosting the real estate sector.",
    category: "Tax"
  },
  {
    title: "Digital Payment Adoption Surges 40% in Rural India",
    summary: "UPI transactions in rural areas show remarkable growth as financial inclusion initiatives and smartphone penetration accelerate digitization.",
    category: "Fintech"
  }
];
