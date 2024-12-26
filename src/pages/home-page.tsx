import { Navbar } from "@/components/navbar";
import { Vortex } from "../components/ui/vortex";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";

export function VortexDemoSecond() {
    const words = `Introducing AubergineGPT`;

  return (
    <div className="min-h-screen flex flex-col">

      {/* Main Content with Vortex Background */}
      <main className="flex-1">
        <Vortex
          backgroundColor="black"
          rangeY={800}
          particleCount={500}
          baseHue={234}
          className="flex items-center flex-col justify-center px-4 w-full min-h-screen"
        >
          <div className="pt-20 flex flex-col items-center max-w-4xl mx-auto">
            <h1 className="text-white text-4xl md:text-6xl lg:text-7xl font-bold text-center tracking-tight">
              <TextGenerateEffect words={words} />
            </h1>
            <p className="text-white/90 text-lg md:text-xl max-w-2xl mt-8 text-center leading-relaxed">
              We&apos;ve trained a model called AubergineGPT which interacts in a conversational way.
              The dialogue format makes it possible to answer followup questions, admit its mistakes,
              challenge incorrect premises, and reject inappropriate requests.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-6 mt-12">
              <a
                href="/try"
                className="px-6 py-3 bg-white text-black hover:bg-white/90 transition duration-200 rounded-md font-medium text-lg"
              >
                Try AubergineGPT →
              </a>
              <a
                href="/download"
                className="px-6 py-3 text-white hover:text-white/90 transition duration-200 text-lg"
              >
                Download AubergineGPT desktop
              </a>
              <a
                href="/learn"
                className="px-6 py-3 text-white hover:text-white/90 transition duration-200 text-lg"
              >
                Learn about AubergineGPT
              </a>
            </div>
          </div>
        </Vortex>
      </main>
    </div>
  );
}
