"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Minus, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

type LocationName =
  | "Karimnagar"
  | "Hyderabad"
  | "Rajahmundry"
  | "South Africa"
  | "Srisailam";

type PlaqueButton = {
  name: LocationName;
  top: string;
  left: string;
  width: string;
  height: string;
};

const plaqueButtons: PlaqueButton[] = [
  { name: "Karimnagar", top: "59.2%", left: "20.7%", width: "11.6%", height: "4.1%" },
  { name: "Hyderabad", top: "59.2%", left: "46.8%", width: "10.8%", height: "4.1%" },
  { name: "Rajahmundry", top: "31.6%", left: "85.5%", width: "11.4%", height: "4.1%" },
  { name: "South Africa", top: "83.8%", left: "86.6%", width: "12.2%", height: "4.1%" },
  { name: "Srisailam", top: "21.2%", left: "38.9%", width: "9.7%", height: "4%" },
];

const placeholderImages = [
  "/images/arc.png",
  "/images/arc1.png",
  "/images/archi1.png",
  "/images/archi2.png",
  "/images/archi (1).png",
  "/images/arhero.png",
  "/images/arc.png",
  "/images/arc1.png",
];

const portfolioImages: Record<LocationName, string[]> = {
  Karimnagar: placeholderImages,
  Hyderabad: placeholderImages,
  Rajahmundry: placeholderImages,
  "South Africa": placeholderImages,
  Srisailam: placeholderImages,
};

export function PortfolioSection() {
  const [selectedLocation, setSelectedLocation] = useState<LocationName | null>(
    null
  );
  const [isMinimised, setIsMinimised] = useState(false);
  const [cardOrder, setCardOrder] = useState<number[]>([0, 1, 2, 3, 4, 5, 6, 7]);
  const [isCycling, setIsCycling] = useState(false);

  const selectedImages = useMemo(
    () => (selectedLocation ? portfolioImages[selectedLocation] : []),
    [selectedLocation]
  );

  useEffect(() => {
    setCardOrder([0, 1, 2, 3, 4, 5, 6, 7]);
    setIsMinimised(false);
    setIsCycling(false);
  }, [selectedLocation]);

  const closeDialog = () => {
    setSelectedLocation(null);
    setIsMinimised(false);
  };

  const cycleTopCard = () => {
    if (isCycling || isMinimised) return;

    setIsCycling(true);
    window.setTimeout(() => {
      setCardOrder(([first, ...rest]) => [...rest, first]);
      setIsCycling(false);
    }, 320);
  };

  return (
    <section className="relative overflow-hidden bg-black px-4 py-20 text-white sm:px-6 lg:px-10">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(201,161,77,0.14),transparent_36%),linear-gradient(180deg,rgba(0,0,0,0.9),#000_42%,#050402)]" />

      <div className="relative mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col gap-3 md:mb-12 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.46em] text-[#c9a14d]">
              Portfolio
            </p>
            <h2 className="mt-3 text-4xl font-semibold tracking-wide text-white md:text-6xl">
              Spatial Footprints
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-6 text-white/55">
            A constellation of built intent, plotted across terrain and time.
          </p>
        </div>

        <div className="relative mx-auto w-full max-w-6xl overflow-hidden rounded-[1.75rem] border border-[#c9a14d]/20 bg-white/[0.03] shadow-[0_30px_120px_rgba(0,0,0,0.6)]">
          <img
            src="/portfoliof.png"
            alt="Archidius portfolio locations map"
            className="h-auto w-full select-none object-cover"
            draggable={false}
          />

          {plaqueButtons.map((plaque) => (
            <motion.button
              key={plaque.name}
              type="button"
              aria-label={`Open ${plaque.name} portfolio`}
              onClick={() => setSelectedLocation(plaque.name)}
              className="absolute z-10 flex cursor-pointer items-center justify-center rounded-[0.35vw] border border-[#d2a74d]/70 bg-[linear-gradient(180deg,rgba(61,35,13,0.97),rgba(18,10,4,0.98)_52%,rgba(73,43,16,0.97))] px-[0.6vw] text-center font-serif text-[clamp(7px,1.08vw,17px)] uppercase tracking-[0.16em] text-[#f4d37b] shadow-[0_0_10px_rgba(0,0,0,0.68),inset_0_1px_0_rgba(255,226,145,0.34),inset_0_-2px_7px_rgba(0,0,0,0.62)] outline-none ring-1 ring-black/60 transition-shadow duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] [pointer-events:auto] hover:shadow-[0_0_34px_7px_rgba(247,216,138,0.5),0_10px_24px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,226,145,0.45),inset_0_-2px_9px_rgba(0,0,0,0.68)] focus-visible:shadow-[0_0_34px_7px_rgba(247,216,138,0.5),0_10px_24px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,226,145,0.45),inset_0_-2px_9px_rgba(0,0,0,0.68)]"
              style={{
                top: plaque.top,
                left: plaque.left,
                width: plaque.width,
                height: plaque.height,
              }}
              whileHover={{ y: -8, scale: 1.03 }}
              whileTap={{ y: -2, scale: 0.97 }}
              transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="pointer-events-none block w-full truncate drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]">
                {plaque.name}
              </span>
            </motion.button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedLocation && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/62 px-4 py-8 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onMouseDown={closeDialog}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label={`${selectedLocation} portfolio`}
              className="relative w-full max-w-[1296px] overflow-hidden rounded-[1.5rem] border border-[#c9a14d]/45 bg-black/50 text-white shadow-[0_24px_90px_rgba(0,0,0,0.72)] backdrop-blur-2xl"
              initial={{ opacity: 0, y: 28, scale: 0.96 }}
              animate={{
                opacity: 1,
                y: 0,
                scale: isMinimised ? 0.92 : 1,
                height: isMinimised ? 92 : "auto",
              }}
              exit={{ opacity: 0, y: 20, scale: 0.96 }}
              transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
              onMouseDown={(event) => event.stopPropagation()}
            >
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(201,161,77,0.18),transparent_32%),linear-gradient(135deg,rgba(255,255,255,0.10),rgba(255,255,255,0.025))]" />

              <div className="relative flex items-start justify-between gap-4 border-b border-[#c9a14d]/20 px-5 py-5 sm:px-7">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.42em] text-[#c9a14d]">
                    Archidius Portfolio
                  </p>
                  <h3 className="mt-2 text-2xl font-semibold tracking-wide sm:text-4xl">
                    {selectedLocation}
                  </h3>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    aria-label={isMinimised ? "Restore dialog" : "Minimise dialog"}
                    onClick={() => setIsMinimised((value) => !value)}
                    className="grid h-9 w-9 place-items-center rounded-full border border-[#c9a14d]/30 bg-white/5 text-[#f7d88a] transition hover:scale-105 hover:bg-[#c9a14d]/15"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    aria-label="Close dialog"
                    onClick={closeDialog}
                    className="grid h-9 w-9 place-items-center rounded-full border border-[#c9a14d]/30 bg-white/5 text-[#f7d88a] transition hover:scale-105 hover:bg-[#c9a14d]/15"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <AnimatePresence initial={false}>
                {!isMinimised && (
                  <motion.div
                    className="relative grid gap-5 px-4 py-5 sm:px-6 sm:py-6 md:grid-cols-[0.36fr_1.64fr] md:items-center"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.25 }}
                  >
                    <div className="space-y-4 text-sm leading-7 text-white/60">
                      <p>
                        Tap the leading card to cycle through this location&apos;s
                        visual set.
                      </p>
                      <p className="text-xs uppercase tracking-[0.34em] text-[#c9a14d]/80">
                        8 image deck
                      </p>
                    </div>

                    <div className="relative mx-auto h-[470px] w-full max-w-3xl [perspective:1500px] sm:h-[650px]">
                      {cardOrder.map((imageIndex, stackIndex) => {
                        const isTopCard = stackIndex === 0;

                        return (
                          <motion.button
                            key={imageIndex}
                            type="button"
                            aria-label={
                              isTopCard
                                ? "Move top portfolio card to back"
                                : undefined
                            }
                            disabled={!isTopCard}
                            onClick={cycleTopCard}
                            className="absolute inset-x-2 top-3 overflow-hidden rounded-2xl border border-[#c9a14d]/25 bg-black shadow-[0_34px_100px_rgba(0,0,0,0.68)] [transform-style:preserve-3d] sm:inset-x-5"
                            style={{
                              zIndex: selectedImages.length - stackIndex,
                              pointerEvents: isTopCard ? "auto" : "none",
                            }}
                            initial={false}
                            animate={{
                              x: Math.min(stackIndex, 3) * 15,
                              y: Math.min(stackIndex, 3) * 18,
                              rotate:
                                stackIndex % 2 === 0
                                  ? Math.min(stackIndex, 3) * -1.8
                                  : Math.min(stackIndex, 3) * 1.8,
                              rotateX: Math.min(stackIndex, 3) * -2,
                              scale: 1 - Math.min(stackIndex, 3) * 0.045,
                              opacity: stackIndex > 3 ? 0 : 1,
                            }}
                            transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
                            whileHover={
                              isTopCard
                                ? {
                                    y: -14,
                                    scale: 1.035,
                                    boxShadow:
                                      "0 42px 110px rgba(201,161,77,0.28)",
                                  }
                                : undefined
                            }
                          >
                            <motion.img
                              src={selectedImages[imageIndex]}
                              alt={`${selectedLocation} project ${imageIndex + 1}`}
                              className="h-[430px] w-full object-cover sm:h-[600px]"
                              draggable={false}
                              animate={
                                isTopCard && isCycling
                                  ? { y: -34, opacity: 0, scale: 1.04 }
                                  : { y: 0, opacity: 1, scale: 1 }
                              }
                              transition={{ duration: 0.28 }}
                            />
                            <span className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent px-4 py-4 text-left text-xs uppercase tracking-[0.24em] text-[#f7d88a]">
                              {String(imageIndex + 1).padStart(2, "0")}
                            </span>
                          </motion.button>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
