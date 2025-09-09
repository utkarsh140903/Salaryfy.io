import type { Route } from "./+types/calculator";
import { SalaryCalculator } from "../components/SalaryCalculator";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Salary Calculator - Salaryfy.io" },
    { name: "description", content: "Calculate your take-home salary with detailed breakdown of taxes, deductions, and savings. Free and accurate salary calculator for India." },
    { name: "keywords", content: "salary calculator, take home salary, tax calculator, salary breakdown, net salary calculator" },
  ];
}

export default function Calculator() {
  return <SalaryCalculator />;
}
