import { Link, Typography } from "@mui/material";

export function Copyright() {
    return (
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
    );
  }
  