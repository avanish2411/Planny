import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export interface IExpense {
    name: String;
    amount: number;
}

interface IExpenseState {
    expenses: IExpense[];
}
const initialState: IExpenseState = {
    expenses: []
}

const ExpenseSlice = createSlice({
    name: "Expense",
    initialState,
    reducers: {
        addExpense: (state, action) => {
            state.expenses.push(action.payload);
        },
        updateExpense: (state, action: PayloadAction<{ index: number, data: IExpense }>) => {
            state.expenses[action.payload.index] = action.payload.data;
        },
        deleteExpense: (state, action: PayloadAction<number>) => {
            state.expenses.splice(action.payload, 1);
        }
    }
})

export const { addExpense, updateExpense, deleteExpense } = ExpenseSlice.actions;
export default ExpenseSlice.reducer;
