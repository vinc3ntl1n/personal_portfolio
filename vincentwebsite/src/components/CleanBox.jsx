import './CleanBox.css';

export default function CleanBox({
  className = '',
  children,
  style = {},
  onClick,
  variant = 'default'
}) {
  return (
    <div
      className={`clean-box clean-box--${variant} ${className}`}
      style={style}
      onClick={onClick}
    >
      {children}
    </div>
  );
}
