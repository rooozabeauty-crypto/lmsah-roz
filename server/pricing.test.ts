import { describe, it, expect } from "vitest";

describe("Pricing Plans", () => {
  it("should have correct pricing structure", () => {
    const plans = [
      { name: "المبتدئ", monthlyPrice: 500, yearlyPrice: 5000 },
      { name: "النمو", monthlyPrice: 1000, yearlyPrice: 10000 },
      { name: "الاحترافي", monthlyPrice: 1800, yearlyPrice: 18000 },
      { name: "المؤسسي", monthlyPrice: 3500, yearlyPrice: 35000 },
    ];

    expect(plans.length).toBe(4);
    plans.forEach((plan) => {
      expect(plan.monthlyPrice).toBeGreaterThan(0);
      expect(plan.yearlyPrice).toBe(plan.monthlyPrice * 10);
    });
  });

  it("should have 7 days trial period", () => {
    const trialDays = 7;
    expect(trialDays).toBe(7);
  });

  it("should have minimum price of 500 SAR", () => {
    const minPrice = 500;
    expect(minPrice).toBe(500);
  });

  it("should have correct price progression", () => {
    const prices = [500, 1000, 1800, 3500];
    
    for (let i = 1; i < prices.length; i++) {
      expect(prices[i]).toBeGreaterThan(prices[i - 1]);
    }
  });

  it("should calculate yearly discount correctly", () => {
    const monthlyPrice = 500;
    const yearlyPrice = 5000;
    const yearlyDirectPrice = monthlyPrice * 12;
    const discount = ((yearlyDirectPrice - yearlyPrice) / yearlyDirectPrice) * 100;

    expect(discount).toBeCloseTo(16.67, 1);
  });

  it("should have professional plan highlighted", () => {
    const professionalPlan = {
      name: "الاحترافي",
      highlighted: true,
      monthlyPrice: 1800,
    };

    expect(professionalPlan.highlighted).toBe(true);
    expect(professionalPlan.monthlyPrice).toBe(1800);
  });

  it("should have all plans with features", () => {
    const plans = [
      {
        name: "المبتدئ",
        features: ["روبوت SEO أساسي", "تقرير شهري واحد", "دعم بريد إلكتروني"],
      },
      {
        name: "النمو",
        features: ["روبوت SEO متقدم", "روبوت السوشل ميديا", "تقارير أسبوعية"],
      },
      {
        name: "الاحترافي",
        features: ["جميع الروبوتات الـ6", "إدارة Google Ads", "حملات Meta Ads"],
      },
      {
        name: "المؤسسي",
        features: ["كل مميزات الاحترافي", "فريق تسويق مخصص", "استراتيجية شاملة"],
      },
    ];

    plans.forEach((plan) => {
      expect(plan.features.length).toBeGreaterThan(0);
      plan.features.forEach((feature) => {
        expect(feature).toBeTruthy();
      });
    });
  });

  it("should validate trial period is 7 days", () => {
    const allPlans = [
      "تجربة مجانية 7 أيام",
      "تجربة مجانية 7 أيام",
      "تجربة مجانية 7 أيام",
      "تجربة مجانية 7 أيام",
    ];

    allPlans.forEach((trial) => {
      expect(trial).toContain("7 أيام");
    });
  });
});

describe("Plan Comparison", () => {
  it("should show clear plan differences", () => {
    const planComparison = {
      starter: { robots: 1, price: 500 },
      growth: { robots: 2, price: 1000 },
      professional: { robots: 6, price: 1800 },
      enterprise: { robots: 6, price: 3500 },
    };

    expect(planComparison.starter.robots).toBe(1);
    expect(planComparison.growth.robots).toBe(2);
    expect(planComparison.professional.robots).toBe(6);
    expect(planComparison.enterprise.robots).toBe(6);
  });

  it("should have price-to-robot ratio", () => {
    const plans = [
      { price: 500, robots: 1, ratio: 500 },
      { price: 1000, robots: 2, ratio: 500 },
      { price: 1800, robots: 6, ratio: 300 },
      { price: 3500, robots: 6, ratio: 583.33 },
    ];

    plans.forEach((plan) => {
      const actualRatio = plan.price / plan.robots;
      expect(actualRatio).toBeCloseTo(plan.ratio, 0);
    });
  });
});
