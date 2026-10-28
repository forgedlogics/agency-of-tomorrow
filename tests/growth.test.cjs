const {test} = require('node:test');
const assert = require('node:assert/strict');
const Growth = require('../growth.js');
const cohort = {inquiries:'20',qualified:'10',bookings:'5',sales:'2',revenue:'800',cost:'100'};
test('measures a sequential consultation cohort',()=>assert.deepEqual(Growth.metrics(cohort),{qualification:50,booking:50,close:40,costPerBooking:20,revenue:800}));
test('zero denominators are unavailable rather than fabricated rates',()=>assert.deepEqual(Growth.metrics(Object.fromEntries(Object.keys(cohort).map(k=>[k,'0']))),{qualification:null,booking:null,close:null,costPerBooking:null,revenue:0}));
test('rejects missing, nonfinite, fractional and inconsistent counts',()=>{
  for (const change of [{inquiries:''},{cost:'Infinity'},{inquiries:'2.5'},{qualified:'21'},{bookings:'11'},{sales:'6'},{revenue:'-1'}]) assert.throws(()=>Growth.metrics({...cohort,...change}));
});
