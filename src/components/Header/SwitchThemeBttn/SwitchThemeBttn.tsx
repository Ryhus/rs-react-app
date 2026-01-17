import { useTheme } from '@/contexts';
import './SwitchThemeBttnStyles.scss';

export function SwitchThemeBttn() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button className="theme-bttn" onClick={toggleTheme}>
      {theme === 'light' ? '🌙' : '🔆'}
    </button>
  );
}
