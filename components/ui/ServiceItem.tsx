import type { Service } from "@/content/types";

export function ServiceItem({
  service,
  border = "top",
}: {
  service: Service;
  border?: "top" | "bottom";
}) {
  return (
    <div className={`flex py-8 border-line ${border === "top" ? "border-t" : "border-b"}`}>
      <div className="flex flex-col gap-3">
        <h3 className="text-[22px] font-medium tracking-[-0.02em] sm:text-[26px]">{service.title}</h3>
        <p className="max-w-[440px] leading-[1.55] text-body">{service.text}</p>
      </div>
    </div>
  );
}
