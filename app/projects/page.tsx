import React from "react";
import { allProjects } from "contentlayer/generated";
import { Navigation } from "../components/nav";
import { Card } from "../components/card";
import { Article } from "./article";
import { ProjectExplorer } from "./project-section";
import { Redis } from "@upstash/redis";
import { TagMajeur } from "@/util/tags";

export const dynamic = "force-dynamic";

export default async function ProjectsPage() {
  const redis = Redis.fromEnv();
  const views = (
    await redis.mget<number[]>(
      ...allProjects.map((p) => ["pageviews", "projects", p.slug].join(":")),
    )
  ).reduce((acc, v, i) => {
    acc[allProjects[i].slug] = v ?? 0;
    return acc;
  }, {} as Record<string, number>);

  const published = allProjects
    .filter((p) => p.published)
    .sort(
      (a, b) =>
        new Date(b.date ?? Number.POSITIVE_INFINITY).getTime() -
        new Date(a.date ?? Number.POSITIVE_INFINITY).getTime(),
    );

  const sections = Object.values(TagMajeur)
    .map((tag) => ({
      tag,
      projects: published.filter((p) => p.tagMajeur === tag),
    }))
    .filter((s) => s.projects.length > 0);

  const sansTag = published.filter((p) => !p.tagMajeur);

  const allSections = [
    ...sections.map((s) => ({
      tag: s.tag,
      children: s.projects.map((project) => (
        <Card key={project.slug}>
          <Article project={project} views={views[project.slug] ?? 0} />
        </Card>
      )),
    })),
    ...(sansTag.length > 0
      ? [{
          tag: "Autres",
          children: sansTag.map((project) => (
            <Card key={project.slug}>
              <Article project={project} views={views[project.slug] ?? 0} />
            </Card>
          )),
        }]
      : []),
  ];

  return (
    <div className="relative pb-16">
      <Navigation />
      <div className="px-6 pt-20 mx-auto space-y-16 max-w-7xl lg:px-8 md:pt-24 lg:pt-32">

        <div className="max-w-2xl mx-auto lg:mx-0">
          <h2 className="text-3xl font-bold tracking-tight text-forest sm:text-4xl">
            Projets
          </h2>
          <p className="mt-4 text-forest/60">
            Certains projets sont réalisés dans un cadre professionnel, d'autres sur mon temps libre.
          </p>
        </div>

        <div className="w-full h-0.5 bg-forest/20" />

        <ProjectExplorer sections={allSections} />

      </div>
    </div>
  );
}
