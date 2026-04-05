import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import {
  ArrowRight,
  Menu,
  X,
  Hexagon,
  ChevronDown,
  LayoutDashboard,
  Clapperboard,
  BookOpen,
  LifeBuoy,
} from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import SwarmScene from "@/components/SwarmScene";
import HeroSwarm from "@/components/hero/HeroSwarm";
import HeroContent from "@/components/hero/HeroContent";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import FeatureMatrix from "@/components/feature-matrix/FeatureMatrix";
import MissionProofStrip from "@/components/landing/MissionProofStrip";
import ScenarioShowcase from "@/components/landing/ScenarioShowcase";
import SystemHealthBadge from "@/components/landing/SystemHealthBadge";
import { cn } from "@/lib/utils";

const sectionLinks = [
  { href: "#features", label: "Features" },
  { href: "#simulation", label: "Live swarm" },
  { href: "#scenarios", label: "Scenarios" },
  { href: "#story", label: "Why it matters" },
];

const pageLinks = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/vertex-swarm", label: "Relay deep dive", icon: Clapperboard },
  { to: "/scenarios/search-rescue", label: "SAR demo", icon: LifeBuoy },
  { to: "/docs", label: "Docs", icon: BookOpen },
];

const ease = [0.22, 1, 0.36, 1] as const;

function LandingNav() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => { setMobileOpen(false); }, [location.pathname]);
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") setMobileOpen(false); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/[0.06] glass-landing-nav">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 sm:h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5 group shrink-0">
          <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-teal-400/20 to-violet-500/20 border border-white/10 group-hover:border-teal-400/30 transition-colors">
            <Hexagon className="h-4 w-4 text-teal-400" strokeWidth={2.25} />
          </div>
          <div className="flex flex-col leading-tight">
            <span className="font-semibold text-foreground text-sm tracking-tight">Tashi Swarm</span>
            <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-[0.14em]">
              Control Center
            </span>
          </div>
        </Link>

        <div className="hidden lg:flex items-center gap-1">
          {sectionLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="px-3 py-1.5 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-all duration-200"
            >
              {l.label}
            </a>
          ))}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                type="button"
                className="px-3 py-1.5 rounded-lg text-sm transition-all duration-200 inline-flex items-center gap-1 text-muted-foreground hover:text-foreground hover:bg-secondary/50 data-[state=open]:text-primary data-[state=open]:bg-primary/10 outline-none focus-visible:ring-2 focus-visible:ring-ring [&>svg]:transition-transform [&[data-state=open]>svg]:rotate-180"
              >
                Explore
                <ChevronDown className="w-3.5 h-3.5" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 rounded-xl border-border/60 bg-card/95 backdrop-blur-xl shadow-2xl shadow-black/40 p-1.5">
              {pageLinks.map((l) => (
                <DropdownMenuItem key={l.to} asChild className="p-0">
                  <Link
                    to={l.to}
                    className={cn(
                      "flex w-full cursor-pointer items-center gap-3 rounded-md px-3 py-2.5 text-sm no-underline outline-none",
                      location.pathname === l.to
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:bg-muted/60 hover:text-foreground focus:bg-muted/60"
                    )}
                  >
                    <l.icon className="h-4 w-4 shrink-0 opacity-75" aria-hidden />
                    {l.label}
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="flex items-center gap-3">
          <SystemHealthBadge />
          <Link to="/dashboard" className="hidden sm:block">
            <Button size="sm" className="glow-cyan rounded-full px-5">
              Launch app
              <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </Button>
          </Link>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden flex items-center justify-center w-9 h-9 rounded-lg text-foreground hover:bg-muted/50 transition-colors"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="lg:hidden overflow-hidden border-t border-white/[0.06] bg-background/95 backdrop-blur-xl"
          >
            <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 space-y-1">
              <p className="font-mono text-[10px] text-muted-foreground tracking-[0.2em] uppercase px-3 pb-2">On this page</p>
              {sectionLinks.map((l) => (
                <a key={l.href} href={l.href} onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-foreground hover:bg-muted/50 transition-colors"
                >{l.label}</a>
              ))}
              <div className="h-px bg-border/50 my-3" />
              <p className="font-mono text-[10px] text-muted-foreground tracking-[0.2em] uppercase px-3 pb-2">Pages</p>
              {pageLinks.map((l) => (
                <Link key={l.to} to={l.to} onClick={() => setMobileOpen(false)}
                  className={cn(
                    "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors",
                    location.pathname === l.to ? "text-primary bg-primary/10 font-medium" : "text-foreground hover:bg-muted/50"
                  )}
                >
                  <l.icon className="w-4 h-4 shrink-0 opacity-75" />
                  {l.label}
                </Link>
              ))}
              <div className="pt-3">
                <Link to="/dashboard" onClick={() => setMobileOpen(false)}>
                  <Button className="w-full glow-cyan rounded-xl h-11">
                    Launch app <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

export default function Landing() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <LandingNav />

      {/* Hero */}
      <section className="relative min-h-[90dvh] flex flex-col overflow-hidden">
        <ErrorBoundary fallback={<div className="absolute inset-0 bg-gradient-to-b from-[#030711] to-background" />}>
          <HeroSwarm className="absolute inset-0 z-0 min-h-[90dvh]" />
        </ErrorBoundary>
        <div className="absolute inset-0 z-[1] bg-gradient-to-b from-black/45 via-black/55 to-background pointer-events-none" aria-hidden />
        <div className="absolute inset-0 z-[1] bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,hsl(185_80%_50%/0.12),transparent)] pointer-events-none" aria-hidden />
        <HeroContent />
      </section>

      {/* Proof-of-system strip */}
      <MissionProofStrip />

      {/* Live preview */}
      <section id="simulation" className="relative px-5 sm:px-6 py-20 sm:py-28">
        <div className="absolute inset-0 bg-grid opacity-[0.35] pointer-events-none" />
        <div className="max-w-5xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.75, ease }}
          >
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-6">
              <div>
                <span className="font-mono text-xs text-primary/80 tracking-[0.2em] uppercase inline-flex items-center gap-2">
                  <span className="w-8 h-px bg-primary/40" />
                  Live visualization
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold text-foreground mt-2">Swarm mesh in motion</h2>
                <p className="text-sm text-muted-foreground mt-2 max-w-lg">
                  Real-time 3D view of agents, relay topology, and proximity links — the same engine used inside the
                  control center.
                </p>
              </div>
              <Link to="/dashboard/simulation">
                <Button variant="outline" size="sm" className="rounded-full border-primary/25 text-primary/90 shrink-0">
                  Full simulation
                  <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                </Button>
              </Link>
            </div>

            <div className="rounded-2xl border border-white/[0.08] overflow-hidden shadow-2xl shadow-black/40 glass-panel-edge">
              <div className="flex items-center gap-2 px-4 py-2.5 border-b border-white/[0.06] bg-black/20 backdrop-blur-md">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-400/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                </div>
                <span className="ml-2 font-mono text-[10px] sm:text-[11px] text-zinc-500 truncate">
                  swarm-viz.tashi — secure channel
                </span>
                <span className="ml-auto flex items-center gap-1.5 text-[10px] font-mono text-emerald-400/90">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-40" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                  </span>
                  LIVE
                </span>
              </div>
              <ErrorBoundary fallback={<div className="w-full h-[min(70vh,520px)] sm:h-[500px] bg-card/50 flex items-center justify-center text-muted-foreground font-mono text-sm">3D visualization unavailable</div>}>
                <SwarmScene className="w-full h-[min(70vh,520px)] sm:h-[500px]" animate />
              </ErrorBoundary>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="section-divider max-w-5xl mx-auto opacity-80" />

      {/* Feature matrix */}
      <section id="features" className="scroll-mt-24">
        <FeatureMatrix />
      </section>

      <div className="section-divider max-w-5xl mx-auto opacity-80" />

      {/* Scenario showcase */}
      <ScenarioShowcase />

      <div className="section-divider max-w-5xl mx-auto opacity-80" />

      {/* Product story */}
      <section id="story" className="py-20 sm:py-28 px-5 sm:px-6 scroll-mt-24">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-10"
          >
            <span className="font-mono text-xs text-primary/80 tracking-[0.22em] uppercase inline-flex items-center gap-2">
              <span className="w-8 h-px bg-primary/40" />
              Why it matters
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mt-3 tracking-tight">
              Built for the moment the cloud disappears
            </h2>
            <p className="text-muted-foreground mt-4 max-w-3xl text-sm sm:text-base leading-relaxed">
              When connectivity fails, centralized systems fail with it. Tashi Swarm keeps operating — every agent
              coordinates peer-to-peer, elects leaders via stake-weighted BFT, and self-heals relay chains in under two seconds.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              {
                title: "Discover the mission",
                body: "Landing page tells the story in 15 seconds — what it is, why it matters, and one click to prove it works.",
              },
              {
                title: "Run the live swarm",
                body: "3D simulation, relay topology, and failure injection — all running in your browser with real consensus logic.",
              },
              {
                title: "Inspect the evidence",
                body: "Analytics, replay, per-agent dossiers, and scenario forensics — every claim is backed by observable data.",
              },
            ].map((block, i) => (
              <motion.div
                key={block.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5, ease }}
                className="rounded-2xl border border-border/60 bg-card/30 backdrop-blur-md p-6 sm:p-7 card-hover"
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-primary/10 text-primary font-mono text-sm font-bold">{i + 1}</span>
                  <h3 className="font-semibold text-foreground text-lg">{block.title}</h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{block.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider max-w-5xl mx-auto opacity-80" />

      {/* CTA */}
      <section className="py-20 sm:py-28 px-5 sm:px-6">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, ease }}
            className="relative rounded-3xl border border-primary/20 overflow-hidden p-10 sm:p-14 text-center"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.08] via-accent/[0.04] to-transparent pointer-events-none" />
            <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[min(100%,480px)] h-48 bg-primary/15 blur-[80px] rounded-full pointer-events-none" />
            <div className="relative z-10">
              <h2 className="text-2xl sm:text-4xl font-bold text-foreground tracking-tight">Ready to see it work?</h2>
              <p className="text-muted-foreground mt-4 max-w-lg mx-auto text-sm sm:text-base leading-relaxed">
                Launch the live control center, inject failures, and watch the swarm recover — 
                no setup, no accounts, everything runs in your browser.
              </p>
              <div className="mt-9 flex flex-col sm:flex-row gap-3 justify-center">
                <Link to="/dashboard">
                  <Button size="lg" className="w-full sm:w-auto rounded-2xl h-12 px-10 glow-cyan font-semibold">
                    Enter control center
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
                <Link to="/scenarios/search-rescue">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto rounded-2xl h-12 px-10 border-border bg-transparent">
                    Run a scenario
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/[0.06] py-12 px-5 sm:px-6 glass-landing-nav">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-teal-400/15 to-violet-500/15 border border-white/10">
              <Hexagon className="h-4 w-4 text-teal-400" strokeWidth={2.25} />
            </div>
            <div>
              <div className="font-semibold text-foreground text-sm">Tashi Swarm Control Center</div>
              <div className="font-mono text-[11px] text-muted-foreground mt-0.5">Vertex · FoxMQ · Operator-grade UI</div>
            </div>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
            <Link to="/dashboard" className="hover:text-foreground transition-colors">Dashboard</Link>
            <Link to="/vertex-swarm" className="hover:text-foreground transition-colors">Relay deep dive</Link>
            <Link to="/docs" className="hover:text-foreground transition-colors">Docs</Link>
            <a href="#features" className="hover:text-foreground transition-colors">Features</a>
            <a href="#scenarios" className="hover:text-foreground transition-colors">Scenarios</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
