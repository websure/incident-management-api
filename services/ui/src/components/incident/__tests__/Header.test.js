import React from 'react';
import userEvent from '@testing-library/user-event';
import { render, screen } from '../../../utils/test-utils';
import Header from '../Header';

describe('Test Header component', () => {
  test('Test welcome header on the page', async () => {
    render(<Header />);
    expect(
      screen.getByText('Welcome to Incident Management'),
    ).toBeInTheDocument();
  });
  test('Test Create incident button is present in the dom ', async () => {
    render(<Header />);
    expect(screen.getByText('Create Incident')).toBeInTheDocument();
  });
  test('Test Logout button is present in the dom ', async () => {
    render(<Header />);
    expect(screen.queryByTitle('Logout')).toBeInTheDocument();
  });

  test('clicking on create Incident opens Incident form ', async () => {
    render(<Header />);
    const btn = screen.getByText('Create Incident');
    userEvent.click(btn);
    const ele = screen.getByText('Add Incident');
    expect(ele).toBeInTheDocument();
  });
});
