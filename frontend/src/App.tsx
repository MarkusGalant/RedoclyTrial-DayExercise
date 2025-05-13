
import { Box, CssBaseline, ThemeProvider } from '@mui/material';
import Container from '@mui/material/Container';

import theme from './theme';

import GridPage from './pages/memberships/GridPage';
import { Copyright } from './layout/Copyright';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Container>
          <Box>
            <GridPage />
            <Copyright />
          </Box>
        </Container>
      </ThemeProvider>
    </QueryClientProvider>

  );
}
