import type { Route } from "./+types/learn";
import { Learn } from "../components/Learn";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Financial Education & Learning - Salaryfy.io" },
    { name: "description", content: "Learn about financial literacy, budgeting, investments, savings, and money management. Build your financial knowledge with our comprehensive guides." },
    { name: "keywords", content: "financial education, financial literacy, investment basics, budgeting, savings, money management" },
  ];
}

export default function LearnPage() {
  return <Learn />;
}
