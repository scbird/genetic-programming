import {
  Box,
  Container,
  createTheme,
  CssBaseline,
  Grid,
  Paper,
  ThemeProvider
} from '@mui/material'
import type { NextPage } from 'next'
import React from 'react'
import { Provider } from 'react-redux'
import { applyMiddleware, createStore } from 'redux'
import thunk from 'redux-thunk'
import { Settings } from '../src/components/Settings'
import Title from '../src/components/Title'
import { reducer } from '../src/program/reducers'

const mdTheme = createTheme()

const Home: NextPage = () => {
  const store = createStore(reducer, undefined, applyMiddleware(thunk))

  return (
    <Provider store={store}>
      <ThemeProvider theme={mdTheme}>
        <Box
          sx={{
            display: 'flex',
            backgroundColor: (theme) => theme.palette.grey[100],
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0
          }}>
          <CssBaseline />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6} xl={8}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 240
                  }}>
                  <Title>Evolution</Title>
                  Hi there
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
                    flexDirection: 'column',
                    height: 240
                  }}>
                  Hi there
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
