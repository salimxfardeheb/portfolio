import type { Service } from "@/content/types";
import { ServiceItem } from "@/components/ui/ServiceItem";

export function ServicesGrid({
  services,
  border = "top",
}: {
  services: Service[];
  border?: "top" | "bottom";
}) {
  return (
    <div className="grid gap-x-12 md:grid-cols-2">
      {services.map((service) => (
        <ServiceItem key={service.title} service={service} border={border} />
      ))}
    </div>
  );
}
