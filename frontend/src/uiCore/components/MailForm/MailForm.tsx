import React from "react";
import { Box } from "@mui/material";

export interface IMailFormProps {
    variant?: "primary" | "secondary";
}

export const MailForm = React.forwardRef<HTMLElement, IMailFormProps>(
    (props, ref) => {
          return (
                  <Box
                            sx={{
                                        width: "100%",
                                        maxWidth: "100%",
                                        display: "flex",
                                        justifyContent: "center",
                            }}
                          >
                          <script async src="https://subscribe-forms.beehiiv.com/embed.js"></script>script>
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
                  </Box>Box>
                );
    }
  );

MailForm.displayName = "MailForm";</Box>
