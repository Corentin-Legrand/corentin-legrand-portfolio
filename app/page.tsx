"use client";

import Link from "next/link";
import React from "react";
import dynamic from "next/dynamic";
import GlareHover from "./components/GlareHover/GlareHover";

const GameOfLife = dynamic(() => import("./components/GameOfLife/GameOfLife"), {
  ssr: false,
});

const navigation = [
  { name: "Projets", href: "/projects" },
  { name: "Contact", href: "/contact" },
];

export default function Home() {
  return (
    <div className="relative flex flex-col items-center justify-center w-screen h-screen overflow-hidden bg-cream">
      {/* Arrière-plan Game of Life */}
      <GameOfLife
        cellSize={6}
        color="#F7E7CE"
        speed={120}
        edgeFade={0.15}
        initialDensity={0.08}
        style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'auto', opacity: 0.6 }}
      />

      <nav className="z-10 my-16 animate-fade-in">
        <ul className="flex items-center justify-center gap-6">
          {navigation.map((item) => (
            <li key={item.href} className="list-none">
              <Link href={item.href}>
                <GlareHover
                  width="auto"
                  height="auto"
                  background="#1a4a3a"
                  borderRadius="9999px"
                  borderColor="rgba(247, 231, 206, 0.3)"
                  glareColor="#F7E7CE"
                  glareOpacity={0.3}
                  glareAngle={-30}
                  glareSize={300}
                  transitionDuration={800}
                  playOnce={false}
                  style={{ padding: '0.5rem 1.25rem' }}
                >
                  <span className="text-sm font-medium text-forest">{item.name}</span>
                </GlareHover>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="z-10 hidden w-screen h-px animate-glow md:block animate-fade-left bg-gradient-to-r from-forest/0 via-forest/40 to-forest/0" />

      <h1 className="py-3.5 px-4 z-10 text-4xl text-forest duration-1000 cursor-default animate-title font-display sm:text-6xl md:text-9xl whitespace-nowrap" style={{ background: 'radial-gradient(ellipse at center, rgb(26 74 58 / 60%) 30%, rgb(26 74 58 / 0%) 80%)', borderRadius: '9999px', padding: '1rem 3rem' }}>
        Corentin Legrand
      </h1>
      <p className="z-10 text-xl text-forest animate-fade-in sm:text-2xl md:text-3xl font-display mt-2" style={{ background: 'radial-gradient(ellipse at center, rgb(26 74 58 / 55%) 30%, rgb(26 74 58 / 0%) 80%)', borderRadius: '9999px', padding: '0.5rem 2.5rem' }}>
        Créer, développer, optimiser.
      </p>

      <div className="z-10 hidden w-screen h-px animate-glow md:block animate-fade-right bg-gradient-to-r from-forest/0 via-forest/40 to-forest/0" />
      <div className="z-10 my-16 text-center animate-fade-in" style={{ background: 'linear-gradient(to bottom, rgb(26 74 58 / 0%) 0%, rgb(26 74 58 / 100%) 30%, rgb(26 74 58 / 100%) 70%, rgb(26 74 58 / 0%) 100%)', borderRadius: '9999px', padding: '1rem 2.5rem' }}>
        <h2 className="text-sm text-forest">
            Cette plateforme a été conçue pour rassembler les projets sur lesquels j'ai travaillé et mettre en avant mes compétences techniques.
        </h2>
      </div>
    </div>
  );
}
