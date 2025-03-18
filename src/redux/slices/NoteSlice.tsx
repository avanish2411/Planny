import { createSlice } from "@reduxjs/toolkit";

export interface INote {
    content: String;
}
interface INoteState {
    notes: INote[];
}

const initialState: INoteState = {
    notes: []
}
const NoteSlice = createSlice({
    name: "note",
    initialState,
    reducers: {
        addNote: (state, action) => {
            state.notes.push(action.payload);
        },
        updateNote: (state, action) => {
            state.notes[action.payload.index] = action.payload.data;
        }, 
    }
})

export const { addNote, updateNote } = NoteSlice.actions;
export default NoteSlice.reducer;   
