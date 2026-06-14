import { Box, CssBaseline } from "@mui/material";
import NavBar from "../features/landing-page/components/NavBar";
import HeroSection from "../features/landing-page/components/HeroSection";
import ProblemsSection from "../features/landing-page/components/ProblemsSection";
import FeaturesSection from "../features/landing-page/components/FeaturesSection";
import AIAssistantSection from "../features/landing-page/components/AIAssistantSection";
import InventoryPosSection from "../features/landing-page/components/InventoryPosSection";
import HowItWorksSection from "../features/landing-page/components/HowItWorksSection";
import PricingSection from "../features/landing-page/components/PricingSection";
import TestimonialsSection from "../features/landing-page/components/TestimonialsSection";
import FaqSection from "../features/landing-page/components/FaqSection";
import CtaSection from "../features/landing-page/components/CtaSection";
import FooterSection from "../features/landing-page/components/FooterSection";

export const LandingPage = () => {
  return (
    <>
      <CssBaseline />
      <Box sx={{ bgcolor: "background.default", color: "#0F172A" }}>
        <NavBar />
        <HeroSection />
        <ProblemsSection />
        <FeaturesSection />
        <AIAssistantSection />
        <InventoryPosSection />
        <HowItWorksSection />
        <PricingSection />
        <TestimonialsSection />
        <FaqSection />
        <CtaSection />
        <FooterSection />
      </Box>
    </>
  );
};
