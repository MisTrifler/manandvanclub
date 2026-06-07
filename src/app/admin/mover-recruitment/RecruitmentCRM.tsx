"use client";

import { useState, useMemo, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  Search, Plus, Phone, Mail, MessageSquare, Calendar,
  CheckCircle2, XCircle, Clock, MapPin, FileText,
  Download, Filter, ChevronDown, ChevronUp, Edit,
  Trash2, Eye, X, ArrowLeft, Star, ShieldCheck,
  AlertCircle, TrendingUp, Users, Check, ChevronLeft,
  ChevronRight, Send, MoreHorizontal, Zap, Lock,
  Bell, BarChart3
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type Status =
  | "Not Contacted"
  | "Contacted"
  | "Left Voicemail"
  | "Email Sent"
  | "Interested"
  | "Follow Up Required"
  | "Applied"
  | "Approved"
  | "Rejected"
  | "Inactive";

const STATUSES: Status[] = [
  "Not Contacted", "Contacted", "Left Voicemail", "Email Sent",
  "Interested", "Follow Up Required", "Applied", "Approved", "Rejected", "Inactive"
];

const STATUS_STYLES: Record<Status, string> = {
  "Not Contacted": "bg-gray-100 text-gray-700 border-gray-200",
  "Contacted": "bg-blue-50 text-blue-700 border-blue-200",
  "Left Voicemail": "bg-amber-50 text-amber-700 border-amber-200",
  "Email Sent": "bg-purple-50 text-purple-700 border-purple-200",
  "Interested": "bg-emerald-50 text-emerald-700 border-emerald-200",
  "Follow Up Required": "bg-orange-50 text-orange-700 border-orange-200",
  "Applied": "bg-teal-50 text-teal-700 border-teal-200",
  "Approved": "bg-green-50 text-green-700 border-green-200",
  "Rejected": "bg-red-50 text-red-700 border-red-200",
  "Inactive": "bg-slate-100 text-slate-600 border-slate-200",
};

interface ContactLog {
  id: string;
  date: string;
  time: string;
  method: string;
  notes: string;
  outcome: string;
}

interface Company {
  id: string;
  businessName: string;
  contactName: string;
  phone: string;
  email: string;
  website: string;
  city: string;
  county: string;
  coverageArea: string;
  dateAdded: string;
  lastContactDate: string;
  nextFollowUpDate: string;
  status: Status;
  notes: string;
  contactHistory: ContactLog[];
  documentsReceived: string[];
}

const STORAGE_KEY = "mvc-recruitment-crm";

function generateId() {
  return Math.random().toString(36).substring(2, 10).toUpperCase();
}

function todayStr() {
  return new Date().toISOString().split("T")[0];
}

function timeStr() {
  return new Date().toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });
}

function addDays(dateStr: string, days: number) {
  const d = new Date(dateStr);
  d.setDate(d.getDate() + days);
  return d.toISOString().split("T")[0];
}

function isOverdue(dateStr: string) {
  return dateStr && new Date(dateStr) < new Date(todayStr());
}

function isToday(dateStr: string) {
  return dateStr === todayStr();
}

const SAMPLE_DATA: Company[] = [
  {
    id: generateId(),
    businessName: "Swift Moves Birmingham",
    contactName: "James Wilson",
    phone: "07912 345678",
    email: "james@swiftmoves.co.uk",
    website: "swiftmoves.co.uk",
    city: "Birmingham",
    county: "West Midlands",
    coverageArea: "Birmingham, Solihull, Coventry",
    dateAdded: "2026-05-15",
    lastContactDate: "2026-06-05",
    nextFollowUpDate: "2026-06-10",
    status: "Interested",
    notes: "Spoke on phone. Interested in joining. Needs to send insurance docs.",
    contactHistory: [
      { id: generateId(), date: "2026-06-05", time: "14:30", method: "Phone Call", notes: "Introduced platform. He was interested.", outcome: "Interested - waiting for docs" },
      { id: generateId(), date: "2026-05-20", time: "09:15", method: "Email", notes: "Sent initial outreach email.", outcome: "No response yet" },
    ],
    documentsReceived: [],
  },
  {
    id: generateId(),
    businessName: "Manchester Man & Van",
    contactName: "Sarah Ahmed",
    phone: "07923 456789",
    email: "sarah@mancvan.co.uk",
    website: "mancvan.co.uk",
    city: "Manchester",
    county: "Greater Manchester",
    coverageArea: "Manchester, Salford, Stockport",
    dateAdded: "2026-05-20",
    lastContactDate: "2026-06-01",
    nextFollowUpDate: "2026-06-08",
    status: "Follow Up Required",
    notes: "Left voicemail. Follow up needed.",
    contactHistory: [
      { id: generateId(), date: "2026-06-01", time: "11:00", method: "Phone Call", notes: "No answer. Left voicemail.", outcome: "Left voicemail" },
    ],
    documentsReceived: [],
  },
  {
    id: generateId(),
    businessName: "Leeds Relocations",
    contactName: "Tom Brown",
    phone: "07934 567890",
    email: "tom@leedsrelocations.com",
    website: "leedsrelocations.com",
    city: "Leeds",
    county: "West Yorkshire",
    coverageArea: "Leeds, Bradford, Wakefield",
    dateAdded: "2026-04-10",
    lastContactDate: "2026-05-28",
    nextFollowUpDate: "",
    status: "Approved",
    notes: "Fully approved. Insurance verified. Active on platform.",
    contactHistory: [
      { id: generateId(), date: "2026-05-28", time: "10:00", method: "Email", notes: "Welcome email sent. Account activated.", outcome: "Approved and active" },
      { id: generateId(), date: "2026-05-15", time: "16:00", method: "Phone Call", notes: "Verified insurance documents.", outcome: "Docs approved" },
    ],
    documentsReceived: ["Goods in Transit Insurance", "Public Liability Insurance"],
  },
];

export default function RecruitmentCRM() {
  // Admin check placeholder
  const [isAdmin, setIsAdmin] = useState(true); // TODO: Replace with actual auth check

  const [companies, setCompanies] = useState<Company[]>([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<Status | "All">("All");
  const [cityFilter, setCityFilter] = useState("");
  const [countyFilter, setCountyFilter] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const [showDetail, setShowDetail] = useState(false);
  const [showContactLog, setShowContactLog] = useState(false);
  const [sortField, setSortField] = useState<keyof Company>("dateAdded");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");
  const [activeTab, setActiveTab] = useState<"info" | "history" | "notes">("info");
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 10;
  const [emailSending, setEmailSending] = useState<string | null>(null);
  const [emailSent, setEmailSent] = useState<string | null>(null);

  // Load data
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setCompanies(JSON.parse(stored));
      } catch {
        setCompanies(SAMPLE_DATA);
      }
    } else {
      setCompanies(SAMPLE_DATA);
    }
  }, []);

  // Save data
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(companies));
  }, [companies]);

  // Reset page on filter change
  useEffect(() => {
    setCurrentPage(1);
  }, [search, statusFilter, cityFilter, countyFilter]);

  const filtered = useMemo(() => {
    let result = companies.filter((c) => {
      const q = search.toLowerCase();
      const matchSearch =
        !q ||
        c.businessName.toLowerCase().includes(q) ||
        c.contactName.toLowerCase().includes(q) ||
        c.phone.includes(q) ||
        c.email.toLowerCase().includes(q) ||
        c.city.toLowerCase().includes(q) ||
        c.county.toLowerCase().includes(q);
      const matchStatus = statusFilter === "All" || c.status === statusFilter;
      const matchCity = !cityFilter || c.city.toLowerCase().includes(cityFilter.toLowerCase());
      const matchCounty = !countyFilter || c.county.toLowerCase().includes(countyFilter.toLowerCase());
      return matchSearch && matchStatus && matchCity && matchCounty;
    });
    result.sort((a, b) => {
      const aVal = a[sortField] || "";
      const bVal = b[sortField] || "";
      return sortDir === "asc" ? (aVal > bVal ? 1 : -1) : aVal > bVal ? -1 : 1;
    });
    return result;
  }, [companies, search, statusFilter, cityFilter, countyFilter, sortField, sortDir]);

  const paginated = useMemo(() => {
    const start = (currentPage - 1) * perPage;
    return filtered.slice(start, start + perPage);
  }, [filtered, currentPage]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));

  // Stats
  const stats = useMemo(() => {
    const cities = new Set(companies.map((c) => c.city)).size;
    const counties = new Set(companies.map((c) => c.county)).size;
    const approved = companies.filter((c) => c.status === "Approved").length;
    const pending = companies.filter((c) => c.status === "Applied" || c.status === "Interested").length;
    const contacted = companies.filter((c) => c.status !== "Not Contacted").length;
    const interested = companies.filter((c) => c.status === "Interested").length;
    const conversionRate = contacted > 0 ? Math.round((interested / contacted) * 100) : 0;
    return { cities, counties, approved, pending, contacted, interested, conversionRate };
  }, [companies]);

  // Reminders
  const reminders = useMemo(() => {
    const today: Company[] = [];
    const overdue: Company[] = [];
    const upcoming: Company[] = [];
    companies.forEach((c) => {
      if (!c.nextFollowUpDate) return;
      if (isToday(c.nextFollowUpDate)) today.push(c);
      else if (isOverdue(c.nextFollowUpDate)) overdue.push(c);
      else if (new Date(c.nextFollowUpDate) <= new Date(addDays(todayStr(), 7))) upcoming.push(c);
    });
    return { today, overdue, upcoming };
  }, [companies]);

  const reminderCount = reminders.today.length + reminders.overdue.length;

  // Duplicate detection
  const checkDuplicate = useCallback(
    (data: Partial<Company>, excludeId?: string) => {
      return companies.find((c) => {
        if (excludeId && c.id === excludeId) return false;
        return (
          (data.phone && c.phone === data.phone) ||
          (data.email && c.email.toLowerCase() === data.email.toLowerCase()) ||
          (data.website && c.website.toLowerCase() === data.website.toLowerCase()) ||
          (data.businessName && c.businessName.toLowerCase() === data.businessName.toLowerCase())
        );
      });
    },
    [companies]
  );

  // Add company
  const addCompany = useCallback(
    (data: Omit<Company, "id" | "dateAdded" | "contactHistory" | "documentsReceived">) => {
      const dup = checkDuplicate(data);
      if (dup) {
        alert(`Duplicate detected: "${dup.businessName}" already exists (${dup.status}).`);
        return false;
      }
      const newCompany: Company = {
        ...data,
        id: generateId(),
        dateAdded: todayStr(),
        contactHistory: [],
        documentsReceived: [],
      };
      setCompanies((prev) => [newCompany, ...prev]);
      return true;
    },
    [checkDuplicate]
  );

  // Update company
  const updateCompany = useCallback((id: string, updates: Partial<Company>) => {
    setCompanies((prev) =>
      prev.map((c) => (c.id === id ? { ...c, ...updates } : c))
    );
  }, []);

  // Delete company
  const deleteCompany = useCallback((id: string) => {
    if (confirm("Delete this company permanently?")) {
      setCompanies((prev) => prev.filter((c) => c.id !== id));
      if (selectedCompany?.id === id) {
        setSelectedCompany(null);
        setShowDetail(false);
      }
    }
  }, [selectedCompany]);

  // Log contact
  const logContact = useCallback(
    (companyId: string, log: Omit<ContactLog, "id" | "date" | "time">) => {
      const newLog: ContactLog = {
        ...log,
        id: generateId(),
        date: todayStr(),
        time: timeStr(),
      };
      setCompanies((prev) =>
        prev.map((c) =>
          c.id === companyId
            ? {
                ...c,
                contactHistory: [newLog, ...c.contactHistory],
                lastContactDate: todayStr(),
              }
            : c
        )
      );
    },
    []
  );

  // Export CSV
  const exportCSV = useCallback(() => {
    const headers = [
      "ID", "Business Name", "Contact Name", "Phone", "Email", "Website",
      "City", "County", "Coverage Area", "Date Added", "Last Contact",
      "Next Follow-Up", "Status", "Notes", "Contact Count", "Documents"
    ];
    const rows = filtered.map((c) => [
      c.id, c.businessName, c.contactName, c.phone, c.email, c.website,
      c.city, c.county, c.coverageArea, c.dateAdded, c.lastContactDate,
      c.nextFollowUpDate, c.status, c.notes.replace(/"/g, '""'),
      c.contactHistory.length, c.documentsReceived.join("; ")
    ]);
    const csv = [headers, ...rows].map((r) => r.map((f) => `"${f}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `mover-recruitment-${todayStr()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }, [filtered]);

  // Quick status change
  const quickStatus = useCallback((companyId: string, newStatus: Status) => {
    updateCompany(companyId, { status: newStatus });
  }, [updateCompany]);

  // Send recruitment email
  const sendRecruitmentEmail = useCallback(async (company: Company) => {
    setEmailSending(company.id);
    setEmailSent(null);
    try {
      const res = await fetch('/api/send-recruitment-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: company.email,
          businessName: company.businessName,
          contactName: company.contactName,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed');
      setEmailSent(company.id);
      // Log the contact automatically
      logContact(company.id, {
        method: 'Email',
        notes: 'Sent recruitment email via CRM with why-join and apply-to-join links.',
        outcome: 'Recruitment email sent successfully',
      });
    } catch (err: any) {
      alert(`Error sending email: ${err.message}`);
    } finally {
      setEmailSending(null);
    }
  }, [logContact]);

  // Unique filter values
  const uniqueCities = useMemo(() => Array.from(new Set(companies.map((c) => c.city))).sort(), [companies]);
  const uniqueCounties = useMemo(() => Array.from(new Set(companies.map((c) => c.county))).sort(), [companies]);

  // Auth placeholder
  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-[#F9F9F7] flex items-center justify-center">
        <div className="bg-white p-12 rounded-[2.5rem] shadow-2xl border border-border text-center space-y-6">
          <Lock size={48} className="text-primary mx-auto" />
          <h2 className="text-3xl font-black text-primary uppercase tracking-tighter">Admin Only</h2>
          <p className="text-text-secondary">You must be logged in as an administrator to access this page.</p>
          <Link href="/login" className="btn-orange inline-block px-10 py-4 rounded-xl font-black uppercase tracking-widest text-xs">
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F9F9F7]">
      {/* Header */}
      <div className="bg-white border-b border-border sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/" className="flex items-center gap-2">
                <div className="bg-primary p-1.5 rounded">
                  <span className="text-white font-black text-sm leading-none">M&V</span>
                </div>
                <span className="text-lg font-black text-primary tracking-tighter uppercase">
                  MAN<span className="text-accent">&</span>VAN
                </span>
              </Link>
              <div className="hidden md:block w-px h-6 bg-border" />
              <div className="hidden md:flex items-center gap-2 text-primary/60">
                <BarChart3 size={16} />
                <span className="text-xs font-black uppercase tracking-widest">Mover Recruitment CRM</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              {reminderCount > 0 && (
                <div className="relative">
                  <Bell size={20} className="text-primary" />
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-accent text-white text-[10px] font-black rounded-full flex items-center justify-center">
                    {reminderCount}
                  </span>
                </div>
              )}
              <button onClick={exportCSV} className="hidden md:flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-accent transition-colors">
                <Download size={14} /> Export CSV
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="bg-primary text-white py-6 border-b border-white/10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
            {[
              { label: "Cities", value: stats.cities, icon: <MapPin size={14} /> },
              { label: "Counties", value: stats.counties, icon: <MapPin size={14} /> },
              { label: "Approved", value: stats.approved, icon: <CheckCircle2 size={14} /> },
              { label: "Pending", value: stats.pending, icon: <Clock size={14} /> },
              { label: "Contacted", value: stats.contacted, icon: <Phone size={14} /> },
              { label: "Interested", value: stats.interested, icon: <Star size={14} /> },
              { label: "Conversion", value: `${stats.conversionRate}%`, icon: <TrendingUp size={14} /> },
            ].map((s, i) => (
              <div key={i} className="text-center">
                <div className="text-accent text-xs mb-1">{s.icon}</div>
                <div className="text-2xl font-black tracking-tighter">{s.value}</div>
                <div className="text-[9px] font-black uppercase tracking-widest text-white/50">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Reminders */}
      {(reminders.today.length > 0 || reminders.overdue.length > 0) && (
        <div className="container mx-auto px-4 mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {reminders.overdue.length > 0 && (
              <div className="bg-red-50 border border-red-200 rounded-2xl p-4">
                <div className="flex items-center gap-2 mb-3">
                  <AlertCircle size={16} className="text-red-600" />
                  <h3 className="text-xs font-black uppercase tracking-widest text-red-700">
                    Overdue Follow-Ups ({reminders.overdue.length})
                  </h3>
                </div>
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {reminders.overdue.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => { setSelectedCompany(c); setShowDetail(true); }}
                      className="w-full flex items-center justify-between p-3 bg-white rounded-xl border border-red-200 text-left hover:shadow-md transition-all"
                    >
                      <div>
                        <div className="font-bold text-sm text-primary">{c.businessName}</div>
                        <div className="text-[10px] text-red-600 font-black uppercase tracking-wider">
                          Due: {c.nextFollowUpDate}
                        </div>
                      </div>
                      <ChevronRight size={16} className="text-red-400" />
                    </button>
                  ))}
                </div>
              </div>
            )}
            {reminders.today.length > 0 && (
              <div className="bg-orange-50 border border-orange-200 rounded-2xl p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Clock size={16} className="text-orange-600" />
                  <h3 className="text-xs font-black uppercase tracking-widest text-orange-700">
                    Today's Follow-Ups ({reminders.today.length})
                  </h3>
                </div>
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {reminders.today.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => { setSelectedCompany(c); setShowDetail(true); }}
                      className="w-full flex items-center justify-between p-3 bg-white rounded-xl border border-orange-200 text-left hover:shadow-md transition-all"
                    >
                      <div>
                        <div className="font-bold text-sm text-primary">{c.businessName}</div>
                        <div className="text-[10px] text-orange-600 font-black uppercase tracking-wider">
                          {c.city}, {c.county}
                        </div>
                      </div>
                      <ChevronRight size={16} className="text-orange-400" />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Filters & Actions */}
      <div className="container mx-auto px-4 mt-6">
        <div className="bg-white rounded-2xl border border-border p-4 md:p-6 space-y-4">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-primary/30" />
              <input
                type="text"
                placeholder="Search by name, phone, email, city, county..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-50 border-2 border-transparent focus:border-accent rounded-xl font-bold text-sm outline-none"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as Status | "All")}
                className="px-4 py-3 bg-gray-50 border-2 border-transparent focus:border-accent rounded-xl font-bold text-sm outline-none cursor-pointer"
              >
                <option value="All">All Statuses</option>
                {STATUSES.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
              <select
                value={cityFilter}
                onChange={(e) => setCityFilter(e.target.value)}
                className="px-4 py-3 bg-gray-50 border-2 border-transparent focus:border-accent rounded-xl font-bold text-sm outline-none cursor-pointer"
              >
                <option value="">All Cities</option>
                {uniqueCities.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
              <select
                value={countyFilter}
                onChange={(e) => setCountyFilter(e.target.value)}
                className="px-4 py-3 bg-gray-50 border-2 border-transparent focus:border-accent rounded-xl font-bold text-sm outline-none cursor-pointer"
              >
                <option value="">All Counties</option>
                {uniqueCounties.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
              <button
                onClick={() => setShowAddForm(true)}
                className="btn-orange flex items-center gap-2 px-6 py-3 rounded-xl font-black uppercase tracking-widest text-[10px]"
              >
                <Plus size={14} /> Add Company
              </button>
            </div>
          </div>
          <div className="flex items-center justify-between text-xs text-primary/50">
            <span className="font-bold">{filtered.length} companies</span>
            <button onClick={() => { setSearch(""); setStatusFilter("All"); setCityFilter(""); setCountyFilter(""); }} className="text-accent font-black uppercase tracking-widest text-[10px] hover:underline">
              Clear Filters
            </button>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="container mx-auto px-4 mt-6 pb-24">
        <div className="bg-white rounded-2xl border border-border overflow-hidden">
          {/* Mobile Cards */}
          <div className="md:hidden">
            {paginated.map((c) => (
              <div key={c.id} className="p-4 border-b border-border last:border-0">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <div className="font-bold text-primary">{c.businessName}</div>
                    <div className="text-xs text-text-secondary">{c.contactName}</div>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border ${STATUS_STYLES[c.status]}`}>
                    {c.status}
                  </span>
                </div>
                <div className="text-xs text-text-secondary mb-2">
                  {c.city}, {c.county} • {c.phone}
                </div>
                <div className="flex items-center gap-2 text-[10px] text-primary/40">
                  {c.nextFollowUpDate && (
                    <span className={isOverdue(c.nextFollowUpDate) ? "text-red-500 font-bold" : ""}>
                      Follow-up: {c.nextFollowUpDate}
                    </span>
                  )}
                </div>
                <div className="flex gap-2 mt-3">
                  <button
                    onClick={() => { setSelectedCompany(c); setShowDetail(true); }}
                    className="flex-1 py-2 bg-primary text-white rounded-lg font-black uppercase text-[10px] tracking-widest"
                  >
                    View
                  </button>
                  <a href={`tel:${c.phone}`} className="p-2 bg-gray-50 rounded-lg text-primary">
                    <Phone size={16} />
                  </a>
                  <a href={`mailto:${c.email}`} className="p-2 bg-gray-50 rounded-lg text-primary">
                    <Mail size={16} />
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-gray-50/50">
                  {[
                    { key: "businessName", label: "Business" },
                    { key: "city", label: "City/County" },
                    { key: "phone", label: "Phone" },
                    { key: "email", label: "Email" },
                    { key: "status", label: "Status" },
                    { key: "lastContactDate", label: "Last Contact" },
                    { key: "nextFollowUpDate", label: "Next Follow-Up" },
                    { key: "actions", label: "" },
                  ].map((col) => (
                    <th
                      key={col.key}
                      className="px-4 py-3 text-left text-[10px] font-black uppercase tracking-widest text-primary/40 cursor-pointer select-none"
                      onClick={() => {
                        if (col.key === "actions") return;
                        if (sortField === col.key) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
                        else { setSortField(col.key as keyof Company); setSortDir("asc"); }
                      }}
                    >
                      <div className="flex items-center gap-1">
                        {col.label}
                        {sortField === col.key && (
                          sortDir === "asc" ? <ChevronUp size={12} /> : <ChevronDown size={12} />
                        )}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {paginated.map((c) => (
                  <tr key={c.id} className="border-b border-border/50 hover:bg-gray-50/50 transition-colors">
                    <td className="px-4 py-3">
                      <div className="font-bold text-primary">{c.businessName}</div>
                      <div className="text-xs text-text-secondary">{c.contactName}</div>
                    </td>
                    <td className="px-4 py-3 text-text-secondary">
                      {c.city}<br /><span className="text-xs">{c.county}</span>
                    </td>
                    <td className="px-4 py-3">
                      <a href={`tel:${c.phone}`} className="text-primary hover:text-accent font-medium text-xs">
                        {c.phone}
                      </a>
                    </td>
                    <td className="px-4 py-3">
                      <a href={`mailto:${c.email}`} className="text-primary hover:text-accent font-medium text-xs">
                        {c.email}
                      </a>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`inline-block px-2 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border ${STATUS_STYLES[c.status]}`}>
                        {c.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-xs text-text-secondary">{c.lastContactDate || "—"}</td>
                    <td className="px-4 py-3 text-xs">
                      {c.nextFollowUpDate ? (
                        <span className={isOverdue(c.nextFollowUpDate) ? "text-red-600 font-bold" : isToday(c.nextFollowUpDate) ? "text-orange-600 font-bold" : "text-text-secondary"}>
                          {c.nextFollowUpDate}
                        </span>
                      ) : (
                        "—"
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => { setSelectedCompany(c); setShowDetail(true); }}
                          className="p-2 hover:bg-gray-100 rounded-lg text-primary/60 hover:text-primary transition-colors"
                          title="View Details"
                        >
                          <Eye size={16} />
                        </button>
                        <a href={`tel:${c.phone}`} className="p-2 hover:bg-gray-100 rounded-lg text-primary/60 hover:text-primary transition-colors" title="Call">
                          <Phone size={16} />
                        </a>
                        <a href={`mailto:${c.email}`} className="p-2 hover:bg-gray-100 rounded-lg text-primary/60 hover:text-primary transition-colors" title="Email">
                          <Mail size={16} />
                        </a>
                        <button
                          onClick={() => deleteCompany(c.id)}
                          className="p-2 hover:bg-red-50 rounded-lg text-primary/60 hover:text-red-500 transition-colors"
                          title="Delete"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between px-4 py-3 border-t border-border">
              <div className="text-xs text-primary/40 font-bold">
                Page {currentPage} of {totalPages}
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-30 text-primary"
                >
                  <ChevronLeft size={16} />
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                  <button
                    key={p}
                    onClick={() => setCurrentPage(p)}
                    className={`w-8 h-8 rounded-lg font-black text-xs ${p === currentPage ? "bg-primary text-white" : "hover:bg-gray-100 text-primary"}`}
                  >
                    {p}
                  </button>
                ))}
                <button
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-30 text-primary"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Add Company Modal */}
      <AnimatePresence>
        {showAddForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-black/50 flex items-start justify-center overflow-y-auto p-4"
            onClick={() => setShowAddForm(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              className="bg-white rounded-[2.5rem] border border-border shadow-2xl w-full max-w-2xl my-8 relative overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-8 md:p-12 space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-3xl font-black text-primary uppercase tracking-tighter">Add Company</h2>
                  <button onClick={() => setShowAddForm(false)} className="p-2 hover:bg-gray-100 rounded-xl text-primary/60">
                    <X size={24} />
                  </button>
                </div>
                <AddCompanyForm
                  onSubmit={(data) => {
                    if (addCompany(data)) {
                      setShowAddForm(false);
                    }
                  }}
                  checkDuplicate={checkDuplicate}
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Company Detail Modal */}
      <AnimatePresence>
        {showDetail && selectedCompany && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-black/50 flex items-start justify-center overflow-y-auto p-4"
            onClick={() => setShowDetail(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              className="bg-white rounded-[2.5rem] border border-border shadow-2xl w-full max-w-4xl my-8 relative overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-8 md:p-12 space-y-6">
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-3xl font-black text-primary uppercase tracking-tighter">{selectedCompany.businessName}</h2>
                    <p className="text-text-secondary mt-1">{selectedCompany.contactName} • {selectedCompany.city}, {selectedCompany.county}</p>
                  </div>
                  <button onClick={() => setShowDetail(false)} className="p-2 hover:bg-gray-100 rounded-xl text-primary/60">
                    <X size={24} />
                  </button>
                </div>

                {/* Tabs */}
                <div className="flex gap-2 border-b border-border pb-1">
                  {(["info", "history", "notes"] as const).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`px-4 py-2 rounded-t-xl font-black uppercase text-[10px] tracking-widest transition-colors ${
                        activeTab === tab ? "bg-primary text-white" : "text-primary/40 hover:text-primary"
                      }`}
                    >
                      {tab === "info" ? "Information" : tab === "history" ? "Contact History" : "Notes"}
                    </button>
                  ))}
                </div>

                {/* Tab Content */}
                <div className="min-h-[300px]">
                  {activeTab === "info" && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <InfoField label="Business Name" value={selectedCompany.businessName} />
                        <InfoField label="Contact Name" value={selectedCompany.contactName} />
                        <InfoField label="Phone" value={selectedCompany.phone} isLink={`tel:${selectedCompany.phone}`} />
                        <InfoField label="Email" value={selectedCompany.email} isLink={`mailto:${selectedCompany.email}`} />
                        <InfoField label="Website" value={selectedCompany.website || "—"} isLink={selectedCompany.website ? `https://${selectedCompany.website}` : undefined} />
                      </div>
                        <div className="space-y-4">
                          <InfoField label="City" value={selectedCompany.city} />
                          <InfoField label="County" value={selectedCompany.county} />
                          <InfoField label="Coverage Area" value={selectedCompany.coverageArea} />
                          <InfoField label="Date Added" value={selectedCompany.dateAdded} />
                          <InfoField label="Last Contact" value={selectedCompany.lastContactDate || "—"} />
                          <InfoField label="Next Follow-Up" value={selectedCompany.nextFollowUpDate || "—"} />
                        </div>

                        {/* Send Recruitment Email */}
                        <div className="md:col-span-2">
                          <div className="bg-[#F9F9F7] rounded-2xl p-4 border border-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-accent/10 rounded-xl flex items-center justify-center text-accent">
                                <Send size={18} />
                              </div>
                              <div>
                                <div className="text-sm font-bold text-primary">Send Recruitment Email</div>
                                <div className="text-xs text-text-secondary">Send why-join and apply links to {selectedCompany.email}</div>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              {emailSent === selectedCompany.id && (
                                <span className="text-xs font-bold text-green-600 flex items-center gap-1">
                                  <CheckCircle2 size={14} /> Sent
                                </span>
                              )}
                              <button
                                onClick={() => sendRecruitmentEmail(selectedCompany)}
                                disabled={emailSending === selectedCompany.id}
                                className="btn-orange px-5 py-3 rounded-xl font-black uppercase tracking-widest text-[10px] inline-flex items-center gap-2 disabled:opacity-50"
                              >
                                {emailSending === selectedCompany.id ? (
                                  <span className="flex items-center gap-2">
                                    <span className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" /> Sending...
                                  </span>
                                ) : (
                                  <span className="flex items-center gap-2">
                                    <Mail size={14} /> Send Email
                                  </span>
                                )}
                              </button>
                            </div>
                          </div>
                        </div>

                        <div className="md:col-span-2">
                          <div className="text-[10px] font-black uppercase tracking-widest text-primary/40 mb-2">Status</div>
                        <div className="flex flex-wrap gap-2">
                          {STATUSES.map((s) => (
                            <button
                              key={s}
                              onClick={() => quickStatus(selectedCompany.id, s)}
                              className={`px-3 py-2 rounded-xl text-[10px] font-black uppercase tracking-wider border transition-all ${
                                selectedCompany.status === s
                                  ? STATUS_STYLES[s]
                                  : "bg-gray-50 text-primary/40 border-gray-100 hover:border-gray-300"
                              }`}
                            >
                              {s}
                            </button>
                          ))}
                        </div>
                      </div>
                      {selectedCompany.documentsReceived.length > 0 && (
                        <div className="md:col-span-2">
                          <div className="text-[10px] font-black uppercase tracking-widest text-primary/40 mb-2">Documents Received</div>
                          <div className="flex flex-wrap gap-2">
                            {selectedCompany.documentsReceived.map((doc) => (
                              <span key={doc} className="px-3 py-2 bg-green-50 text-green-700 rounded-xl text-[10px] font-black uppercase tracking-wider border border-green-200">
                                <CheckCircle2 size={12} className="inline mr-1" /> {doc}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {activeTab === "history" && (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-sm font-black uppercase tracking-widest text-primary/40">Contact History</h3>
                        <button
                          onClick={() => setShowContactLog(true)}
                          className="btn-orange px-4 py-2 rounded-xl font-black uppercase tracking-widest text-[10px]"
                        >
                          Log Contact
                        </button>
                      </div>
                      {selectedCompany.contactHistory.length === 0 ? (
                        <p className="text-text-secondary text-sm py-8 text-center">No contact history yet.</p>
                      ) : (
                        <div className="space-y-3">
                          {selectedCompany.contactHistory.map((log) => (
                            <div key={log.id} className="bg-gray-50 p-4 rounded-xl border border-border">
                              <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center gap-2">
                                  <span className="text-[10px] font-black uppercase tracking-widest text-accent bg-accent/10 px-2 py-1 rounded">
                                    {log.method}
                                  </span>
                                  <span className="text-xs text-primary/40 font-bold">{log.date} at {log.time}</span>
                                </div>
                              </div>
                              <p className="text-sm text-primary font-medium">{log.notes}</p>
                              <p className="text-xs text-text-secondary mt-1">Outcome: {log.outcome}</p>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  {activeTab === "notes" && (
                    <div className="space-y-4">
                      <h3 className="text-sm font-black uppercase tracking-widest text-primary/40">Notes</h3>
                      <textarea
                        defaultValue={selectedCompany.notes}
                        onBlur={(e) => updateCompany(selectedCompany.id, { notes: e.target.value })}
                        className="w-full p-4 bg-gray-50 border-2 border-transparent focus:border-accent rounded-xl font-medium text-sm outline-none min-h-[200px]"
                        placeholder="Add notes about this company..."
                      />
                      <div className="flex flex-wrap gap-2">
                        <button
                          onClick={() => {
                            const date = prompt("Enter follow-up date (YYYY-MM-DD):", addDays(todayStr(), 7));
                            if (date) updateCompany(selectedCompany.id, { nextFollowUpDate: date });
                          }}
                          className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-xl font-black uppercase tracking-widest text-[10px]"
                        >
                          <Calendar size={12} /> Schedule Follow-Up
                        </button>
                        <button
                          onClick={() => {
                            const doc = prompt("Enter document name:");
                            if (doc) {
                              updateCompany(selectedCompany.id, {
                                documentsReceived: [...selectedCompany.documentsReceived, doc],
                              });
                            }
                          }}
                          className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-primary rounded-xl font-black uppercase tracking-widest text-[10px]"
                        >
                          <FileText size={12} /> Add Document
                        </button>
                        <button
                          onClick={() => deleteCompany(selectedCompany.id)}
                          className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-xl font-black uppercase tracking-widest text-[10px]"
                        >
                          <Trash2 size={12} /> Delete Company
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Contact Log Sub-Modal */}
              <AnimatePresence>
                {showContactLog && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-white/95 backdrop-blur-sm flex items-center justify-center p-8"
                  >
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="w-full max-w-lg space-y-6"
                    >
                      <div className="flex items-center justify-between">
                        <h3 className="text-2xl font-black text-primary uppercase tracking-tighter">Log Contact</h3>
                        <button onClick={() => setShowContactLog(false)} className="p-2 hover:bg-gray-100 rounded-xl">
                          <X size={24} className="text-primary/60" />
                        </button>
                      </div>
                      <ContactLogForm
                        onSubmit={(log) => {
                          logContact(selectedCompany.id, log);
                          setShowContactLog(false);
                          // Update selected company
                          setSelectedCompany((prev) =>
                            prev
                              ? {
                                  ...prev,
                                  contactHistory: [
                                    { ...log, id: generateId(), date: todayStr(), time: timeStr() },
                                    ...prev.contactHistory,
                                  ],
                                  lastContactDate: todayStr(),
                                }
                              : null
                          );
                        }}
                      />
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function InfoField({ label, value, isLink }: { label: string; value: string; isLink?: string }) {
  return (
    <div>
      <div className="text-[10px] font-black uppercase tracking-widest text-primary/40 mb-1">{label}</div>
      {isLink ? (
        <a href={isLink} className="text-sm font-bold text-primary hover:text-accent transition-colors">
          {value}
        </a>
      ) : (
        <div className="text-sm font-bold text-primary">{value}</div>
      )}
    </div>
  );
}

function AddCompanyForm({
  onSubmit,
  checkDuplicate,
}: {
  onSubmit: (data: Omit<Company, "id" | "dateAdded" | "contactHistory" | "documentsReceived">) => void;
  checkDuplicate: (data: Partial<Company>) => Company | undefined;
}) {
  const [form, setForm] = useState({
    businessName: "",
    contactName: "",
    phone: "",
    email: "",
    website: "",
    city: "",
    county: "",
    coverageArea: "",
    lastContactDate: "",
    nextFollowUpDate: "",
    status: "Not Contacted" as Status,
    notes: "",
  });
  const [dupWarning, setDupWarning] = useState<Company | null>(null);

  const handleChange = (field: string, value: string) => {
    const updated = { ...form, [field]: value };
    setForm(updated);
    const dup = checkDuplicate(updated);
    setDupWarning(dup || null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {dupWarning && (
        <div className="bg-red-50 border border-red-200 p-4 rounded-xl text-red-700 text-sm font-bold">
          <AlertCircle size={16} className="inline mr-2" />
          Possible duplicate: "{dupWarning.businessName}" already exists with status "{dupWarning.status}".
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase tracking-widest text-primary/40">Business Name *</label>
          <input required value={form.businessName} onChange={(e) => handleChange("businessName", e.target.value)} className="w-full p-3 bg-gray-50 border-2 border-transparent focus:border-accent rounded-xl font-bold text-sm outline-none" />
        </div>
        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase tracking-widest text-primary/40">Contact Name</label>
          <input value={form.contactName} onChange={(e) => handleChange("contactName", e.target.value)} className="w-full p-3 bg-gray-50 border-2 border-transparent focus:border-accent rounded-xl font-bold text-sm outline-none" />
        </div>
        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase tracking-widest text-primary/40">Phone *</label>
          <input required value={form.phone} onChange={(e) => handleChange("phone", e.target.value)} className="w-full p-3 bg-gray-50 border-2 border-transparent focus:border-accent rounded-xl font-bold text-sm outline-none" />
        </div>
        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase tracking-widest text-primary/40">Email *</label>
          <input required type="email" value={form.email} onChange={(e) => handleChange("email", e.target.value)} className="w-full p-3 bg-gray-50 border-2 border-transparent focus:border-accent rounded-xl font-bold text-sm outline-none" />
        </div>
        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase tracking-widest text-primary/40">Website</label>
          <input value={form.website} onChange={(e) => handleChange("website", e.target.value)} className="w-full p-3 bg-gray-50 border-2 border-transparent focus:border-accent rounded-xl font-bold text-sm outline-none" placeholder="example.co.uk" />
        </div>
        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase tracking-widest text-primary/40">City *</label>
          <input required value={form.city} onChange={(e) => handleChange("city", e.target.value)} className="w-full p-3 bg-gray-50 border-2 border-transparent focus:border-accent rounded-xl font-bold text-sm outline-none" />
        </div>
        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase tracking-widest text-primary/40">County *</label>
          <input required value={form.county} onChange={(e) => handleChange("county", e.target.value)} className="w-full p-3 bg-gray-50 border-2 border-transparent focus:border-accent rounded-xl font-bold text-sm outline-none" />
        </div>
        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase tracking-widest text-primary/40">Coverage Area</label>
          <input value={form.coverageArea} onChange={(e) => handleChange("coverageArea", e.target.value)} className="w-full p-3 bg-gray-50 border-2 border-transparent focus:border-accent rounded-xl font-bold text-sm outline-none" placeholder="e.g. Birmingham, Solihull" />
        </div>
        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase tracking-widest text-primary/40">Status</label>
          <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value as Status })} className="w-full p-3 bg-gray-50 border-2 border-transparent focus:border-accent rounded-xl font-bold text-sm outline-none cursor-pointer">
            {STATUSES.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase tracking-widest text-primary/40">Next Follow-Up Date</label>
          <input type="date" value={form.nextFollowUpDate} onChange={(e) => handleChange("nextFollowUpDate", e.target.value)} className="w-full p-3 bg-gray-50 border-2 border-transparent focus:border-accent rounded-xl font-bold text-sm outline-none" />
        </div>
      </div>
      <div className="space-y-2">
        <label className="text-[10px] font-black uppercase tracking-widest text-primary/40">Notes</label>
        <textarea value={form.notes} onChange={(e) => handleChange("notes", e.target.value)} className="w-full p-3 bg-gray-50 border-2 border-transparent focus:border-accent rounded-xl font-bold text-sm outline-none min-h-[100px]" placeholder="Initial notes about this company..." />
      </div>
      <button type="submit" className="btn-orange w-full py-5 rounded-xl font-black uppercase tracking-widest">
        Add Company
      </button>
    </form>
  );
}

function ContactLogForm({ onSubmit }: { onSubmit: (log: Omit<ContactLog, "id" | "date" | "time">) => void }) {
  const [method, setMethod] = useState("Phone Call");
  const [notes, setNotes] = useState("");
  const [outcome, setOutcome] = useState("");

  const methods = ["Phone Call", "Email", "WhatsApp", "SMS", "Other"];

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit({ method, notes, outcome });
      }}
      className="space-y-4"
    >
      <div className="space-y-2">
        <label className="text-[10px] font-black uppercase tracking-widest text-primary/40">Contact Method</label>
        <div className="flex flex-wrap gap-2">
          {methods.map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => setMethod(m)}
              className={`px-4 py-2 rounded-xl font-black uppercase text-[10px] tracking-wider border transition-all ${
                method === m ? "bg-primary text-white border-primary" : "bg-gray-50 text-primary/60 border-gray-200"
              }`}
            >
              {m}
            </button>
          ))}
        </div>
      </div>
      <div className="space-y-2">
        <label className="text-[10px] font-black uppercase tracking-widest text-primary/40">Notes</label>
        <textarea required value={notes} onChange={(e) => setNotes(e.target.value)} className="w-full p-3 bg-gray-50 border-2 border-transparent focus:border-accent rounded-xl font-bold text-sm outline-none min-h-[120px]" placeholder="What was discussed?" />
      </div>
      <div className="space-y-2">
        <label className="text-[10px] font-black uppercase tracking-widest text-primary/40">Outcome</label>
        <input value={outcome} onChange={(e) => setOutcome(e.target.value)} className="w-full p-3 bg-gray-50 border-2 border-transparent focus:border-accent rounded-xl font-bold text-sm outline-none" placeholder="e.g. Interested, No answer, Callback requested..." />
      </div>
      <button type="submit" className="btn-orange w-full py-5 rounded-xl font-black uppercase tracking-widest">
        Save Contact Log
      </button>
    </form>
  );
}
