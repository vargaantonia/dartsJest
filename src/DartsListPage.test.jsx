import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { DartsListPage } from './DartsListPage';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import fetch from 'node-fetch';  // Az import szintaxis használata
global.fetch = fetch;

describe('DartsListPage - fetch-testing', () => {
  it('endpoint datas expect to be greater than 0', async () => {
    render(
      <MemoryRouter>
        <DartsListPage />
      </MemoryRouter>
    );

    // Várunk a backend válaszára
    await waitFor(async () => {
      const response = await fetch('https://darts.sulla.hu/darts');
      const players = await response.json();
      expect(players.length).toBeGreaterThan(0);  // Ellenőrizzük, hogy a válaszban szereplő játékosok száma nagyobb mint 0
    });
  });
});

describe('DartsListPage - spinner testing', () => {
  it('should show loading spinner while fetching data', async () => {
    render(
      <MemoryRouter>
        <DartsListPage />
      </MemoryRouter>
    );
    
    // Ellenőrizzük, hogy a betöltő pörgettyű látszik-e kezdetben
    expect(screen.getByRole('status')).toBeInTheDocument();

    // Várunk, amíg az adatokat betölti és elrejti a pörgettyűt
    await waitFor(() => {
      expect(screen.queryByRole('status')).not.toBeInTheDocument();  // Ellenőrizzük, hogy a pörgettyű eltűnik
    });
  });
});
