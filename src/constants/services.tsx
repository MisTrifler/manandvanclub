import { Home, Building2, GraduationCap, Briefcase, Sofa, ShoppingBag, MapPin, Zap } from "lucide-react";
import { Service } from "@/types";

export const SERVICES: Service[] = [
  { 
    t: "House Removals", 
    d: "Moving your whole home to a new address", 
    i: <Home size={24} />, 
    h: "/house-removals", 
    img: "https://images.unsplash.com/photo-1600518464441-9154a4da21b5?q=80&w=800&auto=format&fit=crop" 
  },
  { 
    t: "Flat Moves", 
    d: "Specialist flat and apartment moving", 
    i: <Building2 size={24} />, 
    h: "/flat-removals", 
    img: "https://images.unsplash.com/photo-1599423300746-b62533397364?q=80&w=800&auto=format&fit=crop" 
  },
  { 
    t: "Student Moves", 
    d: "Affordable moves to and from university", 
    i: <GraduationCap size={24} />, 
    h: "/student-removals", 
    img: "https://images.unsplash.com/photo-1541339907198-e08759dfc3ef?q=80&w=800&auto=format&fit=crop" 
  },
  { 
    t: "Office Relocations", 
    d: "Desks, equipment and everything in between", 
    i: <Briefcase size={24} />, 
    h: "/office-removals", 
    img: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?q=80&w=800&auto=format&fit=crop" 
  },
  { 
    t: "Furniture Collection", 
    d: "Single items from shops or private sellers", 
    i: <Sofa size={24} />, 
    h: "/furniture-delivery-service", 
    img: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=800&auto=format&fit=crop" 
  },
  { 
    t: "Facebook Marketplace", 
    d: "We collect so you don't have to", 
    i: <ShoppingBag size={24} />, 
    h: "/facebook-marketplace-collection", 
    img: "https://images.unsplash.com/photo-1580674285054-bed31e145f59?q=80&w=800&auto=format&fit=crop" 
  },
  { 
    t: "Long Distance Moves", 
    d: "Anywhere in the UK, any distance", 
    i: <MapPin size={24} />, 
    h: "/long-distance-removals", 
    img: "https://images.unsplash.com/photo-1516542003828-597ca0b61640?q=80&w=800&auto=format&fit=crop" 
  },
  { 
    t: "Same Day Man & Van", 
    d: "Need it moved today? We can help", 
    i: <Zap size={24} />, 
    h: "/same-day-man-and-van", 
    img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=800&auto=format&fit=crop" 
  },
];
