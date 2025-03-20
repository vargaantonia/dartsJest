import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import DartsSingle from '../DartsSingle';
import '@testing-library/jest-dom';



const server = setupServer(
  rest.get('https://darts.sulla.hu/darts/:dartsId', (req, res, ctx) => {
    return res(
      ctx.json({
        id: '1',
        name: 'Michael Smith',
        birth_date: '1990',
        world_ch_won: 2,
        profile_url: 'https://example.com/profile',
        image_url: 'https://example.com/image.jpg',
      })
    );
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('DartsSingle Component', () => {

  test('Komponens helyesen renderelődik és adatok betöltődnek', async () => {
    render(
      <MemoryRouter initialEntries={['/darts/1']}>
        <Routes>
          <Route path="/darts/:dartsId" element={<DartsSingle />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText(/spinner-border/i)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText(/Dartsozó/i)).toBeInTheDocument();
      expect(screen.getByText(/Neve: Michael Smith/i)).toBeInTheDocument();
      expect(screen.getByText(/Születési éve: 1990/i)).toBeInTheDocument();
      expect(screen.getByText(/Világbajnoki győzelmei: 2/i)).toBeInTheDocument();
    });
  });
  test('Profil link és kép helyesen renderelődik', async () => {
    render(
      <MemoryRouter initialEntries={['/darts/1']}>
        <Routes>
          <Route path="/darts/:dartsId" element={<DartsSingle />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      const profileLink = screen.getByRole('link', { name: /profil link/i });
      expect(profileLink).toHaveAttribute('href', 'https://example.com/profile');
      expect(screen.getByRole('img', { name: 'Michael Smith' })).toHaveAttribute(
        'src',
        'https://example.com/image.jpg'
      );
    });
  });

});
