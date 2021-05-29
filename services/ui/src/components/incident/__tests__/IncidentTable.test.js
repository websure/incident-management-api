import React from 'react';
import userEvent from '@testing-library/user-event';
import { render, screen, waitFor } from '../../../utils/test-utils';
import IncidentTable from '../IncidentTable';
import { getIncidentListMockResp } from '../__mocks__/Api';
import IncidentApi from '../Api';

describe('Test IncidentTable component', () => {
  test('show only Headers when data is empty', () => {
    jest
      .spyOn(IncidentApi, 'getIncidentList')
      .mockImplementation(() => Promise.resolve([]));

    render(<IncidentTable />);
    expect(screen.getByRole('table')).toBeInTheDocument();
  });

  test('show error message when Api fails ', () => {
    jest
      .spyOn(IncidentApi, 'getIncidentList')
      .mockImplementation(() => Promise.reject('some issue'));

    render(<IncidentTable />);
    waitFor(() =>
      expect(
        screen.getByText('Error in fetching Incident List'),
      ).toBeInTheDocument(),
    );
  });

  test('check if all columns are rendered ', () => {
    jest
      .spyOn(IncidentApi, 'getIncidentList')
      .mockImplementation(() => Promise.resolve([]));

    render(<IncidentTable />);
    screen.getByText('Type');
    screen.getByText('Status');
    screen.getByText('Title');
    screen.getByText('Created By');
    screen.getByText('Assignee');
  });

  test('check if sorting icons are rendered when column header is clicked ', () => {
    jest
      .spyOn(IncidentApi, 'getIncidentList')
      .mockImplementation(() => Promise.resolve([]));
    // TODO : do for other columns
    render(<IncidentTable />);
    const ele = screen.getByText('Type');
    userEvent.click(ele);
    expect(ele.className).toEqual('ascending sorted');
    userEvent.click(ele);
    expect(ele.className).toEqual('descending sorted');
  });

  test('Table rows are rendered  ', async () => {
    jest
      .spyOn(IncidentApi, 'getIncidentList')
      .mockImplementation(() => Promise.resolve(getIncidentListMockResp));
    // TODO : do for other columns
    const { container } = render(<IncidentTable />);
    await waitFor(() => container.querySelector('tbody'));
    await waitFor(() => screen.findByText('2nd incident'));
  });

  test('No dta found message ', () => {
    jest
      .spyOn(IncidentApi, 'getIncidentList')
      .mockImplementation(() => Promise.resolve([]));

    render(<IncidentTable />);
    expect(screen.getByRole('table')).toBeInTheDocument();
    expect(screen.getByText('No data found')).toBeInTheDocument();
  });
});
