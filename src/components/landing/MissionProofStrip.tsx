import { motion } from "framer-motion";
import { Shield, Radio, Zap, Users } from "lucide-react";

const proofs = [
  { icon: Radio, value: "0", label: "Cloud dependencies", color: "text-primary" },
  { icon: Users, value: "5–50", label: "Agent scale", color: "text-primary" },
  { icon: Zap, value: "<2s", label: "Chain recovery", color: "text-accent" },
  { icon: Shield, value: "BFT", label: "Consensus", color: "text-primary" },
];

export default function MissionProofStrip() {
  return (
    <div className="w-full border-y border-border/40 bg-card/30 backdrop-blur-md">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-5 sm:py-6">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
          {proofs.map((p, i) => (
            <motion.div
              key={p.label}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06, duration: 0.45 }}
              className="flex items-center gap-3"
            >
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary/[0.08] border border-primary/15">
                <p.icon className={`w-4 h-4 ${p.color}`} />
              </div>
              <div>
                <div className="font-mono text-lg font-bold text-foreground tracking-tight leading-none">
                  {p.value}
                </div>
                <div className="text-[10px] sm:text-xs text-muted-foreground mt-0.5 uppercase tracking-wider">
                  {p.label}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
