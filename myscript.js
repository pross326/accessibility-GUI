// Function for the "alt-text" page
function applyAltTextChanges() {
    var htmlInput = document.getElementById('html-input').value;
    var elementId = document.getElementById('element-id').value;
    var altText = document.getElementById('alt-text').value;

    var parser = new DOMParser();
    var doc = parser.parseFromString(htmlInput, 'text/html');
    var element = doc.getElementById(elementId);

    if (element) {
        var altElement = doc.createElement('p');
        altElement.innerText = altText;
        altElement.style.position = 'absolute';
        altElement.style.top = '-1000px';
        altElement.style.left = '-1000px';
        element.appendChild(altElement);

        document.getElementById('html-output').innerText = htmlInput;
        document.getElementById('render-output').innerHTML = htmlInput;

        var updatedHtml = element.outerHTML;
        document.getElementById('updated-html').innerText = updatedHtml;
        document.getElementById('rendered-updated-html').innerHTML = updatedHtml;
    } else {
        alert('Element with provided ID not found in the HTML.');
    }
}

function convertTableToFlexbox() {
    var htmlInput = document.getElementById('table-html-input').value;
    var paddingSlider = document.getElementById('padding-slider');
    var marginSlider = document.getElementById('margin-slider');
    var paddingValue = document.getElementById('padding-value');
    var marginValue = document.getElementById('margin-value');
  
    var parser = new DOMParser();
    var doc = parser.parseFromString(htmlInput, 'text/html');
    var table = doc.querySelector('table');
  
    if (table) {
      var flexContainer = doc.createElement('div');
      flexContainer.style.display = 'flex';
      flexContainer.style.flexWrap = 'wrap';
  
      var tableRows = Array.from(table.rows);
      var numColumns = tableRows[0].cells.length;
  
      tableRows.forEach(function(row) {
        var flexRow = doc.createElement('div');
        flexRow.style.display = 'flex';
        flexRow.style.width = '100%';
  
        var tableCells = Array.from(row.cells);
        var cellWidth = 100 / numColumns + '%';
  
        tableCells.forEach(function(cell, cellIndex) {
          var flexCell = doc.createElement('div');
          flexCell.style.width = cellWidth;
          flexCell.style.textAlign = 'center';
  
          // Add border to all sides of the cell
          flexCell.style.border = '1px solid black';
  
          // Remove border from the right side if it's not the last cell in the row
          if (cellIndex != tableCells.length - 1) {
            flexCell.style.borderRight = 'none';
          }
  
          // Remove border from the bottom if it's not the last row
          if (row.rowIndex != tableRows.length - 1) {
            flexCell.style.borderBottom = 'none';
          }
  
          var pTag = doc.createElement('p');
          pTag.style.padding = paddingSlider.value + 'px';
          pTag.style.margin = marginSlider.value + 'px';
          pTag.style.boxSizing = 'border-box';
          pTag.innerHTML = cell.innerHTML;
  
          flexCell.appendChild(pTag);
          flexRow.appendChild(flexCell);
        });
  
        flexContainer.appendChild(flexRow);
      });
  
      table.parentNode.replaceChild(flexContainer, table);
  
      var updatedHtml = doc.body.innerHTML;
  
      document.getElementById('table-html-output').innerText = htmlInput;
      document.getElementById('table-render-output').innerHTML = htmlInput;
      document.getElementById('table-updated-html').innerText = updatedHtml;
      document.getElementById('table-rendered-updated-html').innerHTML = updatedHtml;
    } else {
      alert('Invalid input. Please enter a valid table.');
    }
  }
  

  function resetTableFlexbox() {
    document.getElementById('table-html-input').value = `<table>
    <tr>
        <th>Header 1</th>
        <th>Header 2</th>
    </tr>
    <tr>
        <td>Data 1</td>
        <td>Data 2</td>
    </tr>
</table>`;
    document.getElementById('table-html-output').innerText = '';
    document.getElementById('table-render-output').innerHTML = '';
    document.getElementById('table-updated-html').innerText = '';
    document.getElementById('table-rendered-updated-html').innerHTML = '';
  }
  
  // Attach the functions to the respective buttons on the page
  window.onload = function() {
    document.getElementById('apply-changes-table-flexbox').onclick = convertTableToFlexbox;
    document.getElementById('reset-table-flexbox').onclick = resetTableFlexbox;
  };
  
  // Update slider values on input change
  document.getElementById('padding-slider').addEventListener('input', function() {
    document.getElementById('padding-value').textContent = this.value + 'px';
  });
  
  document.getElementById('margin-slider').addEventListener('input', function() {
    document.getElementById('margin-value').textContent = this.value + 'px';
  });


function resetAltTextPage() {
    // Reset the textarea and output fields
    document.getElementById('html-input').value = '<div id="sample">This is a sample element.</div>';
    document.getElementById('html-output').innerText = '';
    document.getElementById('render-output').innerHTML = '';
    document.getElementById('updated-html').innerText = '';
    document.getElementById('rendered-updated-html').innerHTML = '';

    // Clear any error messages or styles
    var errorMessage = document.querySelector('.error-message');
    if (errorMessage) {
        errorMessage.remove();
    }

    // Scroll to the top of the page
    window.scrollTo(0, 0);
}