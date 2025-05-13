import { Link, Stack, Typography } from "@mui/material";

export function Copyright() {
  return (
    <Stack sx={{ height: 64 }} justifyContent="center" alignItems="center">
      <Typography
        variant="body2"
        align="center"
        sx={{
          color: 'text.secondary',
        }}
      >
        {'Copyright © '}
        <Link color="inherit" href="https://redocly.com/">
          Redocly
        </Link>{' '}
        {new Date().getFullYear()}.
      </Typography>
    </Stack>
  );
}
