"use client";
import React from "react";
import Link from "next/link";
import { FaArrowRight, FaExternalLinkAlt } from "react-icons/fa";
import { useLanguage } from "@/app/context/LanguageContext";
import type { Project } from "@/app/data/projects/types";

/**
 * A project as the assistant presents it. Everything shown comes from
 * app/data/projects/ — the same source as the /portfolio page.
 */
const ChatProjectCard = ({ project }: { project: Project }) => {
  const { lang, t } = useLanguage();

  return (
    <article className="chat-entry-in rounded-xl border border-black/10 bg-black/[0.03] p-3.5">
      <header className="flex items-center gap-2">
        <span
          className="h-2 w-2 shrink-0 rounded-full"
          style={{ backgroundColor: project.accent }}
          aria-hidden="true"
        />
        <h4 className="text-[14px] font-semibold text-black">{project.name}</h4>
      </header>

      <p className="mt-1 text-[11px] uppercase tracking-wider text-black/55">
        {project.category[lang]}
      </p>
      <p className="mt-2 text-[13px] leading-relaxed text-black/70">
        {project.tagline[lang]}
      </p>

      <p className="mt-3 text-[11px] uppercase tracking-wider text-black/55">
        {t.chatbot.features}
      </p>
      <ul className="mt-1 flex flex-col gap-1">
        {project.highlights[lang].slice(0, 3).map((highlight) => (
          <li key={highlight} className="flex gap-2 text-[12.5px] leading-snug text-black/65">
            <span className="text-redOrange" aria-hidden="true">
              •
            </span>
            {highlight}
          </li>
        ))}
      </ul>

      <ul className="mt-3 flex flex-wrap gap-1.5">
        {project.stack.slice(0, 4).map((tech) => (
          <li
            key={tech}
            className="rounded-md bg-black/[0.06] px-2 py-0.5 text-[11px] text-black/60"
          >
            {tech}
          </li>
        ))}
      </ul>

      <div className="mt-3 flex flex-wrap gap-2">
        {project.link && (
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-9 items-center gap-2 rounded-lg bg-redOrange px-3 py-1.5 text-[12.5px] font-medium text-white transition-transform duration-150 hover:scale-[1.03]"
          >
            {t.chatbot.visit}
            <FaExternalLinkAlt className="text-[10px]" />
          </a>
        )}
        <Link
          href={`/portfolio#${project.slug}`}
          className="inline-flex min-h-9 items-center gap-2 rounded-lg border border-black/20 px-3 py-1.5 text-[12.5px] font-medium text-black/75 transition-colors duration-150 hover:border-redOrange hover:text-black"
        >
          {t.chatbot.caseStudy}
          <FaArrowRight className="text-[10px]" />
        </Link>
      </div>
    </article>
  );
};

export default ChatProjectCard;
