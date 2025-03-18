import React, { useState } from 'react'
import { View, Text, TouchableOpacity, TextInput, FlatList } from 'react-native'
import AddIcon from 'react-native-vector-icons/Feather';
import Cross from 'react-native-vector-icons/Entypo';
import Edit from 'react-native-vector-icons/MaterialIcons';
import { addTodo } from '../redux/slices/TodoSlice';
import { updateTodo } from '../redux/slices/TodoSlice';
import { deleteTodo } from '../redux/slices/TodoSlice';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { RootState } from '../redux/myStore';

const AddTodoList = () => {
    const [showInput, setShowInput] = useState(false);
    const [todoText, setTodoText] = useState('');
    const [editIndex, setEditIndex] = useState<number | null>(null);
    const dispatch = useDispatch();
    const todos = useSelector((state: RootState) => state.todos.todos);
    const handleAddTodo = () => {
        if (todoText.trim()) {
            if (editIndex !== null) {
                dispatch(updateTodo({ index: editIndex, data: { ...todos[editIndex], task: todoText } }));
                setEditIndex(null);
            } else {
                dispatch(addTodo({ task: todoText, isCompleted: false }));
            }
            setTodoText('');
            setShowInput(false);
        }
    };
    const handleToggleComplete = (index: number) => {
        const updatedTodo = { ...todos[index], isCompleted: !todos[index].isCompleted };
        dispatch(updateTodo({ index, data: updatedTodo }));
    };

    return (
        <View style={{ backgroundColor: "#EDEADE", borderRadius: 12, padding: 15,marginHorizontal:10 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Text style={{ fontSize: 28, fontWeight: '700', color: '#000' }}>Todos</Text>
                <TouchableOpacity onPress={() => setShowInput(!showInput)} style={{ backgroundColor: '#007AFF', padding: 10, borderRadius: 25 }}>
                    <AddIcon name='plus' size={22} color='#fff' />
                </TouchableOpacity>
            </View>
            {showInput && (
                <View style={{ marginVertical: 10 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', padding: 10, borderRadius: 10 }}>
                        <TextInput
                            value={todoText}
                            onChangeText={setTodoText}
                            placeholder='Enter your todo'
                            placeholderTextColor={'#aaa'}
                            style={{ flex: 1, fontSize: 16, color: '#000' }}
                        />
                        <TouchableOpacity onPress={handleAddTodo} style={{ backgroundColor: '#28A745', paddingVertical: 10, paddingHorizontal: 15, borderRadius: 8 }}>
                            <Text style={{ color: 'white', fontSize: 16, fontWeight: '600' }}>{editIndex !== null ? 'Update' : 'Add'}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )}
            {todos.length > 0 ? (
                <FlatList
                    data={todos}
                    keyExtractor={(_, index) => index.toString()}
                    nestedScrollEnabled
                    scrollEnabled={false}
                    renderItem={({ item, index }) => (
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#fff', padding: 12, marginTop: 10, borderRadius: 10 }}>
                            <TouchableOpacity onPress={() => handleToggleComplete(index)} style={{ marginRight: 12 }}>
                                <Text style={{ color: item.isCompleted ? '#28A745' : '#333', textDecorationLine: item.isCompleted ? 'line-through' : 'none', fontSize: 18 }}>{item.task}</Text>
                            </TouchableOpacity>
                            <View style={{ flexDirection: 'row', gap: 5 }}>
                                <TouchableOpacity onPress={() => { setTodoText(item.task.toString()); setEditIndex(index); setShowInput(true); }} style={{ backgroundColor: '#FFC107', padding: 8, borderRadius: 8 }}>
                                    <Edit name='edit' size={22} color='white' />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => dispatch(deleteTodo(index))} style={{ backgroundColor: '#DC3545', padding: 8, borderRadius: 8 }}>
                                    <Cross name='cross' size={22} color='white' />
                                </TouchableOpacity>
                            </View>
                        </View>
                    )}
                />
            ) : (
                <View style={{ justifyContent: 'center', alignItems: 'center', paddingTop: 15 }}>
                    <Text style={{ fontWeight: '500', fontSize: 16, color: '#777' }}>No tasks added</Text>
                </View>
            )}
        </View>
    )
}

export default AddTodoList