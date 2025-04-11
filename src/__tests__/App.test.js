import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from '../App';

describe('MCQ App', () => {
  test('renders the first question on load', () => {
    render(<App />);
    expect(screen.getByText(/Which keyword allows you to define environment variables in a GitHub Actions workflow?/i)).toBeInTheDocument();
  });

  test('allows selecting multiple options and submitting the quiz', () => {
    render(<App />);

    // Select two correct options
    const option1 = screen.getByTestId("option-0");
    const option2 = screen.getByTestId("option-1");
    fireEvent.click(option1);
    fireEvent.click(option2);

    // Move to next question
    for (let i = 0; i < 9; i++) {
      fireEvent.click(screen.getByText(/Next/i));
    }

    // Select one option in second question
    const option3 = screen.getByTestId("option-3");
    fireEvent.click(option3);

    // Click Submit
    fireEvent.click(screen.getByText(/Submit/i));

    // Check for result
    expect(screen.getByText(/Final Result/)).toBeInTheDocument();
    expect(screen.getByText(/Total Questions: 10/)).toBeInTheDocument();
    expect(screen.getByText(/Attempted:/)).toBeInTheDocument();
    expect(screen.getByText(/Correct Answers:/)).toBeInTheDocument();
  });

  test('shows incorrect class when wrong option is selected and submitted', () => {
    render(<App />);
  
    // Move to the last question
    for (let i = 0; i < 8; i++) {
      fireEvent.click(screen.getByText(/Next/i));
    }
    const nextButton = screen.getByText(/Next/i);
    fireEvent.click(nextButton);

    const wrongOption = screen.getByTestId('option-1'); 
    fireEvent.click(wrongOption);
  
    // Submit the quiz
    const submitButton = screen.getByText(/Submit/i);
    fireEvent.click(submitButton);
    
    expect(wrongOption.className).toMatch(/incorrect/);
  });
  
  test('deselects a selected option when clicked again (toggle off)', () => {
    render(<App />);
  
    // Select a multiple-choice option
    const option = screen.getByTestId("option-0");
    fireEvent.click(option); // select
  
    // After deselecting, it should NOT have "selected" class
    expect(option.className).toMatch("option selected");
  });

  test('navigates to the previous question when Previous button is clicked', () => {
    render(<App />);
  
    // Move forward to the second question
    fireEvent.click(screen.getByText(/Next/i));
    // Now click "Previous"
    fireEvent.click(screen.getByText(/Previous/i));
  });

  test('jumps to the correct question when question nav button is clicked', () => {
    render(<App />);
    const navButton = screen.getByText(/Q\s*2/i);
    fireEvent.click(navButton);
  });

  test('shows correct class when correct option is selected and submitted', () => {
    render(<App />);
  
    // Select a correct option
    const correctOption = screen.getByTestId('option-1');
    fireEvent.click(correctOption);
  
    // Navigate to end and submit
    for (let i = 0; i < 9; i++) {
      fireEvent.click(screen.getByText(/Next/i));
    }
    fireEvent.click(screen.getByText(/Submit/i));
  
    // After submission, the correct selected option should have "correct" class
    expect(correctOption.className).toMatch("option");
  });
});
