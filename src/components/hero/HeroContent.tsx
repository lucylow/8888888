import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Play, Shield, Wifi, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

const ease = [0.22, 1, 0.36, 1] as const;

function AnimatedCounter({ end, suffix, label }: { end: number; suffix: string; label: string }) {
  const [v, setV] = useState(0);

  useEffect(() => {
    setV(0);
    const start = performance.now();
    const dur = 1100;
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / dur);
      const eased = 1 - (1 - t) ** 3;
      setV(Math.round(end * eased));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [end]);

  return (
    <div className="text-center min-w-[5.5rem]">
      <span className="font-mono text-lg sm:text-xl font-bold text-primary tabular-nums block">
        {v}
        {suffix}
      </span>
      <span className="text-[10px] sm:text-xs text-muted-foreground uppercase tracking-wider">{label}</span>
    </div>
  );
}

function AnimatedPercent({ label }: { label: string }) {
  const [v, setV] = useState(0);

  useEffect(() => {
    setV(0);
    const start = performance.now();
    const dur = 1100;
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / dur);
      const eased = 1 - (1 - t) ** 3;
      setV(99.9 * eased);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div className="text-center min-w-[5.5rem]">
      <span className="font-mono text-lg sm:text-xl font-bold text-primary tabular-nums block">
        {v.toFixed(1)}%
      </span>
      <span className="text-[10px] sm:text-xs text-muted-foreground uppercase tracking-wider">{label}</span>
    </div>
  );
}

const trustSignals = [
  { icon: Wifi, label: "No cloud dependency" },
  { icon: Shield, label: "BFT consensus" },
  { icon: Zap, label: "Sub-second recovery" },
];

export default function HeroContent() {
  return (
    <div className="relative z-10 flex-1 flex flex-col justify-center px-5 sm:px-8 pt-20 pb-16 pointer-events-none">
      <div className="max-w-4xl mx-auto text-center pointer-events-auto">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, ease }}
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.05, duration: 0.5 }}
            className="inline-flex items-center gap-2 font-mono text-[11px] sm:text-xs text-primary/90 border border-primary/25 bg-primary/[0.08] backdrop-blur-md rounded-full px-3.5 py-1.5 mb-7 tracking-[0.12em] uppercase"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-60" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-success" />
            </span>
            Decentralized swarm control center
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.7, ease }}
            className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[1.05]"
          >
            <span className="text-gradient-hero block drop-shadow-sm">Mission control</span>
            <span className="mt-1 sm:mt-2 block text-2xl sm:text-4xl md:text-5xl font-semibold text-gradient-hero-sub tracking-tight">
              when the cloud disappears
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.24, duration: 0.6 }}
            className="mt-6 sm:mt-8 text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed"
          >
            Coordinate search-and-rescue robot swarms in blackout environments.
            Peer-to-peer consensus, self-healing relay chains, and live 3D telemetry — no central server required.
          </motion.p>

          {/* Trust signals */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="mt-6 flex flex-wrap justify-center gap-4 sm:gap-6"
          >
            {trustSignals.map((s) => (
              <div key={s.label} className="flex items-center gap-1.5 text-xs sm:text-sm text-muted-foreground">
                <s.icon className="h-3.5 w-3.5 text-primary/70" />
                <span>{s.label}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.34, duration: 0.55, ease }}
          className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 mt-10 sm:mt-12"
        >
          <Link to="/dashboard/simulation">
            <Button
              size="lg"
              className={cn(
                "w-full sm:w-auto h-12 sm:h-14 px-8 sm:px-10 rounded-2xl text-base font-semibold",
                "glow-cyan shadow-lg shadow-primary/10 border border-primary/20",
              )}
            >
              Launch live demo
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
          <Link to="/docs">
            <Button
              size="lg"
              variant="outline"
              className="w-full sm:w-auto h-12 sm:h-14 px-8 sm:px-10 rounded-2xl text-base font-semibold border-border bg-secondary/30 backdrop-blur-md hover:bg-secondary/50 hover:border-primary/20"
            >
              <Play className="w-4 h-4 mr-2 opacity-90" />
              Read architecture
            </Button>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-10 sm:mt-12 flex flex-wrap justify-center items-center gap-6 sm:gap-10"
        >
          <AnimatedCounter end={50} suffix="ms" label="Consensus class" />
          <span className="hidden sm:inline text-muted-foreground/40">·</span>
          <AnimatedCounter end={1000} suffix="+" label="Agents scaled" />
          <span className="hidden sm:inline text-muted-foreground/40">·</span>
          <AnimatedPercent label="Target uptime" />
        </motion.div>

      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.6 }}
        className="mt-auto pt-6 flex justify-center pointer-events-none"
        aria-hidden
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          className="w-7 h-11 rounded-full border-2 border-muted-foreground/30 flex justify-center pt-2"
        >
          <div className="w-1 h-2.5 rounded-full bg-muted-foreground/50" />
        </motion.div>
      </motion.div>
    </div>
  );
}
