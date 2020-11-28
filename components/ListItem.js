import React, {useState} from 'react';
import {StyleSheet, View, Text, FlatList, TextInput} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
// Icon
import Icon from 'react-native-vector-icons/Feather';
// Redux
import {useSelector, useDispatch} from 'react-redux';
import {
  addItem,
  removeItem,
  toggleItem,
  patchItem,
} from '../redux/slices/collection';
// Components
import AddInput from './AddInput';

const ListItem = ({item}) => {
  const dispatch = useDispatch();
  const [newTitle, setNewTitle] = useState(item.title);

  const handleToggleItem = async ({id, listId}) => {
    await dispatch(toggleItem({id, listId}));
  };

  const handleEditTitle = async () => {
    if (!newTitle) {
      setNewTitle(item.title);
    } else if (newTitle !== item.title) {
      await dispatch(
        patchItem({id: item.id, listId: item.listId, args: {title: newTitle}}),
      );
    }
  };

  return (
    <View key={item.id} style={styles.itemContainer}>
      <CheckBox
        value={item.done}
        onValueChange={() => handleToggleItem(item)}
      />
      <TextInput
        style={[styles.itemTitle, item.done ? styles.itemDone : {}]}
        onChangeText={(text) => setNewTitle(text)}
        onBlur={handleEditTitle}
        value={newTitle}
        onSubmitEditing={handleEditTitle}
      />

      <View style={styles.iconContainer}>
        <Icon name="trash" size={20} color="#333" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 65,
  },
  itemTitle: {
    flex: 1,
    fontSize: 18,
  },
  itemDone: {
    textDecorationLine: 'line-through',
  },
});

export default ListItem;
