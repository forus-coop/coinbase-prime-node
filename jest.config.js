module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
};
process.env = Object.assign(process.env, {
  PORTFOLIO_ID: 'test_portfolio',
  ENTITY_ID: 'test_entity'
});
