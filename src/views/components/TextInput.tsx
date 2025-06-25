interface TextInputType {
  type?: 'text' | 'email' | 'password' | 'number';
}

function TextInput(
  { type }: TextInputType = { type: 'text' }
) {
  return (
    <input
      type={type}
      className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      placeholder="Enter text here..."
    />
  );
}

export default TextInput;
