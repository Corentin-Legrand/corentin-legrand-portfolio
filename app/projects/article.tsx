import type { Project } from "@/.contentlayer/generated";
import Link from "next/link";
import { Eye, ImageIcon } from "lucide-react";

type Props = {
	project: Project;
	views: number;
};

export const Article: React.FC<Props> = ({ project, views }) => {
	return (
		<Link href={`/projects/${project.slug}`}>
			<article className="flex flex-col">
				{/* Zone image */}
				<div className="relative w-full h-48 md:h-56 overflow-hidden rounded-t-[10px] bg-forest/5">
					{project.image ? (
						<img
							src={project.image}
							alt={project.title}
							className="w-full h-full object-cover"
						/>
					) : (
						<div className="flex items-center justify-center w-full h-full">
							<ImageIcon className="w-12 h-12 text-forest/20" />
						</div>
					)}
				</div>

				{/* Contenu texte */}
				<div className="p-5 md:p-8">
					<div className="flex justify-between gap-2 items-center">
						<span className="text-xs duration-1000 text-forest/80 group-hover:text-forest drop-shadow-orange">
							{project.date ? (
								<time dateTime={new Date(project.date).toISOString()}>
									{Intl.DateTimeFormat(undefined, { dateStyle: "medium" }).format(
										new Date(project.date),
									)}
								</time>
							) : (
								<span>BIENTÔT</span>
							)}
						</span>
						<span className="text-forest/40 text-xs flex items-center gap-1">
							<Eye className="w-4 h-4" />{" "}
							{Intl.NumberFormat("en-US", { notation: "compact" }).format(views)}
						</span>
					</div>
					<h2 className="z-20 mt-3 text-xl font-medium duration-1000 lg:text-2xl text-forest group-hover:text-forest font-display">
						{project.title}
					</h2>
					<p className="z-20 mt-3 text-sm duration-1000 text-forest/60 group-hover:text-forest/80 line-clamp-3">
						{project.description}
					</p>
				</div>
			</article>
		</Link>
	);
};
