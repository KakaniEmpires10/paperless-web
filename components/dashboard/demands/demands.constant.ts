import type { PricingDemand, PricingPlan } from "~/server/db/schema";

export type Demands = Omit<PricingDemand, "pricingPlanId"> & {
    pricing: Pick<PricingPlan, "id" | "name" | "type"> | null
}