import EmailIcon from "@mui/icons-material/Email";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { Link, Stack, Typography } from "@mui/material";
import type { SvgIconComponent } from "@mui/icons-material";

interface Contact {
    label: string;
    handle: string;
    href: string;
    icon: SvgIconComponent;
}

const CONTACTS: Contact[] = [
    { label: "GitHub", handle: "stefanos-larkou", href: "https://github.com/stefanos-larkou", icon: GitHubIcon },
    { label: "LinkedIn", handle: "stefanos-larkou", href: "https://www.linkedin.com/in/stefanos-larkou", icon: LinkedInIcon },
    { label: "Email", handle: "s.larkou@outlook.com", href: "mailto:s.larkou@outlook.com", icon: EmailIcon }
];

export function ContactLinks() {
    return (
        <Stack
            direction={{ xs: "column", sm: "row" }}
            sx={{
                alignItems: "center",
                justifyContent: "center",
                flexWrap: "nowrap",
                gap: { xs: 1.25, sm: 3 }
            }}
        >
            {CONTACTS.map(contact => (
                <Link
                    key={contact.label}
                    href={contact.href}
                    aria-label={`${contact.label}: ${contact.handle}`}
                    target={contact.href.startsWith("mailto:") ? undefined : "_blank"}
                    rel="noreferrer"
                    underline="none"
                    sx={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 1,
                        color: "text.secondary",
                        transition: "color 200ms ease",
                        "&:hover": { color: "brand.main" },
                        "&:hover .contact-handle": { borderBottomColor: "brand.main" },
                        "@media (prefers-reduced-motion: reduce)": { transition: "none" }
                    }}
                >
                    <contact.icon fontSize="small" sx={{ color: "brand.main" }} />
                    <Typography
                        className="contact-handle"
                        variant="body2"
                        component="span"
                        sx={{ borderBottom: "1px solid", borderBottomColor: "brand.soft", transition: "border-color 200ms ease" }}
                    >
                        {contact.handle}
                    </Typography>
                </Link>
            ))}
        </Stack>
    );
}
