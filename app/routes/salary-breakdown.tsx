import type { Route } from "./+types/salary-breakdown";
import { SalaryBreakdown } from "../components/SalaryBreakdown";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Salary Breakdown Guide - Salaryfy.io" },
    { name: "description", content: "Understand your salary structure, components like basic salary, HRA, allowances, and deductions. Complete guide to salary breakdown in India." },
    { name: "keywords", content: "salary breakdown, basic salary, HRA, allowances, salary components, salary structure india" },
  ];
}

export default function SalaryBreakdownPage() {
  return <SalaryBreakdown />;
}
