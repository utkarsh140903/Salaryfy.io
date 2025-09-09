import { motion } from "framer-motion";
import { Link } from "react-router";
import { ArrowLeft, Shield, Calculator, TrendingDown, Info, CheckCircle } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

export function TaxInfo() {
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
            <Shield className="h-8 w-8 text-blue-600 dark:text-blue-400 mr-3" />
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Tax Information & Guide</h1>
          </div>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Complete guide to Indian income tax, tax slabs, deductions, and planning strategies. 
            Understand your tax liability and optimize your tax planning.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Tax Slabs */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 lg:col-span-2"
          >
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
              <Calculator className="h-6 w-6 text-blue-600 dark:text-blue-400 mr-2" />
              Income Tax Slabs (FY 2024-25)
            </h2>
            
            <div className="mb-8">
              <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-4">New Tax Regime (Default)</h3>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-200 dark:border-gray-600 rounded-lg">
                  <thead>
                    <tr className="bg-blue-50 dark:bg-blue-900/20">
                      <th className="border border-gray-200 dark:border-gray-600 px-4 py-3 text-left font-medium text-gray-900 dark:text-white">
                        Income Range
                      </th>
                      <th className="border border-gray-200 dark:border-gray-600 px-4 py-3 text-left font-medium text-gray-900 dark:text-white">
                        Tax Rate
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {newTaxSlabs.map((slab, index) => (
                      <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                        <td className="border border-gray-200 dark:border-gray-600 px-4 py-3 text-gray-700 dark:text-gray-300">
                          {slab.range}
                        </td>
                        <td className="border border-gray-200 dark:border-gray-600 px-4 py-3 font-medium text-gray-900 dark:text-white">
                          {slab.rate}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-4">Old Tax Regime (Optional)</h3>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-200 dark:border-gray-600 rounded-lg">
                  <thead>
                    <tr className="bg-green-50 dark:bg-green-900/20">
                      <th className="border border-gray-200 dark:border-gray-600 px-4 py-3 text-left font-medium text-gray-900 dark:text-white">
                        Income Range
                      </th>
                      <th className="border border-gray-200 dark:border-gray-600 px-4 py-3 text-left font-medium text-gray-900 dark:text-white">
                        Tax Rate
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {oldTaxSlabs.map((slab, index) => (
                      <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                        <td className="border border-gray-200 dark:border-gray-600 px-4 py-3 text-gray-700 dark:text-gray-300">
                          {slab.range}
                        </td>
                        <td className="border border-gray-200 dark:border-gray-600 px-4 py-3 font-medium text-gray-900 dark:text-white">
                          {slab.rate}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>

          {/* Key Points */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
          >
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
              <Info className="h-5 w-5 text-blue-600 dark:text-blue-400 mr-2" />
              Key Points
            </h2>
            
            <div className="space-y-4">
              {keyPoints.map((point, index) => (
                <div key={index} className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 dark:text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                  <p className="text-gray-700 dark:text-gray-300 text-sm">{point}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <h3 className="font-medium text-blue-900 dark:text-blue-300 mb-2">Quick Tip</h3>
              <p className="text-blue-800 dark:text-blue-200 text-sm">
                Use our salary calculator to compare your tax liability under both regimes 
                and choose the one that saves you more money.
              </p>
              <Link 
                to="/calculator" 
                className="inline-block mt-3 bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Calculate Now
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Tax Deductions */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mt-8"
        >
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-8 flex items-center">
            <TrendingDown className="h-6 w-6 text-green-600 dark:text-green-400 mr-2" />
            Popular Tax Deductions (Old Regime)
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {taxDeductions.map((deduction, index) => (
              <motion.div
                key={deduction.section}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                className="border border-gray-200 dark:border-gray-600 rounded-lg p-4 hover:shadow-md dark:hover:shadow-xl transition-shadow"
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-gray-900 dark:text-white">{deduction.section}</h3>
                  <span className="text-sm font-medium text-green-600 dark:text-green-400">
                    Up to ₹{deduction.limit.toLocaleString('en-IN')}
                  </span>
                </div>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">{deduction.description}</p>
                <div className="space-y-1">
                  {deduction.items.map((item, itemIndex) => (
                    <div key={itemIndex} className="text-xs text-gray-500 dark:text-gray-400">
                      • {item}
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Tax Planning Tips */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-gradient-to-r from-blue-600 to-green-600 rounded-xl shadow-lg p-8 mt-8 text-white"
        >
          <h2 className="text-2xl font-semibold mb-6">Smart Tax Planning Tips</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {taxTips.map((tip, index) => (
              <div key={index} className="bg-white/10 backdrop-blur rounded-lg p-4">
                <h3 className="font-medium mb-2">{tip.title}</h3>
                <p className="text-blue-100 text-sm">{tip.description}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

const newTaxSlabs = [
  { range: "Up to ₹3,00,000", rate: "Nil" },
  { range: "₹3,00,001 - ₹7,00,000", rate: "5%" },
  { range: "₹7,00,001 - ₹10,00,000", rate: "10%" },
  { range: "₹10,00,001 - ₹12,00,000", rate: "15%" },
  { range: "₹12,00,001 - ₹15,00,000", rate: "20%" },
  { range: "Above ₹15,00,000", rate: "30%" },
];

const oldTaxSlabs = [
  { range: "Up to ₹2,50,000", rate: "Nil" },
  { range: "₹2,50,001 - ₹5,00,000", rate: "5%" },
  { range: "₹5,00,001 - ₹10,00,000", rate: "20%" },
  { range: "Above ₹10,00,000", rate: "30%" },
];

const keyPoints = [
  "New tax regime is default from FY 2023-24",
  "Standard deduction of ₹50,000 available in new regime",
  "Most deductions not available in new regime",
  "You can opt for old regime if beneficial",
  "Health and Education Cess: 4% on tax amount",
  "Surcharge applies on income above ₹50 lakh"
];

const taxDeductions = [
  {
    section: "Section 80C",
    limit: 150000,
    description: "Investments and expenses for tax saving",
    items: ["PPF, EPF", "ELSS Mutual Funds", "Life Insurance Premium", "Home Loan Principal", "NSC, Tax Saver FD"]
  },
  {
    section: "Section 80D",
    limit: 25000,
    description: "Medical insurance premiums",
    items: ["Health Insurance Premium", "Parents' Health Insurance", "Preventive Health Checkup"]
  },
  {
    section: "Section 24(b)",
    limit: 200000,
    description: "Home loan interest deduction",
    items: ["Self-occupied Property", "Interest on Housing Loan"]
  },
  {
    section: "Section 80E",
    limit: 0,
    description: "Education loan interest (no limit)",
    items: ["Interest on Education Loan", "For Self or Dependent", "Higher Education Only"]
  },
  {
    section: "Section 80G",
    limit: 0,
    description: "Donations to charitable institutions",
    items: ["50% or 100% Deduction", "Approved Charitable Trusts", "Government Relief Funds"]
  },
  {
    section: "HRA Exemption",
    limit: 0,
    description: "House Rent Allowance exemption",
    items: ["Actual HRA Received", "40%/50% of Basic Salary", "Rent Paid - 10% of Basic"]
  }
];

const taxTips = [
  {
    title: "Start Early",
    description: "Begin tax planning at the start of the financial year for maximum benefits and better cash flow management."
  },
  {
    title: "Compare Regimes",
    description: "Calculate tax liability under both regimes annually and choose the one that saves you more money."
  },
  {
    title: "Maximize 80C",
    description: "Invest the full ₹1.5 lakh limit in 80C options like PPF, ELSS, or life insurance for maximum tax savings."
  },
  {
    title: "Health Insurance",
    description: "Buy adequate health insurance for yourself and parents to claim deductions and protect against medical expenses."
  },
  {
    title: "Home Loan Benefits",
    description: "If you have a home loan, claim both principal (80C) and interest (24b) deductions for significant tax savings."
  },
  {
    title: "Keep Records",
    description: "Maintain proper documentation and receipts for all investments and expenses claimed as deductions."
  }
];
