import type {
  RepositoryId,
  RepositoryOption,
} from "../data/repositories";

interface RepositorySelectorProps {
  options: readonly RepositoryOption[];
  selectedId: RepositoryId;
  onSelect: (id: RepositoryId) => void;
}

function RepositorySelector({
  options,
  selectedId,
  onSelect,
}: RepositorySelectorProps) {
  return (
    <label className="repository-selector">
      <span>Repository</span>

      <select
        value={selectedId}
        onChange={(event) => {
          const selectedOption = options.find(
            (option) =>
              option.id === event.target.value,
          );

          if (selectedOption) {
            onSelect(selectedOption.id);
          }
        }}
      >
        {options.map((option) => (
          <option
            key={option.id}
            value={option.id}
          >
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}

export default RepositorySelector;