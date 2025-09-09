import type { Route } from "./+types/home";
import { HomePage } from "../components/HomePage";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Salaryfy - Financial Awareness & Salary Management Platform" },
    { name: "description", content: "Understand your salary, taxes, and investments. Salaryfy helps you make informed financial decisions with clarity and transparency." },
    { name: "keywords", content: "salary calculator, tax calculator, financial literacy, investment planning, salary breakdown, take home salary" },
  ];
}

export default function Home() {
  return <HomePage />;
}
