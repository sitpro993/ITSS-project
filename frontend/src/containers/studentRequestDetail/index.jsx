import React from "react";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Stack,
  Typography,
} from "@mui/material";

export default function StudentRequestDetail() {
  return (
    <Box mt={5} sx={{ display: "flex", justifyContent: "center" }}>
      <Card sx={{ maxWidth: 345 }}>
        <CardHeader title="Student request detail" />

        <CardContent>
          <Stack direction="row" gap={1} mb={1}>
            <Typography variant="body2" sx={{ fontWeight: 700 }}>
              Full Name:
            </Typography>
            <Typography variant="body2">Nguyen Van Hong</Typography>
          </Stack>
          <Stack direction="row" gap={1} mb={1}>
            <Typography variant="body2" sx={{ fontWeight: 700 }}>
              CPA:
            </Typography>
            <Typography variant="body2">3.7</Typography>
          </Stack>

          <Stack direction="row" gap={1} mb={1}>
            <Typography variant="body2" sx={{ fontWeight: 700 }}>
              Working type:
            </Typography>
            <Typography variant="body2">Part time</Typography>
          </Stack>
          <Stack direction="row" gap={1} mb={1}>
            <Typography variant="body2" sx={{ fontWeight: 700 }}>
              Request:
            </Typography>
            <Typography variant="body2">Phu cap</Typography>
          </Stack>
          <Stack direction="row" gap={1} mb={1}>
            <Typography variant="body2" sx={{ fontWeight: 700 }}>
              Status:
            </Typography>
            <Typography variant="body2">Submitted</Typography>
          </Stack>
          <Stack direction="row" gap={1} mb={1}>
            <Typography variant="body2" sx={{ fontWeight: 700 }}>
              Reply time:
            </Typography>
            <Typography variant="body2">9:00 12/12/2022</Typography>
          </Stack>
        </CardContent>
        <CardActions>
          <Button variant="contained">Accept</Button>
          <Button variant="contained" color="error">
            Deny
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
}
