/*
STEPS TO SET UP THIS EXAMPLE:
1. Install NodeJS in order to access node and npm. npm is used to install NodeJS modules. 
2. Make a project directory.
3. Run 'npm init' to create a package.json file in our directory.
4. Run 'npm install gulp' to install the gulp package.
5. Run 'npm install --save-dev gulp' to save the gulp dependancy to the package.json devDependencies list.
6. Run 'npm install gulp-concat' to install the gulp-concat module we're going to use.
7. Write the code below.
8. Run gulpfile by typing gulp in project directory 
*/


// Include core gulp package
var gulp = require('gulp');

// Include the gulp-concat plugin. This allows us to concatenate files together
var concat = require('gulp-concat');

/* Define the 'smush' gulp target. 
This first takes all of our 'functionality' JavaScript files, concatenates them together into a 
file called 'combined_file', and finally puts that combined file into the current directory.
*/
gulp.task('smush', function() {
	return gulp.src('functionality_*.js')
		.pipe(concat('combined_file.js'))
		.pipe(gulp.dest('./'));
});

// Define the default gulp command, which simply runs 'smush'
gulp.task('default', ['smush']);
