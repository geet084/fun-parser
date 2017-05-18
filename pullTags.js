const tagWords = ['fun', 'beach', 'class', 'networking', 'seminar', 'party', 'retreat', 'performance', 'tour',
  'conference', 'festival', 'race', 'game', 'gala', 'expo', 'attraction', 'tournament', 'convention', 
  'business', 'health', 'family', 'education', 'sports', 'basketball', 'baseball', 'fishing', 'charity',
  'hobbies', 'food', 'drink', 'music', 'science', 'travel', 'park', 'film', 'fashion', 'government',
  'volunteer', 'volunteering', 'car', 'boat', 'holiday', 'dance', 'walk', 'sing', 'team', 'code', 'coding',
  'programming', 'school'];

const generateTagWordRegex = () => {
  const regexString = tagWords.map((w) => {
    return '\\b' + w + '\\b';
  }).join('\|');
  return new RegExp(regexString, 'ig');
};

class EventTags {
  constructor(){
    this.tagRegex = generateTagWordRegex();
    this.pullTags = this.pullTags.bind(this);
  }

  pullTags(description) {
    const results = description.match(this.tagRegex);
    return results ? [...new Set(results.map((w) => { return w.toLowerCase(); }))] : []; 
  }
}

module.exports = EventTags;