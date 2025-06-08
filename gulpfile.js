import { src, dest } from "gulp";
import uglify from "gulp-uglify-es";

const minify = () => src("./cache/**/*.js").pipe(uglify()).pipe(dest("./build"));

export { minify };
