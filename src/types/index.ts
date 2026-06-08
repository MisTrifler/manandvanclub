import { ReactNode } from "react";

export interface Service {
  t: string;
  d: string;
  i: ReactNode;
  h: string;
  img: string;
}

export interface Testimonial {
  name: string;
  city: string;
  quote: string;
}

export interface Step {
  t: string;
  d: string;
}
