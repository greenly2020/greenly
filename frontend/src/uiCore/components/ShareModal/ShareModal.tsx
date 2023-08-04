import { Dispatch, SetStateAction } from "react";
import { Box, Typography, Modal, InputBase, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import {
  TwitterShareButton,
  LinkedinShareButton,
  FacebookShareButton,
  EmailShareButton,
  FacebookIcon,
  TwitterIcon,
  LinkedinIcon,
  EmailIcon
} from "react-share";

import { theme } from "@/styles/theme";
import { Button } from "../Button";


export interface IShareModalProps {
  handleClose: () => void;
  open: boolean;
  shareLink: string;
  setShareLink: Dispatch<SetStateAction<string>>;
}

const ShareModal = (props: IShareModalProps) => {
  const { handleClose, open, shareLink, setShareLink } = props;

  const handleCopy = () => {
    navigator.clipboard.writeText(shareLink);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setShareLink(event.target.value);
  };

  return (
    <Modal
      keepMounted
      open={open}
      onClose={handleClose}
      aria-labelledby="keep-mounted-modal-title"
      aria-describedby="keep-mounted-modal-description"
    >
      <Box
        position="absolute"
        top="50%"
        left="50%"
        maxWidth="500px"
        width="100%"
        boxShadow="0 0 10px rgba(0,0,0,.5)"
        borderRadius="10px"
        padding="20px"
        display="flex"
        gap="10px"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        sx={{
          backgroundColor: theme.palette.common.white,
          transform: "translate(-50%, -50%)",
        }}
      >
        <Box
          display="flex"
          position="absolute"
          width="calc(100% - 40px)"
          justifyContent="space-between"
          left={20}
          right={20}
          top={20}
        >
          <Typography variant="h6" component="h6" textAlign="center">
            Share article
          </Typography>
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </Box>

        <Box display="flex" gap="20px" mt="60px" mb="20px">
          <FacebookShareButton url={shareLink}>
            <FacebookIcon borderRadius={50} />
          </FacebookShareButton>
          <TwitterShareButton url={shareLink}>
            <TwitterIcon borderRadius={50} />
          </TwitterShareButton>
          <LinkedinShareButton url={shareLink}>
            <LinkedinIcon borderRadius={50} />
          </LinkedinShareButton>
          <EmailShareButton url={shareLink}>
            <EmailIcon  borderRadius={50}/>
          </EmailShareButton>
        </Box>

        <Box
          display="flex"
          border={`1px solid ${theme.palette.gray.primary}`}
          justifyContent="space-between"
          alignItems="center"
          borderRadius="5px"
          width="100%"
          minWidth="280px"
        >
          <InputBase
            value={shareLink}
            onChange={handleChange}
            sx={{
              color: theme.palette.gray.primary,
              fontSize: "14px",
              width: "100%",
              padding: "8px",
            }}
          />
          <Button
            variant="secondary"
            sx={{
              padding: "0",
              fontSize: "14px",
              minWidth: 60,
              height: "30px",
            }}
            label="Copy"
            onClick={handleCopy}
          >
            Copy
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

ShareModal.displayName = "ShareModal";

export { ShareModal };
