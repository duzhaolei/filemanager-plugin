const chai = require('chai');
const expect = chai.expect;
const fs = require('fs-extra');
import path from 'path';

import commander from '../../src/commander';

const copy = commander.copy;

describe('test copy', () => {
  const rootPath = 'testCache';
  
  afterEach(() => {
    fs.removeSync(rootPath);
  });
  
  it('copy an existing file, it will be copied successfully', async () => {
    const mockSource = path.join(rootPath, 'copy', 'index.html');
    fs.ensureFileSync(mockSource);
    expect(fs.pathExistsSync(mockSource)).equals(true);
    
    const mockDestination = path.join('testCache', 'copy', 'index1.html');
    await copy({
      source: mockSource,
      destination: mockDestination
    });
    expect(fs.pathExistsSync(mockDestination)).equals(true);
  });
  
  it('copy an invalid file, it will throw an error', async () => {
    const result = await copy({
      source: null,
      destination: null
    });
    expect(result).to.be.an.instanceOf(Error);
  });
});