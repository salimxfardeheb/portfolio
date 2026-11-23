import type { TeamMember } from "@/content/site";

export function TeamMemberCard({ member }: { member: TeamMember }) {
  return (
    <div className="flex min-w-0 flex-[1_1_320px] items-start gap-5">
      {/* eslint-disable-next-line @next/next/no-img-element -- export statique, image déjà dimensionnée */}
      <img
        src={member.photo}
        alt={`Portrait de ${member.name}`}
        width={72}
        height={72}
        loading="lazy"
        className="size-[72px] shrink-0 rounded-full bg-cream object-cover"
      />
      <div>
        <p className="mb-0.5 text-lg font-medium tracking-[-0.01em]">{member.name}</p>
        <p className="caps mb-2 text-[11px] text-muted">{member.role}</p>
        <p className="max-w-[460px] text-sm leading-[1.5] text-body">{member.bio}</p>
      </div>
    </div>
  );
}
