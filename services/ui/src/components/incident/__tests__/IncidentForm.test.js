import React from 'react';
import { render, screen } from '../../../utils/test-utils';
import IncidentForm from '../IncidentForm';
import { IncidentDetailsMockResp } from '../__mocks__/Api';

/**
 * DONE : Testing for Acknowledge control.
 * TODO : Pending for other controls.
 */
describe('Test Incident Form component', () => {
  test('Incident form is rendered ', () => {
    const { container } = render(<IncidentForm />);
    expect(
      container.querySelector('[data-id="incidentForm"]'),
    ).toBeInTheDocument();
  });

  test('Test form controls - ACKNOWLEDGE ', () => {
    render(<IncidentForm />);
    expect(
      screen.getByText('Acknowledge', { exact: false }),
    ).toBeInTheDocument();
  });

  test('Test - ACKNOWLEDGE radio buttons ', () => {
    const { container } = render(<IncidentForm />);
    expect(screen.getAllByRole('radio').length).toBe(2);
    const radioBtn = container.querySelector('input[checked=""]');
    expect(radioBtn).toBeInTheDocument();
  });

  test('test - cancel and submit button are present ', () => {
    render(<IncidentForm />);
    expect(screen.getByText('Create Incident')).toBeInTheDocument();
    expect(screen.getByText('Cancel')).toBeInTheDocument();
  });

  test('test - cancel, Save, delete button are present ', () => {
    /*  when values are passed, form opens in edit mode  */
    render(<IncidentForm incidentDetails={IncidentDetailsMockResp} />);
    expect(screen.getByText('Save Incident')).toBeInTheDocument();
    expect(screen.getByText('Go back')).toBeInTheDocument();
    expect(screen.getByText('Delete')).toBeInTheDocument();
  });
});
