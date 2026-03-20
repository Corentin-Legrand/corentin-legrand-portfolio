"use client";
import { Github, Mail, Twitter } from "lucide-react";
import Link from "next/link";
import { Navigation } from "../components/nav";
import { Card } from "../components/card";

const socials = [
	{
		icon: <Mail size={20} />,
		href: "mailto:corentin.legrand06pro@gmail.com",
		label: "Email",
		handle: "corentin.legrand06pro@gmail.com",
	},
	{
		icon: <Github size={20} />,
		href: "https://github.com/Corentin-Legrand",
		label: "Github",
		handle: "Corentin Legrand",
	},
];

export default function Example() {
	return (
		<div className="bg-cream">
			<Navigation />
			<div className="container flex items-center justify-center min-h-screen px-4 mx-auto">
				<div className="grid w-full max-w-[70%] grid-cols-1 gap-8 mx-auto mt-32 sm:mt-0 sm:grid-cols-2 lg:gap-16">
					{socials.map((s) => (
						<Card>
							<Link
								href={s.href}
								target="_blank"
								className="p-4 relative flex flex-col items-center gap-4 duration-700 group md:gap-8 md:py-24  lg:pb-48  md:p-16"
							>
								<span
									className="absolute w-px h-2/3 bg-gradient-to-b from-forest/50 via-forest/25 to-transparent"
									aria-hidden="true"
								/>
								<span className="relative z-10 flex items-center justify-center w-12 h-12 text-sm duration-1000 border rounded-full text-forest group-hover:text-forest group-hover:bg-forest/10 border-forest/40 bg-cream group-hover:border-forest drop-shadow-orange">
									{s.icon}
								</span>{" "}
								<div className="z-10 flex flex-col items-center">
									<span className="lg:text-xl font-medium duration-150 xl:text-3xl text-forest group-hover:text-forest font-display">
										{s.handle}
									</span>
									<span className="mt-4 text-sm text-center duration-1000 text-forest/60 group-hover:text-forest/80">
										{s.label}
									</span>
								</div>
							</Link>
						</Card>
					))}
				</div>
			</div>
		</div>
	);
}
