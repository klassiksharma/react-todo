import { render, screen } from '@testing-library/react';
import App from './App';

beforeAll(() => jest.spyOn(window, 'fetch'))

test('renders todo list', async () => {
  const fakeTodos = {todos: [
    { id: 1, todo: 'Fake Todo 1', completed: false },
    { id: 2, todo: 'Fake Todo 2', completed: true },
    { id: 3, todo: 'Fake Todo 3', completed: false },
  ]
  };
  
  window.fetch.mockResolvedValueOnce({
    ok: true,
    json: async () => (fakeTodos),
  })

  render(<App />);
  const todoItems = await screen.findAllByRole('checkbox');
  const completedItems = await screen.findAllByTestId('completed-todo')
  expect(todoItems).toHaveLength(2);
  expect(completedItems).toHaveLength(1);

});