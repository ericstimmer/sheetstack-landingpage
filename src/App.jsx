import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Check,
  ChevronRight,
  FileSpreadsheet,
  LockKeyhole,
  ShieldCheck,
  Sparkles,
  Zap
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0 }
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } }
};

const screens = {
  dashboard: "/screenshots/dashboard.png",
  config: "/screenshots/config.png",
  catalog: "/screenshots/catalog.png",
  daily: "/screenshots/daily-log.png"
};

const featureSections = [
  {
    label: "Dashboard",
    title: "See sales, costs and profit in one daily view.",
    copy: "The dashboard makes revenue, profit, margin, ROAS, refunds and goal progress visible without rebuilding reports every week.",
    image: screens.dashboard,
    stats: ["€1,350 revenue", "€334.90 profit", "26.6% margin"]
  },
  {
    label: "Config",
    title: "Set your store costs once, then reuse them everywhere.",
    copy: "Enter Shopify plan costs, app stack, shipping, COGS assumptions, payment fees and expected return rate so the rest of the sheet calculates from real inputs.",
    image: screens.config,
    stats: ["Overhead inputs", "Shipping & COGS", "Fees & returns"]
  },
  {
    label: "Catalog / Margins",
    title: "Know which products actually carry the store.",
    copy: "Track selling price, COGS, shipping, gross profit and margin signal by product so pricing and inventory decisions stay practical.",
    image: screens.catalog,
    stats: ["Product margin", "COGS by SKU", "Margin signal"]
  },
  {
    label: "Daily Log",
    title: "Log the numbers that affect profit in minutes.",
    copy: "Add revenue, orders, ad spend, returns and refunds. Net revenue, fees, COGS, shipping and profit update automatically.",
    image: screens.daily,
    stats: ["2-3 min daily", "Auto-calculated", "Refund tracking"]
  },
  {
    label: "Weekly & Monthly",
    title: "Review the store by week and month.",
    copy: "Use the dashboard totals and daily log inputs for clean weekly and monthly reviews without adding another screenshot section.",
    image: null,
    stats: ["Weekly review", "Monthly P&L", "Target progress"]
  }
];

const showcase = [
  {
    id: "dashboard",
    title: "Dashboard",
    image: screens.dashboard,
    copy: "A daily profit view for revenue, margin, ROAS, refunds, alerts and target progress."
  },
  {
    id: "config",
    title: "Config",
    image: screens.config,
    copy: "The setup sheet for overhead, shipping, COGS, fees and return assumptions."
  },
  {
    id: "catalog",
    title: "Catalog",
    image: screens.catalog,
    copy: "Product-level pricing, COGS, shipping, gross profit and margin signal."
  },
  {
    id: "daily",
    title: "Daily Log",
    image: screens.daily,
    copy: "Fast daily inputs with auto-calculated net revenue, costs and profit."
  }
];

const included = [
  ["Profit Dashboard", "Live daily view of revenue, profit, margins and alerts."],
  ["Margin Tracker", "Store setup, margin goals and core inputs."],
  ["Catalog Manager", "Product prices, COGS, shipping and margin signals."],
  ["Daily Log", "Revenue, orders, ad spend, returns and refunds."],
  ["Weekly Review", "Week-by-week KPI review using your daily entries."],
  ["Monthly Review", "Monthly profit, refunds, overhead and target progress."],
  ["Setup Guide", "Simple setup path for your first store review."],
  ["Formula Library", "Reusable calculations behind profit and margin views."]
];

const trustBullets = [
  ["True profit visibility", "See what remains after ads, shipping, COGS, returns and fees."],
  ["Understand real margins", "Compare products by margin instead of revenue alone."],
  ["Track ads against profit", "Review ad spend beside net revenue and profit."],
  ["Inventory cash tracking", "Spot products and stock decisions that affect cash flow."],
  ["One-time payment", "Buy the bundle once and use it inside Google Sheets."],
  ["No monthly SaaS subscription", "Useful for stores that do not need another platform bill."],
  ["Built in Google Sheets", "Easy to duplicate, share and update manually."],
  ["Setup in under 30 minutes", "Most stores can enter the first inputs quickly."]
];

const faqs = [
  ["Can I use this without Shopify Plus?", "Yes. SheetStack is for normal Shopify stores. You do not need Shopify Plus."],
  ["Do I need spreadsheet skills?", "No advanced spreadsheet skills are required. You enter store inputs and daily numbers into clearly marked areas."],
  ["Can I use this for multiple stores?", "Yes, you can duplicate the template for another store. Use one commercial license per brand."],
  ["How long does setup take?", "Most stores can complete the first setup in under 30 minutes if their basic costs and product data are ready."],
  ["Is this a subscription?", "No. SheetStack is a one-time purchase, not a monthly SaaS subscription."],
  ["Will I receive updates?", "Yes. Updates for the current version are included."],
  ["Is this accounting software?", "No. SheetStack is not bookkeeping, tax or accounting software. It is a practical dashboard for weekly profit and margin decisions."],
  ["Does this replace my accountant?", "No. It helps you understand store performance between formal accounting cycles. Your accountant remains responsible for accounting and tax work."]
];

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

function Badge({ children, className = "" }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.045] px-3 py-1.5 text-xs font-medium text-zinc-300 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur",
        className
      )}
    >
      {children}
    </span>
  );
}

function Button({ children, href = "#pricing", variant = "primary", className = "" }) {
  const base =
    "group inline-flex min-h-12 items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition duration-300 focus:outline-none focus:ring-2 focus:ring-emerald-300/60 focus:ring-offset-2 focus:ring-offset-zinc-950";
  const styles =
    variant === "primary"
      ? "bg-emerald-300 text-zinc-950 shadow-[0_0_40px_rgba(110,231,183,0.22)] hover:bg-emerald-200 hover:shadow-[0_0_60px_rgba(110,231,183,0.34)]"
      : "border border-white/12 bg-white/[0.04] text-white hover:border-white/22 hover:bg-white/[0.075]";

  return (
    <a href={href} className={cn(base, styles, className)}>
      {children}
      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
    </a>
  );
}

function SectionLabel({ children }) {
  return (
    <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-300/15 bg-emerald-300/[0.06] px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-200">
      <Sparkles className="h-3.5 w-3.5" />
      {children}
    </div>
  );
}

function ScreenshotFrame({ src, alt, className = "", label = "Real Google Sheets screenshot", imageClassName = "" }) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-[1.35rem] border border-white/14 bg-zinc-950 p-2 shadow-2xl shadow-black/45",
        className
      )}
    >
      <div className="flex items-center justify-between gap-3 border-b border-white/10 px-2 pb-2 pt-1">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-300 shadow-[0_0_16px_rgba(110,231,183,0.85)]" />
          <span className="text-xs font-semibold uppercase tracking-[0.16em] text-emerald-200">{label}</span>
        </div>
        <span className="hidden text-xs text-zinc-500 sm:block">PNG product asset</span>
      </div>
      <div className="relative mt-2 overflow-hidden rounded-[1rem] border border-white/10 bg-white">
        <img
          src={src}
          alt={alt}
          className={cn("block h-auto w-full object-contain", imageClassName)}
          loading="lazy"
        />
      </div>
    </div>
  );
}

function HeroScreenshot() {
  return (
    <motion.div
      id="screenshots"
      initial={{ opacity: 0, y: 28, rotateX: 4 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
      className="relative mx-auto mt-6 max-w-7xl sm:mt-8"
    >
      <div className="absolute -inset-8 rounded-[2.5rem] bg-gradient-to-r from-emerald-300/12 via-cyan-300/8 to-amber-200/6 blur-3xl" />
      <div className="relative rounded-[1.35rem] border border-white/14 bg-zinc-950 p-2 shadow-2xl shadow-black/45 sm:p-3">
        <div className="flex items-center justify-between gap-3 border-b border-white/10 px-2 pb-2 pt-1">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-300 shadow-[0_0_16px_rgba(110,231,183,0.85)]" />
            <span className="text-xs font-semibold uppercase tracking-[0.16em] text-emerald-200">
              Real Google Sheets screenshot · Profit Dashboard
            </span>
          </div>
          <span className="hidden text-xs text-zinc-500 sm:block">/screenshots/dashboard.png</span>
        </div>
        <div className="mt-2 overflow-hidden rounded-[1rem] border border-white/10 bg-white">
          <img
            src="/screenshots/dashboard.png"
            alt="Real SheetStack Profit Dashboard Google Sheets screenshot"
            className="block h-auto w-full"
            loading="eager"
          />
        </div>
      </div>
    </motion.div>
  );
}

function FeatureGrid() {
  return (
    <section className="px-4 py-14 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-7xl">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={stagger}>
          <motion.div variants={fadeUp} className="mx-auto max-w-3xl text-center">
            <SectionLabel>Features</SectionLabel>
            <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-5xl">
              Four real sheets, one weekly profit review.
            </h2>
            <p className="mt-5 text-base leading-8 text-zinc-400 sm:text-lg">
              Each real screenshot appears once here. Weekly and monthly reviews use the same dashboard totals and daily
              log data, without adding another repeated image section.
            </p>
          </motion.div>

          <div className="mt-10 grid gap-5 lg:grid-cols-2">
            {featureSections.map((item) => (
              <motion.article
                key={item.label}
                variants={fadeUp}
                className={cn(
                  "rounded-3xl border border-white/10 bg-white/[0.035] p-5",
                  item.image ? "lg:first:col-span-2" : ""
                )}
              >
                {item.image ? (
                  <ScreenshotFrame
                    src={item.image}
                    alt={`${item.label} real Google Sheets screenshot`}
                    label={`Real Google Sheets screenshot · ${item.label}`}
                    className="mb-5"
                  />
                ) : (
                  <div className="mb-5 rounded-2xl border border-emerald-300/15 bg-emerald-300/[0.06] p-5">
                    <div className="text-xs font-semibold uppercase tracking-[0.16em] text-emerald-200">
                      Weekly / Monthly
                    </div>
                    <div className="mt-3 grid gap-3 sm:grid-cols-3">
                      {item.stats.map((stat) => (
                        <div key={stat} className="rounded-xl border border-white/10 bg-zinc-950/60 px-3 py-3 text-sm text-white">
                          {stat}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                <h3 className="text-xl font-semibold text-white">{item.title}</h3>
                <p className="mt-3 text-sm leading-6 text-zinc-400">{item.copy}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {item.stats.map((stat) => (
                    <Badge key={stat}>{stat}</Badge>
                  ))}
                </div>
              </motion.article>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function ProductShowcase() {
  const [active, setActive] = useState(showcase[0]);

  return (
    <section id="product" className="px-4 py-16 sm:px-6 sm:py-24">
      <div className="mx-auto max-w-7xl">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={stagger}>
          <motion.div variants={fadeUp} className="mx-auto max-w-3xl text-center">
            <SectionLabel>Product showcase</SectionLabel>
            <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-5xl">
              The actual sheets your store works from.
            </h2>
            <p className="mt-5 text-base leading-8 text-zinc-400 sm:text-lg">
              These are the actual sheet views included in the bundle: profit, products, daily logs and weekly reviews.
            </p>
          </motion.div>

          <motion.div variants={fadeUp} className="mt-10 grid gap-6 lg:grid-cols-[300px_1fr]">
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
              {showcase.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActive(item)}
                  className={cn(
                    "min-h-20 rounded-2xl border p-4 text-left transition duration-300",
                    active.id === item.id
                      ? "border-emerald-300/35 bg-emerald-300/[0.08]"
                      : "border-white/10 bg-white/[0.035] hover:border-white/20 hover:bg-white/[0.055]"
                  )}
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="font-semibold text-white">{item.title}</div>
                    <ChevronRight className={cn("h-4 w-4", active.id === item.id ? "text-emerald-300" : "text-zinc-600")} />
                  </div>
                  <div className="mt-2 text-sm leading-6 text-zinc-400">{item.copy}</div>
                </button>
              ))}
            </div>

            <ScreenshotFrame
              src={active.image}
              alt={`${active.title} screenshot`}
              label={`Real Google Sheets screenshot · ${active.title}`}
              className="p-2 sm:p-3"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function BundleSection() {
  return (
    <section className="px-4 py-16 sm:px-6 sm:py-24">
      <div className="mx-auto max-w-7xl">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={stagger}>
          <motion.div variants={fadeUp} className="max-w-3xl">
            <SectionLabel>Everything included in the bundle</SectionLabel>
            <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-5xl">
              A complete Google Sheets toolkit, not a single thin template.
            </h2>
          </motion.div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {included.map(([title, copy]) => (
              <motion.div
                key={title}
                variants={fadeUp}
                whileHover={{ y: -5 }}
                className="rounded-2xl border border-white/10 bg-white/[0.035] p-5 transition duration-300 hover:border-emerald-300/20 hover:bg-white/[0.055]"
              >
                <div className="mb-4 grid h-9 w-9 place-items-center rounded-xl bg-emerald-300/10 text-emerald-200">
                  <Check className="h-4 w-4" />
                </div>
                <h3 className="font-semibold text-white">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-zinc-400">{copy}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function TrustSection() {
  return (
    <section className="px-4 py-16 sm:px-6 sm:py-24">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center"
        >
          <motion.div variants={fadeUp}>
            <SectionLabel>Why Shopify stores choose SheetStack</SectionLabel>
            <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-5xl">
              Real numbers before bigger ad spend or inventory buys.
            </h2>
            <p className="mt-5 text-base leading-8 text-zinc-400 sm:text-lg">
              SheetStack is for store owners who want a clear weekly view of profit, margins, ads, products and cash
              flow without signing up for another monthly platform.
            </p>
          </motion.div>

          <motion.div variants={fadeUp} className="grid gap-3 sm:grid-cols-2">
            {trustBullets.map(([title, copy]) => (
              <div key={title} className="rounded-2xl border border-white/10 bg-white/[0.035] p-4">
                <div className="flex items-center gap-3">
                  <Check className="h-4 w-4 shrink-0 text-emerald-300" />
                  <h3 className="text-sm font-semibold text-white">{title}</h3>
                </div>
                <p className="mt-2 text-sm leading-6 text-zinc-500">{copy}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function ProfitLeakSection() {
  const rows = [
    ["Store revenue", "€86,420", "100%", "text-cyan-200"],
    ["Ad spend", "-€21,880", "25.3%", "text-amber-200"],
    ["COGS", "-€29,740", "34.4%", "text-zinc-300"],
    ["Refunds", "-€3,240", "3.7%", "text-rose-200"],
    ["Shipping gap", "-€1,870", "2.2%", "text-rose-200"],
    ["Payment fees", "-€1,126", "1.3%", "text-zinc-300"],
    ["Dead stock", "-€4,980", "5.8%", "text-amber-200"],
    ["True contribution profit", "€20,564", "23.8%", "text-emerald-200"]
  ];

  return (
    <section id="demo" className="relative px-4 py-16 sm:px-6 sm:py-24">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center"
        >
          <motion.div variants={fadeUp}>
            <SectionLabel>See the hidden profit leak</SectionLabel>
            <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-5xl">
              The Shopify dashboard shows the first row. SheetStack helps you find the last row.
            </h2>
            <p className="mt-5 text-base leading-8 text-zinc-400 sm:text-lg">
              Add the costs that sit outside Shopify revenue and see how much profit is actually left before you scale
              ads or buy more inventory.
            </p>
            <div className="mt-8">
              <Button href="#screenshots">See Real Screenshots</Button>
            </div>
          </motion.div>

          <motion.div variants={fadeUp} className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.035]">
            <div className="border-b border-white/10 bg-white/[0.04] p-5">
              <div className="text-sm font-semibold text-white">Example profit breakdown</div>
              <div className="mt-1 text-xs text-zinc-500">Believable store numbers · Not accounting advice</div>
            </div>
            <div className="p-4 sm:p-5">
              <div className="space-y-2">
                {rows.map(([label, value, percent, color], index) => (
                  <div
                    key={label}
                    className={cn(
                      "grid grid-cols-[1fr_auto] gap-4 rounded-2xl border px-4 py-3 sm:grid-cols-[1fr_120px_80px]",
                      index === rows.length - 1
                        ? "border-emerald-300/25 bg-emerald-300/[0.07]"
                        : "border-white/8 bg-white/[0.025]"
                    )}
                  >
                    <div className="text-sm font-medium text-white">{label}</div>
                    <div className={cn("text-right text-sm font-semibold", color)}>{value}</div>
                    <div className="hidden text-right text-sm text-zinc-500 sm:block">{percent}</div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function PricingSection() {
  const trust = ["One-time payment", "Instant download", "Google Sheets template", "No monthly subscription", "14-day refund policy"];

  return (
    <section id="pricing" className="relative px-4 py-16 sm:px-6 sm:py-24">
      <div className="absolute inset-x-0 top-1/3 h-64 bg-gradient-to-r from-emerald-300/10 via-cyan-300/5 to-amber-200/10 blur-3xl" />
      <div className="relative mx-auto max-w-7xl">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          className="mx-auto max-w-3xl text-center"
        >
          <motion.div variants={fadeUp}>
            <SectionLabel>Pricing</SectionLabel>
          </motion.div>
          <motion.h2 variants={fadeUp} className="text-3xl font-semibold tracking-tight text-white sm:text-5xl">
            Get the complete SheetStack bundle.
          </motion.h2>
          <motion.p variants={fadeUp} className="mt-5 text-base leading-8 text-zinc-400 sm:text-lg">
            One-time launch price. Future versions may increase as the bundle grows.
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mx-auto mt-10 max-w-4xl rounded-[2rem] border border-emerald-300/20 bg-zinc-950/86 p-5 shadow-2xl shadow-emerald-950/30 backdrop-blur-xl sm:p-8"
        >
          <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
            <div>
              <Badge className="border-emerald-300/25 bg-emerald-300/[0.08] text-emerald-100">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-300" />
                Founding operator price
              </Badge>
              <div className="mt-6 flex flex-wrap items-end gap-3">
                <div className="text-6xl font-semibold tracking-tight text-white">197€</div>
                <div className="pb-2 text-sm text-zinc-500">
                  <div className="line-through">425€ individually</div>
                  <div className="font-medium text-emerald-200">Save 228€ with the bundle</div>
                </div>
              </div>
              <p className="mt-5 max-w-xl text-sm leading-6 text-zinc-400">
                A premium Google Sheets toolkit for Shopify stores that need clearer profit, margin, ads, products,
                inventory and weekly review numbers.
              </p>

              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {["Profit Dashboard", "Margin Tracker", "Catalog Manager", "Daily Log", "Weekly Review", "Monthly Review", "Setup Guide", "Formula Library"].map((item) => (
                  <div key={item} className="flex items-center gap-3 text-sm text-zinc-300">
                    <Check className="h-4 w-4 shrink-0 text-emerald-300" />
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-4 sm:p-5">
              <ScreenshotFrame
                src={screens.dashboard}
                alt="Real SheetStack dashboard preview"
                label="Real Google Sheets screenshot"
                className="rounded-2xl p-1"
              />
              <Button href="#pricing" className="mt-5 w-full">
                Get SheetStack Bundle
              </Button>
              <div className="mt-4 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-center text-xs text-zinc-500">
                <LockKeyhole className="h-3.5 w-3.5" />
                <span>Secure checkout</span>
                <span>·</span>
                <span>Instant delivery</span>
                <span>·</span>
                <span>Google Sheets only</span>
              </div>
              <div className="mt-5 grid gap-2">
                {trust.map((item) => (
                  <div key={item} className="flex items-center gap-3 rounded-xl border border-white/8 bg-white/[0.025] px-3 py-2 text-sm text-zinc-300">
                    <Check className="h-4 w-4 text-emerald-300" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-white/10 px-4 py-8 sm:px-6">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col items-start justify-between gap-6 text-sm text-zinc-500 sm:flex-row sm:items-center">
          <div className="flex items-center gap-3">
            <div className="grid h-8 w-8 place-items-center rounded-lg bg-white/8 text-emerald-200">
              <FileSpreadsheet className="h-4 w-4" />
            </div>
            <span className="font-semibold text-zinc-300">SHEETSTACK</span>
          </div>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
            <a href="#" className="transition hover:text-white">Terms</a>
            <a href="#" className="transition hover:text-white">Privacy</a>
            <a href="#" className="transition hover:text-white">Refund Policy</a>
            <a href="#" className="transition hover:text-white">Contact</a>
          </div>
        </div>
        <div className="mt-6 flex flex-col gap-3 border-t border-white/8 pt-5 text-xs leading-5 text-zinc-600 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 SheetStack. All rights reserved.</p>
          <p>SheetStack is an independent toolkit and is not affiliated with Shopify or Google.</p>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <main className="min-h-screen scroll-smooth bg-zinc-950 text-white antialiased selection:bg-emerald-300 selection:text-zinc-950">
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute left-1/2 top-[-14rem] h-[34rem] w-[34rem] -translate-x-1/2 rounded-full bg-emerald-300/12 blur-3xl" />
        <div className="absolute right-[-12rem] top-[18rem] h-[28rem] w-[28rem] rounded-full bg-cyan-300/8 blur-3xl" />
        <div className="absolute bottom-[-16rem] left-[-12rem] h-[32rem] w-[32rem] rounded-full bg-amber-200/8 blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.045)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.045)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:radial-gradient(circle_at_top,black,transparent_72%)]" />
      </div>

      <header className="sticky top-0 z-50 border-b border-white/8 bg-zinc-950/72 backdrop-blur-xl">
        <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
          <a href="#" className="flex items-center gap-3">
            <div className="grid h-9 w-9 place-items-center rounded-xl bg-emerald-300 text-zinc-950 shadow-[0_0_28px_rgba(110,231,183,0.28)]">
              <FileSpreadsheet className="h-5 w-5" />
            </div>
            <span className="text-sm font-semibold tracking-[0.18em] text-white">SHEETSTACK</span>
          </a>

          <div className="hidden items-center gap-7 text-sm text-zinc-400 md:flex">
            <a href="#screenshots" className="transition hover:text-white">Screenshots</a>
            <a href="#product" className="transition hover:text-white">Product</a>
            <a href="#demo" className="transition hover:text-white">Profit leak</a>
            <a href="#pricing" className="transition hover:text-white">Pricing</a>
          </div>

          <a
            href="#pricing"
            className="group inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-emerald-300 px-4 py-2.5 text-sm font-semibold text-zinc-950 shadow-[0_0_32px_rgba(110,231,183,0.20)] transition duration-300 hover:bg-emerald-200 hover:shadow-[0_0_48px_rgba(110,231,183,0.32)] focus:outline-none focus:ring-2 focus:ring-emerald-300/60 focus:ring-offset-2 focus:ring-offset-zinc-950"
          >
            Get SheetStack Bundle
          </a>
        </nav>
      </header>

      <section className="relative overflow-hidden px-4 pb-10 pt-10 sm:px-6 sm:pb-14 sm:pt-20">
        <div className="mx-auto max-w-7xl">
          <motion.div initial="hidden" animate="visible" variants={stagger} className="mx-auto max-w-5xl text-center">
            <motion.div variants={fadeUp} className="flex flex-wrap justify-center gap-2">
              <Badge>
                <Zap className="h-3.5 w-3.5 text-emerald-300" />
                Real Google Sheets toolkit for Shopify stores
              </Badge>
              <Badge>
                <ShieldCheck className="h-3.5 w-3.5 text-cyan-300" />
                Profit · ads · products · inventory
              </Badge>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="mx-auto mt-5 max-w-5xl text-balance text-4xl font-semibold tracking-tight text-white sm:mt-6 sm:text-6xl lg:text-7xl"
            >
              Your Shopify dashboard shows revenue. SheetStack shows what you actually keep.
            </motion.h1>

            <motion.p variants={fadeUp} className="mx-auto mt-4 max-w-3xl text-pretty text-base leading-8 text-zinc-300 sm:text-xl">
              Use a premium Google Sheets bundle to track real profit, margins, ad spend, refunds, shipping, product
              costs, inventory and weekly store performance.
            </motion.p>

            <motion.div variants={fadeUp} className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button href="#pricing">Get SheetStack Bundle</Button>
              <Button href="#screenshots" variant="secondary">See Real Screenshots</Button>
            </motion.div>

            <motion.div variants={fadeUp} className="mt-5 flex flex-wrap items-center justify-center gap-3 text-xs text-zinc-500">
              {["One-time payment", "Instant download", "Google Sheets only"].map((item) => (
                <span key={item} className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-emerald-300" /> {item}
                </span>
              ))}
            </motion.div>
          </motion.div>

          <HeroScreenshot />
        </div>
      </section>

      <FeatureGrid />

      <ProductShowcase />
      <ProfitLeakSection />
      <TrustSection />
      <BundleSection />
      <PricingSection />

      <section className="px-4 py-16 sm:px-6 sm:py-24">
        <div className="mx-auto max-w-4xl">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={stagger}>
            <motion.div variants={fadeUp} className="text-center">
              <SectionLabel>FAQ</SectionLabel>
              <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-5xl">
                Questions before you use it.
              </h2>
            </motion.div>

            <div className="mt-10 divide-y divide-white/10 rounded-3xl border border-white/10 bg-white/[0.035]">
              {faqs.map(([q, a]) => (
                <motion.details key={q} variants={fadeUp} className="group p-5 open:bg-white/[0.025] sm:p-6">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-left text-base font-semibold text-white">
                    {q}
                    <ChevronRight className="h-5 w-5 shrink-0 text-zinc-500 transition group-open:rotate-90 group-open:text-emerald-300" />
                  </summary>
                  <p className="mt-4 max-w-3xl text-sm leading-7 text-zinc-400">{a}</p>
                </motion.details>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="px-4 pb-20 pt-8 sm:px-6 sm:pb-28 sm:pt-12">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="mx-auto max-w-6xl overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 text-center shadow-2xl shadow-black/30 sm:p-14"
        >
          <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-emerald-300 text-zinc-950 shadow-[0_0_50px_rgba(110,231,183,0.32)]">
            <FileSpreadsheet className="h-7 w-7" />
          </div>
          <h2 className="mx-auto mt-8 max-w-4xl text-3xl font-semibold tracking-tight text-white sm:text-6xl">
            Start with your real numbers.
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-zinc-400 sm:text-lg">
            Get the full SheetStack bundle and turn Shopify sales, ads, products, refunds and inventory into a clearer
            weekly profit review.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Button href="#pricing">Get SheetStack Bundle</Button>
            <Button href="#screenshots" variant="secondary">See Real Screenshots</Button>
          </div>
        </motion.div>
      </section>

      <Footer />
    </main>
  );
}
