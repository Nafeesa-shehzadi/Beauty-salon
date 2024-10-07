import React from "react";
import { Box, Typography, Container } from "@mui/material";
import styled from "styled-components";

const StyledContainer = styled(Container)`
  margin-top: 2rem; // Adjust margin as needed
  overflow: hidden; // Prevent horizontal scroll
`;

const About: React.FC = () => {
  return (
    <StyledContainer maxWidth="lg">
      <Box
        textAlign="center"
        sx={{
          marginBottom: "5rem",
        }}
      >
        <Typography variant="h4" gutterBottom>
          Glamour
        </Typography>
        <Typography variant="h2" gutterBottom>
          ABOUT
        </Typography>
        <Typography variant="body1" textAlign="justify" gutterBottom>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet facilis
          voluptas provident animi corrupti dolor, ipsum deleniti perferendis
          veniam neque labore enim odio ratione. Ad commodi rem corporis soluta
          sed reprehenderit a quasi nihil, odit aperiam exercitationem? Suscipit
          rerum quibusdam inventore atque veritatis accusantium excepturi,
          molestias optio perferendis aliquam harum, amet dolore! Animi
          consequuntur officiis modi eius cumque reiciendis harum ipsum
          praesentium numquam fugit? Consequatur eveniet recusandae harum hic.
          Eum illo praesentium optio accusantium, hic quibusdam delectus
          voluptatem qui a officiis dolorum minima cum illum culpa doloremque
          quia quidem aut sed laudantium nam repudiandae sequi similique! Esse
          natus at quas?
        </Typography>
      </Box>
    </StyledContainer>
  );
};

export default About;
