import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { SwipeCard } from '../components/SwipeCard';

export const TestScreen = () => {
  const [swipeHistory, setSwipeHistory] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Test data
  const testDeck = [
    {
      image: 'https://picsum.photos/400/600', // Random image from Lorem Picsum
      statement: 'Is this a natural landscape?',
      question: 'Swipe right for yes, left for no'
    },
    {
      image: 'https://picsum.photos/400/600?random=2',
      statement: 'Does this image look AI-generated?',
      question: 'Swipe right for yes, left for no'
    },
    {
      image: 'https://picsum.photos/400/600?random=3',
      statement: 'Is this image taken during daytime?',
      question: 'Swipe right for yes, left for no'
    }
  ];

  const handleSwipeLeft = () => {
    setSwipeHistory([...swipeHistory, 'Left (No)']);
    setCurrentIndex(currentIndex + 1);
  };

  const handleSwipeRight = () => {
    setSwipeHistory([...swipeHistory, 'Right (Yes)']);
    setCurrentIndex(currentIndex + 1);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Test Mode</Text>
        <Text style={styles.cardCount}>
          Card {currentIndex + 1} of {testDeck.length}
        </Text>
      </View>

      {currentIndex < testDeck.length ? (
        <SwipeCard
          data={testDeck[currentIndex]}
          onSwipeLeft={handleSwipeLeft}
          onSwipeRight={handleSwipeRight}
        />
      ) : (
        <View style={styles.completedContainer}>
          <Text style={styles.completedText}>Test Completed!</Text>
          <Text style={styles.subText}>Swipe History:</Text>
          {swipeHistory.map((swipe, index) => (
            <Text key={index} style={styles.swipeRecord}>
              Card {index + 1}: {swipe}
            </Text>
          ))}
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5'
  },
  header: {
    padding: 15,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd'
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  cardCount: {
    fontSize: 16,
    color: '#666',
    marginTop: 5
  },
  completedContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  },
  completedText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20
  },
  subText: {
    fontSize: 18,
    marginBottom: 10
  },
  swipeRecord: {
    fontSize: 16,
    color: '#666',
    marginVertical: 5
  }
}); 