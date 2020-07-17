import React, { useRef, useState } from 'react';
import { FlatList, Pressable, SafeAreaView, Text, View } from 'react-native';
import { Modalize } from 'react-native-modalize';
import { data } from './data';

const App = () => {
  const [selectedPost, setSelectedPost] = useState('');
  const modalizeRef = useRef(null);

  const onPressPost = (index) => {
    setSelectedPost(index);
    modalizeRef.current?.open();
  };

  const renderItem = ({ item, index }, isComments) => {
    return (
      <Pressable
        onPress={() => {
          if (!isComments) {
            onPressPost(index);
          }
          return;
        }}>
        <View style={{ paddingVertical: 8 }}>
          <Text>{isComments ? item : item.post}</Text>
        </View>
      </Pressable>
    );
  };

  const ItemSeparator = () => (
    <View style={{ backgroundColor: '#212121', height: 1, width: '100%' }} />
  );

  const getData = () => data[selectedPost]?.comments;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FlatList
        style={{ flex: 1 }}
        data={data}
        renderItem={(row) => renderItem(row, false)}
        keyExtractor={(item, index) => `key${index}`}
        ItemSeparatorComponent={ItemSeparator}
      />
      <Modalize
        ref={modalizeRef}
        flatListProps={{
          data: getData(),
          renderItem: (row) => renderItem(row, true),
          keyExtractor: (item, index) => `key${index}`,
          ItemSeparatorComponent: ItemSeparator,
          showsVerticalScrollIndicator: false,
        }}
      />
    </SafeAreaView>
  );
};

export default App;
