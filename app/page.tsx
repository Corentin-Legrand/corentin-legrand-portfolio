import Link from "next/link";
import React from "react";
import Particles from "./components/particles";

const navigation = [
  { name: "Projets", href: "/projects" },
  { name: "Contact", href: "/contact" },
];

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen overflow-hidden bg-cream">
      <nav className="my-16 animate-fade-in">
        <ul className="flex items-center justify-center gap-4">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm duration-500 text-forest/50 hover:text-forest"
            >
              {item.name}
            </Link>
          ))}
        </ul>
      </nav>
      <div className="hidden w-screen h-px animate-glow md:block animate-fade-left bg-gradient-to-r from-forest/0 via-forest/40 to-forest/0" />
      <Particles
        className="absolute inset-0 -z-10 animate-fade-in"
        quantity={100}
      />
      <h1 className="py-3.5 px-0.5 z-10 text-4xl text-transparent duration-1000 bg-forest cursor-default animate-title font-display sm:text-6xl md:text-9xl whitespace-nowrap bg-clip-text ">
        Corentin Legrand
      </h1>
      <p className="z-10 text-xl text-forest/60 animate-fade-in sm:text-2xl md:text-3xl font-display">
        Créer, développer, optimiser.
      </p>

      <div className="hidden w-screen h-px animate-glow md:block animate-fade-right bg-gradient-to-r from-forest/0 via-forest/40 to-forest/0" />
      <div className="my-16 text-center animate-fade-in">
        <h2 className="text-sm text-forest/50 ">
            Cette plateforme a été conçue pour rassembler les projets sur lesquels j’ai travaillé et mettre en avant mes compétences techniques.        </h2>
      </div>
    </div>
  );

}
