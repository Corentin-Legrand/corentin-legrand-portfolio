"use client";

import React, { useState } from "react";
import Folder from "../components/Folder/Folder";

interface Section {
	tag: string;
	children: React.ReactNode;
}

interface ProjectExplorerProps {
	sections: Section[];
}

export const ProjectExplorer: React.FC<ProjectExplorerProps> = ({ sections }) => {
	const [selected, setSelected] = useState<string | null>(null);

	const handleSelect = (tag: string) => {
		setSelected((prev) => (prev === tag ? null : tag));
	};

	const activeSection = sections.find((s) => s.tag === selected);

	return (
		<div>
			{/* Ligne de dossiers */}
			<div className="flex flex-wrap justify-center gap-16 lg:gap-24">
				{sections.map((section) => {
					const isOpen = selected === section.tag;
					return (
						<div
							key={section.tag}
							className="flex flex-col items-center gap-6 cursor-pointer select-none"
							onClick={() => handleSelect(section.tag)}
						>
							<div className="h-32 flex items-end">
								<Folder
									color="#F7E7CE"
									size={1.5}
									open={isOpen}
								/>
							</div>
							<span
								className={`text-lg font-semibold font-display transition-colors duration-200 ${
									isOpen ? "text-forest" : "text-forest/50"
								}`}
							>
								{section.tag}
							</span>
						</div>
					);
				})}
			</div>

			{/* Grille des projets du dossier sélectionné */}
			<div
				className={`transition-all duration-500 ease-in-out overflow-hidden ${
					activeSection
						? "max-h-[4000px] opacity-100 mt-16"
						: "max-h-0 opacity-0 mt-0"
				}`}
			>
				{activeSection && (
					<div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
						{activeSection.children}
					</div>
				)}
			</div>
		</div>
	);
};
