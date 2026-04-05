import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Route, Unplug, HeartPulse, RefreshCw, Target, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

const ease = [0.22, 1, 0.36, 1] as const;

const scenarios = [
  {
    icon: Route,
    title: "Dynamic Relay Chain",
    desc: "Drones self-organize into a communication chain that adapts as signal degrades deeper into the tunnel.",
    to: "/scenarios/search-rescue",
    accent: "from-primary/15 to-primary/5",
  },
  {
    icon: Unplug,
    title: "Collapsing Tunnel",
    desc: "Simulate structural collapse — watch the swarm detect heartbeat loss and reform the relay chain in under two seconds.",
    to: "/scenarios/collapsing-tunnel",
    accent: "from-accent/15 to-accent/5",
  },
  {
    icon: HeartPulse,
    title: "Battery Cascade",
    desc: "Agents deplete batteries at different rates. The swarm promotes standby nodes and rotates roles to sustain the mission.",
    to: "/scenarios/battery-cascade",
    accent: "from-primary/12 to-primary/5",
  },
  {
    icon: RefreshCw,
    title: "Random Failure",
    desc: "Inject faults at random intervals. Observe self-healing consensus and automatic relay insertion without central control.",
    to: "/scenarios/random-failure",
    accent: "from-destructive/10 to-destructive/5",
  },
  {
    icon: Target,
    title: "Magnetic Attraction",
    desc: "Agents converge on victim heat signatures using decentralized priority scoring and stake-weighted triage.",
    to: "/scenarios/magnetic-attraction",
    accent: "from-accent/12 to-accent/5",
  },
  {
    icon: Zap,
    title: "Stake Voting",
    desc: "Agents vote on path selection using BFT consensus weighted by stake — the swarm decides collectively which fork to take.",
    to: "/scenarios/stake-voting",
    accent: "from-primary/15 to-primary/5",
  },
];

export default function ScenarioShowcase() {
  return (
    <section className="py-20 sm:py-28 px-5 sm:px-6 scroll-mt-24" id="scenarios">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease }}
          className="mb-10"
        >
          <span className="font-mono text-xs text-primary/80 tracking-[0.22em] uppercase inline-flex items-center gap-2">
            <span className="w-8 h-px bg-primary/40" />
            Mission scenarios
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mt-3 tracking-tight">
            Six ways the swarm proves itself
          </h2>
          <p className="text-muted-foreground mt-3 max-w-2xl text-sm sm:text-base leading-relaxed">
            Each scenario isolates a specific operational behavior — relay formation, failure recovery, consensus voting,
            and more. Run them live in your browser.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {scenarios.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05, duration: 0.45, ease }}
            >
              <Link
                to={s.to}
                className="group block rounded-2xl border border-border/50 bg-card/30 backdrop-blur-md p-5 sm:p-6 card-hover h-full"
              >
                <div className={`inline-flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br ${s.accent} border border-primary/15 mb-3`}>
                  <s.icon className="w-4 h-4 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground text-base mb-1.5">{s.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
                <span className="inline-flex items-center gap-1 text-xs text-primary/70 mt-3 group-hover:text-primary transition-colors">
                  Run scenario
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                </span>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link to="/dashboard/scenarios">
            <Button variant="outline" size="sm" className="rounded-full border-border/60 text-muted-foreground hover:text-foreground">
              View all scenarios
              <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
