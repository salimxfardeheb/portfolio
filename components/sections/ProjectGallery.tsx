"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { FiArrowLeft, FiArrowRight, FiX } from "react-icons/fi";
import { optimizedImage, type ShotGroup } from "@/app/data/projects/types";

type FlatShot = { src: string; caption: string; mobile: boolean };

/**
 * Galerie d'une étude de cas, par groupes d'écrans. Un clic ouvre la capture en page entière
 * dans une fenêtre (<dialog> natif : Échap ferme, le focus reste dedans) ; ← → passent d'un écran à l'autre.
 */
export function ProjectGallery({ groups }: { groups: ShotGroup[] }) {
  const flat: FlatShot[] = groups.flatMap((group) =>
    group.shots.map((shot) => ({ src: shot.src, caption: shot.caption.fr, mobile: group.device === "mobile" })),
  );
  const dialogRef = useRef<HTMLDialogElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [current, setCurrent] = useState<number | null>(null);

  const open = (index: number) => {
    setCurrent(index);
    dialogRef.current?.showModal();
  };
  const close = () => dialogRef.current?.close();
  const step = useCallback(
    (delta: number) => setCurrent((index) => (index === null ? index : (index + delta + flat.length) % flat.length)),
    [flat.length],
  );

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 0 });
  }, [current]);

  let index = 0;
  const shot = current === null ? null : flat[current];

  return (
    <>
      {groups.map((group) => {
        const mobile = group.device === "mobile";
        return (
          <div key={group.title.fr} className="mt-14 first:mt-0">
            <h3 className="mb-6 text-xl font-medium tracking-[-0.02em]">{group.title.fr}</h3>
            <ul
              className={
                mobile
                  ? "grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:max-w-[760px]"
                  : "grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2"
              }
            >
              {group.shots.map((item) => {
                const position = index++;
                return (
                  <li key={item.src}>
                    <button
                      type="button"
                      onClick={() => open(position)}
                      className="group block w-full cursor-zoom-in text-left active:opacity-80"
                      aria-label={`Agrandir : ${item.caption.fr}`}
                    >
                      {mobile ? (
                        <div className="overflow-hidden border border-line bg-cream transition-colors group-hover:border-ink">
                          {/* eslint-disable-next-line @next/next/no-img-element -- export statique, versions déjà générées */}
                          <img
                            src={optimizedImage(item.src, "full")}
                            alt=""
                            width={486}
                            height={1080}
                            loading="lazy"
                            decoding="async"
                            className="aspect-[9/20] w-full object-cover object-top"
                          />
                        </div>
                      ) : (
                        <div className="aspect-[16/10] overflow-hidden border border-line bg-cream transition-colors group-hover:border-ink">
                          {/* eslint-disable-next-line @next/next/no-img-element -- export statique, versions déjà générées */}
                          <img
                            src={optimizedImage(item.src, "md")}
                            srcSet={`${optimizedImage(item.src, "sm")} 640w, ${optimizedImage(item.src, "md")} 1280w`}
                            sizes="(min-width: 640px) 600px, calc(100vw - 4rem)"
                            alt=""
                            width={1280}
                            height={800}
                            loading="lazy"
                            decoding="async"
                            className="size-full object-cover object-top"
                          />
                        </div>
                      )}
                    </button>
                    <p className="mt-3 max-w-[520px] text-sm leading-[1.5] text-muted">{item.caption.fr}</p>
                  </li>
                );
              })}
            </ul>
          </div>
        );
      })}

      <dialog
        ref={dialogRef}
        aria-label={shot ? shot.caption : "Capture d'écran"}
        onClose={() => setCurrent(null)}
        onClick={(event) => event.target === event.currentTarget && close()}
        onKeyDown={(event) => {
          if (event.key === "ArrowRight") step(1);
          if (event.key === "ArrowLeft") step(-1);
        }}
        className="m-0 size-full max-h-none max-w-none bg-transparent p-0 backdrop:bg-ink/90"
      >
        {shot && (
          <div className="flex h-full flex-col text-cream" onClick={(event) => event.target === event.currentTarget && close()}>
            <div className="page-x flex w-full items-center justify-between gap-4 py-4">
              <p className="label flex min-w-0 gap-4 text-dim-light">
                <span className="shrink-0 tabular-nums">
                  {current! + 1} sur {flat.length}
                </span>
                <span className="truncate">{shot.caption}</span>
              </p>
              <div className="flex shrink-0 gap-2">
                <GalleryButton label="Capture précédente" onClick={() => step(-1)}>
                  <FiArrowLeft className="size-5" />
                </GalleryButton>
                <GalleryButton label="Capture suivante" onClick={() => step(1)}>
                  <FiArrowRight className="size-5" />
                </GalleryButton>
                <GalleryButton label="Fermer" onClick={close}>
                  <FiX className="size-5" />
                </GalleryButton>
              </div>
            </div>
            <div
              ref={scrollRef}
              className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 pb-8"
              onClick={(event) => event.target === event.currentTarget && close()}
            >
              {/* eslint-disable-next-line @next/next/no-img-element -- export statique, versions déjà générées */}
              <img
                src={optimizedImage(shot.src, "full")}
                alt={shot.caption}
                className={`mx-auto h-auto bg-paper ${shot.mobile ? "w-full max-w-[420px]" : "w-full max-w-[1200px]"}`}
              />
              <a
                href={shot.src}
                target="_blank"
                rel="noopener noreferrer"
                className="label mx-auto mt-4 block w-fit text-dim underline underline-offset-4 hover:text-cream"
              >
                Ouvrir l’image en pleine résolution
              </a>
            </div>
          </div>
        )}
      </dialog>
    </>
  );
}

function GalleryButton({ label, onClick, children }: { label: string; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="grid size-11 place-items-center border border-iron transition-colors hover:border-cream active:bg-graphite disabled:cursor-not-allowed disabled:opacity-40"
    >
      {children}
    </button>
  );
}
