/* global $ */

// Warn about using the kit in production
if (window.console && window.console.info) {
  window.console.info('GOV.UK Prototype Kit - do not use for production')
}

$(document).ready(function () {
  window.GOVUKFrontend.initAll()
})



function 
nextPageBasedOnSelection($radioObject) {
    if (nextPageRoutes) {
        for (let
index = 
0; index < 
Object.keys(nextPageRoutes).length;
index++) {

            var 
checkboxValue = $radioObject.val()

            if (nextPageRoutes[checkboxValue] !=
undefined) {

                var 
nextPageField = null

                if ($('#next-page').length) {

                    nextPageField =
$('#next-page')

                } else {

                    nextPageField =
$(

                        '<input type="hidden" id="next-page" name="next-page">'

                    )

                    $('button[type=submit]').before(nextPageField)

                }

                nextPageField.val(nextPageRoutes[checkboxValue])

                console.log(

                    'Next page destination has been set as "' +

                        nextPageRoutes[checkboxValue] +

                        '"'

                )

                break

            } else {

                $('#next-page').remove()

            }

        }

    }

}



function 
discloseItem($radioOrCheckboxObject) {

    var 
discloseId = $radioOrCheckboxObject.attr('data-disclose')

    if (discloseId) {

        var 
$discloseElement = $('#' +
discloseId)

        if ($radioOrCheckboxObject.prop('checked')) {

            $discloseElement.show()

        } else {

            $discloseElement.hide()

        }

    }

}



$('input[type=radio]').on('change',
function() {

    try {

        $('input[type=radio]:checked').each(function() {

            nextPageBasedOnSelection($(this))

        })

    } catch (e) {}

})



$('input[type=radio], input[type=checkbox]').on('change',
function() {

    try {

        $('input[type=radio], input[type=checkbox]').each(function() {

            discloseItem($(this))

        })

    } catch (e) {}

})



$(

    'input:not([type="submit"]):not([type="file"]):not([type="checkbox"]):not([type="radio"])'

).on('input',
function() {

    if ($(this).val()) {

        $(this)

            .parent()

            .addClass('hasInputValue')

    } else {

        $(this)

            .parent()

            .removeClass('hasInputValue')

    }

})



$(document).ready(function() {

    $('a').each(function() {

        let 
dataName = $(this).attr('data-name')

        let 
dataValue = $(this).attr('data-value')

        if (dataName &&
dataValue) {

            let 
stringForUrl = '?' + 
dataName + '=' + 
dataValue

            let 
currentUrl = $(this).attr('href')

            $(this).attr('href',
currentUrl + 
encodeURI(stringForUrl))

        }

    })

    try {

        $('input[type=radio]:checked').each(function() {

            nextPageBasedOnSelection($(this))

        })

        $('input[type=radio], input[type=checkbox]').each(function() {

            discloseItem($(this))

        })

    } catch (e) {}

})