import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const quickLinks = [
  { label: "Historia", path: "/historia", icon: "📜", desc: "Cinco siglos de herencia minera" },
  { label: "Gastronomía", path: "/gastronomia", icon: "🥟", desc: "Del paste al mole hidalguense" },
  { label: "Rutas", path: "/rutas", icon: "🗺️", desc: "9 recorridos temáticos" },
  { label: "Eventos", path: "/eventos", icon: "🎪", desc: "Festivales y fiestas locales" },
  { label: "Ecoturismo", path: "/ecoturismo", icon: "🌲", desc: "Bosques, cascadas y aventura" },
  { label: "Mitos", path: "/relatos", icon: "👻", desc: "Leyendas y relatos oscuros" },
  { label: "Arte", path: "/arte", icon: "💎", desc: "Platería y artesanía local" },
  { label: "Comunidad", path: "/comunidad", icon: "🌍", desc: "Muro global de viajeros" },
];

const QuickLinksSection = () => (
  <section className="py-24">
    <div className="container mx-auto px-6">
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12">
        <span className="font-mono text-xs uppercase tracking-widest text-primary mb-3 block">Navega el Pueblo Mágico</span>
        <h2 className="text-4xl md:text-5xl font-bold tracking-tighter uppercase">
          Explora <span className="text-gradient-cyan">Todo</span>
        </h2>
      </motion.div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {quickLinks.map((link, i) => (
          <Link key={link.path} to={link.path}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ y: -4 }}
              className="glass-surface p-6 text-center group cursor-pointer hover:glow-cyan transition-all duration-500"
            >
              <span className="text-3xl mb-3 block">{link.icon}</span>
              <h3 className="text-sm font-semibold tracking-tight mb-1">{link.label}</h3>
              <p className="text-[11px] text-muted-foreground">{link.desc}</p>
            </motion.div>
          </Link>
        ))}
      </div>
    </div>
  </section>
);

export default QuickLinksSection;
