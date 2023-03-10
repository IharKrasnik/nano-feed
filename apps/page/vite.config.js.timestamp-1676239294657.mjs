// vite.config.js
import { sveltekit } from "file:///Users/igorkrasnik/Documents/work/nano-feed/node_modules/@sveltejs/kit/src/exports/vite/index.js";
import fs from "fs";
var config = {
  plugins: [sveltekit(), rawFonts([".ttf"])]
};
function rawFonts(ext) {
  return {
    name: "vite-plugin-raw-fonts",
    transform(code, id) {
      if (ext.some((e) => id.endsWith(e))) {
        const buffer = fs.readFileSync(id);
        return { code: `export default ${JSON.stringify(buffer)}`, map: null };
      }
    }
  };
}
var vite_config_default = config;
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvaWdvcmtyYXNuaWsvRG9jdW1lbnRzL3dvcmsvbmFuby1mZWVkL2FwcHMvcGFnZVwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL1VzZXJzL2lnb3JrcmFzbmlrL0RvY3VtZW50cy93b3JrL25hbm8tZmVlZC9hcHBzL3BhZ2Uvdml0ZS5jb25maWcuanNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL1VzZXJzL2lnb3JrcmFzbmlrL0RvY3VtZW50cy93b3JrL25hbm8tZmVlZC9hcHBzL3BhZ2Uvdml0ZS5jb25maWcuanNcIjtpbXBvcnQgeyBzdmVsdGVraXQgfSBmcm9tICdAc3ZlbHRlanMva2l0L3ZpdGUnO1xuaW1wb3J0IGZzIGZyb20gJ2ZzJztcblxuLyoqIEB0eXBlIHtpbXBvcnQoJ3ZpdGUnKS5Vc2VyQ29uZmlnfSAqL1xuY29uc3QgY29uZmlnID0ge1xuXHRwbHVnaW5zOiBbc3ZlbHRla2l0KCksIHJhd0ZvbnRzKFsnLnR0ZiddKV0sXG59O1xuXG5mdW5jdGlvbiByYXdGb250cyhleHQpIHtcblx0cmV0dXJuIHtcblx0XHRuYW1lOiAndml0ZS1wbHVnaW4tcmF3LWZvbnRzJyxcblx0XHR0cmFuc2Zvcm0oY29kZSwgaWQpIHtcblx0XHRcdGlmIChleHQuc29tZSgoZSkgPT4gaWQuZW5kc1dpdGgoZSkpKSB7XG5cdFx0XHRcdGNvbnN0IGJ1ZmZlciA9IGZzLnJlYWRGaWxlU3luYyhpZCk7XG5cdFx0XHRcdHJldHVybiB7IGNvZGU6IGBleHBvcnQgZGVmYXVsdCAke0pTT04uc3RyaW5naWZ5KGJ1ZmZlcil9YCwgbWFwOiBudWxsIH07XG5cdFx0XHR9XG5cdFx0fVxuXHR9O1xufVxuXG5leHBvcnQgZGVmYXVsdCBjb25maWc7XG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQWlWLFNBQVMsaUJBQWlCO0FBQzNXLE9BQU8sUUFBUTtBQUdmLElBQU0sU0FBUztBQUFBLEVBQ2QsU0FBUyxDQUFDLFVBQVUsR0FBRyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUM7QUFDMUM7QUFFQSxTQUFTLFNBQVMsS0FBSztBQUN0QixTQUFPO0FBQUEsSUFDTixNQUFNO0FBQUEsSUFDTixVQUFVLE1BQU0sSUFBSTtBQUNuQixVQUFJLElBQUksS0FBSyxDQUFDLE1BQU0sR0FBRyxTQUFTLENBQUMsQ0FBQyxHQUFHO0FBQ3BDLGNBQU0sU0FBUyxHQUFHLGFBQWEsRUFBRTtBQUNqQyxlQUFPLEVBQUUsTUFBTSxrQkFBa0IsS0FBSyxVQUFVLE1BQU0sS0FBSyxLQUFLLEtBQUs7QUFBQSxNQUN0RTtBQUFBLElBQ0Q7QUFBQSxFQUNEO0FBQ0Q7QUFFQSxJQUFPLHNCQUFROyIsCiAgIm5hbWVzIjogW10KfQo=
