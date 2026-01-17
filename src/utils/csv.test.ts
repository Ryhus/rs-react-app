import { escapeCSVCell, createCSVContent } from './csv';
import { describe, it, expect } from 'vitest';

describe('escapeCSVCell', () => {
  it('wraps a simple breed name in quotes', () => {
    expect(escapeCSVCell('Golden Retriever')).toBe('"Golden Retriever"');
  });

  it('doubles internal quotes in breed descriptions and wraps in quotes', () => {
    expect(escapeCSVCell('Known as the "gentle" giant')).toBe(
      '"Known as the ""gentle"" giant"'
    );
  });

  it('handles empty breed field', () => {
    expect(escapeCSVCell('')).toBe('""');
  });

  it('handles breed name with multiple quotes', () => {
    expect(escapeCSVCell('"Bull" Terrier "Mini"')).toBe(
      '"""Bull"" Terrier ""Mini"""'
    );
  });
});

describe('createCSVContent', () => {
  it('creates CSV content from breed info rows', () => {
    const rows = [
      ['Name', 'Origin', 'Bred_for', 'Life_span'],
      ['Golden Retriever', 'Scotland', 'Retrieving', '10-12 years'],
      ['Bulldog', 'England', 'Bull baiting', '8-10 years'],
    ];
    expect(createCSVContent(rows)).toBe(
      '"Name","Origin","Bred_for","Life_span"\n' +
        '"Golden Retriever","Scotland","Retrieving","10-12 years"\n' +
        '"Bulldog","England","Bull baiting","8-10 years"'
    );
  });

  it('escapes quotes inside breed descriptions', () => {
    const rows = [
      ['Name', 'Origin', 'Bred_for'],
      ['Chihuahua', 'Mexico', 'Small dog known as the "lap dog"'],
    ];
    expect(createCSVContent(rows)).toBe(
      '"Name","Origin","Bred_for"\n' +
        '"Chihuahua","Mexico","Small dog known as the ""lap dog"""'
    );
  });
});
