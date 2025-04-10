import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from '../App';

describe('MCQ App', () => {
  test('renders the first question on load', () => {
    render(<App />);
    expect(screen.getByText(/Which is true about Starter Workflows/i)).toBeInTheDocument();
  });

  test('allows selecting multiple options and submitting the quiz', () => {
    render(<App />);

    // Select two correct options
    const option1 = screen.getByText(/They allow users to leverage ready-to-use/i);
    const option2 = screen.getByText(/Your organization can create custom starter workflows/i);
    fireEvent.click(option1);
    fireEvent.click(option2);

    // Move to next question
    fireEvent.click(screen.getByText(/Next →/i));

    // Select one option in second question
    const option3 = screen.getByText(/JavaScript/);
    fireEvent.click(option3);

    // Click Submit
    fireEvent.click(screen.getByText(/Submit/i));

    // Check for result
    expect(screen.getByText(/Final Result/)).toBeInTheDocument();
    expect(screen.getByText(/Total Questions: 2/)).toBeInTheDocument();
    expect(screen.getByText(/Attempted:/)).toBeInTheDocument();
    expect(screen.getByText(/Correct Answers:/)).toBeInTheDocument();
  });

  test('shows incorrect class when wrong option is selected and submitted', () => {
    render(<App />);
  
    // Move to the last question
    const nextButton = screen.getByText(/Next/i);
    fireEvent.click(nextButton);

    // Select a known incorrect option (index 1 → “Starter workflows are a paid GitHub feature”)
    const wrongOption = screen.getByTestId('option-2'); // Adjust index if needed
    fireEvent.click(wrongOption);
  
    // Submit the quiz
    const submitButton = screen.getByText(/Submit/i);
    fireEvent.click(submitButton);
  
    // Assert it gets the "incorrect" class
    expect(wrongOption.className).toMatch(/incorrect/);
  });
  
});
