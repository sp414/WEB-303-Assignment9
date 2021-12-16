$(document).ready(function () {
    $.ajax({
        url: 'data.json',
        dataType: 'json',
        success: function(data) {
            var student = '';

            $.each(data.Characters, function (key, value) {

                student += '<tr>';
                student += '<td>' +
                    value.Name + '</td>';

                student += '<td>' +
                    value.FirstAppearance + '</td>';

                student += '<td>' +
                    value.PlayedBy + '</td>';

                student += '<td>' +
                    value.Age + '</td>';
                student += '<td>' +
                    value.DOB + '</td>';		
                student += '</tr>';
            });
            
            $('#table').append(student);
        },
        error: function(jqXHR, textStatus, errorThrown){
            alert('Error: ' + textStatus + ' - ' + errorThrown);
        }
    });

    var removeHighlight = function () {
        $('span.highlight').contents().unwrap();
    };

    var wrapContent = function (index, $el, text) {
        var $highlight = $('<span class="highlight"/>')
            .text(text.substring(0, index));
        var normalText = document.createTextNode(text.substring(index, text.length));
        $el.html($highlight).append(normalText);
    };

    var highlightTextInTable = function ($tableElements, searchText) {
        var matched = false;
        removeHighlight();

        $.each($tableElements, function (index, item) {
            var $el = $(item);
            if ($el.text().toLowerCase().search(searchText.toLowerCase()) != -1 && !matched) {
                wrapContent(searchText.length, $el, $el.html());
                console.log($el.text().toLowerCase());
                if (searchText.toLowerCase() == $el.text().toLowerCase()) {
                    matched = true;
                }
            }
        });
    };

    var $tableRows = $('table tr');
    var $tableElements = $tableRows.children();

   
    $('#search').on('keyup', function (e) {
        var searchText = $(this).val();
        if (searchText.length == 0) {
            removeHighlight();
            return;
        }
        
        highlightTextInTable($tableElements, searchText);

    });
    
    $('th').click(function(){
        var table = $(this).parents('table').eq(0)
        var rows = table.find('tr:gt(0)').toArray().sort(comparer($(this).index()))
        this.asc = !this.asc
        if (!this.asc){rows = rows.reverse()}
        for (var i = 0; i < rows.length; i++){table.append(rows[i])}
    })
    
    function comparer(index) {
        return function(a, b) {
            var valA = getCellValue(a, index), valB = getCellValue(b, index)
            return $.isNumeric(valA) && $.isNumeric(valB) ? valA - valB : valA.toString().localeCompare(valB)
        }
    }
    function getCellValue(row, index){ return $(row).children('td').eq(index).text() }
});