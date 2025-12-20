import { Target } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="py-12 border-t border-border">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="w-14 h-14 rounded-lg flex items-center justify-center">
              <img src="/footer-logo.png" alt="Logo" className="w-full h-full object-contain" />
            </div>
            <span className="font-display font-bold text-lg">Gestor de Tráfego</span>
          </div>

          <p className="text-muted-foreground text-sm text-center">
            © {new Date().getFullYear()} Todos os direitos reservados.
          </p>

          <p className="text-muted-foreground text-sm">
            Especialista em Meta Ads e Google Ads
          </p>
        </div>
      </div>
    </footer>
  );
};
