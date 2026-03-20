"use client";

import { PropsWithChildren } from "react";
import BorderGlow from "./BorderGlow/BorderGlow";

export const Card: React.FC<PropsWithChildren> = ({ children }) => {
	return (
		<BorderGlow
			edgeSensitivity={30}
			glowColor="35 82 89"
			backgroundColor="#1a4a3a"
			borderRadius={12}
			glowRadius={40}
			glowIntensity={1}
			coneSpread={25}
			colors={['#f5d8a8', '#c8955a', '#f0c890']}
			fillOpacity={0.3}
			className="duration-700 group md:gap-8"
		>
			{children}
		</BorderGlow>
	);
};
