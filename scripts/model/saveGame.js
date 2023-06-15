export default (size) => Array.from({ length: size ** 2 }, () => ({ disabled: false, value: '' }));
