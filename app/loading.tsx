export default function Loading() {
  return (
    <div className="h-screen flex items-center justify-center bg-light-background dark:bg-dark-background">
      <div className="text-center">
        <div className="text-6xl mb-4 animate-bounce">🐶</div>
        <p className="text-light-text-secondary dark:text-dark-text-secondary">
          Loading Whiskey...
        </p>
      </div>
    </div>
  );
}
