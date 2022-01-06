import {
  Box,
  Container,
  createTheme,
  CssBaseline,
  Grid,
  Paper,
  ThemeProvider,
  Typography
} from '@mui/material'
import type { NextPage } from 'next'
import React from 'react'
import { Provider } from 'react-redux'
import { applyMiddleware, createStore } from 'redux'
import thunk from 'redux-thunk'
import { Population } from '../src/components/Population'
import { Settings } from '../src/components/Settings'
import { Training } from '../src/components/Training'
import { resetTraining } from '../src/program/actions'
import { reducer } from '../src/program/reducers'
import { initialState } from '../src/program/reducers/board'

const mdTheme = createTheme({
  typography: () => ({
    h1: { fontSize: '2rem' },
    muted: { fontSize: '0.8rem', color: '#888' }
  })
})

const Home: NextPage = () => {
  const store = createStore(reducer, initialState, applyMiddleware(thunk))
  store.dispatch(resetTraining() as any)

  return (
    <Provider store={store}>
      <ThemeProvider theme={mdTheme}>
        <Box
          sx={{
            backgroundColor: (theme) => theme.palette.grey[100]
          }}>
          <CssBaseline />
          <Container maxWidth="lg" sx={{ pt: 4, pb: 4 }}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Typography variant="h1">
                  Genetic programming playground
                </Typography>
              </Grid>
              <Grid item xs={12} md={6} xl={8}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column'
                  }}>
                  <Training />
                </Paper>
              </Grid>
              <Grid item xs={12} md={6} xl={4}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column'
                  }}>
                  <Settings />
                </Paper>
              </Grid>
              <Grid item xs={12}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column'
                  }}>
                  <Population />
                </Paper>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </ThemeProvider>
    </Provider>
  )
}

export default Home
