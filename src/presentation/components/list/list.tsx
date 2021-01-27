import React from 'react';
import { DragDropContext, Draggable, Droppable, DropResult } from 'react-beautiful-dnd';

import { FilterTodosStatus } from '@/domain/usecases';
import { ListContainer, Bottom, NoContent } from '@/presentation/components/list/list-styles';
import { ListItem, ListStatusOptions } from '@/presentation/components';
import { Todo } from '@/domain/models';

type Props = {
  todos: Todo[];
  currentStatus: FilterTodosStatus;
  onStatusClick?: (status: FilterTodosStatus) => void;
  onClearCompletedClick?: () => void;
  onRemove?: (todoId: number) => void;
  onToggle?: (todoId: number) => void;
  onDragEnd?: (dropResult: DropResult) => void;
  onSwap?: (id: number, newPosition: number) => void;
};

const List: React.FC<Props> = ({
  todos,
  currentStatus,
  onStatusClick = () => {},
  onClearCompletedClick = () => {},
  onRemove = () => {},
  onToggle = () => {},
  onSwap = () => {}
}: Props) => {
  const onDragEnd = ({ destination, draggableId }: DropResult): void => {
    if (!destination) {
      return;
    }

    const id = Number(draggableId);
    const newPosition = destination.index;

    onSwap(id, newPosition);
  };

  return (
    <ListContainer data-testid="listContainer">
      {!todos.length && <NoContent data-testid="noContent">There are no todos to show.</NoContent>}
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {provided => (
            <ul {...provided.droppableProps} ref={provided.innerRef} data-testid="list">
              {todos.map((todo, index) => (
                <Draggable key={todo.id} draggableId={String(todo.id)} index={index}>
                  {provided => <ListItem key={todo.id} todo={todo} onRemove={onRemove} onToggle={onToggle} provided={provided} />}
                </Draggable>
              ))}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>

      <Bottom>
        <span data-testid="itemsLeft">{todos.filter(todo => !todo.completed).length} items left</span>
        <ListStatusOptions currentStatus={currentStatus} onStatusClick={onStatusClick} />
        <a data-testid="clearCompleted" onClick={() => onClearCompletedClick()}>
          Clear completed
        </a>
      </Bottom>
    </ListContainer>
  );
};

export default List;
