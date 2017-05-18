const chai = require('chai');
const expect = chai.expect;
const EventTags = require('../pullTags.js');
const eventTags = new EventTags();
const pullTags = eventTags.pullTags;

describe('pullTags', () => {
  it('pulls recognized unique tags from description', () => {
    const description = 'Do you love the beach? This fun activity includes wind surfing and the beach';
    const subject = pullTags(description);
    expect(subject).to.deep.equal(['beach', 'fun']);
  });

  it('handles an empty string', () => {
    const description = '';
    const subject = pullTags(description);
    expect(subject).to.deep.equal([]);
  });

  it('matches only a full word', () => {
    const description = 'Class. Fundamental beached whales';
    const subject = pullTags(description);
    expect(subject).to.deep.equal(['class']);
  });
});