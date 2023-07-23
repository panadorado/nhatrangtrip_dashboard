var toolbarOptions = {
  container: [
    [{ font: [] }],
    [{ header: [1, 2, 3, 4, 5, , false] }],
    ['bold', 'italic', 'underline', 'strike'],
    ['blockquote', 'code-block'],
    [{ list: 'ordered' }, { list: 'bullet' }],
    [{ align: [] }],
    [{ color: [] }, { background: [] }],
    ['clean'],
    ['link', 'image'],
    ['table', 'delete-table'],
  ],
  handlers: {
    'delete-table': function () {
      if ($('.table-creating').hasClass('open')) {
        $('.table-creating').removeClass('open');
      }
      qTable.deleteTable();
    },
    table: function () {
      if (!$('.table-creating').hasClass('open')) {
        $('.table-creating').addClass('open');
        QUILL_RANGE = quill.getSelection();
      }
    },
  },
};
var options = {
  theme: 'snow',
  modules: {
    toolbar: toolbarOptions,
    table: true,
  },
  placeholder: 'Nhập văn bản...',
};

var quill = new Quill('#editor-container', options);
var markdown_code = $('#markdown');
var inputType = $("input[name='description']");

quill.on('text-change', function (delta, oldDelta, source) {
  var html = quill.container.firstChild.innerHTML;
  var markdown = toMarkdown(html);

  inputType.val(markdown);

  markdown_code.css('padding', '0px 10px');
  markdown_code.text(markdown);
});

function init(value) {
  // Only the Markdown value
  // when the parser to HTML is complete, pushes to the Quill JS Editor
  value = markdownParserToHTML(value);
  quill.clipboard.dangerouslyPasteHTML(value);
}

init(markdown_code.text());

/*---------------------------
init table tool button*/
function initTableButton() {
  //add class [.table-container] which is wrapper class of ql-table button
  if ($('.ql-table').length === 0) {
    console.log('table tool is not define.');
    return;
  }
  $('.ql-table').parent().addClass('table-container');

  //add option [rows,columns] panel in wrapper of ql-table button
  let num_row = 8; //number of row
  // let num_column = 8; //number of column
  let html = '';
  html += '<div class="table-creating">';
  for (let i = 1; i <= num_row; i++) {
    for (let j = 1; j <= num_row; j++) {
      let title = i + 'x' + j;
      html +=
        '<div class="table-celling" data-row="' +
        i +
        '" data-column="' +
        j +
        '" title="' +
        title +
        '"></div>';
    }
  }
  html += '</div>';
  $('.ql-table').parent().append($(html));

  //init event mouse enter for [.table-celling] to select size of new table
  $('.table-celling').mouseenter(function (evt) {
    let currentRowIndex = $(evt.target).attr('data-row');
    let currentColumnIndex = $(evt.target).attr('data-column');

    let allCells = $('.table-celling');
    for (let i = 0; i < allCells.length; i++) {
      let cell = allCells[i];
      let rowIdx = $(cell).attr('data-row');
      let colIdx = $(cell).attr('data-column');

      if (rowIdx <= currentRowIndex && colIdx <= currentColumnIndex) {
        if (!$(cell).hasClass('hover')) {
          $(cell).addClass('hover');
        }
      } else {
        if ($(cell).hasClass('hover')) {
          $(cell).removeClass('hover');
        }
      }
    }
  });

  //init event mouse move of document when the mouse move outside option panel, we need clear selection
  $(document).mousemove(function (evt) {
    if ($(evt.target).closest('.table-creating').length === 0) {
      let allCells = $('.table-celling');
      for (let i = 0; i < allCells.length; i++) {
        let cell = allCells[i];
        if ($(cell).hasClass('hover')) {
          $(cell).removeClass('hover');
        }
      }
    } else if ($(evt.target).closest('#editor-container').length === 0) {
    }
  });
}
/*END init table tool button
--------------------------*/
initTableButton();
//now we need handler click event of button table in toolbar
//cause quill selection will be cleared after click button in toolbar
//so we need keep quill selection to insert table at right position
var QUILL_RANGE = {};
var toolbar = quill.getModule('toolbar');
//add table to editor if clicked [.table-celling]
//closing option panel if clicked outside [.table-creating]
const qTable = quill.getModule('table');

$(document).click(function (evt) {
  if ($(evt.target).closest('.table-container').length === 0) {
    if ($('.table-creating').hasClass('open')) {
      $('.table-creating').removeClass('open');
    }
  } else {
    if ($(evt.target).hasClass('table-celling')) {
      let currentRowIndex = Number($(evt.target).attr('data-row'));
      let currentColumnIndex = Number($(evt.target).attr('data-column'));

      //set selection for editor
      if (QUILL_RANGE) {
        quill.setSelection(QUILL_RANGE.index);
        qTable.insertTable(currentRowIndex, currentColumnIndex);
      }

      //after add table, hidden option panel
      if ($('.table-creating').hasClass('open')) {
        $('.table-creating').removeClass('open');
      }
    }
  }
});

/*Enjoy to table toolbar
/--------------------*/

/**
 * Parse Markdown to HTML
 */

function markdownParserToHTML(md) {
  //ul
  md = md.replace(/^\s*\n\*/gm, '<ul>\n*');
  md = md.replace(/^(\*.+)\s*\n([^\*])/gm, '$1\n</ul>\n\n$2');
  md = md.replace(/^\*(.+)/gm, '<li>$1</li>');

  //ol
  md = md.replace(/^\s*\n\d\./gm, '<ol>\n1.');
  md = md.replace(/^(\d\..+)\s*\n([^\d\.])/gm, '$1\n</ol>\n\n$2');
  md = md.replace(/^\d\.(.+)/gm, '<li>$1</li>');

  //blockquote
  md = md.replace(/^\>(.+)/gm, '<blockquote>$1</blockquote>');

  //h
  md = md.replace(/[\#]{6}(.+)/g, '<h6>$1</h6>');
  md = md.replace(/[\#]{5}(.+)/g, '<h5>$1</h5>');
  md = md.replace(/[\#]{4}(.+)/g, '<h4>$1</h4>');
  md = md.replace(/[\#]{3}(.+)/g, '<h3>$1</h3>');
  md = md.replace(/[\#]{2}(.+)/g, '<h2>$1</h2>');
  md = md.replace(/[\#]{1}(.+)/g, '<h1>$1</h1>');

  //alt h
  md = md.replace(/^(.+)\n\=+/gm, '<h1>$1</h1>');
  md = md.replace(/^(.+)\n\-+/gm, '<h2>$1</h2>');

  //images
  md = md.replace(/\!\[([^\]]+)\]\(([^\)]+)\)/g, '<img src="$2" alt="$1" />');

  //links
  md = md.replace(
    /[\[]{1}([^\]]+)[\]]{1}[\(]{1}([^\)\"]+)(\"(.+)\")?[\)]{1}/g,
    '<a href="$2" title="$4">$1</a>',
  );

  //font styles
  // md = md.replace(/\*\*(.*)\*\*/gim, '<strong>$1<strong>');
  md = md.replace(/[\*\_]{2}([^\*\_]+)[\*\_]{2}/g, '<b>$1</b>');
  md = md.replace(/[\*\_]{1}([^\*\_]+)[\*\_]{1}/g, '<i>$1</i>');
  md = md.replace(/[\~]{2}([^\~]+)[\~]{2}/g, '<del>$1</del>');

  //pre
  md = md.replace(/^\s*\n\`\`\`(([^\s]+))?/gm, '<pre class="$2">');
  md = md.replace(/^\`\`\`\s*\n/gm, '</pre>\n\n');

  //code
  md = md.replace(/[\`]{1}([^\`]+)[\`]{1}/g, '<code>$1</code>');

  //p
  md = md.replace(/^\s*(\n)?(.+)/gm, function (m) {
    return /\<(\/)?(h\d|ul|ol|li|blockquote|pre|img)/.test(m)
      ? m
      : '<p>' + m + '</p>';
  });

  //strip p from pre
  md = md.replace(/(\<pre.+\>)\s*\n\<p\>(.+)\<\/p\>/gm, '$1$2');

  return md;
}
