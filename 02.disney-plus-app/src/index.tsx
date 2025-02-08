import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import Router from './router/Router';
import { ThemeProvider } from 'styled-components';
import { theme } from './theme';
import GlobalStyle from './GlobalStyle';
import { RecoilRoot } from 'recoil';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={true} />
        <ThemeProvider theme={theme}>
          <GlobalStyle/>
          <RouterProvider router={Router}/>
        </ThemeProvider>
      </QueryClientProvider>
    </RecoilRoot>
  </React.StrictMode>
);

