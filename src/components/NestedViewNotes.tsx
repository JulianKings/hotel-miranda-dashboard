import { Box, Button, Modal } from "@mui/material";
import { Fragment, useState } from "react";
import PropTypes from 'prop-types';
import styled from "styled-components";

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

const ViewMoreButton = styled.button`
	border: 0rem solid;
	background-color: #EEF9F2;
	color: #212121;
	font-size: 1rem;
	line-height: 1.56rem;
	font-weight: 400;
	padding: 0.81rem 2.19rem;
	border-radius: 0.75rem;

	&:focus {
		outline: none;
	}
`;

interface PropTypes
{
	content: string;
}


export default function NestedViewNotes({content}: PropTypes) {
    const [open, setOpen] = useState(false);
    const handleOpen = () => {
      setOpen(true);
    };
    const handleClose = () => {
      setOpen(false);
    };
  
    return (
      <div>
        {<Fragment>
            <ViewMoreButton onClick={handleOpen}>View Notes</ViewMoreButton>    
        </Fragment>}
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="parent-modal-title"
          aria-describedby="parent-modal-description"
        >
          <Box sx={{ ...style, width: 600 }}>
            <h2 id="parent-modal-title">View Notes</h2>
            <p style={{margin: '0.95rem 0'}} id="parent-modal-description">
              {content}
            </p>
            <Button onClick={handleClose}>Close</Button>
          </Box>
        </Modal>
      </div>
    );
}
