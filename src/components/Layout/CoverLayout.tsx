import { Box, GlobalStyles, Theme, Typography, useMediaQuery } from "@mui/material";
import { PageLayout } from "./PageLayout";
import { appColors } from "../../theme";
import { AppTypography } from "../CustomMUI";

interface Props {
  children: React.ReactNode;
  title: string;
  description: string;
  motto: string;
  premotto: string;
  image: string;
  color?: string;
  top?: number;
  cardContent?: boolean;
  header?: React.ReactNode;
}

export const CoverLayout = (props: Props) => {
  const { color = "info", header, title, description, motto, premotto, image, top = 0, cardContent, children } = props;
  const isSamllXlScreen = useMediaQuery((theme: Theme) => theme.breakpoints.down("lg"));

  return (
    <PageLayout
      sx={{
        ...(isSamllXlScreen && {
          backgroundImage: `url(${image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundBlendMode: "lighten",
          // backgroundColor: "rgba(255, 255, 255, 0.3)",
        }),
      }}
    >
      <GlobalStyles styles={{ "html, body": { background: "url(null) !important" } }} />
      <Box
        height="100%"
        width="50vw"
        display={{ xs: "none", md: "block" }}
        position="absolute"
        top={0}
        left={0}
        sx={({ breakpoints }) => ({
          overflow: "hidden",
          [breakpoints.down("xl")]: { mr: "100px" },
          [breakpoints.down("lg")]: { display: "none" },
        })}
        zIndex={0}
      >
        <Box
          height="100%"
          sx={{
            backgroundImage: `url(${image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
        >
          <AppTypography
            textAlign={cardContent ? "center" : "start"}
            variant="subtitle1"
            color="white"
            fontWeight="medium"
            shadowColor="primary"
            sx={{ fontSize: 20, mb: 1, letterSpacing: "8px" }}
          >
            {premotto}
          </AppTypography>
          <AppTypography
            textAlign={cardContent ? "center" : "start"}
            variant="h3"
            fontWeight="bold"
            color="white"
            shadowColor={appColors.primary.main}
            // textGradient
            sx={{ letterSpacing: "8px", fontSize: 50 }}
          >
            {motto}
          </AppTypography>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          position: "relative",
          alignItems: "center",
          maxWidth: "1044px",
          minHeight: "100vh",
          margin: "0 auto",
        }}
      >
        <Box
          mt={top}
          ml="auto !important"
          sx={({ breakpoints }) => ({
            [breakpoints.down("xl")]: { mr: cardContent ? "50px" : "100px" },
            [breakpoints.down("lg")]: { mr: "auto", ml: "auto !important", bgcolor: "white", borderRadius: 2 },
            [breakpoints.down("md")]: { maxWidth: "90%" /*pr: "7px", pl: "10px !important"*/ },
          })}
        >
          <Box pt={5} px={4} mx="auto !important" minWidth={cardContent ? "400px" : "350px"}>
            {!header ? (
              <>
                <Box mb="35px">
                  <Typography
                    // textAlign={isSamllXlScreen || cardContent ? "center" : "start"}
                    textAlign="center"
                    variant="h4"
                    fontWeight="bold"
                    color={color}
                    sx={{ mb: 1, fontSize: 30 }}
                  >
                    {title}
                  </Typography>
                  <Typography
                    // textAlign={isSamllXlScreen || cardContent ? "center" : "start"}
                    textAlign="center"
                    color={color}
                    mx="auto"
                    sx={{ fontSize: 16 }}
                  >
                    {description}
                  </Typography>
                </Box>
              </>
            ) : (
              header
            )}
          </Box>
          <Box
            px={3}
            mb="50px"
            mx="auto"
            ml="auto !important"
            // sx={({ breakpoints }) => ({
            //   minWidth: cardContent ? "400px" : "350px",
            //   [breakpoints.down("sm")]: { minWidth: "90% !important" },
            // })}

            sx={({ breakpoints }) => ({
              mt: cardContent ? "60px" : { top },
              minWidth: cardContent ? "450px" : "350px",
              [breakpoints.down("xl")]: { mr: cardContent ? "0px" : "100px" },
              [breakpoints.only("lg")]: { mx: "auto !important" },
              [breakpoints.down("lg")]: { mx: "auto !important" },
              [breakpoints.down("md")]: {
                minWidth: "90% !important",
                mr: cardContent ? "auto !important" : "unset",
                // pr: "10px",
                // pl: cardContent ? "0px !important" : "10px !important",
              },
            })}
          >
            {children}
          </Box>
        </Box>
      </Box>
    </PageLayout>
  );
};
