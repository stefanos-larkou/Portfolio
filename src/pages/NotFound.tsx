import { Box, Button, Container, Stack, Typography } from "@mui/material";
import type { Theme } from "@mui/material/styles";
import { Link as RouterLink } from "react-router";
import { HomeBackdrop } from "../components/HomeBackdrop";
import { TITLE_PREFIX } from "../core/pages";
import { glass } from "../core/surfaces";

const CODE = "404";
const HEADING = "Page not found";
const EXPLANATION = "That page does not exist, or it has moved. Everything there is to see is a random step away.";
const BACK = "Home";

const PANEL_RADIUS = 5;
const CODE_SIZE = "clamp(2.25rem, 7vw, 3.25rem)";
const RING = "2px";

function edge(theme: Theme, colour: "divider" | "brand"): string {
    const palette = (theme.vars ?? theme).palette;
    return colour === "divider" ? palette.divider : palette.brand.soft;
}

export default function NotFound() {
    return (
        <>
            <title>{`${TITLE_PREFIX}${HEADING}`}</title>
            <HomeBackdrop />
            <Box
                sx={{
                    position: "relative",
                    zIndex: 1,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flex: 1,
                    minHeight: "72svh"
                }}
            >
                <Container maxWidth="sm" sx={{ py: { xs: 6, md: 8 } }}>
                    <Stack
                        spacing={2}
                        sx={theme => ({
                            alignItems: "flex-start",
                            p: { xs: 3, sm: 4 },
                            position: "relative",
                            borderRadius: theme.spacing(PANEL_RADIUS),
                            ...glass(theme),
                            "&::before": {
                                content: "\"\"",
                                position: "absolute",
                                inset: 0,
                                borderRadius: "inherit",
                                padding: RING,
                                pointerEvents: "none",
                                background: `linear-gradient(135deg, ${edge(theme, "divider")} 20%, ${edge(theme, "brand")} 85%)`,
                                WebkitMask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
                                WebkitMaskComposite: "xor",
                                maskComposite: "exclude"
                            }
                        })}
                    >
                        <Typography
                            component="p"
                            sx={{
                                color: "brand.main",
                                fontSize: CODE_SIZE,
                                fontWeight: 700,
                                lineHeight: 1,
                                letterSpacing: "0.06em"
                            }}
                        >
                            {CODE}
                        </Typography>
                        <Typography variant="h2" component="h1">{HEADING}</Typography>
                        <Typography variant="body1" color="text.secondary">{EXPLANATION}</Typography>
                        <Button
                            component={RouterLink}
                            to="/"
                            variant="outlined"
                            sx={{
                                mt: 1,
                                alignSelf: "center",
                                px: 4,
                                color: "brand.main",
                                borderColor: "brand.soft",
                                "&:hover": { borderColor: "brand.main", backgroundColor: "brand.soft" }
                            }}
                        >
                            {BACK}
                        </Button>
                    </Stack>
                </Container>
            </Box>
        </>
    );
}
