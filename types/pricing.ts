export interface Feature {
  text: string;
  included: boolean;
}

export interface PlanProps {
  title: string;
  price: number;
  annualDiscount: number;
  duration: string;
  credits: number;
  features: Feature[];
  recommend?: boolean;
  bestValue?: boolean;
}

export interface PricingSectionProps {
  locale: any;
  langName: string;
}