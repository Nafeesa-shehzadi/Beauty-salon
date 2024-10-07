import { styled } from "@mui/system";

const NotFoundContainer = styled("div")({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  minHeight: "100vh", // Full height of the viewport
  overflow: "hidden", // Prevent overflow
  backgroundColor: "#f0f0f0", // Optional: background color
});

const NotFoundImage = styled("img")({
  maxWidth: "100%", // Ensure the image fits within the container
  maxHeight: "100%", // Ensure the image doesn't exceed the container height
  objectFit: "contain", // Scale the image to maintain aspect ratio
});

function Notfound() {
  return (
    <NotFoundContainer>
      <NotFoundImage src="./notfound.jpg" alt="Page not Found" />
    </NotFoundContainer>
  );
}

export default Notfound;
