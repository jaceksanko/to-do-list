
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Tasks } from '../Tasks';
import useStore from '../../store/useStore';
import { useFilteredTodos } from '../../context/useFilteredTodos';
import "@testing-library/jest-dom";
import { Mock } from "jest-mock";

jest.mock('../../context/useFilteredTodos');
jest.mock("../../store/useStore", () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe('Tasks Component', () => {
  const toggleTodoMock = jest.fn();
  const removeTodoMock = jest.fn();

  beforeEach(() => {
     (useStore as unknown as Mock).mockReturnValue({
       toggleTodo: toggleTodoMock,
       removeTodo: removeTodoMock,
     });

    (useFilteredTodos as jest.Mock).mockReturnValue({
      filteredTodos: [
        { id: 1, name: 'Task 1', isDone: false },
        { id: 2, name: 'Task 2', isDone: true },
      ],
    });
  });

  it('should render tasks', () => {
    render(<Tasks />);
    expect(screen.getByText('Task 1')).toBeInTheDocument();
    expect(screen.getByText('Task 2')).toBeInTheDocument();
  });

  it('should toggle todo on click', () => {
    render(<Tasks />);
    const taskItem = screen.getByText('Task 1');
    fireEvent.click(taskItem);
    expect(toggleTodoMock).toHaveBeenCalledWith(1);
  });

  it('should remove todo on delete button click', () => {
    render(<Tasks />);
    const deleteButton = screen.getAllByRole('button')[1];
    fireEvent.click(deleteButton);
    expect(removeTodoMock).toHaveBeenCalledWith(1);
  });
});

