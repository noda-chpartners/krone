import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);
gsap.defaults({ ease: "power3.out", duration: 0.8 });

let introduced = false;

export function initMotion() {
  const mm = gsap.matchMedia();

  mm.add(
    {
      desktop: "(min-width: 900px)",
      mobile: "(max-width: 899px)",
      reduce: "(prefers-reduced-motion: reduce)",
    },
    (context) => {
      const reduce = Boolean(context.conditions?.reduce);
      const desktop = Boolean(context.conditions?.desktop);

      if (reduce) {
        gsap.set("[data-reserve]", { autoAlpha: 1 });
        return;
      }

      const lenis = new Lenis({
        lerp: 0.08,
        smoothWheel: true,
        autoRaf: false,
        anchors: {
          duration: 1.1,
          offset: desktop ? 0 : -48,
        },
      });

      lenis.on("scroll", ScrollTrigger.update);

      const onTick = (time: number) => {
        lenis.raf(time * 1000);
      };

      gsap.ticker.add(onTick);
      gsap.ticker.lagSmoothing(0);

      if (!introduced) {
        introduced = true;
        const load = gsap.timeline();
        load
          .from("[data-rail-item]", {
            y: 12,
            autoAlpha: 0,
            stagger: 0.06,
            duration: 0.6,
          })
          .fromTo(
            "[data-hero-mark]",
            { yPercent: 110 },
            { yPercent: 0, duration: 1.1, ease: "power4.out" },
            0.1,
          )
          .fromTo(
            "[data-hero-photo]",
            { scale: 1.08 },
            { scale: 1, duration: 1.4 },
            0.15,
          )
          .fromTo(
            "[data-hero-rule]",
            { scaleX: 0 },
            { scaleX: 1, duration: 0.9, transformOrigin: "left center" },
            0.4,
          );
      }

      if (desktop) {
        gsap.to("[data-hero-photo]", {
          yPercent: -8,
          ease: "none",
          scrollTrigger: {
            trigger: "[data-hero]",
            start: "top top",
            end: "bottom top",
            scrub: 0.6,
          },
        });
      }

      gsap.fromTo(
        "[data-step-line]",
        { scaleY: 0 },
        {
          scaleY: 1,
          duration: 0.8,
          transformOrigin: "top center",
          scrollTrigger: {
            trigger: "[data-plate='02']",
            start: "top 70%",
            toggleActions: "play none none reverse",
          },
        },
      );

      gsap.set("[data-reserve]", { autoAlpha: 0 });

      ScrollTrigger.create({
        trigger: "[data-hero-reserve]",
        start: "bottom top",
        onLeave: () => {
          gsap.to("[data-reserve]", { autoAlpha: 1, duration: 0.35, overwrite: "auto" });
        },
        onEnterBack: () => {
          gsap.to("[data-reserve]", { autoAlpha: 0, duration: 0.35, overwrite: "auto" });
        },
      });

      document.fonts?.ready.then(() => {
        ScrollTrigger.refresh();
      });

      return () => {
        lenis.destroy();
        gsap.ticker.remove(onTick);
      };
    },
  );
}
