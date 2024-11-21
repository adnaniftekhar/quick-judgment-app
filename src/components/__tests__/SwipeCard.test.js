import React from 'react';
import renderer from 'react-test-renderer';

// Mock the Card component first
jest.mock('../Card', () => ({
  Card: () => 'Card'
}));

// Create a mock for setValue that we can track
const setValueMock = jest.fn();

// Enhanced mock for react-native
jest.mock('react-native', () => {
  const animationCallback = jest.fn();
  const mockSetValue = jest.fn();  // Define mock inside factory function
  
  return {
    View: 'View',
    Text: 'Text',
    Animated: {
      View: 'View',
      ValueXY: jest.fn(() => ({
        x: { interpolate: jest.fn(() => 'rotate') },
        y: 0,
        getLayout: () => ({}),
        setValue: mockSetValue  // Use locally defined mock
      })),
      timing: jest.fn(() => ({
        start: (cb) => {
          animationCallback();
          cb && cb();
        }
      })),
      spring: jest.fn(() => ({ start: jest.fn() }))
    },
    PanResponder: {
      create: jest.fn(() => ({
        panHandlers: {}
      }))
    },
    Dimensions: {
      get: () => ({
        width: 375,
        height: 667
      })
    },
    StyleSheet: {
      create: styles => styles
    },
    _animationCallback: animationCallback,
    _mockSetValue: mockSetValue  // Expose for tests
  };
});

import { SwipeCard } from '../SwipeCard';

describe('SwipeCard Component', () => {
  const mockProps = {
    data: { statement: 'Test Statement' },
    onSwipeLeft: jest.fn(),
    onSwipeRight: jest.fn()
  };

  let panResponderConfig;

  beforeEach(() => {
    mockProps.onSwipeLeft.mockClear();
    mockProps.onSwipeRight.mockClear();
    require('react-native')._animationCallback.mockClear();
    
    require('react-native').PanResponder.create.mockImplementation(config => {
      panResponderConfig = config;
      return { panHandlers: {} };
    });
  });

  it('renders correctly', () => {
    const tree = renderer.create(
      <SwipeCard {...mockProps} />
    ).toJSON();
    
    expect(tree).toBeDefined();
    expect(tree.type).toBe('View');
  });

  it('renders with correct data', () => {
    const tree = renderer.create(
      <SwipeCard {...mockProps} />
    ).toJSON();
    
    expect(tree.children).toBeDefined();
  });

  it('applies container styles', () => {
    const tree = renderer.create(
      <SwipeCard {...mockProps} />
    ).toJSON();
    
    expect(tree.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          position: 'absolute',
          width: 375,
          height: '100%',
          padding: 10
        })
      ])
    );
  });

  it('handles right swipe correctly', () => {
    renderer.create(<SwipeCard {...mockProps} />);
    
    // Simulate a right swipe
    panResponderConfig.onPanResponderRelease(null, {
      dx: 200  // More than SWIPE_THRESHOLD (which is 93.75 based on our mocked width)
    });
    
    // Wait for animation to complete
    expect(require('react-native')._animationCallback).toHaveBeenCalled();
    expect(mockProps.onSwipeRight).toHaveBeenCalled();
    expect(mockProps.onSwipeLeft).not.toHaveBeenCalled();
  });

  it('handles left swipe correctly', () => {
    renderer.create(<SwipeCard {...mockProps} />);
    
    // Simulate a left swipe
    panResponderConfig.onPanResponderRelease(null, {
      dx: -200  // Less than -SWIPE_THRESHOLD
    });
    
    // Wait for animation to complete
    expect(require('react-native')._animationCallback).toHaveBeenCalled();
    expect(mockProps.onSwipeLeft).toHaveBeenCalled();
    expect(mockProps.onSwipeRight).not.toHaveBeenCalled();
  });

  it('resets position on small swipe', () => {
    renderer.create(<SwipeCard {...mockProps} />);
    
    // Simulate a small swipe that shouldn't trigger left/right
    panResponderConfig.onPanResponderRelease(null, {
      dx: 50  // Less than SWIPE_THRESHOLD
    });
    
    expect(mockProps.onSwipeLeft).not.toHaveBeenCalled();
    expect(mockProps.onSwipeRight).not.toHaveBeenCalled();
  });

  it('matches snapshot', () => {
    const tree = renderer.create(
      <SwipeCard 
        data={{ statement: 'Snapshot test statement' }}
        onSwipeLeft={() => {}}
        onSwipeRight={() => {}}
      />
    ).toJSON();
    
    expect(tree).toMatchSnapshot();
  });

  it('updates position during movement', () => {
    renderer.create(<SwipeCard {...mockProps} />);
    
    // Simulate pan movement
    panResponderConfig.onPanResponderMove(null, {
      dx: 100,
      dy: 50
    });
    
    // Get the mock from the mocked module
    const { _mockSetValue } = require('react-native');
    expect(_mockSetValue).toHaveBeenCalledWith({
      x: 100,
      y: 50
    });
  });

  it('starts pan responder on touch', () => {
    renderer.create(<SwipeCard {...mockProps} />);
    
    // Verify that onStartShouldSetPanResponder returns true
    expect(panResponderConfig.onStartShouldSetPanResponder()).toBe(true);
  });
}); 