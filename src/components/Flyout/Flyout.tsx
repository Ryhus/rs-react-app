import { useSelectionStore } from '@/stores/selectionStore';
import { saveAs } from 'file-saver';
import { createCSVContent } from '@/utils/csv';

import './FlyoutStyles.scss';

function Flyout() {
  const { selectedList, clearSelection } = useSelectionStore();

  const breedList = selectedList();

  if (breedList.length === 0) return null;

  const handleDownload = () => {
    const csvRows = [
      ['Name', 'Origin', 'Bredd_for', 'Life_span', 'URL'],
      ...breedList.map((breed) => [
        breed.name ?? 'N/A',
        breed.origin ?? 'N/A',
        breed.bred_for ?? 'N/A',
        breed.life_span ?? 'N/A',
        `https://beloved-dogs.netlify.app/?details=${breed.id}`,
      ]),
    ];

    const csvContent = createCSVContent(csvRows);

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, `${breedList.length}_items.csv`);
  };

  return (
    <div className="flyout">
      <span>{breedList.length}</span>
      <button onClick={clearSelection}>Unselect all</button>
      <button onClick={handleDownload}>Download</button>
    </div>
  );
}

export default Flyout;
