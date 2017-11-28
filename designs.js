/**
 * Functionality for the Pixel Art project
 */

// Global variable that defines a grid
var grid = $("#pixel_canvas");

// Listener that create a grid
$("#sizePicker").submit( function(event) {
  event.preventDefault();
  makeGrid();
});

// Listener that coloring a cel of a grid
grid.on( 'click', 'td', function(event) {
  color = $("#colorPicker").val();
  cell = $(event.target);
  cell.css("background-color", color);
});

// Function thar creates a grid
function makeGrid() {
  let height, width, table, row;
  // In order to create a grid we need to ensure that the table is completely empty.
  grid.empty();
  tableHTML  = grid[0];
  // Get the values of the grid w/h
  height = $("#input_height").val();
  width  = $("#input_width").val();

  //Double loop to create the grid
  for (let i = 0 ; i < height; i++) {
    row = tableHTML.insertRow(i);
    for (let j = 0; j < width; j++) {
      cel = row.insertCell(j);
    }
  }

}
