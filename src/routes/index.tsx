import { createFileRoute } from "@tanstack/react-router";
import { animate, motion, useInView, useMotionValue, useScroll, useTransform } from "framer-motion";
import { Radar, Flame, ClipboardCheck } from "lucide-react";
import { useEffect, useRef, useState, type ReactNode } from "react";

import { FrameScrollyteller } from "@/components/FrameScrollyteller";
import heroAsset from "@/assets/mining.webp.asset.json";
import s2Asset from "@/assets/Section_2.webp.asset.json";
import s3Asset from "@/assets/Section_3.webp.asset.json";
import s4Asset from "@/assets/Section_4.webp.asset.json";
import s5Asset from "@/assets/Section_5.webp.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Physical AI for Mining | Autonomous Drone Inspections" },
      {
        name: "description",
        content:
          "How autonomous drones cut leak detection from days to 90 minutes, lifted yield 4x at SQM, and paid for themselves in under a year.",
      },
      { property: "og:title", content: "Physical AI for Mining | Autonomous Drone Inspections" },
      {
        property: "og:description",
        content:
          "The playbook from the Chilean desert: autonomous drone inspections, faster detection, higher yield.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Section({
  media,
  children,
  align = "center",
}: {
  media: ReactNode;
  children: ReactNode;
  align?: "center" | "left" | "right";
}) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["8%", "-8%"]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.12, 1.02, 1.12]);
  const opacity = useTransform(scrollYProgress, [0, 0.18, 0.82, 1], [0, 1, 1, 0]);

  const justify =
    align === "left" ? "justify-start" : align === "right" ? "justify-end" : "justify-center";

  return (
    <section ref={ref} className="relative h-[190vh]">
      <div className="sticky top-0 h-screen overflow-hidden">
        <motion.div style={{ y, scale }} className="absolute inset-0">
          {media}
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/30 to-background/90" />
        <div
          className={`relative flex h-full items-center px-6 md:px-14 lg:px-20 ${justify}`}
        >
          <motion.div style={{ opacity }} className="w-full">
            {children}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

const rise = {
  initial: { opacity: 0, y: 60 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.4 },
  transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const },
};

function Img({ src, alt }: { src: string; alt: string }) {
  return <img src={src} alt={alt} className="h-full w-full object-cover" loading="lazy" />;
}

function Counter({
  target,
  prefix = "",
  suffix = "",
  duration = 2,
}: {
  target: number;
  prefix?: string | undefined;
  suffix?: string | undefined;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => `${prefix}${Math.round(latest)}${suffix}`);

  useEffect(() => {
    if (!isInView) return;
    const controls = animate(count, target, { duration, ease: "easeOut" });
    return controls.stop;
  }, [isInView, target, count, duration]);

  return (
    <motion.span ref={ref} className="text-glow text-primary">
      {rounded}
    </motion.span>
  );
}

function MissionProgressTracker() {
  const { scrollYProgress } = useScroll();
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const dotY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div className="fixed right-8 top-1/4 bottom-1/4 z-50 hidden w-1 md:block">
      {/* Track */}
      <div className="absolute inset-0 rounded-full bg-white/10" />
      {/* Active progress line */}
      <motion.div
        style={{ scaleY, transformOrigin: "top" }}
        className="absolute inset-0 rounded-full bg-primary shadow-[0_0_10px_rgba(249,115,22,0.8)]"
      />
      {/* Leading-edge dot */}
      <motion.div
        style={{ top: dotY }}
        className="absolute left-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary shadow-[0_0_10px_rgba(249,115,22,0.8)]"
      />
    </div>
  );
}
const industries = [
  {
    k: "Mining",
    t: "SQM, Chile",
    d: "Cut leak detection from days to under 90 minutes, with a 4x yield increase.",
  },
  {
    k: "Public Safety",
    t: "BF Kiel Fire Dept",
    d: "Cut water rescue response times by up to 7 minutes.",
  },
  {
    k: "Oil & Gas",
    t: "Shell",
    d: "Running the world's first fully autonomous offshore drone operations.",
  },
  {
    k: "Solar",
    t: "EnBW",
    d: "Scaled inspections from 150MW to 1GW with zero extra staff.",
  },
];

function IndustryTabs() {
  const [active, setActive] = useState(0);
  const current = industries[active]!;

  return (
    <div className="mt-8">
      <div className="flex flex-wrap gap-2">
        {industries.map((i, idx) => (
          <button
            key={i.k}
            type="button"
            onClick={() => setActive(idx)}
            className={`rounded-full border px-5 py-2 text-sm font-medium transition-colors ${
              idx === active
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-card/40 text-muted-foreground hover:text-foreground"
            }`}
          >
            {i.k}
          </button>
        ))}
      </div>
      <motion.div
        key={current.k}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="mt-6 rounded-2xl border border-border bg-card/50 p-8"
      >
        <div className="text-xs uppercase tracking-[0.25em] text-primary">{current.t}</div>
        <p className="mt-3 font-[family-name:var(--font-display)] text-xl leading-relaxed sm:text-2xl">
          {current.d}
        </p>
      </motion.div>
    </div>
  );
}


function Index() {
  return (
    <main className="bg-background text-foreground">
      <MissionProgressTracker />
      {/* 1. Hero - Frame Scrollyteller */}
      <FrameScrollyteller containerHeight="500vh">
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-xs font-medium uppercase tracking-[0.4em] text-primary">
            Physical AI for Mining
          </span>
          <h1 className="mt-6 font-[family-name:var(--font-display)] text-5xl font-bold leading-[0.95] tracking-tight sm:text-7xl lg:text-8xl">
            The Old Way is Breaking.
          </h1>
          <p className="mx-auto mt-7 max-w-xl text-lg text-muted-foreground sm:text-xl">
            You can&apos;t run a next-generation mine with legacy inspections.
          </p>
          <div className="mt-14 flex justify-center">
            <span className="h-14 w-px animate-pulse bg-gradient-to-b from-primary to-transparent" />
          </div>
        </div>
      </FrameScrollyteller>

      {/* 2. The Friction */}
      <Section
        align="left"
        media={<Img src={s2Asset.url} alt="Mine worker walking the rim of an open pit at sunset" />}
      >
        <motion.div
          {...rise}
          className="glass-card w-full rounded-2xl p-8 sm:p-10 md:w-2/5 lg:w-1/3"
        >
          <span className="text-xs uppercase tracking-[0.3em] text-primary">The Friction</span>
          <h2 className="mt-4 font-[family-name:var(--font-display)] text-3xl font-semibold leading-tight sm:text-4xl">
            Days of Walking. Millions in Lost Yield.
          </h2>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground">
            Instead of catching a leak instantly, engineers used to walk the mine for days just to
            spot a problem or track a stockpile change. By the time they found the issue, the damage
            to yield and efficiency was already done.
          </p>
        </motion.div>
      </Section>

      {/* 3. The Shift */}
      <Section
        align="right"
        media={<Img src={s3Asset.url} alt="Drone flying through industrial facility" />}
      >
        <motion.div
          {...rise}
          className="glass-card ml-auto w-full rounded-2xl p-8 sm:p-10 md:w-2/5 lg:w-1/3"
        >
          <span className="text-xs uppercase tracking-[0.3em] text-accent">The Shift</span>
          <h2 className="mt-4 font-[family-name:var(--font-display)] text-3xl font-semibold leading-tight sm:text-4xl">
            Enter Physical AI.
          </h2>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground">
            Imagine a drone that lives in its own weatherproof garage on site. It wakes up on a
            schedule, flies its route over the leaching pads, catches the leak, and docks itself to
            recharge—zero human pilots required.
          </p>
        </motion.div>
      </Section>

      {/* 3.5 The Brain */}
      <Section media={<Img src={s3Asset.url} alt="Drone docking station at an industrial mining site at twilight" />}>
        <motion.div {...rise} className="glass-card mx-auto w-full max-w-5xl rounded-3xl p-8 sm:p-12">
          <span className="text-xs uppercase tracking-[0.3em] text-accent">The Platform</span>
          <h2 className="mt-4 font-[family-name:var(--font-display)] text-3xl font-semibold leading-tight sm:text-5xl">
            The Brain Behind the Fleet
          </h2>
          <p className="mt-4 max-w-2xl text-base text-muted-foreground">
            Autonomous hardware is only as good as the operating system running it.
          </p>
          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {[
              {
                icon: Radar,
                t: "Live Telemetry & Mission Control",
                d: "Real-time fleet tracking across remote sites.",
              },
              {
                icon: Flame,
                t: "Thermal AI Anomaly Detection",
                d: "Spotting leaks and heat signatures automatically.",
              },
              {
                icon: ClipboardCheck,
                t: "One-Click Work Orders",
                d: "Instant alerts dispatched directly to site maintenance teams.",
              },
            ].map(({ icon: Icon, t, d }) => (
              <div key={t} className="rounded-2xl border border-border bg-card/50 p-6">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-primary/15 text-primary shadow-[0_0_24px_-4px_currentColor]">
                  <Icon size={22} />
                </span>
                <h3 className="mt-5 font-[family-name:var(--font-display)] text-lg font-semibold">
                  {t}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">{d}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </Section>


      {/* 4. The Proof */}
      <Section media={<Img src={s4Asset.url} alt="Autonomous drone flying through a dark industrial facility" />}>
        <motion.div {...rise} className="glass-card mx-auto w-full max-w-5xl rounded-3xl p-8 sm:p-12">
          <span className="text-xs uppercase tracking-[0.3em] text-primary">The Proof</span>
          <h2 className="mt-4 text-center font-[family-name:var(--font-display)] text-3xl font-semibold leading-tight sm:text-5xl">
            The Playbook from the Chilean Desert.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-center text-base text-muted-foreground">
            At SQM, a lithium mine in the harsh Chilean desert, autonomous drones changed
            everything:
          </p>
          <div className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-3">
            {[
              {
                k: "Detection Time",
                target: 90,
                prefix: "< ",
                suffix: " min",
                d: "Cut from days down to under 90 minutes.",
              },
              { k: "Production", target: 4, suffix: "x", d: "Iodine yield went up four-fold." },
              {
                k: "ROI",
                target: 1,
                prefix: "< ",
                suffix: " year",
                d: "The entire system paid for itself.",
              },
            ].map((m) => (
              <div key={m.k} className="bg-card/60 p-7 text-center">
                <div className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
                  {m.k}
                </div>
                <div className="mt-3 font-[family-name:var(--font-display)] text-4xl font-bold sm:text-5xl">
                  <Counter target={m.target} prefix={m.prefix} suffix={m.suffix} />
                </div>
                <p className="mt-3 text-sm text-muted-foreground">{m.d}</p>
              </div>
            ))}
          </div>
          <p className="mt-8 text-center text-sm text-muted-foreground">
            <span className="font-semibold text-foreground">Wait, there&apos;s more: </span>
            Night patrols using thermal cameras at Kansanshi Mining in Zambia cut break-in response
            times by up to 50%.
          </p>
        </motion.div>
      </Section>

      {/* 4.2 Industries */}
      <Section media={<Img src={s4Asset.url} alt="Autonomous drone flying through a dark industrial facility" />}>
        <motion.div {...rise} className="glass-card mx-auto w-full max-w-5xl rounded-3xl p-8 sm:p-12">
          <span className="text-xs uppercase tracking-[0.3em] text-primary">The Scale</span>
          <h2 className="mt-4 font-[family-name:var(--font-display)] text-3xl font-semibold leading-tight sm:text-5xl">
            One Operating System. Endless Frontiers.
          </h2>
          <p className="mt-4 text-base text-muted-foreground">
            See how physical AI scales across global industries:
          </p>
          <IndustryTabs />
        </motion.div>
      </Section>

      {/* 4.7 Pioneers */}
      <Section media={<Img src={s5Asset.url} alt="Dark brushed metal surface with light flares" />}>
        <motion.div {...rise} className="glass-card mx-auto w-full max-w-5xl rounded-3xl p-8 sm:p-12">
          <span className="text-xs uppercase tracking-[0.3em] text-accent">The Speakers</span>
          <h2 className="mt-4 font-[family-name:var(--font-display)] text-3xl font-semibold leading-tight sm:text-5xl">
            Confirmed Boardroom Pioneers
          </h2>
          <p className="mt-4 text-base text-muted-foreground">
            Hear the unscripted ROI playbooks from leaders at:
          </p>
          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {[
              { n: "First Quantum Minerals", s: "Kansanshi & Trident" },
              { n: "SQM", s: "Chile" },
              { n: "Siyanda Bakgatla", s: "Platinum Mine" },
            ].map((p) => (
              <div
                key={p.n}
                className="rounded-2xl border border-border bg-card/50 p-6 text-center"
              >
                <div className="font-[family-name:var(--font-display)] text-lg font-semibold">
                  {p.n}
                </div>
                <div className="mt-1 text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  {p.s}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            {["Airbus", "Shell Petroleum", "UK Police", "LA Metro"].map((l) => (
              <span
                key={l}
                className="rounded-full border border-border bg-card/40 px-5 py-2 text-sm text-muted-foreground"
              >
                {l}
              </span>
            ))}
          </div>
        </motion.div>
      </Section>

      {/* 5. How It Works - 4 Step Platform */}
      <Section media={<Img src={s4Asset.url} alt="Mining operation workflow" />}>
        <motion.div {...rise} className="glass-card mx-auto w-full max-w-5xl rounded-3xl p-8 sm:p-12">
          <span className="text-xs uppercase tracking-[0.3em] text-primary">The Methodology</span>
          <h2 className="mt-4 font-[family-name:var(--font-display)] text-3xl font-semibold leading-tight sm:text-5xl">
            Four Steps to Physical AI.
          </h2>
          <p className="mt-4 text-base text-muted-foreground">
            From data capture to autonomous response—here's how the platform works:
          </p>
          <div className="mt-12 space-y-8">
            {[
              {
                num: "01",
                title: "Capture",
                description:
                  "Drones autonomously patrol mining sites, capturing thermal imaging, video feeds, and sensor data in real-time.",
              },
              {
                num: "02",
                title: "Understand",
                description:
                  "AI agents analyze every frame. Leak detection, thermal anomalies, and stockpile changes surface instantly.",
              },
              {
                num: "03",
                title: "Alert",
                description:
                  "The moment a finding surfaces, alerts route directly to your maintenance team via the systems you already use.",
              },
              {
                num: "04",
                title: "Learn",
                description:
                  "Every detection trains the platform. False positives drop. Accuracy climbs. The system adapts to your site.",
              },
            ].map((step) => (
              <div
                key={step.num}
                className="flex gap-6 rounded-2xl border border-border bg-card/30 p-6 sm:p-8"
              >
                <div className="flex-shrink-0">
                  <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-primary/20 text-2xl font-bold text-primary">
                    {step.num}
                  </div>
                </div>
                <div className="flex-grow">
                  <h3 className="font-[family-name:var(--font-display)] text-xl font-semibold">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-base text-muted-foreground">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </Section>

      {/* 5.5 Use Cases */}
      <Section media={<Img src={s2Asset.url} alt="Mining site operations" />}>
        <motion.div {...rise} className="glass-card mx-auto w-full max-w-5xl rounded-3xl p-8 sm:p-12">
          <span className="text-xs uppercase tracking-[0.3em] text-accent">Real-World Impact</span>
          <h2 className="mt-4 font-[family-name:var(--font-display)] text-3xl font-semibold leading-tight sm:text-5xl">
            Mining Use Cases Transformed.
          </h2>
          <p className="mt-4 text-base text-muted-foreground">
            Physical AI solves the hardest problems at scale:
          </p>
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {[
              {
                icon: "🌡️",
                title: "Thermal Leak Detection",
                description: "Spot temperature anomalies across leaching pads in seconds, not days.",
              },
              {
                icon: "📦",
                title: "Stockpile Monitoring",
                description: "Real-time volumetric tracking of ore, waste, and finished product.",
              },
              {
                icon: "🔒",
                title: "Perimeter Security",
                description: "24/7 autonomous monitoring detects intrusions before they become incidents.",
              },
              {
                icon: "🎯",
                title: "Asset Tracking",
                description: "Know the location and status of haul trucks, dozers, and critical equipment.",
              },
              {
                icon: "⚠️",
                title: "Environmental Compliance",
                description: "Continuous monitoring ensures tailings dams and retention ponds stay safe.",
              },
              {
                icon: "🚀",
                title: "Yield Optimization",
                description: "Data-driven insights unlock 4x production increases like at SQM.",
              },
            ].map((useCase) => (
              <div
                key={useCase.title}
                className="rounded-2xl border border-border bg-card/50 p-6 transition-all hover:border-primary/50 hover:bg-card/80"
              >
                <div className="text-3xl">{useCase.icon}</div>
                <h3 className="mt-4 font-[family-name:var(--font-display)] text-lg font-semibold">
                  {useCase.title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">{useCase.description}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </Section>

      {/* 6. FAQ Section */}
      <Section media={<Img src={s3Asset.url} alt="FAQ section" />}>
        <motion.div {...rise} className="glass-card mx-auto w-full max-w-4xl rounded-3xl p-8 sm:p-12">
          <span className="text-xs uppercase tracking-[0.3em] text-primary">Questions & Answers</span>
          <h2 className="mt-4 font-[family-name:var(--font-display)] text-3xl font-semibold leading-tight sm:text-4xl">
            Mining Leaders Ask.
          </h2>
          <p className="mt-4 text-base text-muted-foreground">
            Here&apos;s what we hear most often:
          </p>
          <div className="mt-10 space-y-4">
            {[
              {
                q: "How fast can drones be deployed at a new site?",
                a: "FlytBase drones are operational within 24 hours. The dock handles power, maintenance, and weather—your team focuses on operations.",
              },
              {
                q: "What happens if a leak is detected at 3 AM?",
                a: "The drone autonomously redeploys to verify and capture richer intelligence. Alerts route to on-call teams in real-time. No delays.",
              },
              {
                q: "Does this replace human inspectors?",
                a: "No. It augments them. Inspectors focus on root cause; drones handle the repetitive surveillance, 24/7 at a fraction of the cost.",
              },
              {
                q: "Is the data compliant with mining regulations?",
                a: "Yes. All data is encrypted, logged, and audit-ready. We support NDAA compliance, sovereignty requirements, and enterprise IT policies.",
              },
              {
                q: "Can it integrate with SAP, Maximo, or our existing tools?",
                a: "Yes. FlytBase connects to 40+ enterprise systems including SAP, Maximo, Genetec, and Milestone via standard APIs.",
              },
            ].map((item, idx) => (
              <details
                key={idx}
                className="group rounded-2xl border border-border bg-card/30 transition-all hover:bg-card/50"
              >
                <summary className="flex cursor-pointer items-center gap-4 p-6 font-semibold">
                  <span className="text-lg font-bold text-primary group-open:hidden">+</span>
                  <span className="hidden text-lg font-bold text-primary group-open:inline">−</span>
                  {item.q}
                </summary>
                <div className="border-t border-border bg-card/20 px-6 py-4 text-muted-foreground">
                  {item.a}
                </div>
              </details>
            ))}
          </div>
        </motion.div>
      </Section>

      {/* 7. Newsletter Signup */}
      <div className="relative overflow-hidden bg-gradient-to-b from-background to-background/50 py-20">
        <div className="mx-auto max-w-2xl px-6 text-center md:px-14 lg:px-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="text-xs font-medium uppercase tracking-[0.4em] text-primary">
              Stay Updated
            </span>
            <h2 className="mt-6 font-[family-name:var(--font-display)] text-3xl font-bold leading-tight sm:text-5xl">
              Get Mining Insights Delivered.
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground">
              Monthly briefings on drone autonomy advancements, customer wins, and ROI playbooks from
              the field. No spam—unsubscribe anytime.
            </p>
            <form className="mt-10 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <input
                type="email"
                placeholder="your@miningcompany.com"
                className="rounded-full border border-border bg-card/50 px-6 py-3 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none sm:min-w-80"
                required
              />
              <button
                type="submit"
                className="glow-cta rounded-full bg-primary px-8 py-3 font-semibold text-primary-foreground transition-all hover:shadow-[0_0_40px_rgba(249,115,22,0.6)]"
              >
                Subscribe
              </button>
            </form>
          </motion.div>
        </div>
      </div>

      {/* 5. CTA */}
      <Section media={<Img src={s5Asset.url} alt="Dark brushed metal surface with light flares" />}>
        <motion.div {...rise} className="mx-auto max-w-3xl text-center">
          <h2 className="font-[family-name:var(--font-display)] text-4xl font-bold leading-tight tracking-tight sm:text-6xl">
            Get the Playbook that Never Leaves the Boardroom.
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
            First Quantum Minerals, SQM, and Siyanda Bakgatla Platinum Mine are getting on stage to
            share exactly how they scaled physical AI.
          </p>
          <div className="mt-10 flex justify-center">
            <span className="inline-flex items-center rounded-full border border-primary/40 bg-primary/10 px-5 py-2 text-xs font-medium uppercase tracking-[0.2em] text-primary shadow-[0_0_28px_-6px_currentColor]">
              September 29, 2026 • Live Global Online Event
            </span>
          </div>

          <a
            href="#"
            className="glow-cta mt-12 inline-flex items-center justify-center rounded-full bg-primary px-10 py-5 text-base font-semibold tracking-wide text-primary-foreground sm:text-lg"
          >
            Claim Your Ticket to NestGen &apos;26
          </a>
        </motion.div>
      </Section>
    </main>
  );
}
