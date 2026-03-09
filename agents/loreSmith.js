/**
 * LORE_SMITH Agent
 * Generates comprehensive world bible data for the dark fantasy realm
 */

import { writeFileSync } from 'fs';
import { join } from 'path';

// Helper functions for generating consistent data
const generateId = (prefix) => `${prefix}-${Math.random().toString(36).substr(2, 9)}`;

const randomElement = (arr) => arr[Math.floor(Math.random() * arr.length)];

const randomRange = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

// World name generators
const worldNamePrefixes = ['Shadow', 'Dark', 'Iron', 'Blood', 'Void', 'Mist', 'Storm', 'Frost', 'Ember', 'Night'];
const worldNameSuffixes = ['hold', 'gard', 'heim', 'mark', 'fall', 'reach', 'waste', 'mere', 'haven', 'crest'];

// Region names
const regionNames = [
  'The Shadowed Vale', 'Iron Peaks', 'Bloodmarsh', 'Voidwood', 'Mistral Coast',
  'Storm\'s End', 'Frostbite Tundra', 'Ember Wastes', 'Nightfall Basin', 'The Cursed Lands',
  'Whisperwood', 'Dreadmoor', 'Sorrow\'s Reach', 'Grimhold', 'The Bleak Expanse',
  'Raven\'s Perch', 'Doomscar', 'Silent Hills', 'The Shattered Plains', 'Obsidian Ridge'
];

// City names
const cityPrefixes = ['Black', 'Dark', 'Iron', 'Shadow', 'Blood', 'Raven', 'Dread', 'Grim', 'Night', 'Frost'];
const citySuffixes = ['haven', 'hold', 'gard', 'fort', 'watch', 'spire', 'gate', 'crest', 'mere', 'fall'];

// Faction names
const factionTemplates = [
  { prefix: 'Order', suffix: 'of the Void' },
  { prefix: 'Brotherhood', suffix: 'of Shadow' },
  { prefix: 'The Crimson', suffix: 'Covenant' },
  { prefix: 'The Iron', suffix: 'Legion' },
  { prefix: 'Circle', suffix: 'of Whispers' },
  { prefix: 'The Obsidian', suffix: 'Throne' },
  { prefix: 'Cult', suffix: 'of the Eternal Night' },
  { prefix: 'The Silver', suffix: 'Hand' },
  { prefix: 'Guild', suffix: 'of Shadows' },
  { prefix: 'The Ashen', suffix: 'Court' }
];

// Character names
const firstNamePool = ['Aldric', 'Morgana', 'Theron', 'Lilith', 'Kael', 'Seraphina', 'Darius', 'Nyssa', 'Viktor', 'Ravenna', 'Malcolm', 'Isolde', 'Gareth', 'Vesper', 'Lucian'];
const lastNamePool = ['Shadowbane', 'Nightfall', 'Ironheart', 'Bloodworth', 'Voidwalker', 'Mistral', 'Stormborn', 'Frost', 'Ember', 'Darkwood'];

// Biome types
const biomes = [
  { type: 'dark_forest', color: '#1a2f1a', characteristics: ['Dense canopy', 'Bioluminescent fungi', 'Ancient trees', 'Hidden dangers'] },
  { type: 'barren_wasteland', color: '#2d2418', characteristics: ['Cracked earth', 'Ash deposits', 'Scant vegetation', 'Harsh winds'] },
  { type: 'mountain_peaks', color: '#3d3d4a', characteristics: ['Jagged peaks', 'Snow-capped', 'Thin air', 'Eagle nests'] },
  { type: 'swamp_marsh', color: '#1f291f', characteristics: ['Still waters', 'Twisted trees', 'Fog banks', 'Unseen depths'] },
  { type: 'coastal_cliffs', color: '#2a3d4a', characteristics: ['Crashing waves', 'Sheer drops', 'Sea caves', 'Salt spray'] },
  { type: 'frozen_tundra', color: '#4a5d6a', characteristics: ['Permafrost', 'Ice formations', 'Aurora borealis', 'Biting cold'] }
];

// Magic sources
const magicSources = [
  { id: 'source_void', name: 'The Void', description: 'Primordial darkness from which all magic flows' },
  { id: 'source_blood', name: 'Blood Essence', description: 'Life force extracted from living beings' },
  { id: 'source_stars', name: 'Starlight', description: 'Celestial energy from distant worlds' },
  { id: 'source_earth', name: 'Deep Earth', description: 'Ancient power slumbering beneath the crust' }
];

// Magic schools
const magicSchools = [
  { id: 'school_necromancy', name: 'Necromancy', description: 'Command over death and undeath', associatedSource: 'source_void' },
  { id: 'school_shadow', name: 'Shadow Weaving', description: 'Manipulation of darkness and stealth', associatedSource: 'source_void' },
  { id: 'school_blood', name: 'Hemomancy', description: 'Blood magic and life manipulation', associatedSource: 'source_blood' },
  { id: 'school_divination', name: 'Divination', description: 'Seeing through time and space', associatedSource: 'source_stars' },
  { id: 'school_elemental', name: 'Elementalism', description: 'Control over earth, fire, water, air', associatedSource: 'source_earth' },
  { id: 'school_enchantment', name: 'Enchantment', description: 'Infusing objects with magical properties', associatedSource: 'source_stars' }
];

// Epoch names
const epochNames = [
  'The Age of Dawn',
  'The Era of Shadows',
  'The Time of Sundering',
  'The Age of Ash',
  'The Current Darkness'
];

function generateWorldOverview() {
  const prefix = randomElement(worldNamePrefixes);
  const suffix = randomElement(worldNameSuffixes);
  
  return {
    name: `${prefix}${suffix}`,
    tagline: `Where darkness reigns and legends are forged in shadow`,
    description: `A realm shrouded in eternal twilight, where ancient powers slumber beneath the earth and the boundaries between life and death grow thin. ${prefix}${suffix} is a land of stark beauty and terrible danger, where survival demands both strength and cunning.`,
    themes: [
      'Dark Fantasy',
      'Moral Ambiguity',
      'Ancient Evils',
      'Forbidden Magic',
      'Political Intrigue',
      'Survival Horror'
    ]
  };
}

function generateCreationMyth() {
  return {
    title: 'The Shattering of the Void',
    story: `In the beginning, there was only the Void - an endless expanse of perfect darkness and silence. From this primordial nothingness emerged the First Entities: Aetheris, bringer of light, and Umbra, keeper of shadows. Their eternal dance created the fabric of reality itself.
    
But their harmony was not to last. Aetheris sought to fill the Void with creation, while Umbra cherished the perfect emptiness. Their conflict tore through the cosmos, and in their final confrontation, both were shattered. Fragments of Aetheris became the stars and suns, while pieces of Umbra fell to form the dark worlds.

${generateWorldOverview().name} is one such fragment - a world born from the essence of shadow, forever marked by the conflict of its creators. The magic that flows through this realm is the lingering power of the First Entities, and those who wield it risk attracting the attention of what remains of their consciousness.`,
    entities: [
      {
        id: 'entity_aetheris',
        name: 'Aetheris',
        domain: 'Light, Creation, Order',
        description: 'The Bringer of Dawn, whose shattered form became the celestial bodies. Worshipped by those who seek hope in darkness.'
      },
      {
        id: 'entity_umbra',
        name: 'Umbra',
        domain: 'Darkness, Preservation, Chaos',
        description: 'The Keeper of Shadows, whose essence forms the foundation of the dark worlds. Revered by those who embrace the void.'
      },
      {
        id: 'entity_the_echo',
        name: 'The Echo',
        domain: 'Memory, Prophecy, Fate',
        description: 'The lingering consciousness of both entities, speaking through oracles and madmen.'
      }
    ]
  };
}

function generateGeography() {
  const regions = regionNames.map((name, index) => {
    const biome = randomElement(biomes);
    const numCities = randomRange(1, 4);
    const cities = Array.from({ length: numCities }, (_, i) => ({
      id: generateId('city'),
      name: `${randomElement(cityPrefixes)}${randomElement(citySuffixes)}`,
      population: randomRange(500, 50000),
      type: i === 0 ? 'capital' : i === 1 ? 'major' : 'minor',
      coordinates: {
        x: randomRange(50, 950),
        y: randomRange(50, 650)
      }
    }));

    return {
      id: generateId('region'),
      name,
      biome: biome.type,
      description: `A ${biome.type.replace('_', ' ')} characterized by ${biome.characteristics.slice(0, 2).join(', ')}. ${randomElement(['Ancient ruins dot the landscape.', 'Local legends speak of hidden treasures.', 'The region is plagued by monstrous creatures.', 'Trade routes barely maintain connection to civilization.'])}`,
      coordinates: {
        x: randomRange(0, 800),
        y: randomRange(0, 500),
        width: randomRange(100, 200),
        height: randomRange(80, 150)
      },
      cities
    };
  });

  return {
    regions,
    biomes
  };
}

function generateMagicSystem() {
  return {
    sources: magicSources,
    schools: magicSchools,
    limitations: [
      'Magic draws from finite personal reserves; overuse leads to exhaustion or death',
      'Casting in sacred spaces attracts unwanted divine attention',
      'Blood magic requires willing or unwilling sacrifice',
      'Shadow magic gradually corrupts the caster\'s soul',
      'Divination reveals truths the mind may not be prepared to accept',
      'All magic leaves traces that skilled hunters can track'
    ]
  };
}

function generateFactions() {
  const alignments = ['benevolent', 'neutral', 'malevolent', 'ambiguous'];
  return factionTemplates.map((template, index) => {
    return {
      id: generateId('faction'),
      name: `${template.prefix} ${template.suffix}`,
      description: `A ${template.prefix.toLowerCase()} organization ${template.suffix.toLowerCase()}. ${randomElement(['They operate from the shadows, pulling strings across the realm.', 'Their influence extends to the highest courts of power.', 'They are hunted by authorities but continue to grow.', 'Ancient texts speak of their founding in the Age of Dawn.'])}`,
      goals: [
        randomElement(['Accumulate forbidden knowledge', 'Control trade routes', 'Overthrow existing powers', 'Protect ancient secrets', 'Spread their doctrine', 'Amass magical artifacts']),
        randomElement(['Eliminate rival factions', 'Gain political influence', 'Master forbidden magic', 'Control key resources', 'Recruit powerful individuals'])
      ],
      territory: randomElement([
        ['The Shadowed Vale', 'Whisperwood'],
        ['Iron Peaks', 'Obsidian Ridge'],
        ['Bloodmarsh', 'Dreadmoor'],
        ['Voidwood', 'The Cursed Lands'],
        ['Storm\'s End', 'Raven\'s Perch']
      ]),
      symbol: randomElement(['Raven', 'Serpent', 'Crown', 'Eye', 'Blade', 'Orb', 'Hand', 'Tower']),
      alignment: randomElement(alignments),
      power: randomRange(30, 100)
    };
  });
}

function generateEpochs() {
  const epochs = epochNames.map((name, index) => ({
    id: generateId('epoch'),
    name,
    startYear: -5000 + (index * 1000),
    endYear: index === epochNames.length - 1 ? null : -4000 + (index * 1000),
    description: randomElement([
      'A time of great change and upheaval.',
      'Ancient powers walked the land openly.',
      'Civilization rose and fell in cycles.',
      'The boundaries between worlds grew thin.',
      'Heroes and monsters were born in equal measure.'
    ])
  }));

  return epochs;
}

function generateTimelineEvents() {
  const events = [];
  const eventTemplates = [
    { title: 'The {adj} {noun}', significance: 'major' },
    { title: 'Fall of {place}', significance: 'epoch-defining' },
    { title: 'The {noun} War', significance: 'major' },
    { title: 'Discovery of {artifact}', significance: 'moderate' },
    { title: 'Birth of {person}', significance: 'moderate' },
    { title: 'The Great {event}', significance: 'major' },
    { title: 'Treaty of {place}', significance: 'moderate' },
    { title: 'The {adj} Plague', significance: 'major' }
  ];

  const adjectives = ['Crimson', 'Eternal', 'Silent', 'Bitter', 'Hollow', 'Frozen', 'Cursed', 'Sacred'];
  const nouns = ['Betrayal', 'Awakening', 'Convergence', 'Purge', 'Exodus', 'Reckoning', 'Schism'];
  const places = ['Blackhold', 'Ravenspire', 'The Voidwood', 'Ironpeak', 'Bloodmarsh'];
  const artifacts = ['The Shadow Crown', 'The Void Stone', 'The Blood Chalice', 'The Star Orb'];
  const persons = ['The First Necromancer', 'The Shadow King', 'The Void Prophet', 'The Blood Saint'];
  const eventTypes = ['Darkening', 'Sundering', 'Convergence', 'Awakening'];

  for (let i = 0; i < 30; i++) {
    const template = randomElement(eventTemplates);
    let title = template.title;
    title = title.replace('{adj}', randomElement(adjectives));
    title = title.replace('{noun}', randomElement(nouns));
    title = title.replace('{place}', randomElement(places));
    title = title.replace('{artifact}', randomElement(artifacts));
    title = title.replace('{person}', randomElement(persons));
    title = title.replace('{event}', randomElement(eventTypes));

    events.push({
      id: generateId('event'),
      epoch: `epoch-${randomRange(0, 4)}`,
      year: randomRange(-4500, 0),
      title,
      description: `A ${template.significance} event that shaped the course of history. ${randomElement(['Its effects are still felt today.', 'Scholars debate its true meaning.', 'The full story has been lost to time.', 'Multiple accounts contradict each other.'])}`,
      significance: template.significance
    });
  }

  return events.sort((a, b) => a.year - b.year);
}

function generateWorldBible() {
  console.log('LORE_SMITH: Beginning world generation...');
  
  const overview = generateWorldOverview();
  console.log(`LORE_SMITH: Generated world name: ${overview.name}`);
  
  const worldBible = {
    overview,
    creationMyth: generateCreationMyth(),
    geography: generateGeography(),
    magicSystem: generateMagicSystem(),
    factions: generateFactions(),
    epochs: generateEpochs()
  };

  const timelineData = {
    epochs: worldBible.epochs,
    events: generateTimelineEvents()
  };

  // Write world-bible.json
  const dataDir = join(process.cwd(), 'data');
  writeFileSync(
    join(dataDir, 'world-bible.json'),
    JSON.stringify(worldBible, null, 2)
  );
  console.log('LORE_SMITH: Written world-bible.json');

  // Write timeline.json
  writeFileSync(
    join(dataDir, 'timeline.json'),
    JSON.stringify(timelineData, null, 2)
  );
  console.log('LORE_SMITH: Written timeline.json');

  // Create done marker
  writeFileSync(join(dataDir, '.lore_smith.done'), new Date().toISOString());
  console.log('LORE_SMITH: Generation complete!');

  return worldBible;
}

// Run the agent
generateWorldBible();
