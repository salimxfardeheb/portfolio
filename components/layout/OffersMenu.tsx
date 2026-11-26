"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { FiChevronDown } from "react-icons/fi";
import { offers } from "@/content/site";

/**
 * « Offres » dans la navigation : un bouton qui déroule la liste des offres (une par page).
 * S'ouvre au clic (et au survol à la souris) ; Échap, un clic ailleurs ou un lien choisi le referment.
 */
export function OffersMenu({ linkClass }: { linkClass: string }) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLLIElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelId = useId();

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <li
      ref={rootRef}
      className="relative"
      onPointerEnter={(event) => event.pointerType === "mouse" && setOpen(true)}
      onPointerLeave={(event) => event.pointerType === "mouse" && setOpen(false)}
    >
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((value) => !value)}
        className={`inline-flex items-center gap-1 ${linkClass}`}
      >
        Offres
        <FiChevronDown
          aria-hidden="true"
          className={`size-4 transition-transform duration-200 motion-reduce:transition-none ${open ? "rotate-180" : ""}`}
        />
      </button>
      {/* pt-3 : un pont invisible entre le bouton et la liste, pour que le survol ne la referme pas. */}
      <div
        id={panelId}
        className={`absolute top-full left-0 z-20 pt-3 transition-[opacity,transform,visibility] duration-200 ease-out motion-reduce:transition-none ${
          open ? "visible translate-y-0 opacity-100" : "invisible -translate-y-1 opacity-0"
        }`}
      >
        <ul className="w-[min(300px,calc(100vw-4rem))] border border-ink bg-paper">
          {offers.map((offer) => (
            <li key={offer.href} className="border-b border-line last:border-b-0">
              <Link
                href={offer.href}
                onClick={() => setOpen(false)}
                className="block px-5 py-4 transition-colors hover:bg-cream active:bg-line"
              >
                <span className="block">{offer.label}</span>
                <span className="label mt-1 block font-normal text-muted">{offer.text}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </li>
  );
}
