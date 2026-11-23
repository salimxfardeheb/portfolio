import type { Service } from "@/content/types";
import { ServiceItem } from "@/components/ui/ServiceItem";

const LETTERS = "ABCDEFGH";

export function ServicesGrid({
  services,
  border = "top",
}: {
  services: Service[];
  border?: "top" | "bottom";
}) {
  return (
    <div className="grid gap-x-12 md:grid-cols-2">
      {services.map((service, i) => (
        <ServiceItem key={service.title} letter={LETTERS[i]} service={service} border={border} />
      ))}
    </div>
  );
}
