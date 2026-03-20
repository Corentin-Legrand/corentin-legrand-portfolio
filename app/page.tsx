"use client";

import Link from "next/link";
import React from "react";
import dynamic from "next/dynamic";

const PixelBlast = dynamic(() => import("./components/PixelBlast/PixelBlast"), {
  ssr: false,
});

const navigation = [
  { name: "Projets", href: "/projects" },
  { name: "Contact", href: "/contact" },
];

export default function Home() {
  return (
    <div className="relative flex flex-col items-center justify-center w-screen h-screen overflow-hidden bg-cream">
      {/* Arrière-plan PixelBlast */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'auto', opacity: 0.6 }}>
        <PixelBlast
          variant="square"
          pixelSize={4}
          color="#1a4a3a"
          patternScale={2}
          patternDensity={1}
          pixelSizeJitter={0}
          enableRipples
          rippleSpeed={0.4}
          rippleThickness={0.12}
          rippleIntensityScale={1.5}
          liquid={false}
          speed={0.5}
          edgeFade={0.25}
          transparent
          style={{ width: '100%', height: '100%' }}
        />
      </div>

      <nav className="z-10 my-16 animate-fade-in">
        <ul className="flex items-center justify-center gap-6">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="px-5 py-2 text-sm font-medium duration-500 rounded-full border-2 border-forest/30 bg-cream text-forest hover:bg-forest hover:text-cream"
            >
              {item.name}
            </Link>
          ))}
        </ul>
      </nav>
      <div className="z-10 hidden w-screen h-px animate-glow md:block animate-fade-left bg-gradient-to-r from-forest/0 via-forest/40 to-forest/0" />

      <h1 className="py-3.5 px-4 z-10 text-4xl text-forest duration-1000 cursor-default animate-title font-display sm:text-6xl md:text-9xl whitespace-nowrap" style={{ background: 'radial-gradient(ellipse at center, rgb(247 231 206 / 60%) 30%, rgb(247 231 206 / 0%) 80%)', borderRadius: '9999px', padding: '1rem 3rem' }}>
        Corentin Legrand
      </h1>
      <p className="z-10 text-xl text-forest animate-fade-in sm:text-2xl md:text-3xl font-display mt-2" style={{ background: 'radial-gradient(ellipse at center, rgb(247 231 206 / 55%) 30%, rgb(247 231 206 / 0%) 80%)', borderRadius: '9999px', padding: '0.5rem 2.5rem' }}>
        Créer, développer, optimiser.
      </p>

      <div className="z-10 hidden w-screen h-px animate-glow md:block animate-fade-right bg-gradient-to-r from-forest/0 via-forest/40 to-forest/0" />
      <div className="z-10 my-16 text-center animate-fade-in" style={{ background: 'linear-gradient(to bottom, rgb(247 231 206 / 0%) 0%, rgb(247 231 206 / 100%) 30%, rgb(247 231 206 / 100%) 70%, rgb(247 231 206 / 0%) 100%)', borderRadius: '9999px', padding: '1rem 2.5rem' }}>
        <h2 className="text-sm text-forest">
            Cette plateforme a été conçue pour rassembler les projets sur lesquels j'ai travaillé et mettre en avant mes compétences techniques.
        </h2>
      </div>
    </div>
  );
}
