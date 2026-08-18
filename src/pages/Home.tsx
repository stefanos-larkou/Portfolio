import { Container, Stack, Typography } from "@mui/material";

export default function Home() {
    return (
        <Container maxWidth="md" sx={{ py: { xs: 6, md: 10 } }}>
            <Stack spacing={2}>
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
    );
}
