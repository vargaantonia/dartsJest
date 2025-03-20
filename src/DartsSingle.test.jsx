import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';
import { DartsSingle } from './DartsSingle';

jest.mock('axios');

describe('DartsSingle Component', () => {
    test('renders the component', async () => {
        axios.get.mockResolvedValueOnce({
            data: {
                id: 1,
                name: 'John Doe',
                birth_date: '1990-01-01',
                world_ch_won: 3,
                profile_url: 'http://example.com/profile',
                image_url: 'http://example.com/image'
            }
        });

        render(
            <BrowserRouter>
                <DartsSingle />
            </BrowserRouter>
        );

        await waitFor(() => {
            expect(screen.getByText('Dartsozó')).toBeInTheDocument();
            expect(screen.getByText('Neve: John Doe')).toBeInTheDocument();
            expect(screen.getByText('Születési éve: 1990-01-01')).toBeInTheDocument();
            expect(screen.getByText('Világbajnoki győzelmei: 3')).toBeInTheDocument();
        });
    });

    test('shows loading spinner while fetching data', () => {
        axios.get.mockReturnValue(new Promise(() => { }));

        render(
            <BrowserRouter>
                <DartsSingle />
            </BrowserRouter>
        );

        expect(screen.getByRole('status')).toBeInTheDocument();
    });
});
