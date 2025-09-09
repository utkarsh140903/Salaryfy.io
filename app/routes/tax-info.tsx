import type { Route } from "./+types/tax-info";
import { TaxInfo } from "../components/TaxInfo";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Tax Information & Guide - Salaryfy.io" },
    { name: "description", content: "Complete guide to Indian income tax, tax slabs, deductions, and tax planning strategies. Understand your tax liability and optimize your taxes." },
    { name: "keywords", content: "income tax india, tax slabs, tax deductions, tax planning, 80c, tax guide" },
  ];
}

export default function TaxInfoPage() {
  return <TaxInfo />;
}
