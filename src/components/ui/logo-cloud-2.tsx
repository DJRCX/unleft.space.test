import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import React from "react";

type Logo = {
  src?: string;
  alt?: string;
  width?: number;
  height?: number;
  title?: string;
  description?: string;
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};

type LogoCloudProps = React.ComponentProps<"div"> & {
    items?: Logo[];
};

export function LogoCloud({ className, items, ...props }: LogoCloudProps) {
  return (
    <div
      className={cn(
        "relative grid grid-cols-1 border-x md:grid-cols-2 lg:grid-cols-4 border-border",
        className
      )}
      {...props}
    >
      <div className="-translate-x-1/2 -top-px pointer-events-none absolute left-1/2 w-screen border-t border-border" />

      {items && items.length > 0 ? (
        items.map((item, index) => (
          <LogoCard
            key={index}
            className={cn(
              "relative border-r border-b border-border bg-background/50 hover:bg-card/50 transition-colors group",
              index % 4 === 3 ? "lg:border-r-0" : ""
            )}
            logo={item}
          >
            <Plus
              className="-right-[12.5px] -bottom-[12.5px] absolute z-10 size-6 text-[#2D2D44] group-hover:text-accent-glow transition-colors"
              strokeWidth={1}
            />
          </LogoCard>
        ))
      ) : (
        <div className="col-span-full py-12 text-center text-text-secondary">
          No core values found.
        </div>
      )}

      <div className="-translate-x-1/2 -bottom-px pointer-events-none absolute left-1/2 w-screen border-b border-border" />
    </div>
  );
}

type LogoCardProps = React.ComponentProps<"div"> & {
  logo: Logo;
};

function LogoCard({ logo, className, children, ...props }: LogoCardProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center bg-background px-4 py-8 md:p-10 text-center",
        className
      )}
      {...props}
    >
      {logo.icon ? (
          <div className="mb-4 h-12 w-12 rounded-lg bg-accent-primary/10 flex items-center justify-center group-hover:bg-accent-primary/20 transition-colors">
              <logo.icon className="h-6 w-6 text-accent-glow" />
          </div>
      ) : logo.src ? (
          <img
            alt={logo.alt}
            className="pointer-events-none h-8 select-none md:h-10 mb-4 dark:brightness-0 dark:invert"
            height={logo.height || "auto"}
            src={logo.src}
            width={logo.width || "auto"}
          />
      ) : null}
      
      {logo.title && <h3 className="font-bold text-text-primary mb-2 group-hover:text-accent-glow transition-colors">{logo.title}</h3>}
      {logo.description && <p className="text-sm text-text-secondary leading-relaxed">{logo.description}</p>}
      
      {children}
    </div>
  );
}
