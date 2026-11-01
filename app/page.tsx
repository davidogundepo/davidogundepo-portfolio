import Hero from '@/components/sections/Hero';
import Statement from '@/components/sections/Statement';
import Numbers from '@/components/sections/Numbers';
import Yba from '@/components/sections/Yba';
import Pipeline from '@/components/sections/Pipeline';
import Work from '@/components/sections/Work';
import WebWall from '@/components/sections/WebWall';
import Record from '@/components/sections/Record';
import Capabilities from '@/components/sections/Capabilities';
import About from '@/components/sections/About';
import Contact from '@/components/sections/Contact';

export default function Home() {
  return (
    <>
      <Hero />
      <Statement />
      <Numbers />
      <Yba />
      <Pipeline />
      <Work />
      <WebWall />
      <Record />
      <Capabilities />
      <About />
      <Contact />
    </>
  );
}
