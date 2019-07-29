const express = require('express')
const router = express.Router()

// Add your routes here - above the module.exports line


router.get('/apply/v2/data-match-1', (req, res, next) => {
    if(req.session.data.data == 'clear') {
        req.session.data['first-name'] = ''
        req.session.data['last-name'] = ''
        req.session.data.postcode = ''
        req.session.data['dob-day'] = ''
        req.session.data['dob-month'] = ''
        req.session.data['dob-year'] = ''
        req.session.data.organisation = ''
        req.session.data.data = ''
    }
    res.locals = req.session.data
    next();
    //res.render('apply/v2/data-match-1');
})



router.post('/apply/v2/data-match-1', (req, res, next) => {
    if(!req.session.data.organisation) {
        res.render('apply/v2/data-match-1.html', {
            error: true
        })
    } else {
        let match = true;
        if(req.session.data['first-name'].toLowerCase() != 'tony') match = false;
        if(req.session.data['last-name'].toLowerCase() != 'smith') match = false;
        if(req.session.data['postcode'].toUpperCase().replace(/\s/g, '') != 'A11AA') match = false;
        if(parseInt(req.session.data['dob-day'], 10) != '1') match = false;
        if(parseInt(req.session.data['dob-month'], 10) != '4') match = false;
        if(parseInt(req.session.data['dob-year'], 10) != '1980') match = false;

        if(match){
            res.status(302).redirect('/apply/v2/nino');
        } else {
            res.status(302).redirect('/apply/v2/mismatch');
        }
    }
})

router.post('/apply/v2/summary', (req, res, next) => {
    if(!req.session.data.declaration) {
        res.render('apply/v2/summary.html', {
            error: true
        })
    } else {
        res.status(302).redirect('contact-details');
    }
})

// Generic 'next page' rule

router.post('*',
function(req, res, next) {

    console.log(req.body)
    if (req.body['next-page']) {
        res.redirect(req.body['next-page'])
    } else {
        next()
    }
})




module.exports = router
