import React from "react";
import Model from "./Model";

const PageExperience = () => {
  return (
    <section className="w-full relative bg-neutral-200">
      <div className="fixed inset-0 z-10">
        <Model />
      </div>

      <div className="size-full absolute inset-0 flex justify-evenly pointer-events-none">
        <div className="h-full shrink-0 w-px bg-amber-800/30"></div>
        <div className="h-full shrink-0 w-px bg-amber-800/30"></div>
        <div className="h-full shrink-0 w-px bg-amber-800/30"></div>
        <div className="h-full shrink-0 w-px bg-amber-800/30"></div>
        <div className="h-full shrink-0 w-px bg-amber-800/30"></div>
      </div>

      <div className="h-screen w-full flex items-end p-12">
        <h1 className="text-[12vw] tracking-tight text-amber-900 leading-none uppercase">
          History in Motion
        </h1>
      </div>

      <div className=" w-full py-24 space-y-24">
        <div className="flex p-12">
          <div className="max-w-sm">
            <h2 className="text-4xl font-light tracking-tight text-amber-900 mb-4">
              Eternal Craft
            </h2>
            <p className="text-lg text-amber-800/70">
              Stone shaped by human hands, preserved by centuries. Carries the
              silence, strength, and spirit of an age long past.
            </p>
          </div>
        </div>

        <div className="flex p-12 justify-end">
          <div className="max-w-sm">
            <h2 className="text-4xl font-light tracking-tight text-amber-900 mb-4">
              Carved by Time
            </h2>
            <p className="text-lg text-amber-800/70">
              Each fracture, erosion, and imperfection marks the passage of time
              rather than its loss. The surface becomes a record of weather,
              touch, and memory.
            </p>
          </div>
        </div>

        <div className="flex p-12">
          <div className="max-w-sm">
            <h2 className="text-4xl font-light tracking-tight text-amber-900 mb-4">
              The Past, Reimagined
            </h2>
            <p className="text-lg text-amber-800/70">
              Ancient mastery meets the present moment, inviting history to live
              again.
            </p>
          </div>
        </div>

        <div className="flex p-12 justify-end">
          <div className="max-w-sm">
            <h2 className="text-4xl font-light tracking-tight text-amber-900 mb-4">
              Enduring Presence
            </h2>
            <p className="text-lg text-amber-800/70">
              Each form stands without urgency, shaped by intention rather than
              trend. What remains is not decoration, but meaning held in stone.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PageExperience;
