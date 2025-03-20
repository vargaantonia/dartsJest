import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';
import { DartsListPage } from './DartsListPage';

jest.mock('axios');

describe('DartsListPage Component', () => {
    test('renders the component', async () => {
        axios.get.mockResolvedValueOnce({
            data: [
                {
                    id: 1,
                    name: 'John Doe',
                    birth_date: '1990-01-01',
                    world_ch_won: 3,
                    profile_url: 'http://example.com/profile',
                    image_url: 'http://example.com/image'
                }
            ]
        });

        render(
            <BrowserRouter>
                <DartsListPage />
            </BrowserRouter>
        );

        await waitFor(() => {
            expect(screen.getByText('Dartsozók')).toBeInTheDocument();
            expect(screen.getByText('Dartsozó neve: John Doe')).toBeInTheDocument();
        });
    });

    test('shows loading spinner while fetching data', () => {
        axios.get.mockReturnValue(new Promise(() => { }));

        render(
            <BrowserRouter>
                <DartsListPage />
            </BrowserRouter>
        );

        expect(screen.getByRole('status')).toBeInTheDocument();
    });
});
