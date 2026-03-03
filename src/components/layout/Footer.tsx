import { Github, Linkedin, Mail, Rocket } from "lucide-react";

const footerLinks = {
  Company: [
    { label: "About", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Projects", href: "/projects" },
    { label: "Team", href: "/team" },
  ],
  Services: [
    { label: "Web Development", href: "/services" },
    { label: "Game Development", href: "/services" },
    { label: "Custom Software", href: "/services" },
    { label: "AI Systems", href: "/services" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "/legal/privacy" },
    { label: "Terms & Conditions", href: "/legal/terms" },
    { label: "Cookie Policy", href: "/legal/cookies" },
  ],
};

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[#2D2D44] bg-[#0A0A0F]">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-1">
            <a
              href="/"
              className="group mb-4 flex items-center gap-2 font-heading font-bold text-xl text-[#E5E7EB]"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-gradient-to-br from-[#7C3AED] to-[#9333EA] shadow-[0_0_15px_rgba(124,58,237,0.4)]">
                <Rocket className="h-4 w-4 text-white" />
              </div>
              UNLEFT
            </a>
            <p className="mb-6 text-sm leading-relaxed text-[#9CA3AF]">
              Engineering the Future. Bangladesh-based, globally ambitious
              software solutions.
            </p>
            <div className="flex items-center gap-4">
              <a
                href="https://github.com/unleft"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="text-[#9CA3AF] transition-colors hover:text-[#C084FC]"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="https://linkedin.com/company/unleft"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="text-[#9CA3AF] transition-colors hover:text-[#C084FC]"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="mailto:hello@unleft.space"
                aria-label="Email"
                className="text-[#9CA3AF] transition-colors hover:text-[#C084FC]"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([group, links]) => (
            <div key={group}>
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-[#E5E7EB]">
                {group}
              </h3>
              <ul className="space-y-2">
                {links.map(({ label, href }) => (
                  <li key={label}>
                    <a
                      href={href}
                      className="text-sm text-[#9CA3AF] transition-colors hover:text-[#E5E7EB]"
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-[#2D2D44] pt-8 sm:flex-row">
          <p className="text-sm text-[#9CA3AF]">
            &copy; {year} UNLEFT. All rights reserved.
          </p>
          <p className="text-sm text-[#9CA3AF]">
            Dhaka, Bangladesh &bull;{" "}
            <a
              href="mailto:hello@unleft.space"
              className="text-[#C084FC] hover:underline"
            >
              hello@unleft.space
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
