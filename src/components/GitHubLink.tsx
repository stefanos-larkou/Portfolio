import GitHubIcon from "@mui/icons-material/GitHub";
import { Link, Typography } from "@mui/material";

const LABEL = "Source on GitHub";

interface GitHubLinkProps {
    href: string;
    label?: string;
}

export function GitHubLink({ href, label = LABEL }: GitHubLinkProps) {
    return (
        <Typography variant="body1" sx={{ textAlign: "end" }}>
            <Link
                href={href}
                target="_blank"
                rel="noreferrer"
                sx={{ display: "inline-flex", alignItems: "center", gap: 0.75 }}
            >
                <GitHubIcon fontSize="small" />
                {label}
            </Link>
        </Typography>
    );
}
