import gulp from "gulp";
const { src, dest } = gulp;
import uglify from "gulp-uglify-es/dist/index.js";

const minify = () => src("./cache/**/*.js").pipe(uglify()).pipe(dest("./build"));

export { minify };
