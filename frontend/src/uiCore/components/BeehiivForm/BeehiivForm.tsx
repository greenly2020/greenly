import React from "react";
import { Box, Typography } from "@mui/material";

export interface IBeehiivFormProps {
    variant?: "primary" | "secondary";
}

export const BeehiivForm = React.forwardRef<HTMLElement, IBeehiivFormProps>(
    (props, ref) => {
        return (
            <Box
                sx={{
                    width: "100%",
                    maxWidth: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <Typography variant="h6" sx={{ mb: 2 }}>
                    Enter your email for our monthly digest
                </Typography>
                <script async src="https://subscribe-forms.beehiiv.com/embed.js"></script>
                <iframe
                    src="https://subscribe-forms.beehiiv.com/889aa328-9f35-4546-ae95-6457bb5765b5"
                    className="beehiiv-embed"
                    data-test-id="beehiiv-embed"
                    frameBorder={0}
                    scrolling="no"
                    style={{
                        width: "456px",
                        height: "291px",
                        margin: 0,
                        borderRadius: "0px",
                        backgroundColor: "transparent",
                        boxShadow: "none",
                        maxWidth: "100%",
                    }}
                />
            </Box>
        );
    }
);

BeehiivForm.displayName = "BeehiivForm";
