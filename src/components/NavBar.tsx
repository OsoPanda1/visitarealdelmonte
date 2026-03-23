import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { GotaDeMercurioButton } from "@/components/GotaDeMercurioButton";

const navSections = [
  {
    label: "Explorar",
    items: [
      { name: "Historia", path: "/historia" },
      { name: "Cultura", path: "/cultura" },
      { name: "Arte", path: "/arte" },
      { name: "Gastronomía", path: "/gastronomia" },
      { name: "Ecoturismo", path: "/ecoturismo" },
    ],
  },
  {
    label: "Descubrir",
    items: [
      { name: "Rutas Turísticas", path: "/rutas" },
      { name: "Mitos y Leyendas", path: "/relatos" },
      { name: "Dichos Mineros", path: "/dichos" },
      { name: "Eventos", path: "/eventos" },
      { name: "Mapa Digital", path: "/#mapa" },
    ],
  },
  {
    label: "Comunidad",
    items: [
      { name: "Muro Global", path: "/comunidad" },
      { name: "Catálogo Digital", path: "/catalogo" },
      { name: "Quiénes Somos", path: "/quienes-somos" },
    ],
  },
];

const NavBar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setHoveredSection(null);
  }, [location]);

  return (
    <>
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          scrolled || menuOpen ? "bg-background/90 backdrop-blur-2xl border-b border-foreground/5" : ""
        }`}
      >
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-xs">R</span>
            </div>
            <span className="font-bold text-sm tracking-tight">
              RDM<span className="text-primary">·</span>X
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8">
            {navSections.map((section) => (
              <div
                key={section.label}
                className="relative"
                onMouseEnter={() => setHoveredSection(section.label)}
                onMouseLeave={() => setHoveredSection(null)}
              >
                <button className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors py-4">
                  {section.label}
                </button>

                <AnimatePresence>
                  {hoveredSection === section.label && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-1/2 -translate-x-1/2 pt-2"
                    >
                      <div className="glass-surface-strong p-4 min-w-[200px] space-y-1">
                        {section.items.map((item) => (
                          <Link
                            key={item.path}
                            to={item.path}
                            className={`block px-4 py-2.5 rounded-lg text-sm transition-all hover:bg-primary/10 hover:text-foreground ${
                              location.pathname === item.path ? "text-primary bg-primary/5" : "text-muted-foreground"
                            }`}
                          >
                            {item.name}
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden xl:block">
              <GotaDeMercurioButton compact />
            </div>
            <Link to="/catalogo">
              <motion.span
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="hidden md:inline-block btn-sovereign bg-primary text-primary-foreground text-[10px] px-5 py-2"
              >
                Registrar Negocio
              </motion.span>
            </Link>

            {/* Mobile burger */}
            <button className="lg:hidden flex flex-col gap-1.5" onClick={() => setMenuOpen(!menuOpen)}>
              <span className={`w-5 h-0.5 bg-foreground transition-all ${menuOpen ? "rotate-45 translate-y-1" : ""}`} />
              <span className={`w-5 h-0.5 bg-foreground transition-all ${menuOpen ? "opacity-0" : ""}`} />
              <span className={`w-5 h-0.5 bg-foreground transition-all ${menuOpen ? "-rotate-45 -translate-y-1" : ""}`} />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="fixed inset-0 top-16 z-30 bg-background/95 backdrop-blur-2xl overflow-y-auto lg:hidden"
          >
            <div className="container mx-auto px-6 py-8 space-y-8">
              {navSections.map((section) => (
                <div key={section.label}>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-primary mb-3 block">{section.label}</span>
                  <div className="space-y-1">
                    {section.items.map((item) => (
                      <Link
                        key={item.path}
                        to={item.path}
                        className={`block py-3 text-lg font-medium transition-colors ${
                          location.pathname === item.path ? "text-primary" : "text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
              <Link to="/catalogo" className="block">
                <span className="btn-sovereign bg-primary text-primary-foreground text-xs inline-block">Registrar Negocio</span>
              </Link>
              <div>
                <GotaDeMercurioButton compact />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default NavBar;
