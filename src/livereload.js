new EventSource("/esbuild").addEventListener("change", () => location.reload());
console.log("Livereload enabled");
