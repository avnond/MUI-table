import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useState, useMemo, createContext} from 'react';
import Table from './Table';

export const ColorModeContext = createContext({ toggleColorMode: () => {} });

const ToggleColorMode = () => {
  const [mode, setMode] = useState('light');
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode],
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <Table />
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default ToggleColorMode