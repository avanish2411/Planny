import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ITodo {
    task: String;
    isCompleted: boolean;
}

interface ITodoState {
    todos: ITodo[];
}

const initialState: ITodoState = {
    todos: []
}

const TodoSlice = createSlice({
    name: "todos",
    initialState,
    reducers: {
        addTodo: (state, action) => {
            state.todos.push(action.payload);
        },
        updateTodo: (state, action: PayloadAction<{ index: number, data: ITodo }>) => {
            state.todos[action.payload.index] = action.payload.data;
        },
        deleteTodo: (state, action: PayloadAction<number>) => {
            state.todos.splice(action.payload, 1);
        }
    }
})

export const { addTodo, updateTodo, deleteTodo } = TodoSlice.actions;
export default TodoSlice.reducer;