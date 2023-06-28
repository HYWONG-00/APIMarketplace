import { createTheme as createMuiTheme } from '@mui/material';
import { createPalette } from './create-palette';
import { createShadows } from './create-shadows';

export function createTheme() {
  const palette = createPalette();
  const shadows = createShadows();

  return createMuiTheme({
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 900,
        lg: 1200,
        xl: 1440
      }
    },
    palette,
    shadows,
    shape: {
      borderRadius: 8
    },
  });
}
