import React from "react";
import { Box, Typography, Grid, IconButton } from "@mui/material";
import styled from "styled-components";

const SocialIcon = styled(IconButton)`
  width: 50px;
  height: 50px;
  margin: 0 8px;

  &:hover {
    transform: scale(1.1);
    transition: transform 0.3s ease;
  }
`;

const Footer: React.FC = () => {
  return (
    <footer>
      <Box className="banner" py={4} bgcolor="#da5e9c" textAlign="center">
        <Typography variant="h1" component="h1" fontWeight="bold">
          Glamour
        </Typography>
        <Typography variant="subtitle1" color="textSecondary">
          The Beauty Salon
        </Typography>

        <Box mt={2}>
          <Typography variant="body1">Subscribe</Typography>
          <Grid container justifyContent="center" mt={2}>
            <a
              href="https://wa.me/03206253428"
              target="_blank"
              rel="noopener noreferrer"
            >
              <SocialIcon>
                <img src="whatsappicon.png" alt="WhatsApp" />
              </SocialIcon>
            </a>
            <a
              href="https://www.facebook.com/your_facebook_page"
              target="_blank"
              rel="noopener noreferrer"
            >
              <SocialIcon>
                <img src="facebook.png" alt="Facebook" />
              </SocialIcon>
            </a>
            <a
              href="https://www.instagram.com/your_instagram_page"
              target="_blank"
              rel="noopener noreferrer"
            >
              <SocialIcon>
                <img src="instagram.png" alt="Instagram" />
              </SocialIcon>
            </a>
            <a
              href="https://www.youtube.com/your_youtube_channel"
              target="_blank"
              rel="noopener noreferrer"
            >
              <SocialIcon>
                <img src="youtube.png" alt="YouTube" />
              </SocialIcon>
            </a>
            <a
              href="https://twitter.com/your_twitter_handle"
              target="_blank"
              rel="noopener noreferrer"
            >
              <SocialIcon>
                <img src="twittericon.png" alt="Twitter" />
              </SocialIcon>
            </a>
          </Grid>
          <Typography variant="body2" color="textSecondary" mt={2}>
            Subscribe with your accounts to receive discounts and updates!
          </Typography>
        </Box>
      </Box>
    </footer>
  );
};

export default Footer;
