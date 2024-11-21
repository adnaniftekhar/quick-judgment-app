const mockComponent = name => name;

module.exports = {
  View: mockComponent('View'),
  Text: mockComponent('Text'),
  Platform: {
    select: jest.fn(obj => obj.default)
  },
  StyleSheet: {
    create: styles => styles
  }
};