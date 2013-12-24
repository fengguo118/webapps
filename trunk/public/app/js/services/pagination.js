'use strict';


/**
 *    Services that paginate entities
 */


window.app.factory('Pagination', function () {
    return {
        iLength: 10,
        iLengthOptions: [10, 25, 50, 100],
        iPage: 1,
        iPages: 1,
        iStart: 0,
        iEnd: 0,
        iTotal: 0,
        paginate: function (total) {
            console.log('paginate: function:', total)
            var p = this
            p.iTotal = total
            console.log('Math.ceil(p.iTotal/p.iLength)', Math.ceil(p.iTotal / p.iLength))
            p.iPages = Math.ceil(p.iTotal / p.iLength)
            p.iPage = p.iPages < p.iPage ? p.iPages : p.iPage
            p.iStart = p.iLength * (p.iPage - 1) + 1
            p.iEnd = p.iLength * p.iPage > p.iTotal ? p.iTotal : p.iLength * p.iPage
            widthFunctions()
        }
    }
})