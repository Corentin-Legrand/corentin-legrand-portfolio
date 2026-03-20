"use client";

import { PropsWithChildren } from "react";
import BorderGlow from "./BorderGlow/BorderGlow";

export const Card: React.FC<PropsWithChildren> = ({ children }) => {
	return (
		<BorderGlow
			edgeSensitivity={30}
			glowColor="160 60 35"
			backgroundColor="#F7E7CE"
			borderRadius={12}
			glowRadius={40}
			glowIntensity={1}
			coneSpread={25}
			colors={['#2d7a5f', '#c8955a', '#4aaa84']}
			fillOpacity={0.3}
			className="duration-700 group md:gap-8"
		>
			{children}
		</BorderGlow>
	);
};
