import React from 'react';
import {
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from '../../../utils/test-utils';
import IncidentDetails from '../IncidentDetails.jsx';
import { IncidentDetailsMockResp } from '../__mocks__/Api';
import IncidentApi from '../Api';

const pathDetails = {
  route: '/incident/ABC123',
  path: '/incident/:id',
};

describe('Test Incident Details Page', () => {
  test('Incident details page is rendered ', () => {
    jest
      .spyOn(IncidentApi, 'getIncidentDetails')
      .mockImplementation(() => Promise.resolve(IncidentDetailsMockResp));
    render(<IncidentDetails />, pathDetails);
    expect(screen.getByText('Incident Details')).toBeInTheDocument();
  });

  test('Incident details page - Activity section is rendered ', () => {
    jest
      .spyOn(IncidentApi, 'getIncidentDetails')
      .mockImplementation(() => Promise.resolve(IncidentDetailsMockResp));
    render(<IncidentDetails />, pathDetails);
    expect(screen.getByText('Incident Activity')).toBeInTheDocument();
  });

  test('Incident details page - Activity section is rendered ', () => {
    jest
      .spyOn(IncidentApi, 'getIncidentDetails')
      .mockImplementation(() => Promise.resolve(IncidentDetailsMockResp));
    render(<IncidentDetails />, pathDetails);
    expect(screen.getByText('Incident Activity')).toBeInTheDocument();
  });

  test('Activity section - test all activity is listed in UI ', async () => {
    jest
      .spyOn(IncidentApi, 'getIncidentDetails')
      .mockImplementation(() => Promise.resolve(IncidentDetailsMockResp));
    const { container } = render(<IncidentDetails />, pathDetails);

    await waitForElementToBeRemoved(() => screen.getByText('Loading'));
    await waitFor(() => {
      container.querySelectorAll('#activitySection');
    });
    const icon = container.querySelectorAll(
      '[class="blue long arrow alternate down icon"]',
    );
    expect(icon.length).toBe(1);
    expect(
      screen.getByText('Incident assigned from admin to user1', {
        exact: false,
      }),
    ).toBeInTheDocument();

    expect(
      screen.getAllByText(`27-05-2021 08:05:78`, { exact: false }).length,
    ).toBe(2);
  });

  test('Incident data is populated in form', async () => {
    jest
      .spyOn(IncidentApi, 'getIncidentDetails')
      .mockImplementation(() => Promise.resolve(IncidentDetailsMockResp));
    const { container } = render(<IncidentDetails />, pathDetails);
    await waitForElementToBeRemoved(() => screen.getByText('Loading'));

    // sample scenario for incident Type
    // TODO for other attributes
    expect(screen.getByText('STORY')).toBeInTheDocument();
    expect(screen.getByText('BUG')).toBeInTheDocument();
    expect(screen.getAllByText('TASK').length).toBe(2);

    // test if 'Task' is prepopulated as per mock data
    const typeDropdownEle = container.querySelector('[name="type"]');
    const selectedOption = typeDropdownEle.querySelector(
      '[class="active selected item"]',
    );
    expect(selectedOption.innerHTML).toEqual('<span class="text">TASK</span>');
  });
});
