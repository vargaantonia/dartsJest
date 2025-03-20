import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';
import { DartsDel } from './DartsDel';

jest.mock('axios');

describe('DartsDel Component', () => {
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
                <DartsDel />
            </BrowserRouter>
        );

        await waitFor(() => {
            expect(screen.getByText('Törlendő dartsozó neve: John Doe')).toBeInTheDocument();
        });
    });

    test('submits the delete form', async () => {
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

        axios.delete.mockResolvedValueOnce({});

        render(
            <BrowserRouter>
                <DartsDel />
            </BrowserRouter>
        );

        await waitFor(() => {
            fireEvent.submit(screen.getByRole('button', { name: /törlés/i }));
        });

        expect(axios.delete).toHaveBeenCalledWith('https://darts.sulla.hu/darts/1');
    });
});
