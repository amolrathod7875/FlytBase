import { useEffect, useRef, useState } from "react";
import { useScroll, useTransform, motion } from "framer-motion";

// Import all 80 extracted frames
import frame01 from "@/assets/frames/frame_0001.png";
import frame02 from "@/assets/frames/frame_0002.png";
import frame03 from "@/assets/frames/frame_0003.png";
import frame04 from "@/assets/frames/frame_0004.png";
import frame05 from "@/assets/frames/frame_0005.png";
import frame06 from "@/assets/frames/frame_0006.png";
import frame07 from "@/assets/frames/frame_0007.png";
import frame08 from "@/assets/frames/frame_0008.png";
import frame09 from "@/assets/frames/frame_0009.png";
import frame10 from "@/assets/frames/frame_0010.png";
import frame11 from "@/assets/frames/frame_0011.png";
import frame12 from "@/assets/frames/frame_0012.png";
import frame13 from "@/assets/frames/frame_0013.png";
import frame14 from "@/assets/frames/frame_0014.png";
import frame15 from "@/assets/frames/frame_0015.png";
import frame16 from "@/assets/frames/frame_0016.png";
import frame17 from "@/assets/frames/frame_0017.png";
import frame18 from "@/assets/frames/frame_0018.png";
import frame19 from "@/assets/frames/frame_0019.png";
import frame20 from "@/assets/frames/frame_0020.png";
import frame21 from "@/assets/frames/frame_0021.png";
import frame22 from "@/assets/frames/frame_0022.png";
import frame23 from "@/assets/frames/frame_0023.png";
import frame24 from "@/assets/frames/frame_0024.png";
import frame25 from "@/assets/frames/frame_0025.png";
import frame26 from "@/assets/frames/frame_0026.png";
import frame27 from "@/assets/frames/frame_0027.png";
import frame28 from "@/assets/frames/frame_0028.png";
import frame29 from "@/assets/frames/frame_0029.png";
import frame30 from "@/assets/frames/frame_0030.png";
import frame31 from "@/assets/frames/frame_0031.png";
import frame32 from "@/assets/frames/frame_0032.png";
import frame33 from "@/assets/frames/frame_0033.png";
import frame34 from "@/assets/frames/frame_0034.png";
import frame35 from "@/assets/frames/frame_0035.png";
import frame36 from "@/assets/frames/frame_0036.png";
import frame37 from "@/assets/frames/frame_0037.png";
import frame38 from "@/assets/frames/frame_0038.png";
import frame39 from "@/assets/frames/frame_0039.png";
import frame40 from "@/assets/frames/frame_0040.png";
import frame41 from "@/assets/frames/frame_0041.png";
import frame42 from "@/assets/frames/frame_0042.png";
import frame43 from "@/assets/frames/frame_0043.png";
import frame44 from "@/assets/frames/frame_0044.png";
import frame45 from "@/assets/frames/frame_0045.png";
import frame46 from "@/assets/frames/frame_0046.png";
import frame47 from "@/assets/frames/frame_0047.png";
import frame48 from "@/assets/frames/frame_0048.png";
import frame49 from "@/assets/frames/frame_0049.png";
import frame50 from "@/assets/frames/frame_0050.png";
import frame51 from "@/assets/frames/frame_0051.png";
import frame52 from "@/assets/frames/frame_0052.png";
import frame53 from "@/assets/frames/frame_0053.png";
import frame54 from "@/assets/frames/frame_0054.png";
import frame55 from "@/assets/frames/frame_0055.png";
import frame56 from "@/assets/frames/frame_0056.png";
import frame57 from "@/assets/frames/frame_0057.png";
import frame58 from "@/assets/frames/frame_0058.png";
import frame59 from "@/assets/frames/frame_0059.png";
import frame60 from "@/assets/frames/frame_0060.png";
import frame61 from "@/assets/frames/frame_0061.png";
import frame62 from "@/assets/frames/frame_0062.png";
import frame63 from "@/assets/frames/frame_0063.png";
import frame64 from "@/assets/frames/frame_0064.png";
import frame65 from "@/assets/frames/frame_0065.png";
import frame66 from "@/assets/frames/frame_0066.png";
import frame67 from "@/assets/frames/frame_0067.png";
import frame68 from "@/assets/frames/frame_0068.png";
import frame69 from "@/assets/frames/frame_0069.png";
import frame70 from "@/assets/frames/frame_0070.png";
import frame71 from "@/assets/frames/frame_0071.png";
import frame72 from "@/assets/frames/frame_0072.png";
import frame73 from "@/assets/frames/frame_0073.png";
import frame74 from "@/assets/frames/frame_0074.png";
import frame75 from "@/assets/frames/frame_0075.png";
import frame76 from "@/assets/frames/frame_0076.png";
import frame77 from "@/assets/frames/frame_0077.png";
import frame78 from "@/assets/frames/frame_0078.png";
import frame79 from "@/assets/frames/frame_0079.png";
import frame80 from "@/assets/frames/frame_0080.png";

const FRAMES = [
  frame01, frame02, frame03, frame04, frame05, frame06, frame07, frame08, frame09, frame10,
  frame11, frame12, frame13, frame14, frame15, frame16, frame17, frame18, frame19, frame20,
  frame21, frame22, frame23, frame24, frame25, frame26, frame27, frame28, frame29, frame30,
  frame31, frame32, frame33, frame34, frame35, frame36, frame37, frame38, frame39, frame40,
  frame41, frame42, frame43, frame44, frame45, frame46, frame47, frame48, frame49, frame50,
  frame51, frame52, frame53, frame54, frame55, frame56, frame57, frame58, frame59, frame60,
  frame61, frame62, frame63, frame64, frame65, frame66, frame67, frame68, frame69, frame70,
  frame71, frame72, frame73, frame74, frame75, frame76, frame77, frame78, frame79, frame80,
];

interface FrameScrollytellerProps {
  children?: React.ReactNode;
  containerHeight?: string;
}

export function FrameScrollyteller({
  children,
  containerHeight = "500vh",
}: FrameScrollytellerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentFrameIndex, setCurrentFrameIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Update current frame based on scroll progress
  useEffect(() => {
    const unsubscribe = scrollYProgress.onChange((progress) => {
      const frameIndex = Math.floor(progress * (FRAMES.length - 1));
      setCurrentFrameIndex(frameIndex);
    });

    return unsubscribe;
  }, [scrollYProgress]);

  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const opacity = useTransform(scrollYProgress, [0, 0.05, 0.95, 1], [0, 1, 1, 0]);

  return (
    <div ref={containerRef} className="relative w-full" style={{ height: containerHeight }}>
      {/* Sticky frame display container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <motion.div
          style={{ scale, opacity }}
          className="absolute inset-0"
        >
          {/* Display current frame */}
          <img
            src={FRAMES[currentFrameIndex]}
            alt={`Frame ${currentFrameIndex}`}
            className="h-full w-full object-cover"
          />

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/40 to-background/90" />
        </motion.div>

        {/* Content overlay */}
        {children && (
          <div className="relative flex h-full items-center justify-center px-6 md:px-14 lg:px-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="w-full"
            >
              {children}
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}
