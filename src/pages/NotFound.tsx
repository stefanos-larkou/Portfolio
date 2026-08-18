import { Container, Link, Stack, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router";

export default function NotFound() {
    return (
        <Container maxWidth="md" sx={{ py: { xs: 6, md: 10 } }}>
            <Stack spacing={2} sx={{ alignItems: "flex-start" }}>
                <Typography variant="h1">
                    Page not found
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    That page does not exist, or it has moved.
                </Typography>
                <Link component={RouterLink} to="/">
                    Back to the home page
                </Link>
            </Stack>
        </Container>
    );
}