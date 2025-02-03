interface DividerProps {
  className?: string;
}

const Divider = ({ className = '' }: DividerProps) => (
  <div className={`h-8 w-px bg-gray-300 ${className}`} aria-hidden="true" />
);

export default Divider;
