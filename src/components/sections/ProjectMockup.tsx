import Image from "next/image";
import type { Project } from "@/lib/data";

export function Mockup({
  project,
  sizes = "(min-width: 1344px) 1264px, (min-width: 1024px) calc(100vw - 80px), (min-width: 640px) calc(100vw - 64px), calc(100vw - 40px)",
}: {
  project: Project;
  sizes?: string;
}) {
  return (
    <div className="relative h-full w-full bg-[var(--color-mist)]">
      <Image
        src={project.image}
        alt={project.imageAlt}
        fill
        quality={90}
        sizes={sizes}
        className="object-cover object-top"
      />
    </div>
  );
}
