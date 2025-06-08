const gulp = require("gulp");
const uglify = require("gulp-uglify-es").default;

const { src, dest } = gulp;

const minify = () => src("./cache/**/*.js").pipe(uglify()).pipe(dest("./build"));

exports.minify = minify;
