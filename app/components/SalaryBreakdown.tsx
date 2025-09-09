import { motion } from "framer-motion";
import { Link } from "react-router";
import { PieChart, Info, Calculator, CheckCircle, AlertCircle } from "lucide-react";
import { PieChart as RechartsPieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { Navigation } from "./Navigation";

export function SalaryBreakdown() {
  // Sample salary breakdown data
  const sampleBreakdown = {
    grossSalary: 60000,
    basicSalary: 24000, // 40%
    hra: 15000, // 25%
    specialAllowance: 21000, // 35%
    deductions: {
      pf: 2880, // 12% of basic
      esi: 0,
      professionalTax: 200,
      incomeTax: 3500
    }
  };

  const pieData = [
    { name: "Basic Salary", value: sampleBreakdown.basicSalary, color: "#3b82f6" },
    { name: "HRA", value: sampleBreakdown.hra, color: "#10b981" },
    { name: "Special Allowance", value: sampleBreakdown.specialAllowance, color: "#f59e0b" },
    { name: "Deductions", value: Object.values(sampleBreakdown.deductions).reduce((a, b) => a + b, 0), color: "#ef4444" }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Navigation */}
      <Navigation showBackButton={true} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center mb-4">
            <PieChart className="h-8 w-8 text-blue-600 mr-3" />
            <h1 className="text-3xl font-bold text-gray-900">Salary Breakdown Guide</h1>
          </div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Understand your salary structure, components, and how each element affects 
            your take-home pay. Learn about the standard salary breakdown in India.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Sample Breakdown Visualization */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Sample Salary Structure</h2>
            <div className="text-center mb-6">
              <div className="text-3xl font-bold text-blue-600 mb-2">
                ₹{sampleBreakdown.grossSalary.toLocaleString('en-IN')}
              </div>
              <div className="text-gray-600">Gross Monthly Salary</div>
            </div>
            
            <div className="w-full overflow-hidden">
              <ResponsiveContainer width="100%" height={320}>
                <RechartsPieChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={false}
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value: any) => [`₹${value.toLocaleString('en-IN')}`, 'Amount']}
                    labelFormatter={(label) => `${label}`}
                    contentStyle={{
                      backgroundColor: 'rgba(255, 255, 255, 0.95)',
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                </RechartsPieChart>
              </ResponsiveContainer>
            </div>

            {/* Custom Legend */}
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2">
              {pieData.map((item, index) => {
                const total = pieData.reduce((sum, entry) => sum + entry.value, 0);
                const percentage = ((item.value / total) * 100).toFixed(1);
                return (
                  <div key={item.name} className="flex items-center space-x-2">
                    <div 
                      className="w-3 h-3 rounded-full flex-shrink-0" 
                      style={{ backgroundColor: item.color }}
                    ></div>
                    <div className="min-w-0 flex-1">
                      <div className="text-xs font-medium text-gray-900 truncate">
                        {item.name}
                      </div>
                      <div className="text-xs text-gray-600">
                        {percentage}% (₹{item.value.toLocaleString('en-IN')})
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* Key Information */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
              <Info className="h-5 w-5 text-blue-600 mr-2" />
              Key Points to Remember
            </h2>
            
            <div className="space-y-4">
              {keyPoints.map((point, index) => (
                <div key={index} className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <p className="text-gray-700 text-sm">{point}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 p-4 bg-blue-50 rounded-lg">
              <h3 className="font-medium text-blue-900 mb-2 flex items-center">
                <Calculator className="h-4 w-4 mr-2" />
                Calculate Your Salary
              </h3>
              <p className="text-blue-800 text-sm mb-3">
                Want to see your exact salary breakdown? Use our salary calculator 
                to get detailed analysis of your take-home pay.
              </p>
              <Link 
                to="/calculator"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors inline-block"
              >
                Try Calculator
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Salary Components */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl shadow-lg p-6 mb-8"
        >
          <h2 className="text-2xl font-semibold text-gray-900 mb-8">Salary Components Explained</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {salaryComponents.map((component, index) => (
              <motion.div
                key={component.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                className="border border-gray-200 rounded-lg p-4"
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-medium text-gray-900">{component.name}</h3>
                  <span className="text-sm font-medium px-2 py-1 bg-blue-100 text-blue-800 rounded">
                    {component.percentage}
                  </span>
                </div>
                <p className="text-gray-600 text-sm mb-3">{component.description}</p>
                <div className="space-y-1">
                  {component.details.map((detail, detailIndex) => (
                    <div key={detailIndex} className="text-xs text-gray-500 flex items-start">
                      <span className="mr-2">•</span>
                      <span>{detail}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Deductions */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-xl shadow-lg p-6 mb-8"
        >
          <h2 className="text-2xl font-semibold text-gray-900 mb-8">Common Deductions</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {deductions.map((deduction, index) => (
              <motion.div
                key={deduction.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                className="border border-red-200 rounded-lg p-4 bg-red-50"
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-medium text-gray-900">{deduction.name}</h3>
                  <span className="text-sm font-medium px-2 py-1 bg-red-100 text-red-800 rounded">
                    {deduction.rate}
                  </span>
                </div>
                <p className="text-gray-600 text-sm mb-3">{deduction.description}</p>
                <div className="space-y-1">
                  {deduction.details.map((detail, detailIndex) => (
                    <div key={detailIndex} className="text-xs text-gray-500 flex items-start">
                      <span className="mr-2">•</span>
                      <span>{detail}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Tips */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-gradient-to-r from-green-600 to-blue-600 rounded-xl shadow-lg p-8 text-white"
        >
          <h2 className="text-2xl font-semibold mb-6">Salary Negotiation Tips</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {negotiationTips.map((tip, index) => (
              <div key={index} className="bg-white/10 backdrop-blur rounded-lg p-4">
                <h3 className="font-medium mb-2 flex items-center">
                  <AlertCircle className="h-4 w-4 mr-2" />
                  {tip.title}
                </h3>
                <p className="text-blue-100 text-sm">{tip.description}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

const keyPoints = [
  "Basic salary typically forms 40-50% of gross salary",
  "HRA exemption can significantly reduce taxable income",
  "PF contribution is 12% of basic salary, matched by employer",
  "Professional tax varies by state (₹150-₹200/month typically)",
  "Special allowances are fully taxable unless specifically exempt",
  "Higher basic salary means higher PF but also higher retirement corpus",
  "CTC includes employer contributions that you don't receive directly"
];

const salaryComponents = [
  {
    name: "Basic Salary",
    percentage: "40-50%",
    description: "Foundation of your salary structure, used to calculate other components",
    details: [
      "Forms the basis for PF, gratuity, and bonus calculations",
      "Fully taxable income component",
      "Higher basic means better retirement benefits",
      "Used for calculating HRA exemption limits"
    ]
  },
  {
    name: "House Rent Allowance (HRA)",
    percentage: "20-25%",
    description: "Allowance for housing expenses, partially tax-exempt",
    details: [
      "Tax exempt up to certain limits",
      "Must pay rent to claim exemption",
      "40% of basic salary limit for non-metro cities",
      "50% of basic salary limit for metro cities"
    ]
  },
  {
    name: "Special Allowance",
    percentage: "25-35%",
    description: "Flexible component covering various allowances",
    details: [
      "Includes conveyance, medical, food allowances",
      "Some components may be tax-exempt up to limits",
      "Most flexible part of salary structure",
      "Can include performance-based components"
    ]
  },
  {
    name: "Variable Pay/Bonus",
    percentage: "0-20%",
    description: "Performance-based additional compensation",
    details: [
      "Depends on individual and company performance",
      "May be paid quarterly or annually",
      "Fully taxable when received",
      "Not guaranteed income component"
    ]
  }
];

const deductions = [
  {
    name: "Provident Fund (PF)",
    rate: "12% of Basic",
    description: "Retirement savings scheme with employer matching",
    details: [
      "Maximum contribution capped at ₹1,800/month",
      "Employer contributes equal amount",
      "Tax deduction under Section 80C",
      "Withdrawable after leaving job or at retirement"
    ]
  },
  {
    name: "Employee State Insurance (ESI)",
    rate: "0.75% of Gross",
    description: "Medical insurance for employees earning up to ₹25,000/month",
    details: [
      "Applicable only if gross salary ≤ ₹25,000",
      "Employer contributes 3.25%",
      "Provides medical coverage for family",
      "Coverage includes disability and dependent benefits"
    ]
  },
  {
    name: "Professional Tax",
    rate: "₹150-200",
    description: "State-level tax on professions and employment",
    details: [
      "Varies by state government",
      "Tax deduction under Section 16",
      "Maximum ₹2,500 per year",
      "Some states don't levy professional tax"
    ]
  },
  {
    name: "Income Tax (TDS)",
    rate: "As per slabs",
    description: "Tax deducted at source based on projected annual income",
    details: [
      "Based on tax slab and projected annual income",
      "Adjusted at year-end during filing",
      "Can be reduced by submitting investment proofs",
      "Refund available if excess tax deducted"
    ]
  }
];

const negotiationTips = [
  {
    title: "Focus on CTC Structure",
    description: "Negotiate not just the amount but also the structure to maximize tax savings and take-home pay."
  },
  {
    title: "Understand Variable Components",
    description: "Clarify the criteria for variable pay and bonus to set realistic expectations."
  },
  {
    title: "Consider Non-Monetary Benefits",
    description: "Factor in benefits like health insurance, laptop allowance, and flexible work arrangements."
  },
  {
    title: "Know Your Tax Implications",
    description: "Understand how different salary structures affect your tax liability and plan accordingly."
  },
  {
    title: "Compare Total Value",
    description: "Look at the complete package including PF, gratuity, and other long-term benefits."
  },
  {
    title: "Research Market Standards",
    description: "Know the industry standards for your role and experience level before negotiating."
  }
];
