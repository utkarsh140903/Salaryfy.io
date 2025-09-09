import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("calculator", "routes/calculator.tsx"),
  route("salary-breakdown", "routes/salary-breakdown.tsx"),
  route("tax-info", "routes/tax-info.tsx"),
  route("learn", "routes/learn.tsx"),
] satisfies RouteConfig;
