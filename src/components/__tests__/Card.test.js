import React from 'react';
import renderer from 'react-test-renderer';

// Mock react-native with StyleSheet support
jest.mock('react-native', () => ({
  View: 'View',
  Text: 'Text',
  StyleSheet: {
    create: styles => styles
  }
}));

import Card from '../Card';

describe('Card Component', () => {
  it('renders correctly with styles', () => {
    const tree = renderer.create(
      <Card data={{ statement: 'Test Statement' }} />
    ).toJSON();
    
    expect(tree.props.style).toEqual({
      padding: 15,
      backgroundColor: '#fff',
      borderRadius: 8,
      shadowColor: '#000',
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 2,
    });

    expect(tree.children[0].props.style).toEqual({
      fontSize: 16,
      color: '#333',
    });
  });

  it('matches snapshot with styles', () => {
    const tree = renderer.create(
      <Card data={{ statement: 'Snapshot test' }} />
    ).toJSON();
    
    expect(tree).toMatchSnapshot();
  });

  it('handles empty statement', () => {
    const tree = renderer.create(
      <Card data={{ statement: '' }} />
    ).toJSON();
    
    // More defensive check - verify the structure exists first
    expect(tree.type).toBe('View');
    expect(tree.children[0].type).toBe('Text');
    // For empty string, the Text component might have no children or an empty string
    const textContent = tree.children[0].children ? tree.children[0].children[0] : '';
    expect(textContent).toBe('');
  });

  it('handles long statement', () => {
    const longText = 'This is a very long statement that might need special handling in the UI';
    const tree = renderer.create(
      <Card data={{ statement: longText }} />
    ).toJSON();
    expect(tree.children[0].children[0]).toBe(longText);
  });

  it('handles missing data prop gracefully', () => {
    const consoleError = console.error;
    console.error = jest.fn(); // Suppress React prop type warnings in test output
    
    const tree = renderer.create(
      <Card />
    ).toJSON();
    
    expect(tree.type).toBe('View');
    expect(tree.children[0].type).toBe('Text');
    const textContent = tree.children[0].children ? tree.children[0].children[0] : '';
    expect(textContent).toBe('');
    
    console.error = consoleError; // Restore console.error
  });
}); 