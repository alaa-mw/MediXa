import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Chip,
  Stack,
  Typography,
} from "@mui/material";

interface SourceItem {
  title: string;
  page: number;
}

interface Props {
  sources: SourceItem[];
}

const SourcesAccordion = ({ sources }: Props) => {
  return (
    <Box
      sx={{
        mt: 2,
        borderRadius: 3,
        border: "1px solid",
        borderColor: "divider",
        bgcolor: "transparent",
        overflow: "hidden",
        display: "flex",
        flexDirection: "row",
        justifyItems: "center",
        gap: 1,
        p: 1.5,
      }}
    >
      <Typography sx={{ fontWeight: 700, pl: 3 }}>المصادر</Typography>
      <Stack spacing={2} direction="row">
        {sources.map((source, index) => (
          <Stack
            key={index}
            direction="row"
            sx={{
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography color="primary" sx={{ fontSize: 14 }}>
              {index > 0 ? " / " : ""}
              {source.title} (P.{source.page})
            </Typography>
          </Stack>
        ))}
      </Stack>
    </Box>
    // <Accordion
    //   disableGutters
    //   elevation={0}
    //   defaultExpanded
    //   sx={{
    // mt: 2,
    // borderRadius: 3,
    // border: "1px solid",
    // borderColor: "divider",
    // bgcolor: "transparent",
    // overflow: "hidden",
    //     "&::before": {
    //       display: "none",
    //     },
    //   }}
    // >
    //   <AccordionSummary expandIcon={<ExpandMoreRoundedIcon />}>
    //     <Typography sx={{ fontWeight: 700 }}>المصادر</Typography>
    //   </AccordionSummary>

    //   <AccordionDetails>
    // <Stack spacing={2}>
    //   {sources.map((source, index) => (
    //     <Stack
    //       key={index}
    //       sx={{
    //         direction: "row",
    //         justifyContent: "space-between",
    //         alignItems: "center",
    //       }}
    //     >
    //       <Typography color="primary">
    //         {index + 1}. {source.title}
    //       </Typography>

    //       <Chip size="small" label={`صفحة ${source.page}`} />
    //     </Stack>
    //   ))}
    // </Stack>
    //   </AccordionDetails>
    // </Accordion>
  );
};

export default SourcesAccordion;
