import { Link as RouterLink } from "react-router";
import { Container, Link, Stack, Typography } from "@mui/material";
import { HomeBackdrop } from "../components/HomeBackdrop";

export default function Home() {
    return (
        <>
            <HomeBackdrop />
            <Container maxWidth="md" sx={{ py: { xs: 6, md: 10 } }}>
                <Stack spacing={2}>
                    <Link component={RouterLink} to="/find-my-way">
                        Find My Way
                    </Link>

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
