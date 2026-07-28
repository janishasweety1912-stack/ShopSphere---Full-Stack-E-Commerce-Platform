function Toast({ message }) {
  return (
    <div className="fixed top-20 right-5 bg-green-600 text-white px-6 py-4 rounded-xl shadow-xl animate-bounce z-[100]">
      ✓ {message}
    </div>
  );
}

export default Toast;