import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { SwipeCard } from './src/components/SwipeCard';

const statements = [
  "Pineapple belongs on pizza",
  "Star Wars is better than Star Trek",
  "Coffee is better than tea",
  "Winter is the best season",
  "Books are better than movies"
];

export default function App() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [responses, setResponses] = useState([]);
  const [isFinished, setIsFinished] = useState(false);

  const handleSwipeLeft = () => {
    const newResponses = [...responses, { statement: statements[currentIndex], agreed: false }];
    setResponses(newResponses);
    
    if (currentIndex < statements.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setIsFinished(true);
    }
  };

  const handleSwipeRight = () => {
    const newResponses = [...responses, { statement: statements[currentIndex], agreed: true }];
    setResponses(newResponses);
    
    if (currentIndex < statements.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setIsFinished(true);
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setResponses([]);
    setIsFinished(false);
  };

  if (isFinished) {
    return (
      <View style={styles.container}>
        <View style={styles.finished}>
          <Text style={styles.finishedText}>Results Summary</Text>
          <View style={styles.results}>
            {responses.map((response, index) => (
              <View key={index} style={styles.resultItem}>
                <Text style={styles.resultStatement}>
                  {index + 1}. {response.statement}
                </Text>
                <Text style={[
                  styles.resultResponse,
                  { color: response.agreed ? '#4CAF50' : '#F44336' }
                ]}>
                  {response.agreed ? '✓ Agreed' : '✗ Disagreed'}
                </Text>
              </View>
            ))}
          </View>
          <TouchableOpacity 
            style={styles.restartButton} 
            onPress={handleRestart}
          >
            <Text style={styles.restartButtonText}>Start Over</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.progress}>
        Statement {currentIndex + 1} of {statements.length}
      </Text>
      <SwipeCard 
        data={{ statement: statements[currentIndex] }}
        onSwipeLeft={handleSwipeLeft}
        onSwipeRight={handleSwipeRight}
      />
      <View style={styles.instructions}>
        <Text style={[styles.instructionText, { color: '#F44336' }]}>
          ← Swipe left to disagree
        </Text>
        <Text style={[styles.instructionText, { color: '#4CAF50' }]}>
          Swipe right to agree →
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    paddingTop: 50,
  },
  progress: {
    fontSize: 18,
    color: '#666',
    marginBottom: 30,
    fontWeight: '500',
  },
  instructions: {
    marginTop: 30,
    alignItems: 'center',
    position: 'absolute',
    bottom: 50,
    left: 0,
    right: 0,
  },
  instructionText: {
    fontSize: 16,
    marginVertical: 8,
    fontWeight: '500',
  },
  finished: {
    padding: 20,
    alignItems: 'center',
    width: '100%',
  },
  finishedText: {
    fontSize: 24,
    color: '#333',
    marginBottom: 20,
    fontWeight: 'bold',
  },
  results: {
    width: '100%',
    marginBottom: 20,
  },
  resultItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    marginBottom: 10,
  },
  resultStatement: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
  },
  resultResponse: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  restartButton: {
    backgroundColor: '#2196F3',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginTop: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  restartButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  }
}); 