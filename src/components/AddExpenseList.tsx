import { View, Text, TouchableOpacity, TextInput, FlatList } from 'react-native'
import React, { useState } from 'react'
import { deleteExpense } from '../redux/slices/ExpenseSlice';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/myStore';
import { addExpense } from '../redux/slices/ExpenseSlice';
import { updateExpense } from '../redux/slices/ExpenseSlice';
import AddIcon from 'react-native-vector-icons/Feather';
import Cross from 'react-native-vector-icons/Entypo';
import Edit from 'react-native-vector-icons/MaterialIcons';

const AddExpenseList = () => {
    const [showInput, setShowInput] = useState(false);
    const [expenseName, setExpenseName] = useState('');
    const [expenseCost, setExpenseCost] = useState('');
    const [editIndex, setEditIndex] = useState<number | null>(null);
    const expenses = useSelector((state: RootState) => state.expenses.expenses);
    const dispatch = useDispatch();

    const handleAddExpense = () => {
        const parsedCost = parseInt(expenseCost);
        if (expenseName.trim() && !isNaN(parsedCost) && parsedCost > 0) {
            if (editIndex !== null) {
                dispatch(updateExpense({ index: editIndex, data: { ...expenses[editIndex], amount: parsedCost, name: expenseName } }));
                setEditIndex(null);
            } else {
                dispatch(addExpense({ name: expenseName, amount: parsedCost }));
            }
            setExpenseName('');
            setExpenseCost('');
            setShowInput(false);
        }
    };
    const totalCost = expenses.reduce((sum, item) => sum + item.amount, 0);

  return (
    <View style={{ backgroundColor: '#EDEADE', borderRadius: 12, marginVertical: 10, padding: 15,marginHorizontal:10 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <Text style={{ fontSize: 28, fontWeight: '700', color: '#000' }}>Expenses</Text>
            <TouchableOpacity onPress={() => setShowInput(!showInput)} style={{ backgroundColor: '#007AFF', padding: 10, borderRadius: 25 }}>
                <AddIcon name='plus' size={22} color='#fff' />
            </TouchableOpacity>
        </View>

        {showInput && (
            <View style={{ marginVertical: 10 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#333', padding: 10, borderRadius: 10 }}>
                    <TextInput
                        value={expenseName}
                        onChangeText={setExpenseName}
                        placeholder='Expense Name'
                        placeholderTextColor={'#555' }
                        style={{ flex: 1, fontSize: 16, color:'#fff'}}
                    />
                    <TextInput
                        value={expenseCost}
                        onChangeText={setExpenseCost}
                        placeholder='Cost'
                        keyboardType='numeric'
                        placeholderTextColor={ '#aaa'}
                        style={{ flex: 1, fontSize: 16, color:  '#fff', marginLeft: 10 }}
                    />
                    <TouchableOpacity onPress={handleAddExpense} style={{ backgroundColor: '#28A745', paddingVertical: 10, paddingHorizontal: 15, borderRadius: 8 }}>
                        <Text style={{ color: 'white', fontSize: 16, fontWeight: '600' }}>{editIndex !== null ? 'Update' : 'Add'}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )}

        {expenses.length > 0 ? (
            <View>

                <FlatList
                    data={expenses}
                    keyExtractor={(_, index) => index.toString()}
                    nestedScrollEnabled
                    scrollEnabled={false}
                    renderItem={({ item, index }) => (
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#fff', padding: 12, marginTop: 10, borderRadius: 10 }}>
                            <Text style={{ color:'#000', fontSize: 18 }}>{item.name}</Text>
                            <Text style={{ color: '#000', fontSize: 18, fontWeight: '600' }}>₹{item.amount}</Text>
                            <View style={{ flexDirection: 'row', gap: 5 }}>
                                <TouchableOpacity onPress={() => { setExpenseName(item.name.toString()); setExpenseCost(item.amount.toString()); setEditIndex(index); setShowInput(true); }} style={{ backgroundColor: '#FFC107', padding: 8, borderRadius: 8 }}>
                                    <Edit name='edit' size={22} color='white' />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => dispatch(deleteExpense(index))} style={{ backgroundColor: '#DC3545', padding: 8, borderRadius: 8 }}>
                                    <Cross name='cross' size={22} color='white' />
                                </TouchableOpacity>
                            </View>
                        </View>
                    )}
                />
                <View style={{ marginTop: 15, alignItems: 'flex-end' }}>
                    <Text style={{ fontSize: 16, fontWeight: '600', }}>
                        Total Cost: ₹{totalCost}
                    </Text>
                </View>
            </View>
        ) : (
            <View style={{ justifyContent: 'center', alignItems: 'center', paddingTop: 15 }}>
                <Text style={{ fontWeight: '500', fontSize: 16, color: '#777'}}>No expenses added</Text>
            </View>
        )}
    </View>
);
}

export default AddExpenseList