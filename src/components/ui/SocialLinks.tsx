import type { SocialLink } from "@/types/site";
import { socialIcons, socialNames } from "./icons";

type Props = {
  links: SocialLink[];
  /** Texto antes de los íconos (ej: "Síguenos"). */
  label?: string;
  className?: string;
  /** Color de los íconos; por defecto el acento. Sobre fondos de color conviene "text-current". */
  iconClassName?: string;
};

export function SocialLinks({ links, label, className = "", iconClassName = "text-accent" }: Props) {
  if (links.length === 0) return null;

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {label && <p className="text-sm font-medium">{label}</p>}
      <ul className="flex items-center gap-1">
        {links.map(({ network, url }) => {
          const Icon = socialIcons[network];
          return (
            <li key={network}>
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={socialNames[network]}
                className={`flex h-11 w-11 items-center justify-center rounded-full ${iconClassName} transition hover:bg-current/10 active:scale-95 active:bg-current/15 motion-reduce:active:scale-100`}
              >
                <Icon className="h-6 w-6" />
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
