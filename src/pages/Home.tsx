import { Link as RouterLink } from "react-router";
import { Container, Link, Stack, Typography } from "@mui/material";
import { HomeBackdrop } from "../components/HomeBackdrop";
import { PAGES } from "../core/pages";

const PROJECTS = PAGES.filter(page => page.heading);

export default function Home() {
    return (
        <>
            <HomeBackdrop />
            <Container maxWidth="md" sx={{ py: { xs: 6, md: 10 } }}>
                <Stack spacing={2}>
                    {PROJECTS.map(project => (
                        <Link key={project.path} component={RouterLink} to={project.path}>
                            {project.heading}
                        </Link>
                    ))}

                    <Typography variant="overline" color="text.secondary">
                        Placeholder Title
                    </Typography>
                    <Typography variant="h1">
                        Stefanos Larkou
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        Placeholder text.
                    </Typography>
                </Stack>
            </Container>
        </>
    );
}
