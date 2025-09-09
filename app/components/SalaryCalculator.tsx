import { useState } from "react";
import { motion } from "framer-motion";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import { Calculator, Download, Share2 } from "lucide-react";
import { Navigation } from "./Navigation";
import { LoadingButton } from "./Loading";
import { downloadPDF, shareContent, formatShareText } from "../utils/actions";

interface SalaryData {
  grossSalary: number;
  basicSalary: number;
  hra: number;
  specialAllowance: number;
  employerPF: number;
  employerESIC: number;
  employeePF: number;
  employeeESIC: number;
  professionalTax: number;
  incomeTax: number;
  netSalary: number;
}

export function SalaryCalculator() {
  const [grossSalary, setGrossSalary] = useState<number>(50000);
  const [salaryData, setSalaryData] = useState<SalaryData | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isSharing, setIsSharing] = useState(false);

  const calculateSalary = async () => {
    setIsCalculating(true);
    
    // Simulate loading for better UX
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Basic calculations based on standard salary structure in India
    const basic = grossSalary * 0.4; // 40% of gross
    const hra = grossSalary * 0.25; // 25% of gross
    const specialAllowance = grossSalary - basic - hra;
    
    // Employee deductions
    const employeePF = Math.min(basic * 0.12, 1800); // 12% of basic, max 1800
    const employeeESIC = grossSalary <= 25000 ? grossSalary * 0.0075 : 0; // 0.75% if salary <= 25000
    const professionalTax = grossSalary > 10000 ? 200 : 0;
    
    // Employer contributions
    const employerPF = employeePF;
    const employerESIC = grossSalary <= 25000 ? grossSalary * 0.0325 : 0; // 3.25% if salary <= 25000
    
    // Income tax calculation (simplified)
    const yearlyGross = grossSalary * 12;
    const yearlyBasic = basic * 12;
    const standardDeduction = 50000;
    const taxableIncome = Math.max(0, yearlyGross - standardDeduction - (employeePF * 12));
    
    let yearlyTax = 0;
    if (taxableIncome > 250000) {
      if (taxableIncome <= 500000) {
        yearlyTax = (taxableIncome - 250000) * 0.05;
      } else if (taxableIncome <= 1000000) {
        yearlyTax = 250000 * 0.05 + (taxableIncome - 500000) * 0.2;
      } else {
        yearlyTax = 250000 * 0.05 + 500000 * 0.2 + (taxableIncome - 1000000) * 0.3;
      }
    }
    const monthlyTax = yearlyTax / 12;
    
    const netSalary = grossSalary - employeePF - employeeESIC - professionalTax - monthlyTax;
    
    setSalaryData({
      grossSalary,
      basicSalary: basic,
      hra,
      specialAllowance,
      employerPF,
      employerESIC,
      employeePF,
      employeeESIC,
      professionalTax,
      incomeTax: monthlyTax,
      netSalary,
    });
    
    setIsCalculating(false);
  };
  
  const handleDownloadPDF = async () => {
    if (!salaryData) return;
    
    setIsDownloading(true);
    try {
      await downloadPDF(salaryData, `salary-report-${Date.now()}`);
    } catch (error) {
      console.error('Download failed:', error);
    } finally {
      setIsDownloading(false);
    }
  };
  
  const handleShare = async () => {
    if (!salaryData) return;
    
    setIsSharing(true);
    try {
      await shareContent({
        title: 'My Salary Breakdown - Salaryfy.io',
        text: formatShareText(salaryData),
        url: window.location.href
      });
    } catch (error) {
      console.error('Share failed:', error);
    } finally {
      setIsSharing(false);
    }
  };

  const pieData = salaryData ? [
    { name: "Net Salary", value: salaryData.netSalary, color: "#10b981" },
    { name: "PF", value: salaryData.employeePF, color: "#3b82f6" },
    { name: "Income Tax", value: salaryData.incomeTax, color: "#ef4444" },
    { name: "ESIC", value: salaryData.employeeESIC, color: "#f59e0b" },
    { name: "Professional Tax", value: salaryData.professionalTax, color: "#8b5cf6" },
  ] : [];

  const barData = salaryData ? [
    { name: "Basic", amount: salaryData.basicSalary },
    { name: "HRA", amount: salaryData.hra },
    { name: "Special Allowance", amount: salaryData.specialAllowance },
  ] : [];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Navigation */}
      <Navigation showBackButton={true} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-24">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center mb-4">
            <Calculator className="h-8 w-8 text-blue-600 dark:text-blue-400 mr-3" />
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Salary Calculator</h1>
          </div>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Calculate your take-home salary with detailed breakdown of taxes and deductions
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Input Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
          >
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Enter Your Details</h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Gross Monthly Salary
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400">₹</span>
                  <input
                    type="number"
                    value={grossSalary}
                    onChange={(e) => setGrossSalary(Number(e.target.value))}
                    className="w-full pl-8 pr-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent text-lg"
                    placeholder="50000"
                  />
                </div>
              </div>
              
              <LoadingButton
                isLoading={isCalculating}
                onClick={calculateSalary}
                className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold transition-colors flex items-center justify-center"
              >
                <Calculator className="h-5 w-5 mr-2" />
                {isCalculating ? 'Calculating...' : 'Calculate Salary'}
              </LoadingButton>
              
              {salaryData && (
                <div className="flex space-x-2">
                  <LoadingButton
                    isLoading={isDownloading}
                    onClick={handleDownloadPDF}
                    className="flex-1 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 py-2 px-4 rounded-lg font-medium transition-colors flex items-center justify-center"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    {isDownloading ? 'Downloading...' : 'Download'}
                  </LoadingButton>
                  <LoadingButton
                    isLoading={isSharing}
                    onClick={handleShare}
                    className="flex-1 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 py-2 px-4 rounded-lg font-medium transition-colors flex items-center justify-center"
                  >
                    <Share2 className="h-4 w-4 mr-2" />
                    {isSharing ? 'Sharing...' : 'Share'}
                  </LoadingButton>
                </div>
              )}
            </div>
          </motion.div>

          {/* Results */}
          {salaryData && (
            <>
              {/* Summary Cards */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
              >
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Salary Summary</h2>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <span className="font-medium text-green-800 dark:text-green-300">Net Take-Home</span>
                    <span className="text-2xl font-bold text-green-600 dark:text-green-400">
                      ₹{salaryData.netSalary.toLocaleString('en-IN')}
                    </span>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-300">Gross Salary</span>
                      <span className="font-medium text-gray-900 dark:text-white">₹{salaryData.grossSalary.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-300">Total Deductions</span>
                      <span className="font-medium text-red-600 dark:text-red-400">
                        -₹{(salaryData.grossSalary - salaryData.netSalary).toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t dark:border-gray-600">
                    <h3 className="font-medium text-gray-900 dark:text-white mb-3">Salary Breakdown</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-300">Basic Salary</span>
                        <span className="text-gray-900 dark:text-white">₹{salaryData.basicSalary.toLocaleString('en-IN')}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-300">HRA</span>
                        <span className="text-gray-900 dark:text-white">₹{salaryData.hra.toLocaleString('en-IN')}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-300">Special Allowance</span>
                        <span className="text-gray-900 dark:text-white">₹{salaryData.specialAllowance.toLocaleString('en-IN')}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t dark:border-gray-600">
                    <h3 className="font-medium text-gray-900 dark:text-white mb-3">Deductions</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-300">Provident Fund</span>
                        <span className="text-red-600 dark:text-red-400">-₹{salaryData.employeePF.toLocaleString('en-IN')}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-300">Income Tax</span>
                        <span className="text-red-600 dark:text-red-400">-₹{salaryData.incomeTax.toLocaleString('en-IN')}</span>
                      </div>
                      {salaryData.employeeESIC > 0 && (
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-300">ESIC</span>
                          <span className="text-red-600 dark:text-red-400">-₹{salaryData.employeeESIC.toLocaleString('en-IN')}</span>
                        </div>
                      )}
                      {salaryData.professionalTax > 0 && (
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-300">Professional Tax</span>
                          <span className="text-red-600 dark:text-red-400">-₹{salaryData.professionalTax.toLocaleString('en-IN')}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Charts */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
              >
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Visual Breakdown</h2>
                
                {/* Pie Chart */}
                <div className="mb-8">
                  <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-4">Salary Distribution</h3>
                  <div className="w-full overflow-hidden">
                    <ResponsiveContainer width="100%" height={320}>
                      <PieChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                        <Pie
                          data={pieData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={70}
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
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  
                  {/* Custom Legend */}
                  <div className="mt-4 grid grid-cols-2 gap-2">
                    {pieData.map((entry, index) => {
                      const total = pieData.reduce((sum, item) => sum + item.value, 0);
                      const percentage = ((entry.value / total) * 100).toFixed(1);
                      return (
                        <div key={entry.name} className="flex items-center space-x-2">
                          <div 
                            className="w-3 h-3 rounded-full flex-shrink-0" 
                            style={{ backgroundColor: entry.color }}
                          ></div>
                          <div className="min-w-0 flex-1">
                            <div className="text-xs font-medium text-gray-900 dark:text-white truncate">
                              {entry.name}
                            </div>
                            <div className="text-xs text-gray-600 dark:text-gray-400">
                              {percentage}% (₹{entry.value.toLocaleString('en-IN')})
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
                
                {/* Bar Chart */}
                <div>
                  <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-4">Components Breakdown</h3>
                  <div className="w-full overflow-hidden">
                    <ResponsiveContainer width="100%" height={250}>
                      <BarChart 
                        data={barData} 
                        margin={{ top: 20, right: 20, bottom: 40, left: 20 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                        <XAxis 
                          dataKey="name" 
                          tick={{ fontSize: 12, fill: '#6b7280' }}
                          axisLine={{ stroke: '#d1d5db' }}
                          tickLine={{ stroke: '#d1d5db' }}
                          interval={0}
                          angle={-45}
                          textAnchor="end"
                          height={60}
                        />
                        <YAxis 
                          tick={{ fontSize: 12, fill: '#6b7280' }}
                          axisLine={{ stroke: '#d1d5db' }}
                          tickLine={{ stroke: '#d1d5db' }}
                          tickFormatter={(value) => `₹${(value / 1000).toFixed(0)}K`}
                        />
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
                        <Bar 
                          dataKey="amount" 
                          fill="#3b82f6" 
                          radius={[4, 4, 0, 0]}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
