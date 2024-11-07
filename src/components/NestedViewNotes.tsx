import { Box, Button, Modal } from "@mui/material";
import { Fragment, useState } from "react";
import { NestedViewNotesPropTypes } from "../interfaces/componentProps";
import { ViewMoreButton } from "./NestedViewStyle";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: '#000',
    color: 'white',
    border: '2px solid #000',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
};


export default function NestedViewNotes({content, prompt = 'View Notes'}: NestedViewNotesPropTypes) {
    const [open, setOpen] = useState<boolean>(false);
    const handleOpen = () => {
      setOpen(true);
    };
    const handleClose = () => {
      setOpen(false);
    };
  
    return (
      <div>
        {<Fragment>
            <ViewMoreButton onClick={handleOpen}>{prompt}</ViewMoreButton>    
        </Fragment>}
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="parent-modal-title"
          aria-describedby="parent-modal-description"
        >
          <Box sx={{ ...style, width: 600 }}>
            <h2 id="parent-modal-title">{prompt}</h2>
            <p style={{margin: '0.95rem 0'}} id="parent-modal-description">
              {content}
            </p>
            <Button onClick={handleClose}>Close</Button>
          </Box>
        </Modal>
      </div>
    );
}
