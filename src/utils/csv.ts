export function escapeCSVCell(cell: string): string {
  const str = cell.replace(/"/g, '""');
  return `"${str}"`;
}

export function createCSVContent(rows: string[][]): string {
  return rows
    .map((row) => row.map((cell) => escapeCSVCell(cell ?? '')).join(','))
    .join('\n');
}
