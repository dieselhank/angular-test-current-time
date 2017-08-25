
## Library angular-test-current-time
An Angular project that demonstrates loading and interacting with an Angular app from plain html/javascript.

## Usage
The Angular app is in `current-time.bundle.js`. It includes the Angular libraries. There are polyfills packaged in a seperate file `polyfills.bundle.js`.


```
# Install Dependencies
add this package to your package.json: https://www.npmjs.com/package/vue-test-current-time
npm install

# Example Page
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>AngularTestCurrentTime</title>

  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="icon" type="image/x-icon" href="node_modules/angular-test-current-time/favicon.ico">
	<script>
		document.getCompRef = function(compRef) {
			document.compRef = compRef;
		}
		document.addEventListener('DOMContentLoaded', function() {
			document.timeZoneChanged = function(tz) {
				alert("Time-zone updated to: " + tz);
			}

			document.buttonClicked = function(tz, event) {
				alert("Button clicked: Current time-zone: " + tz);
			}			
			document.getElementById('newtzbtn').addEventListener('click', function() {
				let newtz = document.getElementById('newtz').value;
				if(newtz !== '' && document.compRef) {
					document.compRef.changeTimeZone(newtz);
				}
			});
		})
	</script>
</head>
<body>
<div>
  <current-time selected="Africa/Accra" time-zone-changed="timeZoneChanged" button-clicked="buttonClicked" get-comp-ref="getCompRef"></current-time>
</div>
<div>
<form>
	<input type="text" id="newtz" value="Canada/Pacific"/><input id="newtzbtn" type="button" value="Set Time Zone"/>
</form>
</div>
<div>
	<script src="node_modules/angular-test-current-time/polyfills.bundle.js"></script>
	<script src="node_modules/angular-test-current-time/current-time.bundle.js"></script>
</div>
</body>
</html>
```

## Simple Example
The included `index.html` file demostrate loading the current-time Angular app on a webpage. The app is able to call out to plain javascript functions and plain javascript is able to get a reference to the component and call internal methods to change the component state.

## Multiple Angular Apps Example
The included `multi-component.html` file demonstrates loading multiple Angular apps on one webpage.
