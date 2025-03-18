import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addNote, updateNote } from '../redux/slices/NoteSlice';

const AddNotes = () => {
    const [note, setNote] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const dispatch = useDispatch();

    const handleToggle = () => {
        if (isEditing) {
            handleUpdateNote();
        } else {
            handleAddNote();
        }
        setIsEditing(!isEditing);
    };

    const handleAddNote = () => {
        if (note.trim()) {
            dispatch(addNote(note));
            setNote('');
        }
    };

    const handleUpdateNote = () => {
        if (note.trim()) {
            dispatch(updateNote(note));
        }
    };

    return (
        <View style={{ marginHorizontal: 10, backgroundColor: '#EDEADE', borderRadius: 12, marginVertical: 10, padding: 15 }}>
            <Text style={{ fontSize: 28, fontWeight: '700', color: '#333' }}>Notes</Text>

            <View>
                <TextInput
                    placeholder='Write here'
                    multiline
                    value={note}
                    onChangeText={setNote}
                    editable={isEditing}
                    style={{
                        borderWidth: 1,
                        borderRadius: 16,
                        minHeight: 100,
                        fontSize: 16,
                        textAlignVertical: 'top',
                        padding: 10,
                        borderColor: '#888',
                        color: '#000',
                        backgroundColor: '#fff',
                        opacity: isEditing ? 1 : 0.7,
                        marginVertical: 10,
                        textAlign: 'justify'
                    }}
                />
            </View>

            <TouchableOpacity
                onPress={handleToggle}
                style={{
                    marginTop: 10,
                    backgroundColor: '#4CAF50',
                    padding: 10,
                    borderRadius: 8,
                    alignItems: 'center'
                }}>
                <Text style={{ color: '#fff', fontSize: 18, fontWeight: '600' }}>
                    {isEditing ? 'Save' : 'Edit'}
                </Text>
            </TouchableOpacity>
        </View>
    );
};

export default AddNotes;
