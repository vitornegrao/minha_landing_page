import { HeroSection } from "@/components/landing/HeroSection";
import { MethodSection } from "@/components/landing/MethodSection";
import { ComparisonSection } from "@/components/landing/ComparisonSection";
import { LeadForm } from "@/components/landing/LeadForm";
import { Footer } from "@/components/landing/Footer";
import { Helmet } from "react-helmet-async";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>Gestor de Tráfego Pago | Leads Qualificados no Instagram e Facebook</title>
        <meta 
          name="description" 
          content="Especialista em captação de leads qualificados no Instagram e Facebook. Transformo cliques em clientes reais com atendimento personalizado e foco em resultados." 
        />
        <meta name="keywords" content="gestor de tráfego, tráfego pago, leads qualificados, instagram ads, facebook ads, meta ads" />
        <link rel="canonical" href={window.location.origin} />
      </Helmet>
      
      <main className="min-h-screen bg-background">
        <HeroSection />
        <MethodSection />
        <ComparisonSection />
        <LeadForm />
        <Footer />
      </main>
    </>
  );
};

export default Index;
