import { describe, it, expect } from 'vitest';
import * as ALL_CONTENT from './content';

describe('Content Lock', () => {
  it('matches the snapshot to protect against unintended AI edits', () => {
    // If an AI agent modifies the strings in content.ts without updating the snapshot,
    // this test will fail, preventing the changes from being deployed to production.
    // To approve changes, run: npm run test -- -u
    expect(ALL_CONTENT).toMatchSnapshot();
  });
});
