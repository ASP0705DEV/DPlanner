import { describe, it, expect } from 'vitest';
import { DATE_VIBES } from '../data/dateVibes';

describe('Our Little Date Planner - Vibe System', () => {
  it('contains all 15 curated date vibes including Durga Puja', () => {
    expect(DATE_VIBES.length).toBe(15);
    const vibeIds = DATE_VIBES.map((v) => v.id);
    expect(vibeIds).toContain('durga-puja');
    expect(vibeIds).toContain('road-ride');
    expect(vibeIds).toContain('princess-treatment');
    expect(vibeIds).toContain('foodie-mode');
    expect(vibeIds).toContain('cafe-date');
    expect(vibeIds).toContain('dinner-date');
    expect(vibeIds).toContain('street-food');
    expect(vibeIds).toContain('sports-games');
    expect(vibeIds).toContain('movie-date');
    expect(vibeIds).toContain('shopping-queen');
    expect(vibeIds).toContain('us-time');
    expect(vibeIds).toContain('steamy-times');
    expect(vibeIds).toContain('chill-session');
    expect(vibeIds).toContain('her-time');
    expect(vibeIds).toContain('cuddle-peace');
  });

  it('includes festive treats and Jamshedpur pandals for Durga Puja', () => {
    const durgaPuja = DATE_VIBES.find((v) => v.id === 'durga-puja');
    expect(durgaPuja).toBeDefined();
    const subIds = durgaPuja?.subChoices?.map((sc) => sc.id);
    expect(subIds).toContain('bhog-khichuri');
    expect(subIds).toContain('kathi-roll-stall');
    expect(subIds).toContain('mela-chaat-puchka');

    const spotIds = durgaPuja?.jamshedpurSpots?.map((s) => s.id);
    expect(spotIds).toContain('spot-kasidih');
    expect(spotIds).toContain('spot-jairam-adityapur');
    expect(spotIds).toContain('spot-bistupur-ram-mandir');
  });

  it('includes bike, car, and scooter vehicle choices for Road Rides', () => {
    const roadRide = DATE_VIBES.find((v) => v.id === 'road-ride');
    expect(roadRide).toBeDefined();
    const subIds = roadRide?.subChoices?.map((sc) => sc.id);
    expect(subIds).toContain('bike');
    expect(subIds).toContain('car');
    expect(subIds).toContain('scooter');
  });

  it('includes couple and siblings choices for Chill Session', () => {
    const chillSession = DATE_VIBES.find((v) => v.id === 'chill-session');
    expect(chillSession).toBeDefined();
    const subIds = chillSession?.subChoices?.map((sc) => sc.id);
    expect(subIds).toContain('just-us');
    expect(subIds).toContain('with-siblings');
  });

  it('includes spa, hair, pedicure, and nails for Princess Treatment', () => {
    const princess = DATE_VIBES.find((v) => v.id === 'princess-treatment');
    expect(princess).toBeDefined();
    const subIds = princess?.subChoices?.map((sc) => sc.id);
    expect(subIds).toContain('spa');
    expect(subIds).toContain('hair');
    expect(subIds).toContain('pedicure');
    expect(subIds).toContain('nails');
  });

  it('includes shawarma, rolls, and momos for Foodie Mode', () => {
    const foodie = DATE_VIBES.find((v) => v.id === 'foodie-mode');
    expect(foodie).toBeDefined();
    const subIds = foodie?.subChoices?.map((sc) => sc.id);
    expect(subIds).toContain('shawarma');
    expect(subIds).toContain('kathi-rolls');
    expect(subIds).toContain('momos');
  });

  it('has love slogans for every date vibe', () => {
    DATE_VIBES.forEach((vibe) => {
      expect(vibe.loveSlogan.length).toBeGreaterThan(10);
      expect(vibe.hindiTitle.length).toBeGreaterThan(2);
    });
  });
});
