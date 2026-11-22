import Hero from '@/components/Hero';
import About from '@/components/About';
import Experience from '@/components/Experience';
import FeaturedProjects from '@/components/FeaturedProjects';
import Archive from '@/components/Archive';
import Services from '@/components/Services';
import Testimonials from '@/components/Testimonials';
import Contact from '@/components/Contact';
import {
  getArchiveProjects,
  getFeaturedProjects,
  getJobs,
  getTestimonials,
} from '@/lib/db';

// Revalidate content from the database every minute.
export const revalidate = 60;

export default async function Home() {
  const [jobs, featured, archive, testimonials] = await Promise.all([
    getJobs(),
    getFeaturedProjects(),
    getArchiveProjects(),
    getTestimonials(),
  ]);

  return (
    <>
      <Hero />
      <About />
      <Experience jobs={jobs} />
      <FeaturedProjects projects={featured} />
      <Archive projects={archive} />
      <Services />
      <Testimonials testimonials={testimonials} />
      <Contact />
    </>
  );
}
