import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const Card = ({ data }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.text}>
        {data?.statement || 'No statement provided'}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.84,
    elevation: 7,
    minHeight: 250,
    width: '90%',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 24,
    textAlign: 'center',
    lineHeight: 32,
    fontWeight: '500',
    color: '#333',
  }
}); 