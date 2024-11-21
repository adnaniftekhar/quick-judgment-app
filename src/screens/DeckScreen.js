import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { SwipeCard } from '../components/SwipeCard';

export const DeckScreen = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Example deck data
  const deckData = [
    {
      image: 'https://example.com/image1.jpg',
      statement: 'Is this image authentic?',
      question: 'Swipe right for yes, left for no'
    },
    // ... more cards
  ];

  const handleSwipeLeft = () => {
    setCurrentIndex(currentIndex + 1);
    // Handle "No" judgment
  };

  const handleSwipeRight = () => {
    setCurrentIndex(currentIndex + 1);
    // Handle "Yes" judgment
  };

  return (
    <View style={styles.container}>
      <SwipeCard
        data={deckData[currentIndex]}
        onSwipeLeft={handleSwipeLeft}
        onSwipeRight={handleSwipeRight}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5'
  }
}); 