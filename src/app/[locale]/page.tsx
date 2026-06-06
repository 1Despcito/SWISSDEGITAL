import { setRequestLocale } from 'next-intl/server';
import { Hero } from '@/components/sections/Hero';
import { ServicesGrid } from '@/components/sections/ServicesGrid';
import { WhySection } from '@/components/sections/WhySection';
import { SelectedWork } from '@/components/sections/SelectedWork';
import { ProcessTimeline } from '@/components/sections/ProcessTimeline';
import { StatsBand } from '@/components/sections/StatsBand';
import { Testimonials } from '@/components/sections/Testimonials';
import { AIHighlight } from '@/components/sections/AIHighlight';
import { CTASection } from '@/components/sections/CTASection';
import { ScrollDepth } from '@/components/analytics/ScrollDepth';

export default function HomePage({ params }: { params: { locale: string } }) {
  setRequestLocale(params.locale);

  return (
    <>
      <ScrollDepth page="home" />
      <Hero />
      <ServicesGrid />
      <WhySection />
      <SelectedWork />
      <ProcessTimeline />
      <StatsBand />
      <Testimonials />
      <AIHighlight />
      <CTASection />
    </>
  );
}
