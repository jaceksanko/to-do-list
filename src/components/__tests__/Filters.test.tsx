import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Filters } from '../Filters';
import { FilteredTodosContextType, FilteredTodosProvider } from '../../context/FilteredTodosContext';
import "@testing-library/jest-dom";
import * as useFilteredTodosModule from '../../context/useFilteredTodos';

describe('Filters', () => {
  it('renders two buttons', () => {
    render(
      <FilteredTodosProvider>
        <Filters />
      </FilteredTodosProvider>
    );
    
    expect(screen.getByText('Show all')).toBeInTheDocument();
    expect(screen.getByText('Hide completed')).toBeInTheDocument();
  });

  it('the "Show all" button has the active class when the filter is set to "all"', () => {
    render(
      <FilteredTodosProvider>
        <Filters />
      </FilteredTodosProvider>
    );
    
    expect(screen.getByText('Show all')).toHaveClass('btn-active');
    expect(screen.getByText('Hide completed')).not.toHaveClass('btn-active');
  });

  it('calls setFilter with the appropriate argument when a button is clicked', () => {
    const mockSetFilter = jest.fn();
    jest.spyOn(useFilteredTodosModule, 'useFilteredTodos').mockReturnValue({
      filter: 'all',
      setFilter: mockSetFilter,
      filteredTodos: [],
    } as FilteredTodosContextType);

    render(
      <FilteredTodosProvider>
        <Filters />
      </FilteredTodosProvider>
    );
    
    fireEvent.click(screen.getByText('Hide completed'));
    expect(mockSetFilter).toHaveBeenCalledWith("active");

    fireEvent.click(screen.getByText("Show all"));
    expect(mockSetFilter).toHaveBeenCalledWith("all");
  });
});
