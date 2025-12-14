import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import ResumeDownload from "./components/ResumeDownload.jsx";

const LINKS = {
  github: "https://github.com/YashodaPVarma",
  linkedin: "https://www.linkedin.com/in/yashoda-pratik-varma-5a2875369",
  // live: "https://yashodapvarma.github.io/yashoda-portfolio/",
};
const EXPERIENCE = [
  {
    company: "Northern Trust",
    location: "MI",
    period: "November 2024 - Present",
    role: "Full Stack Developer",
    bullets: [
      "Reduced trade reconciliation time by 38% by designing and implementing Kafka-based real-time streaming pipelines for FIX protocol message ingestion and processing, accelerating financial transaction settlements.",
      "Achieved 99% application uptime by deploying containerized microservices on Azure Kubernetes Service (AKS) with Prometheus and Grafana for real-time observability and proactive incident response.",
      "Designed and developed RESTful API (Representational State Transfer Application Programming Interface) and GraphQL microservices using Java 21, Spring Boot 3.x, and Hibernate Object-Relational Mapping (ORM).",
      "Engineered responsive, WCAG (Web Content Accessibility Guidelines)-compliant user interfaces using React 19, Tailwind CSS, and Redux Toolkit.",
    ],
  },
  {
    company: "Cardinal Health",
    location: "MI",
    period: "May 2023 - October 2024",
    role: "Java Full Stack Developer",
    bullets: [
      "Developed scalable RESTful APIs using Spring Boot and Java, enabling secure data exchange between Electronic Health Record (EHR) systems and reducing data latency by 30%.",
      "Built mobile-responsive front-end applications using React.js, TypeScript, and Tailwind CSS, improving clinician workflow efficiency and reducing navigation time by 25%.",
      "Containerized microservices using Docker and orchestrated deployments on Google Cloud Platform (GCP) Kubernetes clusters to improve scalability for fluctuating workloads.",
      "Maintained Continuous Integration and Continuous Delivery (CI/CD) pipelines using Jenkins and GitLab CI/CD to automate build, test, and deployments.",
    ],
  },
  {
    company: "HCLTech",
    location: "India",
    period: "May 2016 - July 2019",
    role: "Full Stack Developer",
    bullets: [
      "Designed and implemented a microservices architecture that enhanced system scalability by 30% in a high-traffic retail environment.",
      "Created and optimized RESTful APIs that improved product retrieval response times by 25%, enabling smoother user experience and faster transactions.",
      "Developed dynamic user interface components using Angular, increasing user engagement by 40%.",
      "Automated CI/CD pipelines using Jenkins, reducing deployment time by 50% and accelerating releases.",
    ],
  },
];
const PROJECTS = [
  {
    title: "TurboVets — Secure Task Management System",
    type: "Personal / Assessment",
    desc: "Monorepo application with Role-Based Access Control (RBAC), JSON Web Token (JWT) authentication, and a clean dashboard experience.",
    tech: [
      "Nx",
      "Angular",
      "NestJS",
      "TypeScript",
      "RBAC",
      "JWT",
      "SQLite",
      "Jest",
    ],
    live: "https://yashodapvarma.github.io/yvarma-0a19fc14-d0eb-42ed-850d-63023568a3e3",
    code: "https://github.com/YashodaPVarma/yvarma-0a19fc14-d0eb-42ed-850d-63023568a3e3",
  },
  {
    title: "Northern Trust — FIX Reconciliation Accelerator",
    type: "Client Work (Private)",
    desc: "Real-time ingestion and reconciliation of FIX (Financial Information eXchange) messages using streaming-first services and secure APIs.",
    tech: [
      "Java",
      "Spring Boot",
      "Kafka",
      "gRPC",
      "Docker",
      "Kubernetes",
      "Observability",
    ],
    live: null,
    code: null,
  },
  {
    title: "Cardinal Health — Healthcare Integration & Claims Platform",
    type: "Client Work (Private)",
    desc: "Event-driven services and responsive dashboards to support fast, reliable healthcare data exchange and operational visibility.",
    tech: [
      "Java",
      "Spring Boot",
      "React",
      "TypeScript",
      "Kafka",
      "CI/CD",
      "Cloud",
    ],
    live: null,
    code: null,
  },
];
const SKILLS = [
  {
    title: "Frontend",
    items: [
      "React",
      "Angular",
      "JavaScript (ES6)",
      "TypeScript",
      "HTML5",
      "CSS3",
      "Tailwind CSS",
    ],
  },
  {
    title: "Backend",
    items: [
      "Java",
      "Spring Boot",
      "REST APIs",
      "GraphQL",
      "Hibernate (ORM)",
      "Microservices",
    ],
  },
  {
    title: "Cloud & DevOps",
    items: [
      "Docker",
      "Kubernetes",
      "Azure",
      "Google Cloud Platform (GCP)",
      "CI/CD",
      "Jenkins",
      "Git",
    ],
  },
  {
    title: "Data Streaming",
    items: ["Apache Kafka", "Event-driven Architecture"],
  },
  {
    title: "Testing & Quality",
    items: ["Jest", "Unit Testing", "Integration Testing"],
  },
];

export default function App() {
  // Dark by default, but respect saved preference
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem("theme");
    return saved === "light" ? "light" : "dark";
  });
  const [copied, setCopied] = useState(false);
  async function copyEmail() {
    try {
      await navigator.clipboard.writeText("varmayashodapratik@gmail.com");
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch {
      // fallback (older browsers)
      const el = document.createElement("textarea");
      el.value = "varmayashodapratik@gmail.com";
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      el.remove();
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    }
  }
  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  const isDark = theme === "dark";

  const navItems = useMemo(
    () => [
      { id: "about", label: "About" },
      { id: "experience", label: "Experience" },
      { id: "projects", label: "Projects" },
      { id: "skills", label: "Skills" },
      { id: "contact", label: "Contact" },
    ],
    []
  );

  const [activeId, setActiveId] = useState("about");

  useEffect(() => {
    const ids = navItems.map((x) => x.id);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort(
            (a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0)
          );
        if (visible.length > 0) setActiveId(visible[0].target.id);
      },
      {
        threshold: [0.15, 0.25, 0.35, 0.5, 0.65],
        rootMargin: "-25% 0px -60% 0px",
      }
    );

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [navItems]);

  const pageClass = isDark
    ? "min-h-screen bg-slate-950 text-slate-100"
    : "min-h-screen bg-white text-slate-900";

  const headerClass = isDark
    ? "sticky top-0 z-40 border-b border-slate-800 bg-slate-950/70 backdrop-blur"
    : "sticky top-0 z-40 border-b border-slate-200/60 bg-white/70 backdrop-blur";

  const navTextClass = isDark ? "text-slate-300" : "text-slate-600";

 const toggleBtnClass = isDark
  ? "rounded-xl border border-slate-800 px-3 py-2 text-sm text-slate-200 hover:bg-slate-900 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-white/20"
  : "rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-800 hover:bg-slate-100 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-900/10";


  const subtitleClass = isDark ? "text-slate-300" : "text-slate-600";

  const activeLinkClass = isDark ? "text-white" : "text-slate-900";
  const inactiveLinkClass = isDark
    ? "hover:text-white"
    : "hover:text-slate-900";
  const activePillClass = isDark
    ? "absolute -inset-x-2 -inset-y-1 rounded-lg bg-white/10"
    : "absolute -inset-x-2 -inset-y-1 rounded-lg bg-slate-900/5";

  // Hero card styles
  const heroOuterClass = isDark
    ? "relative overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/40 p-8"
    : "relative overflow-hidden rounded-3xl border border-slate-200 bg-white/70 p-8 shadow-sm";

  const heroGlowA = isDark ? "bg-blue-500/30" : "bg-blue-500/20";
  const heroGlowB = isDark ? "bg-cyan-400/20" : "bg-cyan-400/15";

  const ctaGhost = isDark
    ? "rounded-xl border border-slate-700 bg-slate-950/30 px-4 py-2 text-sm text-slate-200 hover:bg-slate-900"
    : "rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm text-slate-800 hover:bg-slate-100";

  const metricCard = isDark
    ? "rounded-2xl border border-slate-800 bg-slate-950/30 px-4 py-3"
    : "rounded-2xl border border-slate-200 bg-white px-4 py-3";

  const metricLabel = isDark ? "text-slate-400" : "text-slate-600";

  function toggleTheme() {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  }

  return (
    <div className={pageClass}>
      {/* Top Bar */}
      <header className={headerClass}>
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <a href="#top" className="text-sm font-semibold">
            Yashoda Varma
          </a>

          <nav className={`hidden gap-6 text-sm md:flex ${navTextClass}`}>
            {navItems.map((item) => {
              const isActive = activeId === item.id;
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={() => setActiveId(item.id)}
                  className={`relative px-2 py-1 transition-colors ${
                    isActive ? activeLinkClass : inactiveLinkClass
                  }`}
                >
                  {isActive && (
                    <span className={activePillClass} aria-hidden="true" />
                  )}
                  <span className="relative">{item.label}</span>
                </a>
              );
            })}
          </nav>

          <button
            onClick={toggleTheme}
            className={toggleBtnClass}
            aria-label="Toggle theme"
            title="Toggle theme"
          >
            {isDark ? "🌙 Dark" : "☀️ Light"}
          </button>
        </div>
      </header>

      {/* Hero */}
      <main id="top" className="mx-auto max-w-6xl px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className={heroOuterClass}
        >
          {/* Glow blobs */}
          <div
            className={`pointer-events-none absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full blur-3xl ${heroGlowA}`}
          />
          <div
            className={`pointer-events-none absolute -bottom-28 -left-20 h-72 w-72 rounded-full blur-3xl ${heroGlowB}`}
          />

          <div className="relative">
            <p className={`text-xs tracking-widest ${metricLabel}`}>
              FULL STACK • CLOUD-NATIVE • PERFORMANCE
            </p>

            <h1 className="mt-3 text-4xl font-semibold md:text-5xl">
              Yashoda Varma
            </h1>

            <p className={`mt-3 max-w-2xl ${subtitleClass}`}>
              Full Stack Developer • Java / Spring Boot • React / Angular
            </p>

            <p className={`mt-4 max-w-2xl ${subtitleClass}`}>
              I build secure, scalable enterprise applications with clean UI,
              reliable APIs, and cloud-ready delivery. I care about performance,
              clarity, and real-world impact.
            </p>

            {/* CTAs */}
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <div>
                {" "}
                <ResumeDownload theme={theme} />
              </div>
              <div>
                <a
                  className={ctaGhost}
                  href={LINKS.github}
                  target="_blank"
                  rel="noreferrer"
                >
                  GitHub
                </a>
                <a
                  className={ctaGhost}
                  href={LINKS.linkedin}
                  target="_blank"
                  rel="noreferrer"
                >
                  LinkedIn
                </a>
              </div>
            </div>

            {/* Mini metrics */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.5 }}
              className="mt-10 grid gap-3 md:grid-cols-3"
            >
              <div className={metricCard}>
                <p className={`text-xs ${metricLabel}`}>Experience</p>
                <p className="mt-1 text-lg font-semibold">5+ years</p>
              </div>
              <div className={metricCard}>
                <p className={`text-xs ${metricLabel}`}>Core Stack</p>
                <p className="mt-1 text-lg font-semibold">
                  Java • Spring Boot • React
                </p>
              </div>
              <div className={metricCard}>
                <p className={`text-xs ${metricLabel}`}>Domains</p>
                <p className="mt-1 text-lg font-semibold">
                  Finance • Healthcare
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Sections */}
        <section id="about" className="mt-16 scroll-mt-24">
          <h2 className="text-xl font-semibold">About</h2>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.45 }}
            className={`mt-6 rounded-2xl border p-6 ${
              isDark
                ? "border-slate-800 bg-slate-950/30"
                : "border-slate-200 bg-white shadow-sm"
            }`}
          >
            <p className={subtitleClass}>
              {/* Replace this sentence with your own (send it to me and I’ll paste it in) */}
              I’m a Full Stack Developer who builds secure, scalable enterprise
              applications using Java, Spring Boot, React, and cloud-native
              practices.
            </p>

            <div className="mt-6 space-y-6">
              {/* What I'm great at */}
              <div>
                <p
                  className={`text-sm font-semibold ${
                    isDark ? "text-slate-200" : "text-slate-900"
                  }`}
                >
                  What I’m great at
                </p>

                <ul className={`mt-3 space-y-2 text-sm ${subtitleClass}`}>
                  <li>
                    • Building clean, responsive user interfaces with modern
                    React patterns
                  </li>
                  <li>
                    • Designing reliable REST API (Representational State
                    Transfer Application Programming Interface) services
                  </li>
                  <li>
                    • Improving performance, stability, and developer experience
                  </li>
                  <li>• Working end-to-end: UI + API + deployment</li>
                </ul>
              </div>

              {/* Tech I use */}
              <div>
                <p
                  className={`text-sm font-semibold ${
                    isDark ? "text-slate-200" : "text-slate-900"
                  }`}
                >
                  Tech I use
                </p>

                <div className="mt-3 flex flex-wrap gap-2">
                  {[
                    "Java",
                    "Spring Boot",
                    "React",
                    "Angular",
                    "TypeScript",
                    "REST APIs",
                    "Kafka",
                    "Docker",
                    "Kubernetes",
                    "Azure / GCP",
                  ].map((t) => (
                    <span
                      key={t}
                      className={`rounded-full border px-3 py-1 text-xs ${
                        isDark
                          ? "border-slate-800 bg-slate-900/30 text-slate-200"
                          : "border-slate-200 bg-slate-50 text-slate-800"
                      }`}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        <section id="experience" className="mt-14 scroll-mt-24">
          <h2 className="text-xl font-semibold">Experience</h2>

          <div className="mt-6 space-y-6">
            {EXPERIENCE.map((job) => (
              <motion.div
                key={`${job.company}-${job.period}`}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.45 }}
                className={`rounded-2xl border p-6 ${
                  isDark
                    ? "border-slate-800 bg-slate-950/30"
                    : "border-slate-200 bg-white shadow-sm"
                }`}
              >
                <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
                  <div>
                    <p className="text-base font-semibold">
                      {job.role} — {job.company}
                    </p>
                    <p className={`mt-1 text-sm ${subtitleClass}`}>
                      {job.location} • {job.period}
                    </p>
                  </div>

                  <span
                    className={`mt-1 inline-flex w-fit rounded-full border px-3 py-1 text-xs ${
                      isDark
                        ? "border-slate-800 bg-slate-900/30 text-slate-200"
                        : "border-slate-200 bg-slate-50 text-slate-800"
                    }`}
                  >
                    {job.company}
                  </span>
                </div>

                <ul className={`mt-4 space-y-2 text-sm ${subtitleClass}`}>
                  {job.bullets.map((b, i) => (
                    <li key={i}>• {b}</li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </section>

        <section id="projects" className="mt-14 scroll-mt-24">
          <h2 className="text-xl font-semibold">Projects</h2>

          <div className="mt-6 grid gap-6 md:grid-cols-2">
            {PROJECTS.map((p) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.45 }}
                whileHover={{ y: -4 }}
                className={`rounded-2xl border p-6 transition-shadow ${
                  isDark
                    ? "border-slate-800 bg-slate-950/30 hover:shadow-[0_0_0_1px_rgba(255,255,255,0.08)]"
                    : "border-slate-200 bg-white shadow-sm hover:shadow-md"
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-base font-semibold">{p.title}</h3>
                    <p className={`mt-1 text-sm ${subtitleClass}`}>{p.type}</p>
                  </div>

                  <span
                    className={`inline-flex rounded-full border px-3 py-1 text-xs ${
                      isDark
                        ? "border-slate-800 bg-slate-900/30 text-slate-200"
                        : "border-slate-200 bg-slate-50 text-slate-800"
                    }`}
                  >
                    Featured
                  </span>
                </div>

                <p className={`mt-4 text-sm ${subtitleClass}`}>{p.desc}</p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {p.tech.map((t) => (
                    <span
                      key={t}
                      className={`rounded-full border px-3 py-1 text-xs ${
                        isDark
                          ? "border-slate-800 bg-slate-900/30 text-slate-200"
                          : "border-slate-200 bg-slate-50 text-slate-800"
                      }`}
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <div className="mt-6 flex flex-wrap gap-3">
                  {p.live ? (
                    <a
                      className={
                        isDark
                          ? "rounded-xl bg-white px-4 py-2 text-sm font-medium text-slate-950 hover:opacity-90"
                          : "rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:opacity-90"
                      }
                      href={p.live}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Live
                    </a>
                  ) : (
                    <span className={`text-sm ${subtitleClass}`}>
                      Live: Private
                    </span>
                  )}

                  {p.code ? (
                    <a
                      className={
                        isDark
                          ? "rounded-xl border border-slate-700 bg-slate-950/30 px-4 py-2 text-sm text-slate-200 hover:bg-slate-900"
                          : "rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm text-slate-800 hover:bg-slate-100"
                      }
                      href={p.code}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Code
                    </a>
                  ) : (
                    <span className={`text-sm ${subtitleClass}`}>
                      Code: Private
                    </span>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        <section id="skills" className="mt-14 scroll-mt-24">
          <h2 className="text-xl font-semibold">Skills</h2>

          <div className="mt-6 grid gap-6 md:grid-cols-2">
            {SKILLS.map((group) => (
              <motion.div
                key={group.title}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.45 }}
                className={`rounded-2xl border p-6 ${
                  isDark
                    ? "border-slate-800 bg-slate-950/30"
                    : "border-slate-200 bg-white shadow-sm"
                }`}
              >
                <p className="text-base font-semibold">{group.title}</p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {group.items.map((s) => (
                    <span
                      key={s}
                      className={`rounded-full border px-3 py-1 text-xs ${
                        isDark
                          ? "border-slate-800 bg-slate-900/30 text-slate-200"
                          : "border-slate-200 bg-slate-50 text-slate-800"
                      }`}
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        <section id="contact" className="mt-14 pb-12 scroll-mt-24">
          <h2 className="text-xl font-semibold">Contact</h2>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.45 }}
            className={`mt-6 rounded-2xl border p-6 ${
              isDark
                ? "border-slate-800 bg-slate-950/30"
                : "border-slate-200 bg-white shadow-sm"
            }`}
          >
            <p className={subtitleClass}>
              Want to connect? Email me or reach out on LinkedIn / GitHub.
            </p>

            <div className="mt-5 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div>
                <p className={`text-sm ${subtitleClass}`}>Email</p>
                <p className="mt-1 font-semibold">
                  varmayashodapratik@gmail.com
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <button
                  onClick={copyEmail}
                  className={
                    isDark
                      ? "rounded-xl bg-white px-4 py-2 text-sm font-medium text-slate-950 hover:opacity-90"
                      : "rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:opacity-90"
                  }
                >
                  {copied ? "Copied ✅" : "Copy Email"}
                </button>

                <a
                  className={
                    isDark
                      ? "rounded-xl border border-slate-700 bg-slate-950/30 px-4 py-2 text-sm text-slate-200 hover:bg-slate-900"
                      : "rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm text-slate-800 hover:bg-slate-100"
                  }
                  href={LINKS.linkedin}
                  target="_blank"
                  rel="noreferrer"
                >
                  LinkedIn
                </a>

                <a
                  className={
                    isDark
                      ? "rounded-xl border border-slate-700 bg-slate-950/30 px-4 py-2 text-sm text-slate-200 hover:bg-slate-900"
                      : "rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm text-slate-800 hover:bg-slate-100"
                  }
                  href={LINKS.github}
                  target="_blank"
                  rel="noreferrer"
                >
                  GitHub
                </a>
              </div>
            </div>
          </motion.div>
        </section>
      </main>
      {/* Footer */}
      <footer
        className={`mt-20 border-t py-6 ${
          isDark
            ? "border-slate-800 text-slate-400"
            : "border-slate-200 text-slate-600"
        }`}
      >
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-6 text-sm md:flex-row">
          <p>
            © {new Date().getFullYear()} Yashoda Varma. All rights reserved.
          </p>

          <div className="flex gap-4">
            <a
              href={LINKS.github}
              target="_blank"
              rel="noreferrer"
              className="hover:underline"
            >
              GitHub
            </a>
            <a
              href={LINKS.linkedin}
              target="_blank"
              rel="noreferrer"
              className="hover:underline"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
